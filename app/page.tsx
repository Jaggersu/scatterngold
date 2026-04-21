"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

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
    <div className="min-h-screen bg-obsidian text-white flex flex-col items-center justify-center p-8">
      {user ? (
        <div className="flex flex-col items-center gap-4">
          <p>已登入</p>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 border border-white/20 rounded hover:bg-white/10 transition-colors"
          >
            登出
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <p>未登入</p>
          <p className="text-sm text-white/50">請重新設計登入介面</p>
        </div>
      )}
    </div>
  );
}