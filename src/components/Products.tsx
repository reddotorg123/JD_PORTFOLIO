import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Box, Package, Database, Cpu } from "lucide-react";

const products = [
  {
    title: "NEXUS AI",
    description: "Discover our suite of proprietary AI applications designed to scale your performance and automate your success.",
    icon: Box,
  },
  {
    title: "ECHO STREAM",
    description: "Revolutionary audio-to-data mapping ecosystem for real-time monitoring and analytics.",
    icon: Cpu,
  },
  {
    title: "VECTOR HUB",
    description: "High-performance vector storage and management for large-scale RAG systems.",
    icon: Database,
  },
];

export const Products = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="products" className="py-24 relative bg-[#050505]">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            <span className="text-white">OUR</span> <span className="text-gradient-gold">PRODUCTS</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed px-4 opacity-80">
            Discover our suite of proprietary AI applications designed to scale your performance and automate your success.
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="flex flex-wrap justify-center gap-12 md:gap-20">
          {products.map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
              className="flex flex-col items-center group cursor-pointer"
            >
              {/* Icon Container */}
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-3xl bg-card/20 border border-white/5 flex items-center justify-center mb-6 relative transition-all duration-500 group-hover:scale-105 group-hover:bg-card/40 group-hover:border-gold-500/30">
                <product.icon className="w-12 h-12 md:w-16 md:h-16 text-gold-500 group-hover:drop-shadow-[0_0_15px_rgba(255,183,0,0.5)] transition-all duration-500" />
                
                {/* Subtle Glow behind icon */}
                <div className="absolute inset-0 bg-gold-500/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Product Title */}
              <h3 className="text-base md:text-lg font-black text-white tracking-[0.2em] transition-colors group-hover:text-gold-400">
                {product.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
