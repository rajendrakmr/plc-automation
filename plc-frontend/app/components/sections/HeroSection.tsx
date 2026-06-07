'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Search, Clock, Globe, Shield } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative min-h-[600px] flex items-center bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#ff6b35]/20 text-[#ff6b35] px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-[#ff6b35] rounded-full animate-pulse" />
              3M+ Parts in Stock Worldwide
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Supplier of New &<br />
              <span className="text-[#00a8e8]">Obsolete</span> Automation<br />
              Spare Parts
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-lg">
              PLC Automation supports industrial operations with dependable sourcing for new, discontinued, and hard-to-find automation components.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 bg-[#ff6b35] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#e55a2b] transition-all hover:shadow-lg hover:shadow-[#ff6b35]/30"
              >
                View Parts <ArrowRight size={20} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-all backdrop-blur-sm"
              >
                Contact Us
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-6 mt-10">
              <div className="flex items-center gap-2 text-gray-400">
                <Clock size={20} className="text-[#00a8e8]" />
                <span className="text-sm">24/7 Support</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Globe size={20} className="text-[#00a8e8]" />
                <span className="text-sm">Global Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Shield size={20} className="text-[#00a8e8]" />
                <span className="text-sm">12-Month Warranty</span>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Hero Image/Animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <Image
                src="/hero-automation.jpg"
                alt="Industrial Automation"
                width={600}
                height={400}
                className="w-full h-auto"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/80 to-transparent" />
              
              {/* Floating Stats Card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
              >
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-white">95K+</div>
                    <div className="text-xs text-gray-300">Customers</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#00a8e8]">176</div>
                    <div className="text-xs text-gray-300">Countries</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#ff6b35]">3.9M+</div>
                    <div className="text-xs text-gray-300">Parts</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}