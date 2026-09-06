/**
 * ============================================================================
 * REDDOT PRIVATE SECURE DATABASE & REAL-TIME WEBSOCKET SYNC SERVER
 * Built with native Node.js core modules (zero external dependencies required)
 * Default Port: 8765 &bull; Bearer Token Auth &bull; Encrypted Vault Persistence
 * ============================================================================
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 8765;
const SECRET_TOKEN = process.env.REDDOT_SECRET_TOKEN || 'sk_live_reddot_98a76f8b9e01cd42';
const DATA_DIR = path.join(__dirname, 'data');
const VAULT_FILE = path.join(DATA_DIR, 'vault.enc');

// Ensure storage directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// In-Memory Vault State (Encrypted ciphertext stored on disk)
let vaultData = {
  encryptedPayload: null,
  version: 1,
  lastUpdated: Date.now()
};

// Load existing vault from disk if present
if (fs.existsSync(VAULT_FILE)) {
  try {
    const raw = fs.readFileSync(VAULT_FILE, 'utf8');
    vaultData = JSON.parse(raw);
    console.log(`[VAULT] Loaded existing encrypted vault from disk (Last updated: ${new Date(vaultData.lastUpdated).toLocaleString()})`);
  } catch (err) {
    console.warn('[VAULT] Could not parse existing vault file, starting fresh.');
  }
}

// Active WebSocket client connections for real-time mesh
const wsClients = new Set();

function saveVaultToDisk() {
  try {
    fs.writeFileSync(VAULT_FILE, JSON.stringify(vaultData, null, 2), 'utf8');
  } catch (err) {
    console.error('[VAULT] Error saving vault to disk:', err);
  }
}

function parseAuthHeader(req) {
  const auth = req.headers['authorization'] || req.headers['x-reddot-token'] || '';
  if (auth.startsWith('Bearer ')) {
    return auth.slice(7).trim();
  }
  return auth.trim();
}

// Simple HTTP Server
const server = http.createServer((req, res) => {
  // CORS Headers for secure workstation access
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Reddot-Token');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  // 1. Health Check
  if (pathname === '/api/v1/health' || pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ONLINE',
      service: 'REDDOT Private Secure Sync Server',
      version: '2.4.0',
      clientsConnected: wsClients.size,
      vaultPresent: !!vaultData.encryptedPayload,
      lastUpdated: vaultData.lastUpdated,
      timestamp: Date.now()
    }));
    return;
  }

  // Authentication check for sync API
  if (pathname.startsWith('/api/v1/sync')) {
    const token = parseAuthHeader(req);
    if (token !== SECRET_TOKEN) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Unauthorized: Invalid or missing Bearer token' }));
      return;
    }

    // GET /api/v1/sync (Fetch latest encrypted vault)
    if (req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        vault: vaultData.encryptedPayload,
        version: vaultData.version,
        lastUpdated: vaultData.lastUpdated
      }));
      return;
    }

    // POST /api/v1/sync (Update encrypted vault & broadcast to mesh)
    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk;
        if (body.length > 25 * 1024 * 1024) { // 25MB safety limit
          res.writeHead(413, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Payload too large' }));
          req.destroy();
        }
      });

      req.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          if (!parsed.encryptedVault) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Missing encryptedVault property' }));
            return;
          }

          vaultData.encryptedPayload = parsed.encryptedVault;
          vaultData.version++;
          vaultData.lastUpdated = Date.now();
          saveVaultToDisk();

          // Broadcast update event to all connected WebSocket clients
          broadcastToClients({
            type: 'VAULT_UPDATED',
            version: vaultData.version,
            lastUpdated: vaultData.lastUpdated,
            originClient: parsed.clientName || 'Workstation-Client'
          });

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            success: true,
            message: 'Vault synchronized & encrypted to disk successfully',
            version: vaultData.version,
            lastUpdated: vaultData.lastUpdated
          }));
        } catch (err) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid JSON body: ' + err.message }));
        }
      });
      return;
    }
  }

  // 404 Fallback
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Endpoint not found', available: ['/api/v1/health', '/api/v1/sync'] }));
});

// Lightweight WebSocket Server handling (RFC 6455 Native Handshake)
server.on('upgrade', (req, socket, head) => {
  const key = req.headers['sec-websocket-key'];
  if (!key) {
    socket.destroy();
    return;
  }

  const acceptKey = crypto
    .createHash('sha1')
    .update(key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11')
    .digest('base64');

  const headers = [
    'HTTP/1.1 101 Switching Protocols',
    'Upgrade: websocket',
    'Connection: Upgrade',
    `Sec-WebSocket-Accept: ${acceptKey}`
  ];

  socket.write(headers.join('\r\n') + '\r\n\r\n');

  wsClients.add(socket);
  console.log(`[WS] Client connected. Total active clients: ${wsClients.size}`);

  socket.on('data', buffer => {
    // Basic ping/pong frame handling or message broadcasting
    try {
      const decoded = parseWebSocketFrame(buffer);
      if (decoded && decoded.text) {
        const msg = JSON.parse(decoded.text);
        if (msg.type === 'BROADCAST_CHAT' || msg.type === 'BROADCAST_PUNCH' || msg.type === 'BROADCAST_TASK') {
          broadcastToClients(msg, socket);
        }
      }
    } catch (_) {}
  });

  socket.on('close', () => {
    wsClients.delete(socket);
    console.log(`[WS] Client disconnected. Active clients: ${wsClients.size}`);
  });

  socket.on('error', () => {
    wsClients.delete(socket);
  });
});

function parseWebSocketFrame(buffer) {
  if (buffer.length < 2) return null;
  const isMasked = (buffer[1] & 0x80) === 0x80;
  let payloadLen = buffer[1] & 0x7f;
  let offset = 2;

  if (payloadLen === 126) {
    payloadLen = buffer.readUInt16BE(2);
    offset = 4;
  } else if (payloadLen === 127) {
    return null; // Skip oversized packets
  }

  let mask = null;
  if (isMasked) {
    mask = buffer.slice(offset, offset + 4);
    offset += 4;
  }

  const payload = buffer.slice(offset, offset + payloadLen);
  if (isMasked && mask) {
    for (let i = 0; i < payload.length; i++) {
      payload[i] ^= mask[i % 4];
    }
  }

  return { text: payload.toString('utf8') };
}

function encodeWebSocketText(text) {
  const payload = Buffer.from(text, 'utf8');
  const length = payload.length;
  let header;

  if (length < 126) {
    header = Buffer.from([0x81, length]);
  } else if (length <= 65535) {
    header = Buffer.alloc(4);
    header[0] = 0x81;
    header[1] = 126;
    header.writeUInt16BE(length, 2);
  } else {
    header = Buffer.alloc(10);
    header[0] = 0x81;
    header[1] = 127;
    header.writeBigUInt64BE(BigInt(length), 2);
  }

  return Buffer.concat([header, payload]);
}

function broadcastToClients(dataObj, excludeSocket = null) {
  const payload = encodeWebSocketText(JSON.stringify(dataObj));
  for (const client of wsClients) {
    if (client !== excludeSocket && client.writable) {
      try {
        client.write(payload);
      } catch (e) {
        wsClients.delete(client);
      }
    }
  }
}

// Start Server
server.listen(PORT, () => {
  console.log(`========================================================`);
  console.log(`  REDDOT PRIVATE SECURE DATABASE & SYNC SERVER ONLINE`);
  console.log(`  Port:        http://localhost:${PORT}`);
  console.log(`  API Health:  http://localhost:${PORT}/api/v1/health`);
  console.log(`  Sync API:    http://localhost:${PORT}/api/v1/sync`);
  console.log(`  Auth Token:  ${SECRET_TOKEN}`);
  console.log(`  Vault File:  ${VAULT_FILE}`);
  console.log(`========================================================`);
});
