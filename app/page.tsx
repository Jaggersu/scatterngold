"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import LoginForm from "@/components/LoginForm";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

// Navbar 連結
const NAV_LINKS = [
  { label: "VI 解析",  href: "#vi-analysis"    },
  { label: "空間提案", href: "#space-proposal"  },
  { label: "品牌文案", href: "#brand-copy"      },
  { label: "未來計畫", href: "#future-plan"     },
];

// 漂浮紅寶石光點 (blur-120px)
const GLOW_BLOBS = [
  { top: "5%",  left: "-10%", size: "450px", opacity: 0.35, delay: "0s"   },
  { top: "35%", left: "85%",  size: "550px", opacity: 0.25, delay: "2s"   },
  { top: "70%", left: "-5%",  size: "400px", opacity: 0.30, delay: "1.5s" },
  { top: "85%", left: "75%",  size: "600px", opacity: 0.20, delay: "3s"   },
];

// VI 組件化資料
const VI_COMPONENTS = [
  { id: "ruby",     en: "RUBY GEM",     zh: "紅寶石緋紅", meaning: "象徵權力核心",         img: "/Ruby.png",     accent: "#C21E56", span: "md:col-span-2", imgW: 130 },
  { id: "wings",    en: "SCARAB WINGS", zh: "法老金羽翼", meaning: "象徵權威展開",         img: "/Wings.png",    accent: "#D4AF37", span: "md:col-span-4", imgW: 240 },
  { id: "horus",    en: "HORUS EYE",    zh: "全知之眼",   meaning: "象徵洞察先機",         img: "/Horus.png",    accent: "#D4AF37", span: "md:col-span-2", imgW: 160 },
  { id: "teardrop", en: "TEARDROP",     zh: "神聖淚滴",   meaning: "象徵細節追求",         img: "/Teardrop.png", accent: "#F5F1E1", span: "md:col-span-2", imgW: 120 },
  { id: "scarab",   en: "SCARAB BODY",  zh: "聖甲蟲主體", meaning: "象徵重生與財富循環",   img: "/Scarab.png",   accent: "#D4AF37", span: "md:col-span-2", imgW: 170 },
];

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => { await supabase.auth.signOut(); };

  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <AnimatePresence mode="wait">
      {user ? (
        /* ══════════════════════
           登入後：TopSlot Style Dashboard
        ══════════════════════ */
        <motion.div
          key="dashboard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative min-h-screen w-full overflow-hidden flex justify-center py-0 md:py-10"
          style={{ backgroundColor: "#141414" }} // 底層：曜石深黑
        >
          {/* ── 背景紅寶石漂浮光暈 ── */}
          {GLOW_BLOBS.map((b, i) => (
            <div
              key={i}
              className="pointer-events-none absolute rounded-full z-0"
              style={{
                top: b.top, left: b.left,
                width: b.size, height: b.size,
                backgroundColor: "#C21E56",
                opacity: b.opacity,
                filter: "blur(120px)",
                animation: `float-dot 8s ease-in-out infinite ${b.delay}`,
              }}
            />
          ))}

          {/* ── 主應用容器 (The App Frame) ── */}
          <div className="relative w-full max-w-[1280px] bg-[#1B1E26] md:rounded-[40px] shadow-[0_20px_80px_rgba(0,0,0,0.8)] border border-white/5 flex flex-col z-10 pb-16 md:pb-24">
            
            {/* ── Navbar ── */}
            <nav className="w-full flex items-center justify-between px-6 md:px-12 py-6 z-50">
              <div className="flex items-center gap-3">
                <Image src="/logo.png" alt="Logo" width={28} height={28} className="object-contain" />
                <span className="text-white font-serif font-bold tracking-widest text-sm hidden sm:inline">戀財娛樂館</span>
              </div>

              <div className="hidden md:flex items-center gap-8">
                {NAV_LINKS.map(link => (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className="text-white/70 hover:text-white text-[13px] tracking-[0.1em] font-sans transition-colors duration-200 bg-transparent cursor-pointer"
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              <button
                onClick={handleLogout}
                className="px-6 py-2 rounded-full text-white text-xs font-sans font-bold tracking-wider transition-all hover:brightness-110 active:scale-95 shadow-[0_0_15px_rgba(194,30,86,0.3)]"
                style={{ backgroundColor: "#C21E56" }}
              >
                登出
              </button>
            </nav>

            {/* ── Hero Banner ── */}
            <div className="relative mx-5 md:mx-12 mt-4 rounded-[28px] p-8 md:p-14 overflow-visible border border-[#D4AF37]/20 flex flex-col md:flex-row items-center justify-between"
                 style={{ background: "linear-gradient(135deg, #1F4F5F 0%, #151821 100%)" }}>
              
              {/* 左側文案 */}
              <div className="flex flex-col items-start max-w-lg z-20">
                <h2 className="font-sans uppercase tracking-[0.3em] text-[#D4AF37] text-xs md:text-[13px] font-bold mb-4 drop-shadow-md">
                  SCATTER ALL THE TIME
                </h2>
                <h1 className="text-4xl md:text-5xl font-bold text-white font-serif leading-tight mb-4 drop-shadow-lg">
                  戀財娛樂館
                </h1>
                <p className="text-white/70 text-sm md:text-[15px] leading-relaxed tracking-wider mb-10 drop-shadow">
                  我們將古埃及的神聖符號化為實質的財富體驗，為您開啟一場改寫命運的神秘旅程。
                </p>
                <button
                  className="px-8 py-3.5 rounded-full text-white text-sm font-sans font-bold tracking-widest flex items-center gap-2 transition-all hover:scale-105 shadow-[0_0_25px_rgba(194,30,86,0.5)]"
                  style={{ backgroundColor: "#C21E56" }}
                >
                  立即探索 <span className="text-lg leading-none">→</span>
                </button>
              </div>

              {/* 右側 3D 破框主圖 */}
              <div className="absolute right-[-2%] md:right-[5%] -top-[15%] md:-top-[25%] w-[220px] h-[220px] md:w-[420px] md:h-[420px] z-30 pointer-events-none opacity-50 md:opacity-100">
                <Image
                  src="/Horus.png"
                  alt="Horus Eye"
                  fill
                  className="object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)]"
                  priority
                />
              </div>
            </div>

            {/* ── VI 解析：核心組件分解 (The Grid) ── */}
            <div id="vi-analysis" className="px-5 md:px-12 mt-12 mb-6 flex flex-col gap-2">
               <h3 className="font-sans uppercase tracking-[0.3em] text-white/50 text-xs md:text-sm font-bold">VI Component Breakdown</h3>
               <h2 className="font-serif text-white text-2xl font-bold tracking-wider">核心組件分解</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6 px-5 md:px-12 relative z-20">
              {VI_COMPONENTS.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className={`group relative bg-[#1A1A1A] rounded-[24px] p-6 border border-white/5 overflow-hidden cursor-pointer transition-all duration-400 hover:border-[#D4AF37]/50 hover:shadow-[0_0_35px_rgba(212,175,55,0.15)] hover:bg-[#1e1e1e] flex flex-col h-[220px] md:h-[240px] ${item.span}`}
                >
                  <div className="relative z-20 flex flex-col h-full justify-between">
                    <div>
                      <h4 className="font-sans uppercase tracking-[0.3em] text-[10px] md:text-[11px] font-bold text-white/40 mb-2 transition-colors group-hover:text-[#D4AF37]">{item.en}</h4>
                      <h3 className="font-serif text-xl font-bold text-white tracking-widest">{item.zh}</h3>
                    </div>
                    
                    {/* Hover 譯文動畫區塊 */}
                    <div className="overflow-hidden h-8 flex items-end pb-1">
                      <p className="font-serif text-sm tracking-widest text-[#D4AF37] translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out opacity-0 group-hover:opacity-100 drop-shadow-md">
                        {item.meaning}
                      </p>
                    </div>
                  </div>
                  
                  {/* 3D 破框小圖 (靠右下角) */}
                  <div className="absolute right-[-10px] bottom-[-10px] z-10 pointer-events-none group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-700 ease-out flex items-end justify-end" style={{ width: item.imgW, height: item.imgW }}>
                    <Image 
                      src={item.img} 
                      alt={item.en} 
                      fill 
                      className="object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] opacity-70 group-hover:opacity-100 transition-opacity duration-500" 
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ── 底部：Brand Specifications (色彩與字體規範) ── */}
            <div className="px-5 md:px-12 mt-16 pt-10 border-t border-white/5 flex flex-col md:flex-row items-start md:items-center gap-8 z-20 relative">
              <div className="flex-shrink-0">
                <span className="font-sans text-white/40 text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold">Brand Specifications</span>
              </div>
              
              <div className="flex-1 w-full flex flex-col gap-4">
                {/* 比例條 */}
                <div className="w-full h-2 rounded-full overflow-hidden flex shadow-inner bg-black/50">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: "60%" }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} style={{ backgroundColor: "#D4AF37" }} />
                  <motion.div initial={{ width: 0 }} whileInView={{ width: "30%" }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.4 }} style={{ backgroundColor: "#1F4F5F" }} />
                  <motion.div initial={{ width: 0 }} whileInView={{ width: "10%" }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.6 }} style={{ backgroundColor: "#C21E56" }} />
                </div>
                
                {/* 說明文字 */}
                <div className="flex justify-between text-[9px] md:text-[10px] font-sans uppercase tracking-widest text-white/50">
                  <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#D4AF37]" /> Pharaoh Gold 60%</div>
                  <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#1F4F5F]" /> Nile Teal 30%</div>
                  <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#C21E56]" /> Ruby Crimson 10%</div>
                </div>
              </div>
            </div>

            {/* ── 右下角巨型破格元素 (Scarab) ── */}
            <div className="absolute -right-[15%] md:-right-[10%] -bottom-[5%] w-[350px] h-[350px] md:w-[600px] md:h-[600px] z-50 pointer-events-none opacity-40 md:opacity-80 mix-blend-screen">
              <Image 
                src="/Scarab.png" 
                alt="Scarab Breakout" 
                fill 
                className="object-contain drop-shadow-[0_40px_50px_rgba(0,0,0,0.9)]" 
                priority
              />
            </div>
          </div>
        </motion.div>
      ) : (
        /* ══════════════════════
           未登入：置中 Logo + LoginForm（完全不動）
        ══════════════════════ */
        <motion.div
          key="guest"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center px-4 relative z-10 min-h-screen"
          style={{ paddingTop: "12vh", paddingBottom: "10vh", backgroundColor: "#141414" }}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-[min(300px,70vw)] h-[min(300px,70vw)]"
          >
            <Image
              src="/logo.png"
              alt="戀財娛樂館 Logo"
              fill
              sizes="(max-width:640px) 70vw, 300px"
              className="object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
              priority
            />
          </motion.div>
          <div className="mt-[6vh]"><LoginForm /></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

