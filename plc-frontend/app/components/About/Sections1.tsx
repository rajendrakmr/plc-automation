"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
// import { Link } from 'next/link';
import { ArrowRight, Menu, X, Cpu, Network, HardDrive, Activity, Users, Globe, Settings, Award } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const Counter = ({ from, to, suffix = "" }: { from: number, to: number, suffix?: string }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (inView && nodeRef.current) {
      const controls = animate(from, to, {
        duration: 2,
        onUpdate(value) {
          if (nodeRef.current) nodeRef.current.textContent = Math.round(value).toString() + suffix;
        }
      });
      return () => controls.stop();
    }
  }, [from, to, inView, suffix]);

  return <span ref={nodeRef}>{from}{suffix}</span>;
};

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link href="/" className="flex items-center gap-2">
            <Cpu className="w-8 h-8 text-primary" />
            <span className="font-bold text-2xl tracking-tight text-primary">PLC Automation<span className="text-secondary"> Group</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-slate-600 hover:text-primary font-medium transition-colors">Home</Link>
            <Link href="/about-us" className="text-primary font-medium transition-colors">About Us</Link>
            <Link href="/products" className="text-slate-600 hover:text-primary font-medium transition-colors">Products</Link>
            <Link href="/industries" className="text-slate-600 hover:text-primary font-medium transition-colors">Industries</Link>
            <Link href="/contact" className="text-slate-600 hover:text-primary font-medium transition-colors">Contact</Link>
            <Link href="/quote" className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-md font-medium transition-all shadow-sm shadow-primary/20">
              Request a Quote
            </Link>
          </div>

          <button className="md:hidden text-slate-800" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 p-4 flex flex-col gap-4">
          <Link href="/" className="text-slate-600 font-medium">Home</Link>
          <Link href="/about-us" className="text-primary font-medium">About Us</Link>
          <Link href="/products" className="text-slate-600 font-medium">Products</Link>
          <Link href="/industries" className="text-slate-600 font-medium">Industries</Link>
          <Link href="/contact" className="text-slate-600 font-medium">Contact</Link>
          <Link href="/quote" className="bg-primary text-white px-4 py-2 rounded-md font-medium text-center">
            Request a Quote
          </Link>
        </div>
      )}
    </nav>
  );
};


export const HeroImgSection = () => {
  return (
    <section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square relative rounded-2xl overflow-hidden border border-[#05339c]/40 flex items-center justify-center">
              <svg viewBox="0 0 480 480" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="panel-bg" x1="0" y1="0" x2="480" y2="480" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#060e1f" /><stop offset="1" stopColor="#0b1a38" />
                  </linearGradient>
                  <linearGradient id="vfd-screen" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                    <stop stopColor="#020f1f" /><stop offset="1" stopColor="#021428" />
                  </linearGradient>
                  <linearGradient id="hmi-screen" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                    <stop stopColor="#010a18" /><stop offset="1" stopColor="#021020" />
                  </linearGradient>
                  <filter id="led-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <filter id="soft-glow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>

                {/* ── Background ── */}
                <rect width="480" height="480" fill="url(#panel-bg)" />
                {/* subtle dot grid */}
                {Array.from({ length: 12 }).map((_, r) => Array.from({ length: 12 }).map((_, c) => (
                  <circle key={`${r}-${c}`} cx={c * 44 + 22} cy={r * 44 + 22} r="1" fill="#1e3a5f" opacity="0.4" />
                )))}

                {/* ── SECTION LABELS ── */}
                <text x="52" y="88" fill="#4a7abf" fontSize="9" fontFamily="monospace" fontWeight="bold" letterSpacing="1">VFD DRIVE</text>
                <text x="195" y="88" fill="#4a7abf" fontSize="9" fontFamily="monospace" fontWeight="bold" letterSpacing="1">PLC RACK</text>
                <text x="393" y="88" fill="#4a7abf" fontSize="9" fontFamily="monospace" fontWeight="bold" letterSpacing="1">HMI</text>

                {/* ══════════════════════════════════════════
                    VFD / FREQUENCY DRIVE  (left, x 22–110)
                    ══════════════════════════════════════════ */}
                <rect x="22" y="96" width="88" height="288" rx="5" fill="#0d1e36" stroke="#05339c" strokeWidth="1.5" />
                {/* top badge */}
                <rect x="22" y="96" width="88" height="22" rx="5" fill="#05339c" />
                <text x="66" y="111" fill="white" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">ABB ACS880</text>
                {/* heat sink fins (left edge) */}
                {[118, 128, 138, 148, 158, 168, 178].map(y => (
                  <rect key={y} x="22" y={y} width="6" height="7" rx="1" fill="#0a4ed1" opacity="0.5" />
                ))}
                {/* VFD display */}
                <rect x="32" y="126" width="68" height="52" rx="3" fill="url(#vfd-screen)" stroke="#0a4ed1" strokeWidth="1" />
                <text x="66" y="143" fill="#10b981" fontSize="16" fontFamily="monospace" textAnchor="middle" fontWeight="bold">48.5</text>
                <text x="66" y="155" fill="#10b981" fontSize="8" fontFamily="monospace" textAnchor="middle">Hz  ▲ RUN</text>
                {/* bar graph in display */}
                <rect x="36" y="160" width="8" height="12" fill="#0a4ed1" opacity="0.8" />
                <rect x="47" y="156" width="8" height="16" fill="#0a4ed1" opacity="0.8" />
                <rect x="58" y="152" width="8" height="20" fill="#10b981" opacity="0.9" />
                <rect x="69" y="157" width="8" height="15" fill="#0a4ed1" opacity="0.8" />
                <rect x="80" y="162" width="8" height="10" fill="#0a4ed1" opacity="0.8" />
                {/* nav buttons */}
                {[188, 200, 212, 224].map((y, i) => (
                  <rect key={y} x="34" y={y} width="14" height="9" rx="2" fill="#0a2040" stroke="#1e3a5f" />
                ))}
                <text x="58" y="195" fill="#4a7abf" fontSize="7" fontFamily="monospace">▲  ▼  ◀  ▶</text>
                {/* status LEDs */}
                <circle cx="42" cy="222" r="3.5" fill="#10b981" filter="url(#led-glow)" />
                <circle cx="55" cy="222" r="3.5" fill="#10b981" filter="url(#led-glow)" />
                <circle cx="68" cy="222" r="3.5" fill="#f59e0b" filter="url(#led-glow)" />
                <text x="35" y="233" fill="#4a7abf" fontSize="6" fontFamily="monospace">RUN READY FLT</text>
                {/* terminal block bottom */}
                {[30, 42, 54, 66, 78, 90].map(x => (
                  <rect key={x} x={x} y="350" width="10" height="26" rx="1" fill="#1e3a5f" stroke="#0a4ed1" strokeWidth="0.8" />
                ))}
                {/* wires */}
                <line x1="35" y1="376" x2="35" y2="390" stroke="#10b981" strokeWidth="2" />
                <line x1="47" y1="376" x2="47" y2="390" stroke="#ef4444" strokeWidth="2" />
                <line x1="59" y1="376" x2="59" y2="390" stroke="#10b981" strokeWidth="2" />
                <line x1="71" y1="376" x2="73" y2="390" stroke="#f59e0b" strokeWidth="2" />
                <line x1="83" y1="376" x2="81" y2="390" stroke="#94a3b8" strokeWidth="2" />
                {/* connection to rack */}
                <line x1="110" y1="180" x2="128" y2="180" stroke="#0a4ed1" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.7" />
                <line x1="110" y1="200" x2="128" y2="200" stroke="#0a4ed1" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.7" />

                {/* ══════════════════════════════════════════
                    PLC RACK  (center, x 128–348)
                    ══════════════════════════════════════════ */}
                <rect x="128" y="96" width="220" height="292" rx="6" fill="#0a1628" stroke="#05339c" strokeWidth="2" />
                {/* top badge */}
                <rect x="128" y="96" width="220" height="24" rx="6" fill="#05339c" />
                <text x="238" y="112" fill="white" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">SIMATIC S7-300 / RACK 0</text>
                {/* DIN rails */}
                <rect x="132" y="124" width="212" height="5" rx="2" fill="#94a3b8" />
                <rect x="132" y="278" width="212" height="5" rx="2" fill="#94a3b8" />

                {/* ── Module 1: Power Supply ── */}
                <rect x="132" y="129" width="36" height="150" rx="3" fill="#0f1e36" stroke="#1e3a5f" strokeWidth="1" />
                <text x="150" y="143" fill="#4a7abf" fontSize="6" fontFamily="monospace" textAnchor="middle" fontWeight="bold">PS 307</text>
                {/* vents */}
                {[150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260].map(y => (
                  <line key={y} x1="137" y1={y} x2="163" y2={y} stroke="#1e3a5f" strokeWidth="1.5" />
                ))}
                <circle cx="150" cy="269" r="4" fill="#10b981" filter="url(#led-glow)" />

                {/* ── Module 2: CPU ── */}
                <rect x="170" y="129" width="44" height="150" rx="3" fill="#0d1e36" stroke="#05339c" strokeWidth="1.5" />
                <text x="192" y="143" fill="#60a5fa" fontSize="6" fontFamily="monospace" textAnchor="middle" fontWeight="bold">CPU 315</text>
                {/* CPU display */}
                <rect x="174" y="148" width="36" height="26" rx="2" fill="#010a18" stroke="#0a4ed1" strokeWidth="0.8" />
                {/* waveform */}
                <polyline points="176,168 180,158 184,164 188,155 192,162 196,158 200,165 204,161 208,168" fill="none" stroke="#10b981" strokeWidth="1.2" />
                {/* mode switch */}
                <circle cx="192" cy="192" r="6" fill="#0a1020" stroke="#94a3b8" strokeWidth="1" />
                <line x1="192" y1="192" x2="192" y2="186" stroke="#94a3b8" strokeWidth="1.5" />
                {/* LEDs */}
                <circle cx="176" cy="145" r="2.5" fill="#10b981" filter="url(#led-glow)" />
                <circle cx="185" cy="145" r="2.5" fill="#10b981" filter="url(#led-glow)" />
                <circle cx="194" cy="145" r="2.5" fill="#10b981" filter="url(#led-glow)" />
                <circle cx="203" cy="145" r="2.5" fill="#ef4444" opacity="0.4" />
                {/* MPI port */}
                <rect x="178" y="206" width="28" height="14" rx="2" fill="#020b18" stroke="#1e3a5f" strokeWidth="0.8" />
                <text x="192" y="216" fill="#4a7abf" fontSize="5" fontFamily="monospace" textAnchor="middle">MPI</text>
                <circle cx="192" cy="268" r="4" fill="#10b981" filter="url(#led-glow)" />

                {/* ── Module 3: Digital Input ── */}
                <rect x="216" y="129" width="30" height="150" rx="3" fill="#0f1e36" stroke="#1e3a5f" strokeWidth="1" />
                <text x="231" y="143" fill="#4a7abf" fontSize="6" fontFamily="monospace" textAnchor="middle">DI 16</text>
                {/* LED grid 2×8 */}
                {[0, 1].map(col => [0, 1, 2, 3, 4, 5, 6, 7].map(row => (
                  <circle key={`di-${col}-${row}`} cx={222 + col * 12} cy={150 + row * 13} r="3"
                    fill={row < 5 ? "#10b981" : "#10b981"} opacity={row < 5 ? 0.9 : 0.3} filter="url(#led-glow)" />
                )))}
                <circle cx="231" cy="269" r="4" fill="#10b981" filter="url(#led-glow)" />

                {/* ── Module 4: Digital Output ── */}
                <rect x="248" y="129" width="30" height="150" rx="3" fill="#0f1e36" stroke="#1e3a5f" strokeWidth="1" />
                <text x="263" y="143" fill="#4a7abf" fontSize="6" fontFamily="monospace" textAnchor="middle">DO 16</text>
                {[0, 1].map(col => [0, 1, 2, 3, 4, 5, 6, 7].map(row => (
                  <circle key={`do-${col}-${row}`} cx={254 + col * 12} cy={150 + row * 13} r="3"
                    fill={row < 3 ? "#f59e0b" : "#f59e0b"} opacity={row < 3 ? 0.9 : 0.25} filter="url(#led-glow)" />
                )))}
                <circle cx="263" cy="269" r="4" fill="#f59e0b" filter="url(#led-glow)" />

                {/* ── Module 5: Analog I/O ── */}
                <rect x="280" y="129" width="30" height="150" rx="3" fill="#0f1e36" stroke="#1e3a5f" strokeWidth="1" />
                <text x="295" y="143" fill="#4a7abf" fontSize="6" fontFamily="monospace" textAnchor="middle">AI/AO</text>
                {/* analog bars */}
                {[0, 1, 2, 3].map(i => (
                  <rect key={i} x="287" y={165 + i * 16} width={[18, 12, 22, 8][i]} height="8" rx="1" fill="#0a4ed1" opacity="0.85" />
                ))}
                <circle cx="295" cy="269" r="4" fill="#10b981" filter="url(#led-glow)" />

                {/* ── Module 6: PROFINET ── */}
                <rect x="312" y="129" width="36" height="150" rx="3" fill="#0f1a2e" stroke="#0a4ed1" strokeWidth="1.5" />
                <text x="330" y="143" fill="#60a5fa" fontSize="6" fontFamily="monospace" textAnchor="middle" fontWeight="bold">PN/DP</text>
                {/* ethernet port icon */}
                <rect x="320" y="152" width="20" height="14" rx="2" fill="#020b18" stroke="#0a4ed1" strokeWidth="0.8" />
                {[0, 1, 2, 3, 4, 5, 6].map(i => (
                  <line key={i} x1={321 + i * 3} y1="158" x2={321 + i * 3} y2="162" stroke="#0a4ed1" strokeWidth="0.8" />
                ))}
                <text x="330" y="180" fill="#4a7abf" fontSize="5" fontFamily="monospace" textAnchor="middle">RJ45</text>
                {/* signal bars */}
                <rect x="322" y="195" width="4" height="8" rx="1" fill="#0a4ed1" opacity="0.9" />
                <rect x="328" y="191" width="4" height="12" rx="1" fill="#0a4ed1" opacity="0.9" />
                <rect x="334" y="187" width="4" height="16" rx="1" fill="#10b981" opacity="0.9" />
                <circle cx="330" cy="220" r="3.5" fill="#10b981" filter="url(#led-glow)" />
                <circle cx="341" cy="220" r="3.5" fill="#0a4ed1" filter="url(#led-glow)" />
                <circle cx="330" cy="269" r="4" fill="#10b981" filter="url(#led-glow)" />

                {/* Terminal strip */}
                {Array.from({ length: 18 }).map((_, i) => (
                  <rect key={i} x={132 + i * 12} y="288" width="10" height="18" rx="1" fill="#1e3a5f" stroke="#0a4ed1" strokeWidth="0.7" />
                ))}
                {/* Wires from terminals */}
                {[136, 148, 160, 172, 184, 196, 208, 220, 232, 244, 256, 268, 280, 292, 304, 316, 328, 340].map((x, i) => (
                  <line key={i} x1={x + 4} y1="306" x2={x + 4 + (i % 3 - 1) * 2} y2="320" stroke={['#10b981', '#ef4444', '#60a5fa', '#f59e0b', '#94a3b8'][i % 5]} strokeWidth="1.8" />
                ))}

                {/* cable duct */}
                <rect x="128" y="325" width="220" height="14" rx="3" fill="#0a1628" stroke="#1e3a5f" strokeWidth="1" />
                {Array.from({ length: 22 }).map((_, i) => (
                  <line key={i} x1={131 + i * 10} y1="325" x2={131 + i * 10} y2="339" stroke="#1e3a5f" strokeWidth="0.8" />
                ))}

                {/* ── SPARE PARTS floating tags (top) ── */}
                <rect x="140" y="348" width="60" height="20" rx="3" fill="#05339c" opacity="0.2" stroke="#0a4ed1" strokeWidth="0.8" />
                <text x="170" y="362" fill="#60a5fa" fontSize="6" fontFamily="monospace" textAnchor="middle">6ES7 315-2EH14</text>
                <rect x="218" y="348" width="60" height="20" rx="3" fill="#05339c" opacity="0.2" stroke="#0a4ed1" strokeWidth="0.8" />
                <text x="248" y="362" fill="#60a5fa" fontSize="6" fontFamily="monospace" textAnchor="middle">6ES7 321-1BH02</text>

                {/* ══════════════════════════════════════════
                    HMI PANEL  (right, x 352–458)
                    ══════════════════════════════════════════ */}
                <rect x="352" y="96" width="106" height="292" rx="8" fill="#0a1020" stroke="#0a4ed1" strokeWidth="2" />
                <rect x="352" y="96" width="106" height="22" rx="8" fill="#0a4ed1" />
                <text x="405" y="111" fill="white" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">KTP900 HMI</text>
                {/* HMI screen */}
                <rect x="360" y="122" width="90" height="178" rx="3" fill="url(#hmi-screen)" stroke="#05339c" strokeWidth="0.8" />
                {/* screen header */}
                <rect x="360" y="122" width="90" height="14" fill="#05339c" opacity="0.8" />
                <text x="405" y="132" fill="white" fontSize="6" fontFamily="monospace" textAnchor="middle">SYSTEM STATUS</text>
                {/* status bars */}
                {[['MOTOR 1', '#10b981', 78], ['MOTOR 2', '#10b981', 62], ['CONVEYOR', '#f59e0b', 45], ['PUMP A', '#10b981', 91], ['VALVE B', '#ef4444', 12]].map(([label, color, pct], i) => (
                  <g key={i as number}>
                    <text x="364" y={148 + i * 24} fill="#94a3b8" fontSize="5.5" fontFamily="monospace">{label as string}</text>
                    <rect x="364" y={151 + i * 24} width="82" height="6" rx="1" fill="#0a1628" />
                    <rect x="364" y={151 + i * 24} width={82 * (pct as number) / 100} height="6" rx="1" fill={color as string} opacity="0.9" />
                    <text x="448" y={157 + i * 24} fill={color as string} fontSize="5" fontFamily="monospace" textAnchor="end">{pct}%</text>
                  </g>
                ))}
                {/* trend line */}
                <rect x="362" y="270" width="86" height="26" rx="2" fill="#010812" stroke="#1e3a5f" strokeWidth="0.5" />
                <polyline points="364,291 370,284 376,288 382,278 388,282 394,275 400,279 406,273 412,277 418,270 424,274 430,268 436,272 442,266 448,270" fill="none" stroke="#0a4ed1" strokeWidth="1.2" />
                {/* function buttons on side */}
                {[308, 318, 328, 338].map(y => (
                  <rect key={y} x="454" y={y} width="6" height="16" rx="2" fill="#1e3a5f" stroke="#0a4ed1" strokeWidth="0.5" />
                ))}
                {/* bottom function keys */}
                {[360, 378, 396, 414, 432].map(x => (
                  <rect key={x} x={x} y="360" width="14" height="10" rx="2" fill="#0a1628" stroke="#1e3a5f" strokeWidth="0.8" />
                ))}
                {/* status LEDs */}
                <circle cx="365" cy="382" r="3.5" fill="#10b981" filter="url(#led-glow)" />
                <circle cx="378" cy="382" r="3.5" fill="#10b981" filter="url(#led-glow)" />
                <circle cx="391" cy="382" r="3.5" fill="#f59e0b" filter="url(#led-glow)" />
                {/* connection to rack */}
                <line x1="348" y1="180" x2="352" y2="180" stroke="#0a4ed1" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.7" />
                <line x1="348" y1="200" x2="352" y2="200" stroke="#0a4ed1" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.7" />

                {/* ── Bottom label strip ── */}
                <rect x="22" y="396" width="436" height="24" rx="4" fill="#05339c" opacity="0.12" stroke="#05339c" strokeWidth="0.5" strokeOpacity="0.4" />
                <text x="240" y="412" fill="#4a7abf" fontSize="7" fontFamily="monospace" textAnchor="middle" letterSpacing="2">INDUSTRIAL AUTOMATION SPARE PARTS  ·  GLOBAL SUPPLY  ·  PLC AUTOMATION GROUP</text>
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden  section_white_content" >
      {/* Abstract background blobs */}
      <div className="section_container" style={{ paddingTop: "0px" }}>
        <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/4" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-primary text-sm font-semibold mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Enterprise-Grade Solutions
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                About <span className="text-primary">PLC Automation</span> Group
              </h1>
              <h2 className="text-xl lg:text-2xl text-slate-700 font-medium mb-6">
                Your Trusted Global Partner for Industrial Automation Spare Parts & Control System Solutions
              </h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                We eliminate costly downtime by supplying critical, hard-to-find, and obsolete automation components to plant engineers and facilities worldwide. When systems fail, we deliver.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-3.5 rounded-lg font-semibold transition-all shadow-lg shadow-primary/20">
                  Contact Us <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/products" className="inline-flex items-center justify-center gap-2 border-2 border-slate-200 hover:border-primary text-slate-700 hover:text-primary px-8 py-3.5 rounded-lg font-semibold transition-all bg-white">
                  Explore Products
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square relative rounded-2xl overflow-hidden border border-[#05339c]/40 flex items-center justify-center">
                <svg viewBox="0 0 480 480" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="panel-bg" x1="0" y1="0" x2="480" y2="480" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#060e1f" /><stop offset="1" stopColor="#0b1a38" />
                    </linearGradient>
                    <linearGradient id="vfd-screen" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                      <stop stopColor="#020f1f" /><stop offset="1" stopColor="#021428" />
                    </linearGradient>
                    <linearGradient id="hmi-screen" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                      <stop stopColor="#010a18" /><stop offset="1" stopColor="#021020" />
                    </linearGradient>
                    <filter id="led-glow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="2.5" result="blur" />
                      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <filter id="soft-glow" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                  </defs>

                  {/* ── Background ── */}
                  <rect width="480" height="480" fill="url(#panel-bg)" />
                  {/* subtle dot grid */}
                  {Array.from({ length: 12 }).map((_, r) => Array.from({ length: 12 }).map((_, c) => (
                    <circle key={`${r}-${c}`} cx={c * 44 + 22} cy={r * 44 + 22} r="1" fill="#1e3a5f" opacity="0.4" />
                  )))}

                  {/* ── SECTION LABELS ── */}
                  <text x="52" y="88" fill="#4a7abf" fontSize="9" fontFamily="monospace" fontWeight="bold" letterSpacing="1">VFD DRIVE</text>
                  <text x="195" y="88" fill="#4a7abf" fontSize="9" fontFamily="monospace" fontWeight="bold" letterSpacing="1">PLC RACK</text>
                  <text x="393" y="88" fill="#4a7abf" fontSize="9" fontFamily="monospace" fontWeight="bold" letterSpacing="1">HMI</text>

                  {/* ══════════════════════════════════════════
                    VFD / FREQUENCY DRIVE  (left, x 22–110)
                    ══════════════════════════════════════════ */}
                  <rect x="22" y="96" width="88" height="288" rx="5" fill="#0d1e36" stroke="#05339c" strokeWidth="1.5" />
                  {/* top badge */}
                  <rect x="22" y="96" width="88" height="22" rx="5" fill="#05339c" />
                  <text x="66" y="111" fill="white" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">ABB ACS880</text>
                  {/* heat sink fins (left edge) */}
                  {[118, 128, 138, 148, 158, 168, 178].map(y => (
                    <rect key={y} x="22" y={y} width="6" height="7" rx="1" fill="#0a4ed1" opacity="0.5" />
                  ))}
                  {/* VFD display */}
                  <rect x="32" y="126" width="68" height="52" rx="3" fill="url(#vfd-screen)" stroke="#0a4ed1" strokeWidth="1" />
                  <text x="66" y="143" fill="#10b981" fontSize="16" fontFamily="monospace" textAnchor="middle" fontWeight="bold">48.5</text>
                  <text x="66" y="155" fill="#10b981" fontSize="8" fontFamily="monospace" textAnchor="middle">Hz  ▲ RUN</text>
                  {/* bar graph in display */}
                  <rect x="36" y="160" width="8" height="12" fill="#0a4ed1" opacity="0.8" />
                  <rect x="47" y="156" width="8" height="16" fill="#0a4ed1" opacity="0.8" />
                  <rect x="58" y="152" width="8" height="20" fill="#10b981" opacity="0.9" />
                  <rect x="69" y="157" width="8" height="15" fill="#0a4ed1" opacity="0.8" />
                  <rect x="80" y="162" width="8" height="10" fill="#0a4ed1" opacity="0.8" />
                  {/* nav buttons */}
                  {[188, 200, 212, 224].map((y, i) => (
                    <rect key={y} x="34" y={y} width="14" height="9" rx="2" fill="#0a2040" stroke="#1e3a5f" />
                  ))}
                  <text x="58" y="195" fill="#4a7abf" fontSize="7" fontFamily="monospace">▲  ▼  ◀  ▶</text>
                  {/* status LEDs */}
                  <circle cx="42" cy="222" r="3.5" fill="#10b981" filter="url(#led-glow)" />
                  <circle cx="55" cy="222" r="3.5" fill="#10b981" filter="url(#led-glow)" />
                  <circle cx="68" cy="222" r="3.5" fill="#f59e0b" filter="url(#led-glow)" />
                  <text x="35" y="233" fill="#4a7abf" fontSize="6" fontFamily="monospace">RUN READY FLT</text>
                  {/* terminal block bottom */}
                  {[30, 42, 54, 66, 78, 90].map(x => (
                    <rect key={x} x={x} y="350" width="10" height="26" rx="1" fill="#1e3a5f" stroke="#0a4ed1" strokeWidth="0.8" />
                  ))}
                  {/* wires */}
                  <line x1="35" y1="376" x2="35" y2="390" stroke="#10b981" strokeWidth="2" />
                  <line x1="47" y1="376" x2="47" y2="390" stroke="#ef4444" strokeWidth="2" />
                  <line x1="59" y1="376" x2="59" y2="390" stroke="#10b981" strokeWidth="2" />
                  <line x1="71" y1="376" x2="73" y2="390" stroke="#f59e0b" strokeWidth="2" />
                  <line x1="83" y1="376" x2="81" y2="390" stroke="#94a3b8" strokeWidth="2" />
                  {/* connection to rack */}
                  <line x1="110" y1="180" x2="128" y2="180" stroke="#0a4ed1" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.7" />
                  <line x1="110" y1="200" x2="128" y2="200" stroke="#0a4ed1" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.7" />

                  {/* ══════════════════════════════════════════
                    PLC RACK  (center, x 128–348)
                    ══════════════════════════════════════════ */}
                  <rect x="128" y="96" width="220" height="292" rx="6" fill="#0a1628" stroke="#05339c" strokeWidth="2" />
                  {/* top badge */}
                  <rect x="128" y="96" width="220" height="24" rx="6" fill="#05339c" />
                  <text x="238" y="112" fill="white" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">SIMATIC S7-300 / RACK 0</text>
                  {/* DIN rails */}
                  <rect x="132" y="124" width="212" height="5" rx="2" fill="#94a3b8" />
                  <rect x="132" y="278" width="212" height="5" rx="2" fill="#94a3b8" />

                  {/* ── Module 1: Power Supply ── */}
                  <rect x="132" y="129" width="36" height="150" rx="3" fill="#0f1e36" stroke="#1e3a5f" strokeWidth="1" />
                  <text x="150" y="143" fill="#4a7abf" fontSize="6" fontFamily="monospace" textAnchor="middle" fontWeight="bold">PS 307</text>
                  {/* vents */}
                  {[150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260].map(y => (
                    <line key={y} x1="137" y1={y} x2="163" y2={y} stroke="#1e3a5f" strokeWidth="1.5" />
                  ))}
                  <circle cx="150" cy="269" r="4" fill="#10b981" filter="url(#led-glow)" />

                  {/* ── Module 2: CPU ── */}
                  <rect x="170" y="129" width="44" height="150" rx="3" fill="#0d1e36" stroke="#05339c" strokeWidth="1.5" />
                  <text x="192" y="143" fill="#60a5fa" fontSize="6" fontFamily="monospace" textAnchor="middle" fontWeight="bold">CPU 315</text>
                  {/* CPU display */}
                  <rect x="174" y="148" width="36" height="26" rx="2" fill="#010a18" stroke="#0a4ed1" strokeWidth="0.8" />
                  {/* waveform */}
                  <polyline points="176,168 180,158 184,164 188,155 192,162 196,158 200,165 204,161 208,168" fill="none" stroke="#10b981" strokeWidth="1.2" />
                  {/* mode switch */}
                  <circle cx="192" cy="192" r="6" fill="#0a1020" stroke="#94a3b8" strokeWidth="1" />
                  <line x1="192" y1="192" x2="192" y2="186" stroke="#94a3b8" strokeWidth="1.5" />
                  {/* LEDs */}
                  <circle cx="176" cy="145" r="2.5" fill="#10b981" filter="url(#led-glow)" />
                  <circle cx="185" cy="145" r="2.5" fill="#10b981" filter="url(#led-glow)" />
                  <circle cx="194" cy="145" r="2.5" fill="#10b981" filter="url(#led-glow)" />
                  <circle cx="203" cy="145" r="2.5" fill="#ef4444" opacity="0.4" />
                  {/* MPI port */}
                  <rect x="178" y="206" width="28" height="14" rx="2" fill="#020b18" stroke="#1e3a5f" strokeWidth="0.8" />
                  <text x="192" y="216" fill="#4a7abf" fontSize="5" fontFamily="monospace" textAnchor="middle">MPI</text>
                  <circle cx="192" cy="268" r="4" fill="#10b981" filter="url(#led-glow)" />

                  {/* ── Module 3: Digital Input ── */}
                  <rect x="216" y="129" width="30" height="150" rx="3" fill="#0f1e36" stroke="#1e3a5f" strokeWidth="1" />
                  <text x="231" y="143" fill="#4a7abf" fontSize="6" fontFamily="monospace" textAnchor="middle">DI 16</text>
                  {/* LED grid 2×8 */}
                  {[0, 1].map(col => [0, 1, 2, 3, 4, 5, 6, 7].map(row => (
                    <circle key={`di-${col}-${row}`} cx={222 + col * 12} cy={150 + row * 13} r="3"
                      fill={row < 5 ? "#10b981" : "#10b981"} opacity={row < 5 ? 0.9 : 0.3} filter="url(#led-glow)" />
                  )))}
                  <circle cx="231" cy="269" r="4" fill="#10b981" filter="url(#led-glow)" />

                  {/* ── Module 4: Digital Output ── */}
                  <rect x="248" y="129" width="30" height="150" rx="3" fill="#0f1e36" stroke="#1e3a5f" strokeWidth="1" />
                  <text x="263" y="143" fill="#4a7abf" fontSize="6" fontFamily="monospace" textAnchor="middle">DO 16</text>
                  {[0, 1].map(col => [0, 1, 2, 3, 4, 5, 6, 7].map(row => (
                    <circle key={`do-${col}-${row}`} cx={254 + col * 12} cy={150 + row * 13} r="3"
                      fill={row < 3 ? "#f59e0b" : "#f59e0b"} opacity={row < 3 ? 0.9 : 0.25} filter="url(#led-glow)" />
                  )))}
                  <circle cx="263" cy="269" r="4" fill="#f59e0b" filter="url(#led-glow)" />

                  {/* ── Module 5: Analog I/O ── */}
                  <rect x="280" y="129" width="30" height="150" rx="3" fill="#0f1e36" stroke="#1e3a5f" strokeWidth="1" />
                  <text x="295" y="143" fill="#4a7abf" fontSize="6" fontFamily="monospace" textAnchor="middle">AI/AO</text>
                  {/* analog bars */}
                  {[0, 1, 2, 3].map(i => (
                    <rect key={i} x="287" y={165 + i * 16} width={[18, 12, 22, 8][i]} height="8" rx="1" fill="#0a4ed1" opacity="0.85" />
                  ))}
                  <circle cx="295" cy="269" r="4" fill="#10b981" filter="url(#led-glow)" />

                  {/* ── Module 6: PROFINET ── */}
                  <rect x="312" y="129" width="36" height="150" rx="3" fill="#0f1a2e" stroke="#0a4ed1" strokeWidth="1.5" />
                  <text x="330" y="143" fill="#60a5fa" fontSize="6" fontFamily="monospace" textAnchor="middle" fontWeight="bold">PN/DP</text>
                  {/* ethernet port icon */}
                  <rect x="320" y="152" width="20" height="14" rx="2" fill="#020b18" stroke="#0a4ed1" strokeWidth="0.8" />
                  {[0, 1, 2, 3, 4, 5, 6].map(i => (
                    <line key={i} x1={321 + i * 3} y1="158" x2={321 + i * 3} y2="162" stroke="#0a4ed1" strokeWidth="0.8" />
                  ))}
                  <text x="330" y="180" fill="#4a7abf" fontSize="5" fontFamily="monospace" textAnchor="middle">RJ45</text>
                  {/* signal bars */}
                  <rect x="322" y="195" width="4" height="8" rx="1" fill="#0a4ed1" opacity="0.9" />
                  <rect x="328" y="191" width="4" height="12" rx="1" fill="#0a4ed1" opacity="0.9" />
                  <rect x="334" y="187" width="4" height="16" rx="1" fill="#10b981" opacity="0.9" />
                  <circle cx="330" cy="220" r="3.5" fill="#10b981" filter="url(#led-glow)" />
                  <circle cx="341" cy="220" r="3.5" fill="#0a4ed1" filter="url(#led-glow)" />
                  <circle cx="330" cy="269" r="4" fill="#10b981" filter="url(#led-glow)" />

                  {/* Terminal strip */}
                  {Array.from({ length: 18 }).map((_, i) => (
                    <rect key={i} x={132 + i * 12} y="288" width="10" height="18" rx="1" fill="#1e3a5f" stroke="#0a4ed1" strokeWidth="0.7" />
                  ))}
                  {/* Wires from terminals */}
                  {[136, 148, 160, 172, 184, 196, 208, 220, 232, 244, 256, 268, 280, 292, 304, 316, 328, 340].map((x, i) => (
                    <line key={i} x1={x + 4} y1="306" x2={x + 4 + (i % 3 - 1) * 2} y2="320" stroke={['#10b981', '#ef4444', '#60a5fa', '#f59e0b', '#94a3b8'][i % 5]} strokeWidth="1.8" />
                  ))}

                  {/* cable duct */}
                  <rect x="128" y="325" width="220" height="14" rx="3" fill="#0a1628" stroke="#1e3a5f" strokeWidth="1" />
                  {Array.from({ length: 22 }).map((_, i) => (
                    <line key={i} x1={131 + i * 10} y1="325" x2={131 + i * 10} y2="339" stroke="#1e3a5f" strokeWidth="0.8" />
                  ))}

                  {/* ── SPARE PARTS floating tags (top) ── */}
                  <rect x="140" y="348" width="60" height="20" rx="3" fill="#05339c" opacity="0.2" stroke="#0a4ed1" strokeWidth="0.8" />
                  <text x="170" y="362" fill="#60a5fa" fontSize="6" fontFamily="monospace" textAnchor="middle">6ES7 315-2EH14</text>
                  <rect x="218" y="348" width="60" height="20" rx="3" fill="#05339c" opacity="0.2" stroke="#0a4ed1" strokeWidth="0.8" />
                  <text x="248" y="362" fill="#60a5fa" fontSize="6" fontFamily="monospace" textAnchor="middle">6ES7 321-1BH02</text>

                  {/* ══════════════════════════════════════════
                    HMI PANEL  (right, x 352–458)
                    ══════════════════════════════════════════ */}
                  <rect x="352" y="96" width="106" height="292" rx="8" fill="#0a1020" stroke="#0a4ed1" strokeWidth="2" />
                  <rect x="352" y="96" width="106" height="22" rx="8" fill="#0a4ed1" />
                  <text x="405" y="111" fill="white" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">KTP900 HMI</text>
                  {/* HMI screen */}
                  <rect x="360" y="122" width="90" height="178" rx="3" fill="url(#hmi-screen)" stroke="#05339c" strokeWidth="0.8" />
                  {/* screen header */}
                  <rect x="360" y="122" width="90" height="14" fill="#05339c" opacity="0.8" />
                  <text x="405" y="132" fill="white" fontSize="6" fontFamily="monospace" textAnchor="middle">SYSTEM STATUS</text>
                  {/* status bars */}
                  {[['MOTOR 1', '#10b981', 78], ['MOTOR 2', '#10b981', 62], ['CONVEYOR', '#f59e0b', 45], ['PUMP A', '#10b981', 91], ['VALVE B', '#ef4444', 12]].map(([label, color, pct], i) => (
                    <g key={i as number}>
                      <text x="364" y={148 + i * 24} fill="#94a3b8" fontSize="5.5" fontFamily="monospace">{label as string}</text>
                      <rect x="364" y={151 + i * 24} width="82" height="6" rx="1" fill="#0a1628" />
                      <rect x="364" y={151 + i * 24} width={82 * (pct as number) / 100} height="6" rx="1" fill={color as string} opacity="0.9" />
                      <text x="448" y={157 + i * 24} fill={color as string} fontSize="5" fontFamily="monospace" textAnchor="end">{pct}%</text>
                    </g>
                  ))}
                  {/* trend line */}
                  <rect x="362" y="270" width="86" height="26" rx="2" fill="#010812" stroke="#1e3a5f" strokeWidth="0.5" />
                  <polyline points="364,291 370,284 376,288 382,278 388,282 394,275 400,279 406,273 412,277 418,270 424,274 430,268 436,272 442,266 448,270" fill="none" stroke="#0a4ed1" strokeWidth="1.2" />
                  {/* function buttons on side */}
                  {[308, 318, 328, 338].map(y => (
                    <rect key={y} x="454" y={y} width="6" height="16" rx="2" fill="#1e3a5f" stroke="#0a4ed1" strokeWidth="0.5" />
                  ))}
                  {/* bottom function keys */}
                  {[360, 378, 396, 414, 432].map(x => (
                    <rect key={x} x={x} y="360" width="14" height="10" rx="2" fill="#0a1628" stroke="#1e3a5f" strokeWidth="0.8" />
                  ))}
                  {/* status LEDs */}
                  <circle cx="365" cy="382" r="3.5" fill="#10b981" filter="url(#led-glow)" />
                  <circle cx="378" cy="382" r="3.5" fill="#10b981" filter="url(#led-glow)" />
                  <circle cx="391" cy="382" r="3.5" fill="#f59e0b" filter="url(#led-glow)" />
                  {/* connection to rack */}
                  <line x1="348" y1="180" x2="352" y2="180" stroke="#0a4ed1" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.7" />
                  <line x1="348" y1="200" x2="352" y2="200" stroke="#0a4ed1" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.7" />

                  {/* ── Bottom label strip ── */}
                  <rect x="22" y="396" width="436" height="24" rx="4" fill="#05339c" opacity="0.12" stroke="#05339c" strokeWidth="0.5" strokeOpacity="0.4" />
                  <text x="240" y="412" fill="#4a7abf" fontSize="7" fontFamily="monospace" textAnchor="middle" letterSpacing="2">INDUSTRIAL AUTOMATION SPARE PARTS  ·  GLOBAL SUPPLY  ·  PLC AUTOMATION GROUP</text>
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Intro = () => {
  return (
    <section className="py-24 bg-slate-50 section_grey_content">
      <div className="section_container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
                Powering Industries Through Reliable Automation Solutions
              </h2>
              <div className="w-20 h-2 bg-primary mb-8 rounded-full"></div>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                At PLC Automation Group, we understand that every minute of downtime costs your business. That's why we've built a robust global sourcing network dedicated to providing high-quality industrial automation spare parts, obsolete PLC modules, HMIs, and drives.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Serving sectors from manufacturing and power generation to oil & gas, marine, and pharmaceuticals, we are the trusted partner that procurement teams and plant engineers rely on when they need critical components fast and efficiently.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/assets/about-us/control-room.png"
                  alt="Industrial automation control room"
                  className="w-full h-auto object-cover"
                  preload={false}
                  width={600}
                  height={400}
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Stats = () => {
  const stats = [
    { id: 1, label: "Years Industry Experience", value: 10, icon: <Award className="w-8 h-8" />, suffix: "+" },
    { id: 2, label: "Global Clients", value: 500, icon: <Users className="w-8 h-8" />, suffix: "+" },
    { id: 3, label: "Countries Served", value: 50, icon: <Globe className="w-8 h-8" />, suffix: "+" },
    { id: 4, label: "Components Supplied", value: 10000, icon: <Settings className="w-8 h-8" />, suffix: "+" }
  ];

  return (
    <section className="py-20 bg-white section_white_content">
      <div className="section_container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <FadeIn key={stat.id} delay={i * 0.1}>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:-translate-y-2 transition-transform duration-300 hover:shadow-xl text-center group">
                  <div className="w-16 h-16 mx-auto bg-accent text-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold text-slate-900 mb-2">
                    <Counter from={0} to={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-slate-600 font-medium">{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
