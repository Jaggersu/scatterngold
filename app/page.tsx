"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import LoginForm from "@/components/LoginForm";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

const NAV_LINKS = [
  { label: "VI 解析",  href: "#vi-analysis"    },
  { label: "空間提案", href: "#space-proposal"  },
  { label: "品牌文案", href: "#brand-copy"      },
  { label: "未來計畫", href: "#future-plan"     },
];

const GLOW_BLOBS = [
  { top: "5%",  left: "-10%", size: "450px", opacity: 0.35, delay: "0s"   },
  { top: "35%", left: "85%",  size: "550px", opacity: 0.25, delay: "2s"   },
  { top: "70%", left: "-5%",  size: "400px", opacity: 0.30, delay: "1.5s" },
  { top: "85%", left: "75%",  size: "600px", opacity: 0.20, delay: "3s"   },
];

const GRID_CARDS = [
  { id: "vi-analysis",    title: "VI 解析",  desc: "標誌的每一道線條，都是對永恆財富的宣示。",   img: "/Ruby.png" },
  { id: "space-proposal", title: "空間提案", desc: "沉穩曜石黑交織法老金，打造王者空間。",        img: "/Wings.png" },
  { id: "brand-copy",     title: "品牌文案", desc: "改寫命運的神秘旅程，重塑娛樂新標準。",        img: "/Teardrop.png" },
  { id: "future-plan",    title: "未來計畫", desc: "重塑標準，只為滿足您對完美的苛求。",          img: "/Scarab.png" },
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
          style={{ backgroundColor: "#141414" }} // 最底層容器 Deep Obsidian
        >
          {/* ── 背景紅寶石破格光暈 ── */}
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
                animationDelay: b.delay,
              }}
            />
          ))}

          {/* ── 置中主應用容器 (The App Frame) ── */}
          <div className="relative w-full max-w-[1280px] bg-[#1B1E26] md:rounded-[40px] shadow-[0_20px_80px_rgba(0,0,0,0.8)] border border-white/5 flex flex-col z-10 pb-24 md:pb-32">
            
            {/* ── Navbar ── */}
            <nav className="w-full flex items-center justify-between px-6 md:px-12 py-6 z-50">
              {/* 左：品牌 */}
              <div className="flex items-center gap-3">
                <Image src="/logo.png" alt="Logo" width={28} height={28} className="object-contain" />
                <span className="text-white font-bold tracking-widest text-sm hidden sm:inline">戀財娛樂館</span>
              </div>

              {/* 中：導覽連結 */}
              <div className="hidden md:flex items-center gap-8">
                {NAV_LINKS.map(link => (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className="text-white/70 hover:text-white text-[13px] tracking-[0.1em] transition-colors duration-200 bg-transparent cursor-pointer"
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              {/* 右：登出 */}
              <button
                onClick={handleLogout}
                className="px-6 py-2 rounded-full text-white text-xs font-bold tracking-wider transition-all hover:brightness-110 active:scale-95"
                style={{ backgroundColor: "#C21E56" }}
              >
                登出
              </button>
            </nav>

            {/* ── Hero Banner ── */}
            <div className="relative mx-5 md:mx-12 mt-4 rounded-[28px] p-8 md:p-14 overflow-visible border border-[#D4AF37]/20 flex flex-col md:flex-row items-center justify-between"
                 style={{ background: "linear-gradient(135deg, #1F4F5F 0%, #151821 100%)" }}>
              
              {/* 左側文案 */}
              <div className="flex flex-col items-start max-w-md z-20">
                <h1 className="text-4xl md:text-5xl font-bold text-white font-serif leading-tight mb-3">
                  戀財娛樂館
                </h1>
                <p className="text-white/60 text-sm md:text-base leading-relaxed tracking-wider mb-8">
                  重塑娛樂新標竿。<br />將古埃及的神聖符號化為實質的財富體驗，為您開啟一場改寫命運的旅程。
                </p>
                <button
                  className="px-8 py-3.5 rounded-full text-white text-sm font-bold tracking-widest flex items-center gap-2 transition-all hover:scale-105 shadow-[0_0_20px_rgba(194,30,86,0.4)]"
                  style={{ backgroundColor: "#C21E56" }}
                >
                  立即探索 <span className="text-lg leading-none">→</span>
                </button>
              </div>

              {/* 右側 3D 破框主圖 (仿 Cashback 的雕像) */}
              <div className="absolute right-0 md:right-[5%] -top-[10%] w-[200px] h-[200px] md:w-[350px] md:h-[350px] z-30 pointer-events-none opacity-40 md:opacity-100">
                <Image
                  src="/Horus.png"
                  alt="Horus Eye"
                  fill
                  className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
                  priority
                />
              </div>
            </div>

            {/* ── 中間狀態列 (仿 TopSlot Filter Bar) ── */}
            <div className="mx-5 md:mx-12 my-8 p-4 md:p-5 bg-[#1A1A1A] rounded-2xl flex flex-col md:flex-row items-center justify-between border border-white/5 shadow-inner z-20">
              <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                <button className="bg-[#C21E56] text-white px-6 py-2 rounded-xl text-xs font-bold whitespace-nowrap shadow-[0_0_15px_rgba(194,30,86,0.4)]">全部探索</button>
                <button className="bg-white/5 text-white/60 hover:bg-white/10 hover:text-white px-6 py-2 rounded-xl text-xs whitespace-nowrap transition-all">熱門精選</button>
                <button className="bg-white/5 text-white/60 hover:bg-white/10 hover:text-white px-6 py-2 rounded-xl text-xs whitespace-nowrap transition-all">最新發布</button>
              </div>
              <div className="mt-4 md:mt-0 flex flex-col md:flex-row md:items-center gap-2 md:gap-4 w-full md:w-auto text-center md:text-right">
                <span className="text-white/40 text-[10px] tracking-[0.2em] uppercase">Global Wealth</span>
                <span className="text-[#D4AF37] text-xl md:text-2xl font-bold font-mono tracking-wider">$ 999,999,999</span>
              </div>
            </div>

            {/* ── The Grid 網格 ── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 px-5 md:px-12 relative z-20">
              {GRID_CARDS.map((card, i) => (
                <motion.div
                  key={card.id}
                  id={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className={`group relative bg-[#1A1A1A] rounded-[20px] p-5 md:p-6 border border-white/5 overflow-visible cursor-pointer transition-all duration-300 hover:border-[#D4AF37] hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] flex flex-col justify-between h-[220px] md:h-[260px] ${i % 2 === 1 ? 'md:mt-8' : ''}`}
                >
                  <div className="relative z-20">
                    <h3 className="text-white font-bold text-lg font-serif tracking-wider mb-2">{card.title}</h3>
                    <p className="text-white/40 text-[11px] leading-relaxed tracking-wide">{card.desc}</p>
                  </div>
                  
                  {/* 3D 破框小圖 */}
                  <div className="absolute right-[-10px] bottom-[-10px] w-[120px] h-[120px] z-10 pointer-events-none group-hover:scale-110 transition-transform duration-500">
                    <Image src={card.img} alt={card.title} fill className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] opacity-80 group-hover:opacity-100" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ── 底部供應商/規格列 ── */}
            <div className="px-5 md:px-12 mt-16 md:mt-24 pt-8 border-t border-white/5 flex flex-wrap items-center justify-center md:justify-start gap-8 z-20 relative">
              <span className="text-white/30 text-[10px] tracking-[0.2em] w-full md:w-auto text-center">PROVIDERS / SPECS</span>
              <div className="flex gap-6 items-center flex-wrap justify-center opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                <span className="text-white text-sm font-serif font-bold tracking-widest">SCATTERNGOLD</span>
                <span className="text-white text-sm font-serif font-bold tracking-widest text-[#D4AF37]">PHARAOH</span>
                <span className="text-white text-sm font-serif font-bold tracking-widest text-[#C21E56]">RUBY</span>
                <span className="text-white text-sm font-serif font-bold tracking-widest text-[#1F4F5F]">NILE</span>
              </div>
            </div>

            {/* ── 右下角巨型破格元素 (仿 TopSlot 的大紅牛) ── */}
            <div className="absolute -right-[10%] md:-right-[15%] -bottom-[2%] md:-bottom-[5%] w-[300px] h-[300px] md:w-[650px] md:h-[650px] z-50 pointer-events-none">
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
          className="flex flex-col items-center px-4 relative z-10"
          style={{ paddingTop: "8vh", paddingBottom: "10vh" }}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-[min(350px,80vw)] h-[min(350px,80vw)]"
          >
            <Image
              src="/logo.png"
              alt="戀財娛樂館 Logo"
              fill
              sizes="(max-width:640px) 80vw, 350px"
              className="object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
              priority
            />
          </motion.div>
          <div className="mt-[5vh]"><LoginForm /></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

