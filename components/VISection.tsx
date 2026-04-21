"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Gem, Wind, Droplet, Bug, Eye, Layers } from "lucide-react";

const SIZE = 280; // slightly smaller for better mobile fit
type Ease = [number, number, number, number];
const SPRING_EASE: Ease = [0.23, 1, 0.32, 1];

const PARTS = [
  { id: "ruby",     src: "/Ruby.png",     label: "紅寶石",    en: "RUBY",            symbol: "熱情 · 財富", color: "#C21E56", desc: "鑲嵌於冠冕頂端的帝王寶石，深紅色火焰象徵熱情與財富積累。", pos: { top: "4%",  left: "40%", width: "20%", height: "20%" }, z: 6, scatter: { x:  200, y: -220, r:  20 }, Icon: Gem     },
  { id: "wings",    src: "/Wings.png",    label: "展翼",      en: "WINGS",           symbol: "自由 · 庇護", color: "#D4AF37", desc: "雙翼舒展代表自由升騰，護佑財富不息流轉，象徵無垠的庇護。", pos: { top: "28%", left: "0%",  width: "100%",height: "40%" }, z: 2, scatter: { x: -300, y:  -60, r: -22 }, Icon: Wind    },
  { id: "teardrop", src: "/Teardrop.png", label: "聖淚",      en: "SACRED TEARDROP", symbol: "純粹 · 渴望", color: "#F5F1E1", desc: "神聖之淚，純粹靈魂的結晶，象徵財富本源的純粹本質。", pos: { top: "76%", left: "43%", width: "14%", height: "18%" }, z: 4, scatter: { x:  100, y:  250, r:  35 }, Icon: Droplet },
  { id: "scarab",   src: "/Scarab.png",   label: "聖甲蟲",    en: "SCARAB",          symbol: "循環 · 再生", color: "#C9A227", desc: "每日推動太陽升起，象徵財運滾滾、周而復始的永恆循環生生不息。", pos: { top: "46%", left: "22%", width: "56%", height: "44%" }, z: 3, scatter: { x:  260, y:  130, r:  28 }, Icon: Bug     },
  { id: "horus",    src: "/Horus.png",    label: "荷魯斯之眼", en: "EYE OF HORUS",   symbol: "洞察 · 守護", color: "#D4AF37", desc: "最強大的保護符文，皇權洞察力之象徵，凝視四方守護每一分財富。", pos: { top: "22%", left: "32%", width: "36%", height: "18%" }, z: 5, scatter: { x: -150, y: -250, r: -30 }, Icon: Eye     },
  { id: "brand",    src: "/Brand.png",    label: "品牌基底",  en: "BRAND BASE",      symbol: "傳承 · 永恆", color: "#D4AF37", desc: "標誌的神聖基底，承載所有古埃及符號的黃金舞台，對永恆財富的宣示。", pos: { top: "0%",  left: "0%",  width: "100%",height: "100%"}, z: 1, scatter: { x: -280, y:  180, r: -20 }, Icon: Layers  },
];

type Part = typeof PARTS[0];

export default function VISection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [scattered, setScattered] = useState(false);
  const [assembled, setAssembled] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const t1 = setTimeout(() => setScattered(true), 100);
    const t2 = setTimeout(() => setAssembled(true), 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [isInView]);

  const partAnimate = (part: Part) => {
    if (assembled) return { x: 0, y: 0, rotate: 0, opacity: 1 };
    if (scattered) return { x: part.scatter.x, y: part.scatter.y, rotate: part.scatter.r, opacity: 0.8 };
    return { x: part.scatter.x, y: part.scatter.y, rotate: part.scatter.r, opacity: 0 };
  };

  const partTransition = (i: number) => assembled
    ? { x: { duration: 0.65, delay: i * 0.07, ease: SPRING_EASE }, y: { duration: 0.65, delay: i * 0.07, ease: SPRING_EASE }, rotate: { duration: 0.6, delay: i * 0.07 }, opacity: { duration: 0.35, delay: i * 0.07 } }
    : { opacity: { duration: 0.5, delay: i * 0.12 } };

  return (
    <section
      id="vi-analysis"
      className="relative z-10 w-full flex flex-col items-center py-24 px-5"
      style={{ backgroundColor: "transparent", borderTop: "1px solid rgba(212,175,55,0.07)" }}
    >
      {/* Section Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-10">
        <p style={{ color: "rgba(212,175,55,0.35)", fontSize: "10px", letterSpacing: "0.45em" }}>01</p>
        <h2 style={{ color: "#D4AF37", fontSize: "clamp(20px,4.5vw,28px)", fontWeight: 700, letterSpacing: "0.28em", marginTop: "8px", fontFamily: "Georgia,serif" }}>VI 解析</h2>
        <p style={{ color: "rgba(212,175,55,0.4)", fontSize: "11px", letterSpacing: "0.22em", marginTop: "6px" }}>VISUAL IDENTITY</p>
      </motion.div>

      {/* Assembly Canvas */}
      <div ref={ref} className="relative flex-shrink-0 mb-14" style={{ width: SIZE, height: SIZE }}>
        {PARTS.map((part, i) => (
          <motion.div
            key={part.id}
            initial={{ x: part.scatter.x, y: part.scatter.y, rotate: part.scatter.r, opacity: 0 }}
            animate={partAnimate(part)}
            transition={partTransition(i)}
            style={{ position: "absolute", ...part.pos, zIndex: part.z }}
          >
            <Image src={part.src} alt={part.label} fill sizes={`${SIZE}px`} className="object-contain" />
          </motion.div>
        ))}
        <AnimatePresence>
          {assembled && (
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }}
              style={{ position: "absolute", inset: "-14px", borderRadius: "50%", border: "1px solid rgba(212,175,55,0.1)", pointerEvents: "none" }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Specification List (Text) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8"
      >
        {PARTS.map((p, i) => (
          <motion.div 
            key={p.id} 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col border-b border-[#D4AF37]/10 pb-5"
          >
            <div className="flex items-center gap-3 mb-2">
              <p.Icon size={16} color={p.color} style={{ filter: `drop-shadow(0 0 4px ${p.color}80)` }} />
              <h3 className="text-[#D4AF37] font-bold tracking-[0.15em] text-sm md:text-[15px]">{p.label} <span className="text-[9px] md:text-[10px] text-[#D4AF37]/50 ml-2 tracking-widest">{p.en}</span></h3>
              <span className="ml-auto text-[10px] text-[#D4AF37]/40 tracking-widest">{p.symbol}</span>
            </div>
            <p className="text-white/50 text-[13px] leading-relaxed tracking-wider pl-7">{p.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
