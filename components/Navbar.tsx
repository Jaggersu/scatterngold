"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { MotionValue } from "framer-motion";
import Image from "next/image";
import type { User } from "@supabase/supabase-js";

const LEFT_LINKS  = [
  { label: "VI 解析",  id: "vi-analysis" },
  { label: "空間提案", id: "space-proposal" },
];
const RIGHT_LINKS = [
  { label: "品牌文案", id: "brand-copy" },
  { label: "未來計畫", id: "future-plan" },
];
const ALL_LINKS = [...LEFT_LINKS, ...RIGHT_LINKS];

const NAV_BTN: React.CSSProperties = {
  color: "rgba(212,175,55,0.5)",
  fontSize: "12px",
  letterSpacing: "0.18em",
  background: "none",
  border: "none",
  cursor: "pointer",
  transition: "color 0.2s",
  padding: "4px 0",
};

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  logoParallaxX?: MotionValue<number>;
  logoParallaxY?: MotionValue<number>;
}

export default function Navbar({ user, onLogout, logoParallaxX, logoParallaxY }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <AnimatePresence>
      {user && (
        <>
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-40"
            style={{
              height: "60px",
              backgroundColor: "rgba(20,20,20,0.92)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              borderBottom: "1px solid rgba(212,175,55,0.18)",
            }}
          >
            {/* ── 桌面版：三欄佈局 ── */}
            <div
              className="hidden md:grid h-full"
              style={{ gridTemplateColumns: "1fr auto 1fr", padding: "0 24px" }}
            >
              {/* 左側連結 */}
              <div className="flex items-center justify-end gap-7">
                {LEFT_LINKS.map((link, i) => (
                  <motion.button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.07 }}
                    whileHover={{ color: "#D4AF37" }}
                    style={NAV_BTN}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>

              {/* 中央 Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 20px" }}
              >
                <motion.div style={{ position: "relative", width: "116px", height: "42px", x: logoParallaxX, y: logoParallaxY }}>
                  <Image src="/logo.png" alt="戀財娛樂館" fill sizes="116px" className="object-contain" />
                </motion.div>
              </motion.div>

              {/* 右側連結 + 登出 */}
              <div className="flex items-center justify-start gap-7">
                {RIGHT_LINKS.map((link, i) => (
                  <motion.button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22 + i * 0.07 }}
                    whileHover={{ color: "#D4AF37" }}
                    style={NAV_BTN}
                  >
                    {link.label}
                  </motion.button>
                ))}
                <motion.button
                  onClick={onLogout}
                  whileHover={{ color: "#D4AF37" }}
                  style={{ ...NAV_BTN, color: "rgba(212,175,55,0.28)", fontSize: "11px", marginLeft: "6px" }}
                >
                  登出
                </motion.button>
              </div>
            </div>

            {/* ── 手機版：Logo 置中 + 漢堡 ── */}
            <div className="flex md:hidden h-full items-center justify-between px-5">
              <div style={{ width: "36px" }} />

              <motion.div style={{ position: "relative", width: "104px", height: "38px", x: logoParallaxX, y: logoParallaxY }}>
                <Image src="/logo.png" alt="戀財娛樂館" fill sizes="104px" className="object-contain" />
              </motion.div>

              <button
                onClick={() => setMenuOpen(v => !v)}
                style={{ width: "44px", height: "44px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "5px", background: "none", border: "none", cursor: "pointer" }}
                aria-label="選單"
              >
                {[0, 1, 2].map(i => (
                  <motion.span
                    key={i}
                    animate={
                      menuOpen
                        ? i === 0 ? { rotate: 45,  y: 6.5, opacity: 1 }
                        : i === 1 ? { opacity: 0,  scale: 0 }
                        :           { rotate: -45, y: -6.5, opacity: 1 }
                        : { rotate: 0, y: 0, opacity: 1, scale: 1 }
                    }
                    transition={{ duration: 0.25 }}
                    style={{ display: "block", width: "20px", height: "1.5px", backgroundColor: "#D4AF37", transformOrigin: "center", borderRadius: "1px" }}
                  />
                ))}
              </button>
            </div>
          </motion.nav>

          {/* ── 手機版抽屜選單 ── */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
                className="fixed z-30 left-0 right-0 flex flex-col"
                style={{
                  top: "60px",
                  backgroundColor: "rgba(12,12,12,0.97)",
                  backdropFilter: "blur(20px)",
                  borderBottom: "1px solid rgba(212,175,55,0.12)",
                  paddingBottom: "8px",
                }}
              >
                {ALL_LINKS.map(link => (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    style={{ padding: "15px 28px", color: "rgba(212,175,55,0.7)", fontSize: "12px", letterSpacing: "0.22em", textAlign: "left", background: "none", border: "none", cursor: "pointer" }}
                  >
                    {link.label}
                  </button>
                ))}
                <div style={{ height: "1px", backgroundColor: "rgba(212,175,55,0.08)", margin: "4px 28px 4px" }} />
                <button
                  onClick={() => { onLogout(); setMenuOpen(false); }}
                  style={{ padding: "13px 28px", color: "rgba(212,175,55,0.35)", fontSize: "11px", letterSpacing: "0.2em", textAlign: "left", background: "none", border: "none", cursor: "pointer" }}
                >
                  登出
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}
