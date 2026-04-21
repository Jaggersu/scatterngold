"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";

// ── 子元件 ──────────────────────────────────────────────

const SectionTitle = ({ number, title }: { number: string; title: string }) => (
  <div className="flex items-center gap-3 mb-8">
    <span
      style={{ color: "rgba(212,175,55,0.35)", fontSize: "10px", letterSpacing: "0.3em", fontFamily: "monospace" }}
    >
      {number}
    </span>
    <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(212,175,55,0.12)" }} />
    <h2
      style={{
        color: "#D4AF37",
        fontSize: "13px",
        letterSpacing: "0.28em",
        fontWeight: "700",
        whiteSpace: "nowrap",
      }}
    >
      {title}
    </h2>
    <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(212,175,55,0.12)" }} />
  </div>
);

const FadeIn = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 36 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.7, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

// ── 色彩卡片 ───────────────────────────────────────────

const COLORS = [
  { name: "法老金", nameEn: "PHARAOH GOLD", hex: "#D4AF37", desc: "主色，權威與財富" },
  { name: "尼羅河藍綠", nameEn: "NILE TEAL", hex: "#1F4F5F", desc: "背景色，深邃與神秘" },
  { name: "紅寶石緋紅", nameEn: "RUBY CRIMSON", hex: "#C21E56", desc: "強調色，熱情與珍貴" },
  { name: "曜石黑", nameEn: "OBSIDIAN BLACK", hex: "#141414", desc: "底色，奢華與深沉" },
];

function ColorCard({
  name,
  nameEn,
  hex,
  desc,
}: {
  name: string;
  nameEn: string;
  hex: string;
  desc: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(hex);
    } catch {
      const el = document.createElement("textarea");
      el.value = hex;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <motion.div
      onClick={handleCopy}
      whileHover={{ scale: 1.03, y: -3 }}
      whileTap={{ scale: 0.97 }}
      className="cursor-pointer overflow-hidden"
      style={{
        borderRadius: "14px",
        border: "1px solid rgba(212,175,55,0.18)",
        backgroundColor: "rgba(0,0,0,0.28)",
      }}
    >
      <div
        style={{
          backgroundColor: hex,
          height: "76px",
          boxShadow: "inset 0 -6px 16px rgba(0,0,0,0.35)",
        }}
      />
      <div style={{ padding: "14px 16px" }}>
        <p style={{ color: "#D4AF37", fontWeight: "700", fontSize: "13px", letterSpacing: "0.06em" }}>
          {name}
        </p>
        <p style={{ color: "rgba(212,175,55,0.4)", fontSize: "9px", letterSpacing: "0.2em", marginTop: "2px" }}>
          {nameEn}
        </p>
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px", marginTop: "8px", lineHeight: 1.5 }}>
          {desc}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "10px",
            paddingTop: "8px",
            borderTop: "1px solid rgba(212,175,55,0.08)",
          }}
        >
          <code style={{ color: "rgba(212,175,55,0.65)", fontSize: "11px" }}>{hex}</code>
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="copied"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ color: "#6bffb8", fontSize: "10px" }}
              >
                ✓ 已複製
              </motion.span>
            ) : (
              <motion.span
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ color: "rgba(212,175,55,0.25)", fontSize: "10px" }}
              >
                點擊複製
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// ── Logo 標註 ──────────────────────────────────────────

const ANNOTATIONS = [
  {
    label: "紅寶石",
    en: "RUBY",
    desc: "象徵財富累積與熱情，鑲嵌於冠冕核心，閃耀珍貴光芒",
  },
  {
    label: "羽翼",
    en: "WINGS",
    desc: "代表自由升騰，護翼舒展守護每一份到來的財富",
  },
  {
    label: "聖甲蟲",
    en: "SCARAB",
    desc: "古埃及最神聖的護身符，象徵財運滾滾、循環不息",
  },
  {
    label: "荷魯斯之眼",
    en: "EYE OF HORUS",
    desc: "皇權洞察力的象徵，守護、智慧與保護的神聖圖騰",
  },
];

// ── 主元件 ────────────────────────────────────────────

interface BrandGuideProps {
  onClose: () => void;
}

export default function BrandGuide({ onClose }: BrandGuideProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "100%" }}
      transition={{ duration: 0.52, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{ backgroundColor: "#001a1a" }}
    >
      {/* 頂部導覽列 */}
      <div
        className="sticky top-0 z-10 flex items-center justify-between px-5 py-3.5"
        style={{
          backgroundColor: "rgba(0,26,26,0.92)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(212,175,55,0.1)",
        }}
      >
        <div>
          <p
            style={{ color: "rgba(212,175,55,0.4)", fontSize: "9px", letterSpacing: "0.38em" }}
          >
            BRAND IDENTITY GUIDE
          </p>
          <p
            style={{
              color: "#D4AF37",
              fontSize: "14px",
              letterSpacing: "0.18em",
              fontWeight: "700",
              marginTop: "1px",
            }}
          >
            戀財娛樂館
          </p>
        </div>
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.9 }}
          className="flex items-center justify-center cursor-pointer"
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            border: "1px solid rgba(212,175,55,0.35)",
            backgroundColor: "rgba(0,0,0,0.32)",
          }}
        >
          <X className="w-4 h-4" style={{ color: "#D4AF37" }} />
        </motion.button>
      </div>

      {/* 主要內容 */}
      <div className="max-w-xl mx-auto px-5 py-12" style={{ display: "flex", flexDirection: "column", gap: "72px" }}>

        {/* ── 1.0 標誌拆解 ── */}
        <FadeIn>
          <SectionTitle number="1.0" title="標誌拆解" />
          <div className="flex flex-col items-center gap-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ width: "200px", height: "200px", position: "relative" }}
            >
              <Image
                src="/logo.png"
                alt="戀財娛樂館 Logo"
                fill
                sizes="200px"
                className="object-contain"
                style={{ filter: "drop-shadow(0 8px 28px rgba(212,175,55,0.3))" }}
              />
            </motion.div>

            <div className="grid grid-cols-2 gap-3 w-full">
              {ANNOTATIONS.map((a, i) => (
                <motion.div
                  key={a.label}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  style={{
                    padding: "14px",
                    border: "1px solid rgba(212,175,55,0.18)",
                    borderRadius: "12px",
                    backgroundColor: "rgba(0,0,0,0.22)",
                  }}
                >
                  <p
                    style={{
                      color: "rgba(212,175,55,0.4)",
                      fontSize: "8px",
                      letterSpacing: "0.28em",
                    }}
                  >
                    {a.en}
                  </p>
                  <p
                    style={{
                      color: "#D4AF37",
                      fontSize: "15px",
                      fontWeight: "700",
                      marginTop: "3px",
                    }}
                  >
                    {a.label}
                  </p>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      fontSize: "11px",
                      marginTop: "7px",
                      lineHeight: 1.65,
                    }}
                  >
                    {a.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* ── 2.0 色彩計畫 ── */}
        <FadeIn delay={0.05}>
          <SectionTitle number="2.0" title="色彩計畫" />
          <div className="grid grid-cols-2 gap-3">
            {COLORS.map((c) => (
              <ColorCard key={c.hex} {...c} />
            ))}
          </div>
        </FadeIn>

        {/* ── 3.0 字體展示 ── */}
        <FadeIn delay={0.05}>
          <SectionTitle number="3.0" title="字體展示" />
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* 中文主標 */}
            <div
              style={{
                padding: "28px 22px",
                border: "1px solid rgba(212,175,55,0.15)",
                borderRadius: "14px",
                backgroundColor: "rgba(0,0,0,0.22)",
              }}
            >
              <p
                style={{
                  color: "rgba(212,175,55,0.35)",
                  fontSize: "9px",
                  letterSpacing: "0.35em",
                  marginBottom: "14px",
                }}
              >
                中文主標 — 明體 / 宋體 · Weight 800
              </p>
              <p
                style={{
                  color: "#D4AF37",
                  fontSize: "clamp(26px, 8vw, 42px)",
                  fontWeight: "800",
                  letterSpacing: "0.22em",
                  textShadow: "0 2px 18px rgba(212,175,55,0.4)",
                  lineHeight: 1.2,
                }}
              >
                戀財娛樂館
              </p>
              <div
                style={{
                  marginTop: "16px",
                  paddingTop: "12px",
                  borderTop: "1px solid rgba(212,175,55,0.08)",
                }}
              >
                <p style={{ color: "rgba(255,255,255,0.28)", fontSize: "11px", lineHeight: 1.8 }}>
                  字距 Letter-Spacing：0.22em<br />
                  字重 Font-Weight：800<br />
                  色彩：法老金 #D4AF37
                </p>
              </div>
            </div>

            {/* 英文副標 */}
            <div
              style={{
                padding: "28px 22px",
                border: "1px solid rgba(212,175,55,0.15)",
                borderRadius: "14px",
                backgroundColor: "rgba(0,0,0,0.22)",
              }}
            >
              <p
                style={{
                  color: "rgba(212,175,55,0.35)",
                  fontSize: "9px",
                  letterSpacing: "0.35em",
                  marginBottom: "14px",
                }}
              >
                英文副標 — 無襯線體 · Weight 600
              </p>
              <p
                style={{
                  color: "rgba(212,175,55,0.7)",
                  fontSize: "clamp(10px, 2.8vw, 14px)",
                  fontWeight: "600",
                  letterSpacing: "0.55em",
                  textTransform: "uppercase",
                }}
              >
                SCATTER ALL THE TIME
              </p>
              <div
                style={{
                  marginTop: "16px",
                  paddingTop: "12px",
                  borderTop: "1px solid rgba(212,175,55,0.08)",
                }}
              >
                <p style={{ color: "rgba(255,255,255,0.28)", fontSize: "11px", lineHeight: 1.8 }}>
                  字距 Letter-Spacing：0.55em<br />
                  字重 Font-Weight：600<br />
                  色彩：法老金 70% 透明度
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* 頁尾 */}
        <div className="text-center pb-6">
          <p style={{ color: "rgba(212,175,55,0.18)", fontSize: "10px", letterSpacing: "0.3em" }}>
            © 戀財娛樂館 · BRAND IDENTITY GUIDE
          </p>
        </div>
      </div>
    </motion.div>
  );
}
