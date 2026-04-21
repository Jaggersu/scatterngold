import Image from "next/image";
import LoginForm from "@/components/LoginForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* 奢華極簡的環境光暈 (Subtle glow) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-12 w-full px-5">
        {/* Logo 區塊 */}
        <div className="relative w-[280px] h-[280px] md:w-[360px] md:h-[360px]">
          <Image
            src="/logo.png"
            alt="戀財娛樂館"
            fill
            className="object-contain drop-shadow-[0_0_25px_rgba(212,175,55,0.15)]"
            priority
          />
        </div>

        {/* 登入表單區塊 */}
        <div className="w-full max-w-sm mt-8">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
