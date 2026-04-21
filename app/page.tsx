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
  { top: "4%",  left: "-6%", size: "420px", opacity: 0.28, delay: "0s"   },
  { top: "18%", left: "78%", size: "340px", opacity: 0.22, delay: "2.2s" },
  { top: "62%", left: "-5%", size: "300px", opacity: 0.20, delay: "1.4s" },
  { top: "80%", left: "72%", size: "380px", opacity: 0.24, delay: "3s"   },
];

const GRID_CARDS = [
  { id: "vi-analysis",    title: "VI 解析",  desc: "標誌的每一道線條，都是對永恆財富的宣示。",   img: "/Ruby.png",     w: 130, h: 130, accent: "#C21E56" },
  { id: "space-proposal", title: "空間提案", desc: "沉穩曜石黑交織法老金，打造王者空間。",        img: "/Wings.png",    w: 170, h: 120, accent: "#D4AF37" },
  { id: "brand-copy",     title: "品牌文案", desc: "改寫命運的神秘旅程，重塑娛樂新標準。",        img: "/Teardrop.png", w: 110, h: 140, accent: "#C21E56" },
  { id: "future-plan",    title: "未來計畫", desc: "重塑標準，只為滿足您對完美的苛求。",          img: "/Scarab.png",   w: 150, h: 140, accent: "#D4AF37" },
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
           登入後：Dashboard
        ══════════════════════ */
        <motion.div
          key="dashboard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative min-h-screen overflow-x-hidden"
          style={{ backgroundColor: "#141414" }}
        >
          {/* ── 背景紅寶石光暈 ── */}
          {GLOW_BLOBS.map((b, i) => (
            <div
              key={i}
              className="pointer-events-none absolute rounded-full z-0"
              style={{
                top: b.top, left: b.left,
                width: b.size, height: b.size,
                background: `radial-gradient(circle, rgba(194,30,86,${b.opacity}) 0%, transparent 70%)`,
                filter: "blur(80px)",
                animationDelay: b.delay,
              }}
            />
          ))}

          {/* ── Navbar ── */}
          <nav
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-12"
            style={{
              height: "60px",
              backgroundColor: "rgba(20,20,20,0.88)",
              backdropFilter: "blur(14px)",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            {/* 左：品牌 */}
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <div className="relative w-8 h-8">
                <Image src="/logo.png" alt="戀財" fill className="object-contain" />
              </div>
              <span
                className="text-sm font-bold tracking-[0.18em] font-serif hidden sm:inline"
                style={{ color: "#D4AF37" }}
              >
                戀財娛樂館
              </span>
            </div>

            {/* 中：導覽連結 */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map(link => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-white/60 hover:text-white text-xs tracking-[0.15em] transition-colors duration-200 bg-transparent border-0 cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* 右：登出 */}
            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-full text-white text-xs font-bold tracking-[0.15em] transition-all hover:brightness-110 active:scale-95 flex-shrink-0"
              style={{
                backgroundColor: "#C21E56",
                boxShadow: "0 0 18px rgba(194,30,86,0.45)",
              }}
            >
              登出
            </button>
          </nav>

          {/* ── 主內容區 ── */}
          <main
            className="relative z-10 max-w-[1280px] mx-auto px-5 md:px-10 flex flex-col gap-8"
            style={{ paddingTop: "80px", paddingBottom: "80px" }}
          >
            {/* Hero Banner */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.55 }}
              className="relative w-full rounded-2xl overflow-visible"
              style={{
                background: "linear-gradient(120deg, #1F4F5F 0%, #0d2030 55%, #141414 100%)",
                border: "1px solid rgba(212,175,55,0.18)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.65)",
                minHeight: "260px",
              }}
            >
              <div className="relative flex flex-col md:flex-row items-center justify-between px-8 md:px-14 py-12 md:py-14 gap-8 overflow-visible">
                {/* 左側文案 */}
                <div className="flex flex-col items-start max-w-lg z-10">
                  <p
                    className="text-[10px] tracking-[0.45em] mb-5 font-serif uppercase"
                    style={{ color: "rgba(212,175,55,0.55)" }}
                  >
                    Welcome Back
                  </p>
                  <h1 className="text-4xl md:text-6xl font-bold text-white font-serif leading-tight mb-2 tracking-wide">
                    戀財娛樂館
                  </h1>
                  <p
                    className="text-base md:text-lg tracking-[0.1em] mb-8 font-serif"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    重塑娛樂新標竿
                  </p>
                  <button
                    className="px-8 py-3.5 rounded-full text-white text-sm font-bold tracking-[0.22em] flex items-center gap-2 transition-all hover:brightness-115 hover:scale-105 active:scale-97"
                    style={{
                      backgroundColor: "#C21E56",
                      boxShadow: "0 0 28px rgba(194,30,86,0.55)",
                    }}
                  >
                    立即探索 <span className="text-base leading-none">→</span>
                  </button>
                </div>

                {/* 右側 3D 破框圖 */}
                <div className="relative flex-shrink-0 w-[220px] h-[220px] md:w-[320px] md:h-[320px]">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.75, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.35, type: "spring", stiffness: 55, damping: 16 }}
                    className="absolute w-full h-full"
                    style={{ top: "-30px", right: "-20px" }}
                  >
                    <Image
                      src="/logo.png"
                      alt="戀財娛樂館"
                      fill
                      className="object-contain"
                      style={{ filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.85))" }}
                      priority
                    />
                  </motion.div>
                </div>
              </div>
            </motion.section>

            {/* The Grid */}
            <section
              id="vi-analysis"
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 md:auto-rows-[200px]"
            >
              {GRID_CARDS.map((card, i) => (
                <motion.div
                  key={card.id}
                  id={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="group relative rounded-2xl p-5 flex flex-col justify-between overflow-visible cursor-pointer transition-all duration-300"
                  style={{
                    backgroundColor: "#1A1A1A",
                    border: "1px solid rgba(255,255,255,0.06)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                  }}
                  whileHover={{
                    borderColor: "rgba(212,175,55,0.4)",
                    boxShadow: "0 0 28px rgba(212,175,55,0.1), 0 4px 20px rgba(0,0,0,0.5)",
                    backgroundColor: "#1f1f1f",
                  }}
                >
                  {/* 文字區 */}
                  <div className="relative z-10">
                    <h3 className="text-white font-bold text-base md:text-lg font-serif tracking-[0.1em] mb-1.5">
                      {card.title}
                    </h3>
                    <div
                      className="w-7 h-0.5 rounded-full mb-3"
                      style={{ backgroundColor: card.accent }}
                    />
                    <p className="text-white/40 text-[11px] md:text-xs leading-relaxed tracking-wide">
                      {card.desc}
                    </p>
                  </div>

                  {/* 破框圖示 */}
                  <div
                    className="absolute pointer-events-none z-20"
                    style={{ bottom: "-14px", right: "-8px" }}
                  >
                    <Image
                      src={card.img}
                      alt={card.title}
                      width={card.w}
                      height={card.h}
                      className="object-contain opacity-75 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                      style={{ filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.9))" }}
                    />
                  </div>

                  {/* Read More */}
                  <span
                    className="relative z-10 mt-auto text-[10px] tracking-[0.2em] uppercase font-bold transition-colors duration-300 group-hover:text-[#C21E56]"
                    style={{ color: "rgba(255,255,255,0.2)" }}
                  >
                    Explore →
                  </span>
                </motion.div>
              ))}
            </section>

            {/* 底部品牌規格列 */}
            <motion.footer
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-wrap items-center justify-between gap-6 pt-8"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="flex items-center gap-2.5">
                <div className="relative w-6 h-6 opacity-35">
                  <Image src="/logo.png" alt="戀財" fill className="object-contain" />
                </div>
                <span
                  className="text-[10px] tracking-[0.3em] font-serif"
                  style={{ color: "rgba(255,255,255,0.28)" }}
                >
                  戀財娛樂館 · SCATTER WEALTH
                </span>
              </div>
              <div className="flex gap-5 items-center">
                {[
                  { name: "Pharaoh Gold",  hex: "#D4AF37" },
                  { name: "Ruby Crimson",  hex: "#C21E56" },
                  { name: "Deep Obsidian", hex: "#2a2a2a" },
                ].map(c => (
                  <div key={c.hex} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: c.hex, boxShadow: `0 0 6px ${c.hex}80` }}
                    />
                    <span
                      className="hidden md:inline text-[9px] tracking-widest font-mono"
                      style={{ color: "rgba(255,255,255,0.28)" }}
                    >
                      {c.hex}
                    </span>
                  </div>
                ))}
              </div>
            </motion.footer>
          </main>
        </motion.div>
      ) : (
        /* ══════════════════════
           未登入：置中 Logo + LoginForm（保持不變）
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

