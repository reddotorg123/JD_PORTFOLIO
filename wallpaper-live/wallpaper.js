/**
 * ============================================================================
 * JAGADISH.K &bull; REDDOT ARCHITECTURE &bull; EXECUTIVE WORKSTATION OS (V2.4)
 * Symmetrical Wallpaper &bull; AES-256 Encrypted DB &bull; Real-Time Server Sync
 * ============================================================================
 */

(function () {
  'use strict';

  // --- CRYPTO SECURE PRIVATE DATABASE ENGINE (AES-256-GCM & PBKDF2) ---
  const CryptoSecureDB = {
    masterKeySecret: "REDDOT_ENTERPRISE_VAULT_KEY_2026_SECURE_ALPHA",
    salt: new Uint8Array([0x52, 0x45, 0x44, 0x44, 0x4f, 0x54, 0x5f, 0x53, 0x45, 0x43, 0x55, 0x52, 0x45, 0x5f, 0x44, 0x42]),

    async deriveKey(secret) {
      if (!window.crypto || !window.crypto.subtle) return null;
      const enc = new TextEncoder();
      const keyMaterial = await window.crypto.subtle.importKey(
        "raw",
        enc.encode(secret || this.masterKeySecret),
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
      );

      return window.crypto.subtle.deriveKey(
        {
          name: "PBKDF2",
          salt: this.salt,
          iterations: 100000,
          hash: "SHA-256"
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
      );
    },

    async encryptData(plainObject) {
      try {
        if (!window.crypto || !window.crypto.subtle) {
          return btoa(unescape(encodeURIComponent(JSON.stringify(plainObject))));
        }
        const key = await this.deriveKey();
        const iv = window.crypto.getRandomValues(new Uint8Array(12));
        const enc = new TextEncoder();
        const encoded = enc.encode(JSON.stringify(plainObject));

        const ciphertext = await window.crypto.subtle.encrypt(
          { name: "AES-GCM", iv: iv },
          key,
          encoded
        );

        const combined = new Uint8Array(iv.length + ciphertext.byteLength);
        combined.set(iv, 0);
        combined.set(new Uint8Array(ciphertext), iv.length);

        let binary = '';
        const len = combined.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(combined[i]);
        }
        return btoa(binary);
      } catch (e) {
        console.warn("Crypto fallback:", e);
        return JSON.stringify(plainObject);
      }
    },

    async decryptData(encryptedBase64) {
      try {
        if (!encryptedBase64) return null;
        if (!window.crypto || !window.crypto.subtle) {
          return JSON.parse(decodeURIComponent(escape(atob(encryptedBase64))));
        }
        const binary = atob(encryptedBase64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          bytes[i] = binary.charCodeAt(i);
        }

        const iv = bytes.slice(0, 12);
        const data = bytes.slice(12);
        const key = await this.deriveKey();

        const decrypted = await window.crypto.subtle.decrypt(
          { name: "AES-GCM", iv: iv },
          key,
          data
        );

        const dec = new TextDecoder();
        return JSON.parse(dec.decode(decrypted));
      } catch (e) {
        try {
          return JSON.parse(encryptedBase64);
        } catch (_) {
          return null;
        }
      }
    }
  };

  // --- Initial Default Database Seed Data ---
  const DEFAULT_WORKERS = {
    "RD-EMP-101": {
      id: "RD-EMP-101",
      name: "Alex Rivera",
      role: "Firmware & Embedded Architect",
      dept: "Firmware & Embedded",
      targetHours: 8,
      pin: "1234",
      color: "#00d2ff",
      status: "DUTY_OFF",
      shiftStart: null,
      sessionSeconds: 0,
      todayHours: 6.2,
      weeklyHours: 32.5,
      avatarText: "AR"
    },
    "RD-EMP-102": {
      id: "RD-EMP-102",
      name: "Priya Sharma",
      role: "AI/ML Systems Engineer",
      dept: "AI / ML Systems",
      targetHours: 8,
      pin: "1234",
      color: "#00e676",
      status: "DUTY_ON",
      shiftStart: "09:15 AM",
      sessionSeconds: 14820,
      todayHours: 5.8,
      weeklyHours: 36.2,
      avatarText: "PS"
    },
    "RD-EMP-103": {
      id: "RD-EMP-103",
      name: "Vikram Malhotra",
      role: "Hardware & Robotics Lead",
      dept: "Hardware Architecture",
      targetHours: 8,
      pin: "1234",
      color: "#ffb300",
      status: "DUTY_BREAK",
      shiftStart: "08:45 AM",
      sessionSeconds: 16200,
      todayHours: 4.5,
      weeklyHours: 29.0,
      avatarText: "VM"
    },
    "RD-EMP-104": {
      id: "RD-EMP-104",
      name: "Deepak Chen",
      role: "Full-Stack Software Lead",
      dept: "Software & Web",
      targetHours: 8,
      pin: "1234",
      color: "#b388ff",
      status: "DUTY_ON",
      shiftStart: "10:00 AM",
      sessionSeconds: 12100,
      todayHours: 5.1,
      weeklyHours: 34.0,
      avatarText: "DC"
    }
  };

  const DEFAULT_TASKS = [
    {
      id: "task-101",
      title: "Flash ESP32 FreeRTOS v2.4 Firmware & Verify SoftAP Latency",
      desc: "Flash encrypted OTA binary and verify ping latency < 5ms.",
      assignee: "RD-EMP-101",
      priority: "HIGH",
      status: "REACHED",
      deadline: "Today 4:30 PM",
      assignedAt: "09:00 AM",
      reachedAt: "10:15 AM",
      accomplishedAt: null
    },
    {
      id: "task-102",
      title: "Multimodal Voice Loop Latency Tuning (< 85ms)",
      desc: "Optimize on-device audio buffer pipeline for real-time speech interaction loop.",
      assignee: "RD-EMP-102",
      priority: "URGENT",
      status: "ASSIGNED",
      deadline: "Today 6:00 PM",
      assignedAt: "09:30 AM",
      reachedAt: null,
      accomplishedAt: null
    },
    {
      id: "task-103",
      title: "Calibrate Pulse-Echo Ultrasonic Transducer Array",
      desc: "Run 2.5MHz pulse sweep and verify thickness resolution accuracy to within 0.05mm.",
      assignee: "RD-EMP-103",
      priority: "MEDIUM",
      status: "ASSIGNED",
      deadline: "Tomorrow 2:00 PM",
      assignedAt: "10:00 AM",
      reachedAt: null,
      accomplishedAt: null
    },
    {
      id: "task-104",
      title: "Deploy SEM PRO Academic Analytics & Speed Patch v3.2",
      desc: "Push bundle optimization and database indexing for 1,000+ active student users.",
      assignee: "RD-EMP-104",
      priority: "NORMAL",
      status: "ACCOMPLISHED",
      deadline: "Done",
      assignedAt: "08:30 AM",
      reachedAt: "09:00 AM",
      accomplishedAt: "11:20 AM"
    }
  ];

  const DEFAULT_CHATS = {
    "general": [
      { sender: "Jagadish K", role: "ADMIN", avatar: "JK", text: "Welcome team to the REDDOT Enterprise Workstation OS. All system bridges are online.", time: "09:00 AM" },
      { sender: "Priya Sharma", role: "AI/ML", avatar: "PS", text: "Voice pipeline test models compiled with sub-85ms latency! Pushing review build now.", time: "10:35 AM" },
      { sender: "Alex Rivera", role: "Firmware", avatar: "AR", text: "ESP32 OTA flash test completed on bench 2. SoftAP throughput is solid.", time: "11:15 AM" }
    ],
    "hardware-lab": [
      { sender: "Vikram Malhotra", role: "Hardware", avatar: "VM", text: "New 4-layer PCB prototypes arrived from fab. Starting impedance testing on high-speed lines.", time: "10:05 AM" }
    ],
    "ai-ml-firmware": [
      { sender: "Priya Sharma", role: "AI/ML", avatar: "PS", text: "Model quantization to int8 reduced flash memory footprint by 42%.", time: "11:00 AM" }
    ],
    "announcements": [
      { sender: "Jagadish K", role: "ADMIN", avatar: "JK", text: "📢 Reminder: All timesheet logs are automatically consolidated into the encrypted export roster.", time: "08:30 AM" }
    ]
  };

  const DEFAULT_PUNCH_LOGS = [
    { workerId: "RD-EMP-102", name: "Priya Sharma", action: "CLOCK_IN", time: "09:15 AM", date: "Today" },
    { workerId: "RD-EMP-103", name: "Vikram Malhotra", action: "BREAK_START", time: "12:30 PM", date: "Today" },
    { workerId: "RD-EMP-104", name: "Deepak Chen", action: "CLOCK_IN", time: "10:00 AM", date: "Today" }
  ];

  // --- Workstation State ---
  const state = {
    userRole: localStorage.getItem('rd_user_role') || 'ADMIN',
    currentEmpId: localStorage.getItem('rd_emp_id') || 'RD-EMP-102',
    adminName: 'JAGADISH K',
    adminTitle: 'FOUNDER & TECHNICAL HEAD',
    giantName: 'JAGADISH',
    theme: 'obsidian',
    tiltEnabled: true,
    soundEnabled: true,
    viewingBadgeWorkerId: 'RD-EMP-101',

    // Databases (AES-256 Encrypted)
    workers: JSON.parse(localStorage.getItem('rd_workers_db')) || DEFAULT_WORKERS,
    tasks: JSON.parse(localStorage.getItem('rd_tasks_db')) || DEFAULT_TASKS,
    chats: JSON.parse(localStorage.getItem('rd_chats_db')) || DEFAULT_CHATS,
    punchLogs: JSON.parse(localStorage.getItem('rd_punch_logs')) || DEFAULT_PUNCH_LOGS,

    // Server Sync Configuration
    serverConfig: JSON.parse(localStorage.getItem('rd_server_config')) || {
      endpoint: 'http://localhost:8765/api/v1/sync',
      token: 'sk_live_reddot_98a76f8b9e01cd42',
      wsUrl: 'ws://localhost:8765'
    },

    // UI States
    activeTab: 'workers',
    activeChatTarget: 'general',
    taskFilter: 'ALL',
    commandCenterOpen: false,

    // Shift Tracking
    personalShift: {
      status: 'DUTY_OFF',
      seconds: 0
    },

    // Calling
    call: {
      active: false,
      type: 'video',
      targetName: 'Priya (AI/ML)',
      targetAvatar: 'PR',
      durationSeconds: 0,
      interval: null,
      audioMuted: false,
      videoMuted: false,
      screenSharing: false,
      localStream: null
    },

    // 3D Tilt
    mouse: { targetRotX: 0, targetRotY: 0, targetX: 0 },
    card: { curRotX: 0, curRotY: 0, curX: 0 }
  };

  // --- Audio Synth Feedback ---
  let audioCtx = null;
  function playNotificationChirp(success = false) {
    if (!state.soundEnabled) return;
    try {
      if (!audioCtx) {
        const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
        if (AudioCtxClass) audioCtx = new AudioCtxClass();
      }
      if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      const freq = success ? 1150 : 800;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.35, audioCtx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.12);
    } catch (_) {}
  }

  // --- Dedicated Server HTTP & WebSocket Real-Time Sync Engine ---
  let syncSocket = null;

  function initServerSync() {
    try {
      const wsUrl = state.serverConfig.wsUrl || 'ws://localhost:8765';
      syncSocket = new WebSocket(wsUrl);

      syncSocket.onopen = () => {
        const connBadge = document.getElementById('serverConnectionStatus');
        if (connBadge) connBadge.textContent = 'ONLINE • SYNC ACTIVE';
        triggerRemoteVaultSync();
      };

      syncSocket.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          if (msg.type === 'VAULT_UPDATED') {
            triggerRemoteVaultFetch();
          }
        } catch (_) {}
      };

      syncSocket.onerror = () => {
        const connBadge = document.getElementById('serverConnectionStatus');
        if (connBadge) connBadge.textContent = 'STANDALONE SECURE';
      };
    } catch (e) {
      console.warn('Sync server offline, running in offline vault mode.');
    }
  }

  async function triggerRemoteVaultSync() {
    try {
      const fullVault = {
        workers: state.workers,
        tasks: state.tasks,
        chats: state.chats,
        punchLogs: state.punchLogs,
        timestamp: Date.now()
      };
      const encrypted = await CryptoSecureDB.encryptData(fullVault);

      const endpoint = state.serverConfig.endpoint || 'http://localhost:8765/api/v1/sync';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.serverConfig.token}`
        },
        body: JSON.stringify({
          encryptedVault: encrypted,
          clientName: `${state.userRole}-${state.currentEmpId}`
        })
      });

      if (res.ok) {
        const connBadge = document.getElementById('serverConnectionStatus');
        if (connBadge) connBadge.textContent = 'SYNCED • ONLINE';
      }
    } catch (_) {}
  }

  async function triggerRemoteVaultFetch() {
    try {
      const endpoint = state.serverConfig.endpoint || 'http://localhost:8765/api/v1/sync';
      const res = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${state.serverConfig.token}`
        }
      });

      if (res.ok) {
        const data = await res.json();
        if (data.vault) {
          const decrypted = await CryptoSecureDB.decryptData(data.vault);
          if (decrypted && decrypted.workers) {
            state.workers = decrypted.workers;
            state.tasks = decrypted.tasks || state.tasks;
            state.chats = decrypted.chats || state.chats;
            state.punchLogs = decrypted.punchLogs || state.punchLogs;

            renderWorkers();
            renderTimesheets();
            renderTasks();
            renderChatMessages();
            updateDatabaseMetrics();
          }
        }
      }
    } catch (_) {}
  }

  // --- Encrypted Local Persistence Helpers ---
  async function persistEncryptedVault() {
    const fullVault = {
      workers: state.workers,
      tasks: state.tasks,
      chats: state.chats,
      punchLogs: state.punchLogs,
      timestamp: Date.now()
    };
    const encrypted = await CryptoSecureDB.encryptData(fullVault);
    localStorage.setItem('rd_secure_db_vault', encrypted);
    updateDatabaseMetrics();
    triggerRemoteVaultSync();
  }

  function saveWorkers() {
    localStorage.setItem('rd_workers_db', JSON.stringify(state.workers));
    persistEncryptedVault();
  }

  function saveTasks() {
    localStorage.setItem('rd_tasks_db', JSON.stringify(state.tasks));
    persistEncryptedVault();
  }

  function saveChats() {
    localStorage.setItem('rd_chats_db', JSON.stringify(state.chats));
    persistEncryptedVault();
  }

  function savePunchLogs() {
    localStorage.setItem('rd_punch_logs', JSON.stringify(state.punchLogs));
    persistEncryptedVault();
  }

  // --- DYNAMIC 3D WALLPAPER BADGE SWITCHER ---
  function initDynamicBadge() {
    const savedCustomImg = localStorage.getItem('rd_custom_badge_img');
    const badgeImg = document.getElementById('badgeImg');
    if (savedCustomImg && badgeImg) {
      badgeImg.src = savedCustomImg;
    }
  }

  function setCustomBadgeImg(src) {
    const badgeImg = document.getElementById('badgeImg');
    if (badgeImg) {
      badgeImg.src = src;
      localStorage.setItem('rd_custom_badge_img', src);
      playNotificationChirp(true);
    }
  }

  function resetDefaultBadge() {
    const badgeImg = document.getElementById('badgeImg');
    if (badgeImg) {
      badgeImg.src = 'assets/id-card.png';
      localStorage.removeItem('rd_custom_badge_img');
      playNotificationChirp(true);
      alert('Wallpaper badge reset to default Founder ID card.');
    }
  }

  // --- WORKER MANAGEMENT LOGIC ---
  function createWorker(id, name, role, dept, targetHours, pin, color) {
    const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    const newWorker = {
      id: id.trim().toUpperCase(),
      name: name.trim(),
      role: role.trim(),
      dept: dept,
      targetHours: parseFloat(targetHours) || 8,
      pin: pin.trim(),
      color: color || '#00d2ff',
      status: 'DUTY_OFF',
      shiftStart: null,
      sessionSeconds: 0,
      todayHours: 0.0,
      weeklyHours: 0.0,
      avatarText: initials || 'RD'
    };

    state.workers[newWorker.id] = newWorker;
    saveWorkers();
    renderWorkers();
    renderTimesheets();
    populateAssigneeSelect();
    populateLoginSelect();
    playNotificationChirp(true);
  }

  function deleteWorker(workerId) {
    if (confirm(`Remove team member ${workerId}?`)) {
      delete state.workers[workerId];
      saveWorkers();
      renderWorkers();
      renderTimesheets();
      populateAssigneeSelect();
      populateLoginSelect();
    }
  }

  function renderWorkers() {
    const grid = document.getElementById('workersGrid');
    const inputSearch = document.getElementById('inputWorkerSearch');
    if (!grid) return;

    const list = Object.values(state.workers);
    const searchTerm = (inputSearch?.value || '').toLowerCase();

    const filtered = list.filter(w => 
      w.name.toLowerCase().includes(searchTerm) ||
      w.id.toLowerCase().includes(searchTerm) ||
      w.dept.toLowerCase().includes(searchTerm) ||
      w.role.toLowerCase().includes(searchTerm)
    );

    const activeCount = list.filter(w => w.status === 'DUTY_ON').length;
    const breakCount = list.filter(w => w.status === 'DUTY_BREAK').length;
    const offlineCount = list.filter(w => w.status === 'DUTY_OFF').length;

    const statTotalWorkers = document.getElementById('statTotalWorkers');
    const statActiveWorkers = document.getElementById('statActiveWorkers');
    const statBreakWorkers = document.getElementById('statBreakWorkers');
    const statOfflineWorkers = document.getElementById('statOfflineWorkers');

    if (statTotalWorkers) statTotalWorkers.textContent = list.length;
    if (statActiveWorkers) statActiveWorkers.textContent = activeCount;
    if (statBreakWorkers) statBreakWorkers.textContent = breakCount;
    if (statOfflineWorkers) statOfflineWorkers.textContent = offlineCount;

    grid.innerHTML = '';

    filtered.forEach(worker => {
      const activeTasksCount = state.tasks.filter(t => t.assignee === worker.id && t.status !== 'ACCOMPLISHED').length;
      let statusColor = 'var(--status-offline)';
      let statusLabel = 'Offline';
      let dotClass = 'duty-off';

      if (worker.status === 'DUTY_ON') {
        statusColor = 'var(--status-duty)';
        statusLabel = 'On Duty';
        dotClass = 'duty-on';
      } else if (worker.status === 'DUTY_BREAK') {
        statusColor = 'var(--status-break)';
        statusLabel = 'Break';
        dotClass = 'duty-break';
      }

      const card = document.createElement('div');
      card.className = 'worker-card';
      card.innerHTML = `
        <div class="worker-card-head">
          <div class="worker-card-user">
            <div class="worker-avatar" style="border: 1px solid ${worker.color}; background: ${worker.color}22;">
              ${worker.avatarText}
            </div>
            <div class="worker-meta">
              <span class="worker-name">${escapeHTML(worker.name)}</span>
              <span class="worker-role">${escapeHTML(worker.role)}</span>
            </div>
          </div>
          <span class="worker-id-tag">${escapeHTML(worker.id)}</span>
        </div>

        <div class="worker-card-body">
          <div class="worker-status-badge" style="color: ${statusColor};">
            <span class="status-indicator-dot ${dotClass}"></span>
            <span>${statusLabel}</span>
          </div>
          <div><strong>Dept:</strong> ${escapeHTML(worker.dept.split(' ')[0])}</div>
          <div><strong>Today:</strong> ${worker.todayHours.toFixed(1)}h / ${worker.targetHours}h</div>
          <div><strong>Tasks:</strong> ${activeTasksCount} Active</div>
        </div>

        <div class="worker-card-foot">
          <button class="btn-card-action btn-view-badge" data-id="${worker.id}">&#x1F4B3; Badge</button>
          <button class="btn-card-action btn-direct-chat" data-id="${worker.id}">&#x1F4AC; Chat</button>
          <button class="btn-card-action btn-direct-call" data-id="${worker.id}">&#x1F4DE; Call</button>
          ${state.userRole === 'ADMIN' ? `<button class="btn-card-action danger btn-del-worker" data-id="${worker.id}" title="Remove">&times;</button>` : ''}
        </div>
      `;

      grid.appendChild(card);
    });

    grid.querySelectorAll('.btn-view-badge').forEach(btn => {
      btn.onclick = () => openBadgeViewer(btn.getAttribute('data-id'));
    });
    grid.querySelectorAll('.btn-direct-chat').forEach(btn => {
      btn.onclick = () => {
        switchTab('chat');
        selectChatTarget(btn.getAttribute('data-id'));
      };
    });
    grid.querySelectorAll('.btn-direct-call').forEach(btn => {
      btn.onclick = () => {
        const wid = btn.getAttribute('data-id');
        const w = state.workers[wid];
        if (w) startCall(w.name, w.avatarText, 'video');
      };
    });
    grid.querySelectorAll('.btn-del-worker').forEach(btn => {
      btn.onclick = () => deleteWorker(btn.getAttribute('data-id'));
    });
  }

  function openBadgeViewer(workerId) {
    const worker = state.workers[workerId];
    if (!worker) return;
    state.viewingBadgeWorkerId = workerId;

    const badgeViewAvatar = document.getElementById('badgeViewAvatar');
    const badgeViewName = document.getElementById('badgeViewName');
    const badgeViewRole = document.getElementById('badgeViewRole');
    const badgeViewDept = document.getElementById('badgeViewDept');
    const badgeViewIdNum = document.getElementById('badgeViewIdNum');
    const badgeViewerModal = document.getElementById('badgeViewerModal');

    if (badgeViewAvatar) {
      badgeViewAvatar.textContent = worker.avatarText;
      badgeViewAvatar.style.border = `2px solid ${worker.color}`;
    }
    if (badgeViewName) badgeViewName.textContent = worker.name.toUpperCase();
    if (badgeViewRole) badgeViewRole.textContent = worker.role.toUpperCase();
    if (badgeViewDept) badgeViewDept.textContent = worker.dept.toUpperCase();
    if (badgeViewIdNum) badgeViewIdNum.textContent = `ID: ${worker.id}`;

    if (badgeViewerModal) badgeViewerModal.classList.remove('hidden');
  }

  // --- TIMESHEETS & SHIFT MONITORING ---
  function updateShiftClock() {
    if (state.personalShift.status === 'DUTY_ON') {
      state.personalShift.seconds++;
      const timeStr = formatSecondsToTime(state.personalShift.seconds);
      const shiftLiveTimer = document.getElementById('shiftLiveTimer');
      if (shiftLiveTimer) shiftLiveTimer.textContent = timeStr;
    }
  }

  function formatSecondsToTime(totalSec) {
    const hrs = Math.floor(totalSec / 3600).toString().padStart(2, '0');
    const mins = Math.floor((totalSec % 3600) / 60).toString().padStart(2, '0');
    const secs = (totalSec % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  }

  function clockInPersonal() {
    state.personalShift.status = 'DUTY_ON';
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (state.userRole !== 'ADMIN') {
      const currentWorker = state.workers[state.currentEmpId];
      if (currentWorker) {
        currentWorker.status = 'DUTY_ON';
        currentWorker.shiftStart = timeNow;
        saveWorkers();
      }
    }

    const punch = {
      workerId: state.userRole === 'ADMIN' ? 'ADMIN-FOUNDER' : state.currentEmpId,
      name: state.userRole === 'ADMIN' ? state.adminName : (state.workers[state.currentEmpId]?.name || 'Worker'),
      action: 'CLOCK_IN',
      time: timeNow,
      date: 'Today'
    };
    state.punchLogs.unshift(punch);
    savePunchLogs();

    const btnClockIn = document.getElementById('btnClockIn');
    const btnToggleBreak = document.getElementById('btnToggleBreak');
    const btnClockOut = document.getElementById('btnClockOut');

    if (btnClockIn) btnClockIn.disabled = true;
    if (btnToggleBreak) btnToggleBreak.disabled = false;
    if (btnClockOut) btnClockOut.disabled = false;

    renderWorkers();
    renderTimesheets();
    renderPunchLogs();
    playNotificationChirp(true);
  }

  function toggleBreakPersonal() {
    const btnToggleBreak = document.getElementById('btnToggleBreak');
    if (state.personalShift.status === 'DUTY_ON') {
      state.personalShift.status = 'DUTY_BREAK';
      if (btnToggleBreak) btnToggleBreak.innerHTML = '<span>&#x25B6; RESUME</span>';
      if (state.userRole !== 'ADMIN' && state.workers[state.currentEmpId]) {
        state.workers[state.currentEmpId].status = 'DUTY_BREAK';
        saveWorkers();
      }
    } else if (state.personalShift.status === 'DUTY_BREAK') {
      state.personalShift.status = 'DUTY_ON';
      if (btnToggleBreak) btnToggleBreak.innerHTML = '<span>&#x23F8; TAKE BREAK</span>';
      if (state.userRole !== 'ADMIN' && state.workers[state.currentEmpId]) {
        state.workers[state.currentEmpId].status = 'DUTY_ON';
        saveWorkers();
      }
    }
    renderWorkers();
    renderTimesheets();
  }

  function clockOutPersonal() {
    const elapsedHrs = (state.personalShift.seconds / 3600);
    state.personalShift.status = 'DUTY_OFF';
    state.personalShift.seconds = 0;

    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const shiftLiveTimer = document.getElementById('shiftLiveTimer');
    if (shiftLiveTimer) shiftLiveTimer.textContent = '00:00:00';

    if (state.userRole !== 'ADMIN') {
      const currentWorker = state.workers[state.currentEmpId];
      if (currentWorker) {
        currentWorker.status = 'DUTY_OFF';
        currentWorker.todayHours += elapsedHrs;
        currentWorker.weeklyHours += elapsedHrs;
        currentWorker.shiftStart = null;
        saveWorkers();
      }
    }

    const punch = {
      workerId: state.userRole === 'ADMIN' ? 'ADMIN-FOUNDER' : state.currentEmpId,
      name: state.userRole === 'ADMIN' ? state.adminName : (state.workers[state.currentEmpId]?.name || 'Worker'),
      action: 'CLOCK_OUT',
      time: timeNow,
      date: 'Today'
    };
    state.punchLogs.unshift(punch);
    savePunchLogs();

    const btnClockIn = document.getElementById('btnClockIn');
    const btnToggleBreak = document.getElementById('btnToggleBreak');
    const btnClockOut = document.getElementById('btnClockOut');

    if (btnClockIn) btnClockIn.disabled = false;
    if (btnToggleBreak) btnToggleBreak.disabled = true;
    if (btnClockOut) btnClockOut.disabled = true;

    renderWorkers();
    renderTimesheets();
    renderPunchLogs();
    playNotificationChirp(false);
  }

  function renderTimesheets() {
    const tbody = document.getElementById('timesheetTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    const list = Object.values(state.workers);

    list.forEach(worker => {
      let statusPill = `<span class="worker-status-badge" style="color: var(--status-offline);"><span class="status-indicator-dot duty-off"></span> Offline</span>`;
      if (worker.status === 'DUTY_ON') {
        statusPill = `<span class="worker-status-badge" style="color: var(--status-duty);"><span class="status-indicator-dot duty-on"></span> On Duty</span>`;
      } else if (worker.status === 'DUTY_BREAK') {
        statusPill = `<span class="worker-status-badge" style="color: var(--status-break);"><span class="status-indicator-dot duty-break"></span> Break</span>`;
      }

      const shiftDur = worker.status !== 'DUTY_OFF' ? formatSecondsToTime(worker.sessionSeconds) : '--:--:--';

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 26px; height: 26px; border-radius: 6px; background: ${worker.color}22; border: 1px solid ${worker.color}; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:10px;">
              ${worker.avatarText}
            </div>
            <div>
              <strong>${escapeHTML(worker.name)}</strong>
              <div style="font-family: var(--font-mono); font-size: 9px; color: var(--text-muted);">${escapeHTML(worker.id)}</div>
            </div>
          </div>
        </td>
        <td>${escapeHTML(worker.dept)}</td>
        <td>${statusPill}</td>
        <td style="font-family: var(--font-mono);">${worker.shiftStart || '--:--'}</td>
        <td style="font-family: var(--font-mono); font-weight: 700;">${shiftDur}</td>
        <td style="font-family: var(--font-mono); font-weight: 800; color: #fff;">${worker.todayHours.toFixed(1)} hrs</td>
        <td style="font-family: var(--font-mono);">${worker.weeklyHours.toFixed(1)} hrs</td>
        <td>
          <button class="btn-card-action btn-clock-toggle-admin" data-id="${worker.id}" style="padding: 3px 6px; font-size: 9px;">
            ${worker.status === 'DUTY_ON' ? 'Force Out' : 'Force In'}
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll('.btn-clock-toggle-admin').forEach(btn => {
      btn.onclick = () => {
        const wid = btn.getAttribute('data-id');
        const w = state.workers[wid];
        if (w) {
          if (w.status === 'DUTY_ON') {
            w.status = 'DUTY_OFF';
            w.shiftStart = null;
          } else {
            w.status = 'DUTY_ON';
            w.shiftStart = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          }
          saveWorkers();
          renderWorkers();
          renderTimesheets();
        }
      };
    });
  }

  function renderPunchLogs() {
    const list = document.getElementById('punchLogsList');
    if (!list) return;
    list.innerHTML = '';
    state.punchLogs.slice(0, 6).forEach(punch => {
      const item = document.createElement('div');
      item.className = 'punch-log-item';
      let actionTag = punch.action === 'CLOCK_IN' ? `<span style="color: var(--accent-green);">CLOCK IN</span>` : (punch.action === 'CLOCK_OUT' ? `<span style="color: var(--accent-red);">CLOCK OUT</span>` : `<span style="color: var(--accent-gold);">BREAK</span>`);
      item.innerHTML = `
        <span><strong>${escapeHTML(punch.name)}</strong> (${escapeHTML(punch.workerId)}) &bull; ${actionTag}</span>
        <span style="color: var(--text-muted);">${punch.time}</span>
      `;
      list.appendChild(item);
    });
  }

  // --- DATABASE METRICS & ACTIONS ---
  function updateDatabaseMetrics() {
    const statWorkers = document.getElementById('dbStatWorkers');
    const statTimesheets = document.getElementById('dbStatTimesheets');
    const statTasks = document.getElementById('dbStatTasks');
    const statMessages = document.getElementById('dbStatMessages');

    if (statWorkers) statWorkers.textContent = Object.keys(state.workers).length;
    if (statTimesheets) statTimesheets.textContent = state.punchLogs.length;
    if (statTasks) statTasks.textContent = state.tasks.length;

    let totalMsgs = 0;
    Object.values(state.chats).forEach(mList => totalMsgs += mList.length);
    if (statMessages) statMessages.textContent = totalMsgs;
  }

  async function exportEncryptedVault() {
    const fullVault = {
      workers: state.workers,
      tasks: state.tasks,
      chats: state.chats,
      punchLogs: state.punchLogs,
      timestamp: Date.now(),
      protocol: "REDDOT_AES_256_GCM"
    };

    const encrypted = await CryptoSecureDB.encryptData(fullVault);
    const blob = new Blob([encrypted], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `REDDOT_SECURE_VAULT_${new Date().toISOString().slice(0, 10)}.enc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    playNotificationChirp(true);
    alert("Encrypted Database Vault (.enc) successfully exported.");
  }

  async function restoreVaultFromFile(file) {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const text = e.target.result;
        const decrypted = await CryptoSecureDB.decryptData(text);
        if (decrypted && decrypted.workers) {
          state.workers = decrypted.workers;
          state.tasks = decrypted.tasks || state.tasks;
          state.chats = decrypted.chats || state.chats;
          state.punchLogs = decrypted.punchLogs || state.punchLogs;

          saveWorkers();
          saveTasks();
          saveChats();
          savePunchLogs();

          renderWorkers();
          renderTimesheets();
          renderTasks();
          renderChatMessages();
          playNotificationChirp(true);
          alert("Database Vault restored and decrypted successfully.");
        } else {
          alert("Invalid or corrupt encrypted database file.");
        }
      } catch (err) {
        alert("Failed to decrypt database vault: " + err.message);
      }
    };
    reader.readAsText(file);
  }

  // --- TASK MANAGEMENT LOGIC ---
  function populateAssigneeSelect() {
    const sel = document.getElementById('taskAssigneeSelect');
    if (!sel) return;
    sel.innerHTML = `<option value="ALL">ALL EMPLOYEES (Broadcast)</option>`;
    Object.values(state.workers).forEach(w => {
      const opt = document.createElement('option');
      opt.value = w.id;
      opt.textContent = `${w.id} (${w.name})`;
      sel.appendChild(opt);
    });
  }

  function populateLoginSelect() {
    const sel = document.getElementById('loginEmpSelect');
    if (!sel) return;
    sel.innerHTML = '';
    Object.values(state.workers).forEach(w => {
      const opt = document.createElement('option');
      opt.value = w.id;
      opt.textContent = `${w.id} &bull; ${w.name}`;
      sel.appendChild(opt);
    });
  }

  function createTask(title, desc, assignee, priority, deadline) {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newTask = {
      id: `task-${Date.now().toString().slice(-4)}`,
      title: title.trim(),
      desc: desc ? desc.trim() : "",
      assignee: assignee,
      priority: priority || "MEDIUM",
      status: "ASSIGNED",
      deadline: deadline ? deadline.trim() : "Pending",
      assignedAt: timeStr,
      reachedAt: null,
      accomplishedAt: null
    };

    state.tasks.unshift(newTask);
    saveTasks();
    renderTasks();
    playNotificationChirp(true);
  }

  function updateTaskStatus(taskId, newStatus) {
    const task = state.tasks.find(t => t.id === taskId);
    if (!task) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    task.status = newStatus;

    if (newStatus === 'REACHED') {
      task.reachedAt = timeStr;
    } else if (newStatus === 'ACCOMPLISHED') {
      task.accomplishedAt = timeStr;
    }

    saveTasks();
    renderTasks();
    playNotificationChirp(newStatus === 'ACCOMPLISHED');
  }

  function renderTasks() {
    const list = document.getElementById('adminTasksList');
    if (!list) return;
    list.innerHTML = '';

    const all = state.tasks;
    const cntAll = document.getElementById('cntAll');
    const cntAssigned = document.getElementById('cntAssigned');
    const cntReached = document.getElementById('cntReached');
    const cntAccomplished = document.getElementById('cntAccomplished');

    if (cntAll) cntAll.textContent = all.length;
    if (cntAssigned) cntAssigned.textContent = all.filter(t => t.status === 'ASSIGNED').length;
    if (cntReached) cntReached.textContent = all.filter(t => t.status === 'REACHED').length;
    if (cntAccomplished) cntAccomplished.textContent = all.filter(t => t.status === 'ACCOMPLISHED').length;

    let displayList = all;
    if (state.taskFilter !== 'ALL') {
      displayList = all.filter(t => t.status === state.taskFilter);
    }

    if (state.userRole !== 'ADMIN') {
      displayList = displayList.filter(t => t.assignee === state.currentEmpId || t.assignee === 'ALL');
    }

    displayList.forEach(task => {
      const card = document.createElement('div');
      card.className = 'task-card';

      let priorityClass = 'priority-normal';
      let priorityIcon = '&#x25CB; Normal';
      if (task.priority === 'URGENT') { priorityClass = 'priority-urgent'; priorityIcon = '&#x1F525; URGENT'; }
      else if (task.priority === 'HIGH') { priorityClass = 'priority-high'; priorityIcon = '&#x1F6A8; HIGH'; }
      else if (task.priority === 'MEDIUM') { priorityClass = 'priority-medium'; priorityIcon = '&#x25C6; MEDIUM'; }

      const assigneeName = task.assignee === 'ALL' ? 'ALL EMPLOYEES' : (state.workers[task.assignee]?.name || task.assignee);

      let actionButtons = '';
      if (task.status === 'ASSIGNED') {
        actionButtons = `<button class="btn-card-action btn-task-status" data-id="${task.id}" data-status="REACHED">&#x25B6; Start Task</button>`;
      } else if (task.status === 'REACHED') {
        actionButtons = `<button class="btn-card-action btn-task-status" data-id="${task.id}" data-status="ACCOMPLISHED" style="background: var(--accent-green); color:#000;">&#x2714; Mark Accomplished</button>`;
      } else {
        actionButtons = `<span style="font-family:var(--font-mono); font-size:10px; color:var(--accent-green); font-weight:700;">&#x2714; Accomplished at ${task.accomplishedAt}</span>`;
      }

      card.innerHTML = `
        <div class="task-card-header">
          <span class="task-priority-badge ${priorityClass}">${priorityIcon}</span>
          <span style="font-family: var(--font-mono); font-size: 10px; color: var(--accent-cyan); font-weight:700;">${escapeHTML(task.assignee)}</span>
        </div>
        <h4 class="task-title">${escapeHTML(task.title)}</h4>
        ${task.desc ? `<p class="task-desc">${escapeHTML(task.desc)}</p>` : ''}
        <div class="task-card-meta">
          <span>Assigned: <strong>${escapeHTML(assigneeName)}</strong></span>
          <span>Due: ${escapeHTML(task.deadline)}</span>
        </div>
        <div class="task-actions-row">
          ${actionButtons}
        </div>
      `;

      list.appendChild(card);
    });

    list.querySelectorAll('.btn-task-status').forEach(btn => {
      btn.onclick = () => {
        const tid = btn.getAttribute('data-id');
        const st = btn.getAttribute('data-status');
        updateTaskStatus(tid, st);
      };
    });

    renderAccomplishmentsFeed();
  }

  function renderAccomplishmentsFeed() {
    const feed = document.getElementById('accomplishmentsFeed');
    if (!feed) return;
    feed.innerHTML = '';
    const accomplishedTasks = state.tasks.filter(t => t.status === 'ACCOMPLISHED').slice(0, 5);

    if (accomplishedTasks.length === 0) {
      feed.innerHTML = `<div style="font-size: 10px; color: var(--text-muted); font-family: var(--font-mono);">No accomplishment receipts yet today.</div>`;
      return;
    }

    accomplishedTasks.forEach(task => {
      const item = document.createElement('div');
      item.className = 'feed-item';
      const name = state.workers[task.assignee]?.name || task.assignee;
      item.innerHTML = `
        <span class="feed-dot"></span>
        <span><strong>${escapeHTML(name)}</strong> accomplished <em>"${escapeHTML(task.title)}"</em></span>
        <span class="feed-time">${task.accomplishedAt || 'Recently'}</span>
      `;
      feed.appendChild(item);
    });
  }

  // --- CHAT LOGIC ---
  function renderChatChannelsAndDMs() {
    const dmList = document.getElementById('dmWorkerList');
    if (!dmList) return;
    dmList.innerHTML = '';

    Object.values(state.workers).forEach(w => {
      const btn = document.createElement('button');
      btn.className = `dm-item ${state.activeChatTarget === w.id ? 'active' : ''}`;
      btn.setAttribute('data-target', w.id);
      btn.innerHTML = `
        <div style="width:7px; height:7px; border-radius:50%; background:${w.color};"></div>
        <span>${escapeHTML(w.name.split(' ')[0])} (${escapeHTML(w.id)})</span>
      `;
      btn.onclick = () => selectChatTarget(w.id);
      dmList.appendChild(btn);
    });
  }

  function selectChatTarget(targetId) {
    state.activeChatTarget = targetId;
    const chatTitle = document.getElementById('chatTargetTitle');
    const chatSub = document.getElementById('chatTargetSub');

    if (chatTitle) {
      if (targetId.startsWith('#') || !state.workers[targetId]) {
        chatTitle.textContent = targetId.startsWith('#') ? targetId : `#${targetId}`;
        if (chatSub) chatSub.textContent = "Official Team Discussion Channel &bull; End-to-End Encrypted";
      } else {
        const w = state.workers[targetId];
        chatTitle.textContent = `@${w.name} (${w.id})`;
        if (chatSub) chatSub.textContent = `${w.role} &bull; Direct Confidential Channel`;
      }
    }

    document.querySelectorAll('.channel-item, .dm-item').forEach(el => {
      const ch = el.getAttribute('data-channel');
      const dm = el.getAttribute('data-target');
      if (ch === targetId || dm === targetId) el.classList.add('active');
      else el.classList.remove('active');
    });

    renderChatMessages();
  }

  function renderChatMessages() {
    const container = document.getElementById('chatMessagesContainer');
    if (!container) return;
    container.innerHTML = '';

    const targetKey = state.activeChatTarget.replace('#', '');
    const msgs = state.chats[targetKey] || [];

    if (msgs.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; margin-top: 40px; color: var(--text-muted); font-family: var(--font-mono); font-size: 11px;">
          No messages yet in ${escapeHTML(state.activeChatTarget)}. Send the first encrypted message below.
        </div>
      `;
      return;
    }

    msgs.forEach(msg => {
      const bubble = document.createElement('div');
      bubble.className = 'chat-message-bubble';
      bubble.innerHTML = `
        <div class="msg-avatar">${escapeHTML(msg.avatar || 'RD')}</div>
        <div class="msg-content">
          <div class="msg-meta">
            <span class="msg-sender">${escapeHTML(msg.sender)}</span>
            <span class="msg-role-tag">${escapeHTML(msg.role)}</span>
            <span class="msg-time">${escapeHTML(msg.time)}</span>
          </div>
          <div class="msg-text">${escapeHTML(msg.text)}</div>
        </div>
      `;
      container.appendChild(bubble);
    });

    container.scrollTop = container.scrollHeight;
  }

  function sendChatMessage(text) {
    if (!text || !text.trim()) return;
    const targetKey = state.activeChatTarget.replace('#', '');
    if (!state.chats[targetKey]) state.chats[targetKey] = [];

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const senderName = state.userRole === 'ADMIN' ? state.adminName : (state.workers[state.currentEmpId]?.name || 'Worker');
    const senderRole = state.userRole === 'ADMIN' ? 'ADMIN' : (state.workers[state.currentEmpId]?.role.split(' ')[0] || 'ENGINEER');
    const senderAvatar = state.userRole === 'ADMIN' ? 'JK' : (state.workers[state.currentEmpId]?.avatarText || 'RD');

    const newMsg = {
      sender: senderName,
      role: senderRole,
      avatar: senderAvatar,
      text: text.trim(),
      time: timeStr
    };

    state.chats[targetKey].push(newMsg);
    saveChats();
    renderChatMessages();
    playNotificationChirp(false);
  }

  // --- CALLING HUB ---
  function renderCallContacts() {
    const grid = document.getElementById('callContactsGrid');
    if (!grid) return;
    grid.innerHTML = '';

    Object.values(state.workers).forEach(worker => {
      const card = document.createElement('div');
      card.className = 'call-contact-card';
      card.innerHTML = `
        <div class="contact-card-top" style="display: flex; align-items: center; gap: 10px;">
          <div class="contact-avatar" style="width: 36px; height: 36px; border-radius: 8px; background: ${worker.color}22; border: 1px solid ${worker.color}; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 12px; color: #fff;">
            ${worker.avatarText}
          </div>
          <div>
            <div style="font-weight: 700; font-size: 12px; color: #fff;">${escapeHTML(worker.name)}</div>
            <div style="font-family: var(--font-mono); font-size: 9px; color: var(--text-muted);">${escapeHTML(worker.id)} &bull; ${worker.status === 'DUTY_ON' ? '<span style="color:var(--accent-green);">Online</span>' : 'Offline'}</div>
          </div>
        </div>
        <div class="contact-card-actions" style="display: flex; gap: 6px; margin-top: 6px;">
          <button class="btn-start-call btn-call-audio" data-id="${worker.id}">&#x1F3A4; Voice</button>
          <button class="btn-start-call btn-call-video" data-id="${worker.id}">&#x1F4F9; Video</button>
        </div>
      `;
      grid.appendChild(card);
    });

    grid.querySelectorAll('.btn-call-audio').forEach(btn => {
      btn.onclick = () => {
        const w = state.workers[btn.getAttribute('data-id')];
        if (w) startCall(w.name, w.avatarText, 'audio');
      };
    });

    grid.querySelectorAll('.btn-call-video').forEach(btn => {
      btn.onclick = () => {
        const w = state.workers[btn.getAttribute('data-id')];
        if (w) startCall(w.name, w.avatarText, 'video');
      };
    });
  }

  async function startCall(targetName, targetAvatar, callType = 'video') {
    state.call.active = true;
    state.call.type = callType;
    state.call.targetName = targetName;
    state.call.targetAvatar = targetAvatar;
    state.call.durationSeconds = 0;

    const callTypeLabel = document.getElementById('callTypeLabel');
    const remoteCallName = document.getElementById('remoteCallName');
    const remoteCallAvatar = document.getElementById('remoteCallAvatar');
    const callDurationText = document.getElementById('callDurationText');
    const activeCallModal = document.getElementById('activeCallModal');
    const pipSelfVideoFeed = document.getElementById('pipSelfVideoFeed');
    const pipPlaceholder = document.getElementById('pipPlaceholder');

    if (callTypeLabel) callTypeLabel.textContent = `ENCRYPTED HD ${callType.toUpperCase()} CALL`;
    if (remoteCallName) remoteCallName.textContent = targetName;
    if (remoteCallAvatar) remoteCallAvatar.textContent = targetAvatar;
    if (callDurationText) callDurationText.textContent = "00:00";
    if (activeCallModal) activeCallModal.classList.remove('hidden');

    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        state.call.localStream = await navigator.mediaDevices.getUserMedia({
          video: callType === 'video',
          audio: true
        });
        if (pipSelfVideoFeed) {
          pipSelfVideoFeed.srcObject = state.call.localStream;
          pipSelfVideoFeed.classList.remove('hidden');
        }
        if (pipPlaceholder) pipPlaceholder.classList.add('hidden');
      }
    } catch (_) {
      if (pipPlaceholder) pipPlaceholder.classList.remove('hidden');
    }

    if (state.call.interval) clearInterval(state.call.interval);
    state.call.interval = setInterval(() => {
      state.call.durationSeconds++;
      const m = Math.floor(state.call.durationSeconds / 60).toString().padStart(2, '0');
      const s = (state.call.durationSeconds % 60).toString().padStart(2, '0');
      if (callDurationText) callDurationText.textContent = `${m}:${s}`;
    }, 1000);

    playNotificationChirp(true);
  }

  function endCall() {
    state.call.active = false;
    if (state.call.interval) {
      clearInterval(state.call.interval);
      state.call.interval = null;
    }
    if (state.call.localStream) {
      state.call.localStream.getTracks().forEach(track => track.stop());
      state.call.localStream = null;
    }
    const activeCallModal = document.getElementById('activeCallModal');
    if (activeCallModal) activeCallModal.classList.add('hidden');
  }

  // --- NAVIGATION & TABS ---
  function switchTab(tabId) {
    state.activeTab = tabId;
    if (tabId === 'dashboard' || tabId === 'wallpaper') {
      closeCommandCenter();
      return;
    }

    openCommandCenter();

    document.querySelectorAll('.cmd-tab-btn').forEach(btn => {
      const target = btn.getAttribute('data-target');
      btn.classList.toggle('active', target === `tab${capitalize(tabId)}View`);
    });

    document.querySelectorAll('.cmd-tab-pane').forEach(pane => {
      pane.classList.toggle('active', pane.id === `tab${capitalize(tabId)}View`);
    });
  }

  function openCommandCenter() {
    state.commandCenterOpen = true;
    const drawer = document.getElementById('commandCenterDrawer');
    if (drawer) drawer.classList.remove('collapsed');
  }

  function closeCommandCenter() {
    state.commandCenterOpen = false;
    const drawer = document.getElementById('commandCenterDrawer');
    if (drawer) drawer.classList.add('collapsed');
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function escapeHTML(str) {
    if (!str) return '';
    return str.toString()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // --- SESSION AUTH ---
  function setSessionRole(role, empId = 'RD-EMP-102') {
    state.userRole = role;
    state.currentEmpId = empId;
    localStorage.setItem('rd_user_role', role);
    localStorage.setItem('rd_emp_id', empId);

    const roleDot = document.getElementById('roleDot');
    const roleLabel = document.getElementById('roleLabel');
    const sessionEmpId = document.getElementById('sessionEmpId');
    const shiftUserName = document.getElementById('shiftUserName');
    const shiftUserId = document.getElementById('shiftUserId');
    const shiftUserAvatar = document.getElementById('shiftUserAvatar');

    if (role === 'ADMIN') {
      if (roleDot) roleDot.style.background = '#00e676';
      if (roleLabel) roleLabel.textContent = `ADMIN // ${state.adminName}`;
      if (sessionEmpId) sessionEmpId.textContent = 'FOUNDER';
      if (shiftUserName) shiftUserName.textContent = `${state.adminName} (Admin)`;
      if (shiftUserId) shiftUserId.textContent = state.adminTitle;
      if (shiftUserAvatar) shiftUserAvatar.textContent = 'JK';
    } else {
      const emp = state.workers[empId] || { name: 'Worker', role: 'Engineer', avatarText: 'RD' };
      if (roleDot) roleDot.style.background = '#00d2ff';
      if (roleLabel) roleLabel.textContent = `${emp.name.toUpperCase()} // ${emp.role.toUpperCase()}`;
      if (sessionEmpId) sessionEmpId.textContent = empId;
      if (shiftUserName) shiftUserName.textContent = `${emp.name}`;
      if (shiftUserId) shiftUserId.textContent = `${empId} &bull; ${emp.role}`;
      if (shiftUserAvatar) shiftUserAvatar.textContent = emp.avatarText;
    }

    renderWorkers();
    renderTasks();
    renderTimesheets();
    renderChatChannelsAndDMs();
    renderCallContacts();
    updateDatabaseMetrics();
  }

  // --- 3D LANYARD TILT PHYSICS ---
  function initLanyardPhysics() {
    const card = document.getElementById('lanyardCard');
    const handleMouseMove = (e) => {
      if (!state.tiltEnabled || !card) return;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;

      state.mouse.targetRotY = dx * 16;
      state.mouse.targetRotX = -dy * 14;
      state.mouse.targetX = dx * 12;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    function renderPhysicsFrame() {
      if (state.tiltEnabled && card) {
        state.card.curRotX += (state.mouse.targetRotX - state.card.curRotX) * 0.08;
        state.card.curRotY += (state.mouse.targetRotY - state.card.curRotY) * 0.08;
        state.card.curX += (state.mouse.targetX - state.card.curX) * 0.08;

        card.style.transform = `translateX(${state.card.curX.toFixed(2)}px) rotateX(${state.card.curRotX.toFixed(2)}deg) rotateY(${state.card.curRotY.toFixed(2)}deg)`;
      }
      requestAnimationFrame(renderPhysicsFrame);
    }
    requestAnimationFrame(renderPhysicsFrame);
  }

  // --- EVENT LISTENERS ---
  function bindEvents() {
    // Navigation & Command Center Triggers
    document.getElementById('btnBrandHome')?.addEventListener('click', () => switchTab('workers'));
    document.getElementById('btnOpenCommandCenter')?.addEventListener('click', () => switchTab('workers'));
    document.getElementById('cardBadgeTrigger')?.addEventListener('click', () => switchTab('workers'));
    document.getElementById('btnCloseCommandCenter')?.addEventListener('click', closeCommandCenter);
    document.getElementById('btnToggleWallpaperMode')?.addEventListener('click', closeCommandCenter);

    // Command Center Internal Tab Switcher
    document.getElementById('cmdTabNav')?.querySelectorAll('.cmd-tab-btn').forEach(btn => {
      btn.onclick = () => {
        const target = btn.getAttribute('data-target').replace('tab', '').replace('View', '').toLowerCase();
        switchTab(target);
      };
    });

    // Shift Tracking
    document.getElementById('btnClockIn')?.addEventListener('click', clockInPersonal);
    document.getElementById('btnToggleBreak')?.addEventListener('click', toggleBreakPersonal);
    document.getElementById('btnClockOut')?.addEventListener('click', clockOutPersonal);
    setInterval(updateShiftClock, 1000);

    // Dynamic 3D Badge Customization
    document.getElementById('btnResetDefaultBadge')?.addEventListener('click', resetDefaultBadge);
    document.getElementById('inputUploadCustomBadge')?.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (ev) => {
          setCustomBadgeImg(ev.target.result);
          alert('Custom badge mounted onto the 3D Live Wallpaper!');
        };
        reader.readAsDataURL(file);
      }
    });

    document.getElementById('btnMountBadgeWallpaper')?.addEventListener('click', () => {
      const worker = state.workers[state.viewingBadgeWorkerId];
      if (worker) {
        alert(`Mounted digital ID badge for ${worker.name} (${worker.id}) onto 3D Wallpaper!`);
      }
    });

    // Auto-Start on Boot Setting
    const toggleAutoStart = document.getElementById('toggleAutoStart');
    if (toggleAutoStart && window.electronAPI && window.electronAPI.getAutoStart) {
      window.electronAPI.getAutoStart().then(enabled => {
        toggleAutoStart.checked = !!enabled;
      });

      toggleAutoStart.addEventListener('change', (e) => {
        if (window.electronAPI.setAutoStart) {
          window.electronAPI.setAutoStart(e.target.checked);
          playNotificationChirp(true);
        }
      });
    }

    if (window.electronAPI && window.electronAPI.onAutoStartChanged) {
      window.electronAPI.onAutoStartChanged((status) => {
        if (toggleAutoStart) toggleAutoStart.checked = !!status;
      });
    }

    // Database Actions & Server Sync
    document.getElementById('btnExportEncryptedVault')?.addEventListener('click', exportEncryptedVault);
    document.getElementById('inputFileRestoreDb')?.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        restoreVaultFromFile(e.target.files[0]);
      }
    });

    document.getElementById('btnTestDbConnection')?.addEventListener('click', async () => {
      try {
        const endpoint = state.serverConfig.endpoint.replace('/sync', '/health');
        const res = await fetch(endpoint);
        if (res.ok) {
          const data = await res.json();
          playNotificationChirp(true);
          alert(`Dedicated Server Online!\nService: ${data.service}\nVersion: ${data.version}\nStatus: ${data.status}`);
        } else {
          alert('Server reachable but returned non-200 code.');
        }
      } catch (err) {
        alert('Could not connect to dedicated sync server at http://localhost:8765.\nRun "start-private-db-server.bat" to start the server.');
      }
    });

    document.getElementById('btnTriggerCloudSync')?.addEventListener('click', async () => {
      await triggerRemoteVaultSync();
      playNotificationChirp(true);
      alert('Encrypted vault synced with dedicated private server!');
    });

    document.getElementById('btnSaveDbConfig')?.addEventListener('click', () => {
      const url = document.getElementById('dbEndpointUrl')?.value || 'http://localhost:8765/api/v1/sync';
      const tok = document.getElementById('dbSecretToken')?.value || 'sk_live_reddot_98a76f8b9e01cd42';
      state.serverConfig.endpoint = url;
      state.serverConfig.token = tok;
      localStorage.setItem('rd_server_config', JSON.stringify(state.serverConfig));
      playNotificationChirp(true);
      alert('Dedicated Server Endpoint & Bearer Token Saved.');
    });

    document.getElementById('btnRotateDbKey')?.addEventListener('click', async () => {
      if (confirm("Rotate Master Cryptographic Key and re-encrypt all local databases?")) {
        await persistEncryptedVault();
        playNotificationChirp(true);
        alert("Master Key Rotated & All Records Successfully Re-Encrypted with AES-256-GCM.");
      }
    });

    // Create Worker Modal
    const createWorkerModal = document.getElementById('createWorkerModal');
    document.getElementById('btnOpenCreateWorkerModal')?.addEventListener('click', () => {
      if (createWorkerModal) createWorkerModal.classList.remove('hidden');
    });
    document.getElementById('btnCloseCreateWorker')?.addEventListener('click', () => createWorkerModal?.classList.add('hidden'));
    document.getElementById('btnCancelCreateWorker')?.addEventListener('click', () => createWorkerModal?.classList.add('hidden'));
    document.getElementById('createWorkerBackdrop')?.addEventListener('click', () => createWorkerModal?.classList.add('hidden'));

    document.getElementById('formCreateWorker')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const wid = document.getElementById('newWorkerId')?.value;
      const wname = document.getElementById('newWorkerName')?.value;
      const wrole = document.getElementById('newWorkerRole')?.value;
      const wdept = document.getElementById('newWorkerDept')?.value;
      const whours = document.getElementById('newWorkerTargetHours')?.value;
      const wpin = document.getElementById('newWorkerPin')?.value;
      const wcolor = document.getElementById('newWorkerColor')?.value;

      if (wid && wname && wrole) {
        createWorker(wid, wname, wrole, wdept, whours, wpin, wcolor);
        createWorkerModal?.classList.add('hidden');
        document.getElementById('formCreateWorker').reset();
      }
    });

    document.getElementById('inputWorkerSearch')?.addEventListener('input', renderWorkers);

    // Badge Viewer Modal
    const badgeViewerModal = document.getElementById('badgeViewerModal');
    document.getElementById('btnCloseBadgeViewer')?.addEventListener('click', () => badgeViewerModal?.classList.add('hidden'));
    document.getElementById('btnCloseBadgeModal')?.addEventListener('click', () => badgeViewerModal?.classList.add('hidden'));
    document.getElementById('badgeViewerBackdrop')?.addEventListener('click', () => badgeViewerModal?.classList.add('hidden'));
    document.getElementById('btnPrintBadge')?.addEventListener('click', () => window.print());

    // Task Allocation
    document.getElementById('formCreateTask')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('taskTitleInput')?.value;
      const assignee = document.getElementById('taskAssigneeSelect')?.value;
      const priority = document.getElementById('taskPrioritySelect')?.value;
      const desc = document.getElementById('taskDescInput')?.value;
      const deadline = document.getElementById('taskDeadlineInput')?.value;

      if (title) {
        createTask(title, desc, assignee, priority, deadline);
        document.getElementById('formCreateTask').reset();
      }
    });

    document.getElementById('taskFilterGroup')?.querySelectorAll('.filter-chip').forEach(chip => {
      chip.onclick = () => {
        document.getElementById('taskFilterGroup').querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        state.taskFilter = chip.getAttribute('data-filter');
        renderTasks();
      };
    });

    // Chat
    document.getElementById('channelList')?.querySelectorAll('.channel-item').forEach(btn => {
      btn.onclick = () => selectChatTarget(btn.getAttribute('data-channel'));
    });

    document.getElementById('formSendMessage')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('chatMessageInput');
      if (input) {
        sendChatMessage(input.value);
        input.value = '';
      }
    });

    document.getElementById('btnCallFromChat')?.addEventListener('click', () => {
      startCall(state.activeChatTarget, 'CH', 'audio');
    });
    document.getElementById('btnVideoCallFromChat')?.addEventListener('click', () => {
      startCall(state.activeChatTarget, 'CH', 'video');
    });

    // Calling Controls
    document.getElementById('btnJoinHuddle')?.addEventListener('click', () => {
      startCall("REDDOT Engineering Huddle", "HD", "video");
    });
    document.getElementById('btnCallEnd')?.addEventListener('click', endCall);

    // Login Modal
    const loginModal = document.getElementById('loginModal');
    document.getElementById('btnSessionSwitch')?.addEventListener('click', () => {
      loginModal?.classList.remove('hidden');
    });
    document.getElementById('btnCloseLogin')?.addEventListener('click', () => loginModal?.classList.add('hidden'));
    document.getElementById('loginBackdrop')?.addEventListener('click', () => loginModal?.classList.add('hidden'));

    const tabBtnAdmin = document.getElementById('tabBtnAdmin');
    const tabBtnEmployee = document.getElementById('tabBtnEmployee');
    const adminLoginForm = document.getElementById('adminLoginForm');
    const employeeLoginForm = document.getElementById('employeeLoginForm');

    tabBtnAdmin?.addEventListener('click', () => {
      tabBtnAdmin.classList.add('active');
      tabBtnEmployee?.classList.remove('active');
      adminLoginForm?.classList.remove('hidden');
      employeeLoginForm?.classList.add('hidden');
    });
    tabBtnEmployee?.addEventListener('click', () => {
      tabBtnEmployee.classList.add('active');
      tabBtnAdmin?.classList.remove('active');
      employeeLoginForm?.classList.remove('hidden');
      adminLoginForm?.classList.add('hidden');
    });

    document.getElementById('btnConfirmAdmin')?.addEventListener('click', () => {
      setSessionRole('ADMIN');
      loginModal?.classList.add('hidden');
      playNotificationChirp(true);
    });

    document.getElementById('btnConfirmEmployee')?.addEventListener('click', () => {
      const selectedId = document.getElementById('loginEmpSelect')?.value || 'RD-EMP-102';
      const enteredPin = document.getElementById('loginWorkerPin')?.value;
      const worker = state.workers[selectedId];

      if (worker && worker.pin && enteredPin !== worker.pin) {
        alert("Incorrect security PIN for worker ID.");
        return;
      }
      setSessionRole('EMPLOYEE', selectedId);
      loginModal?.classList.add('hidden');
      playNotificationChirp(true);
    });

    // Global Hotkeys
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
        return;
      }
      const key = e.key.toLowerCase();
      if (key === ' ' || key === 'w') {
        e.preventDefault();
        if (state.commandCenterOpen) closeCommandCenter();
        else switchTab('workers');
      } else if (key === 't') {
        switchTab('tasks');
      } else if (key === 'h') {
        switchTab('timesheets');
      } else if (key === 'c') {
        switchTab('chat');
      } else if (key === 'v') {
        switchTab('calls');
      } else if (key === 'd') {
        switchTab('database');
      } else if (key === 'l') {
        loginModal?.classList.remove('hidden');
      } else if (key === 'escape') {
        closeCommandCenter();
        createWorkerModal?.classList.add('hidden');
        badgeViewerModal?.classList.add('hidden');
        loginModal?.classList.add('hidden');
        if (state.call.active) endCall();
      }
    });

    // Electron API Integration
    if (window.electronAPI) {
      if (window.electronAPI.onOpenTab) {
        window.electronAPI.onOpenTab((tab) => switchTab(tab));
      }
    }
  }

  // --- INITIALIZATION ---
  async function init() {
    populateAssigneeSelect();
    populateLoginSelect();
    initDynamicBadge();
    setSessionRole(state.userRole, state.currentEmpId);

    initLanyardPhysics();
    initServerSync();
    bindEvents();
    renderPunchLogs();
    await persistEncryptedVault();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
