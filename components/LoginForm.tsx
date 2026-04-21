"use client";

import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function LoginForm() {
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: typeof window !== "undefined" ? window.location.origin : "/" },
    });
  };

  return (
    <motion.button
      onClick={handleGoogleLogin}
      whileHover={{ scale: 1.04, backgroundColor: "rgba(212,175,55,0.14)" }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.5 }}
      className="flex items-center justify-center gap-3 rounded-full text-sm font-semibold cursor-pointer"
      style={{
        width: "320px",
        padding: "15px 28px",
        backgroundColor: "rgba(0,0,0,0.22)",
        border: "1.5px solid #D4AF37",
        color: "#D4AF37",
        letterSpacing: "0.15em",
        boxShadow: "0 0 18px rgba(212,175,55,0.12)",
      }}
    >
      <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden="true" className="shrink-0">
        <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908C16.658 14.013 17.64 11.706 17.64 9.2z"/>
        <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
        <path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z"/>
        <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
      </svg>
      以 Google 帳號登入
    </motion.button>
  );
}
