"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import LoginForm from "@/components/LoginForm";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

// 背景隨機金點
const GOLDEN_DOTS = [
  { top: "5%",  left: "8%",   size: "80px",  delay: "0s"   },
  { top: "25%", left: "85%",  size: "150px", delay: "2s"   },
  { top: "45%", left: "-2%",  size: "120px", delay: "1.5s" },
  { top: "65%", left: "90%",  size: "90px",  delay: "3s"   },
  { top: "85%", left: "15%",  size: "160px", delay: "0.5s" },
];

const CARDS = [
  { id: "vi-analysis", title: "VI 解析", desc: "標誌的每一道線條，都是對永恆財富的宣示。", img: "/Ruby.png", imgClass: "absolute -right-4 -bottom-6 w-32 h-32 md:-right-8 md:-bottom-10 md:w-44 md:h-44 object-contain z-20 drop-shadow-[0_15px_15px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-110" },
  { id: "space-proposal", title: "空間提案", desc: "沉穩曜石黑交織法老金，展現內斂奢華的王者空間。", img: "/Wings.png", imgClass: "absolute -right-6 -bottom-8 w-40 h-40 md:-right-12 md:-bottom-12 md:w-56 md:h-56 object-contain z-20 drop-shadow-[0_15px_15px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-110" },
  { id: "brand-copy", title: "品牌文案", desc: "我們不只提供娛樂，更提供一場改寫命運的旅程。", img: "/Teardrop.png", imgClass: "absolute -right-2 -bottom-2 w-28 h-28 md:-right-4 md:-bottom-4 md:w-40 md:h-40 object-contain z-20 drop-shadow-[0_15px_15px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-110" },
  { id: "future-plan", title: "未來計畫", desc: "重塑標準，只為滿足您對完美的苛求。", img: "/Scarab.png", imgClass: "absolute -right-6 -bottom-6 w-36 h-36 md:-right-10 md:-bottom-10 md:w-48 md:h-48 object-contain z-20 drop-shadow-[0_15px_15px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-110" },
];

const COLORS = [
  { name: "Pharaoh Gold", hex: "#D4AF37" },
  { name: "Ruby Crimson", hex: "#C21E56" },
  { name: "Deep Obsidian", hex: "#141414" },
  { name: "Aged Parchment", hex: "#F5F1E1" },
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div
      className="relative flex min-h-screen flex-col items-center overflow-x-hidden"
      style={{ backgroundColor: "#0a1212" }}
    >
      {/* ── 登入後背景光點 ── */}
      {user && GOLDEN_DOTS.map((dot, i) => (
        <div key={i} className="bg-dot" style={{ top: dot.top, left: dot.left, width: dot.size, height: dot.size, animationDelay: dot.delay }} />
      ))}

      <Navbar user={user} onLogout={handleLogout} />

      <div className="relative z-10 w-full" style={{ paddingTop: user ? "60px" : "0" }}>
        <AnimatePresence mode="wait">
          {user ? (
            /* ── 登入後：Dashboard 排版 ── */
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-6xl mx-auto px-5 md:px-8 py-10 flex flex-col gap-14"
            >
              {/* Hero Banner (左文右圖) */}
              <div className="relative w-full rounded-[24px] overflow-hidden border border-[#D4AF37]/20 bg-[#0c1616]/80 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                {/* 漸層光暈底 */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 to-transparent pointer-events-none" />
                
                <div className="relative flex flex-col md:flex-row items-center justify-between p-8 md:p-14 gap-8">
                  <div className="flex flex-col items-start flex-1 max-w-xl">
                    <motion.h1 
                      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                      className="text-3xl md:text-5xl font-bold text-[#D4AF37] font-serif leading-tight mb-4 tracking-wider"
                    >
                      戀財：<br />重塑娛樂新標竿
                    </motion.h1>
                    <motion.p 
                      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                      className="text-white/60 text-sm md:text-base leading-relaxed tracking-wider mb-8"
                    >
                      尊貴的會員您好，歡迎來到戀財娛樂館。<br />
                      我們將古埃及的神聖符號化為實質的財富體驗，為您開啟一場改寫命運的神秘旅程。
                    </motion.p>
                    <motion.button 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(212,175,55,0.2)" }} whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 rounded-full border border-[#D4AF37] text-[#D4AF37] text-sm font-semibold tracking-[0.2em] bg-[#D4AF37]/10 transition-colors"
                    >
                      開始探索
                    </motion.button>
                  </div>

                  <div className="flex-1 relative w-full h-[180px] md:h-[260px] flex items-center justify-center md:justify-end">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8, rotate: 5 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: 0.4, type: "spring" }}
                      className="relative w-full h-full max-w-[320px]"
                    >
                      <Image src="/logo.png" alt="Logo" fill className="object-contain drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]" priority />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* 四大單元卡片 (The Grid) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                {CARDS.map((card, i) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="group relative w-full h-[220px] md:h-[280px] rounded-2xl bg-[#0c1616]/90 border border-[#D4AF37]/20 p-6 md:p-8 flex flex-col justify-start overflow-visible hover:border-[#D4AF37]/50 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] transition-all duration-300"
                  >
                    <h3 className="text-xl md:text-2xl font-bold text-[#D4AF37] tracking-[0.15em] mb-3 font-serif relative z-30">{card.title}</h3>
                    <p className="text-white/50 text-xs md:text-sm tracking-wider max-w-[65%] leading-relaxed relative z-30">{card.desc}</p>
                    
                    {/* 3D 破框圖片 */}
                    <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ overflow: "visible" }}>
                      <Image src={card.img} alt={card.title} fill={false} width={240} height={240} className={card.imgClass} />
                    </div>

                    <div className="mt-auto relative z-30">
                      <span className="text-[#D4AF37]/40 text-xs tracking-widest border-b border-[#D4AF37]/20 pb-1 group-hover:text-[#D4AF37] group-hover:border-[#D4AF37] transition-colors cursor-pointer">
                        VIEW DETAILS →
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* 底部：合作與規格 (Specs) */}
              <motion.div 
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                className="w-full flex flex-col items-center border-t border-[#D4AF37]/10 pt-12 pb-6 mt-6"
              >
                <p className="text-[#D4AF37]/30 text-xs tracking-[0.3em] mb-8 font-serif">BRAND SPECIFICATIONS</p>
                <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                  {COLORS.map((c, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full border border-white/10 shadow-[0_2px_10px_rgba(0,0,0,0.5)]" style={{ backgroundColor: c.hex }} />
                      <div className="flex flex-col">
                        <span className="text-white/70 text-xs tracking-widest font-serif">{c.name}</span>
                        <span className="text-white/30 text-[10px] tracking-widest font-mono">{c.hex}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ) : (
            /* ── 未登入： Logo + 登入表單 ── */
            <motion.div
              key="guest"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center px-4"
              style={{ paddingTop: "8vh", paddingBottom: "10vh" }}
            >
              <motion.div
                initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1, ease: "easeOut" }}
                className="relative w-[min(350px,80vw)] h-[min(350px,80vw)]"
              >
                <Image src="/logo.png" alt="戀財娛樂館 Logo" fill sizes="(max-width:640px) 80vw, 350px" className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]" priority />
              </motion.div>
              <div className="mt-[5vh]"><LoginForm /></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
