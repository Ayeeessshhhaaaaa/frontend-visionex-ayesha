'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/authStore";

export default function DashboardPage() {
  const { isLoggedIn, logout, user } = useAuthStore();
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem("session");

    if (session) {
      const parsedSession = JSON.parse(session);
      if (!parsedSession.state.isLoggedIn) {
        router.replace("/login");
      }
    } else {
      router.replace("/login");
    }

    setHydrated(true);
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!hydrated) return null;

  return (
    <main className="min-h-screen bg-[#171717] flex items-center justify-center px-6">
      <div className="w-full max-w-xl bg-[#1D1D21] rounded-2xl p-10 text-white shadow-xl border border-[#383838]">
        <div className="flex flex-col items-center">
          <img src="/logo1.svg" alt="Room.me Logo" className="w-35 mb-6" />

          <h1 className="text-3xl font-semibold mb-2 text-center">Welcome, you’re logged in.</h1>
          <p className="text-[#A0A0A0] text-lg mb-8">
            You're logged in as{" "}
            <span className="text-white font-medium">
              {user?.email || "user"}
            </span>
          </p>

          <button
            onClick={handleLogout}
            className="w-full py-3 rounded bg-gradient-to-r from-[#8B80FF] to-[#5C53BC] text-white text-md font-semibold hover:opacity-90 transition"
          >
            Log Out
          </button>
        </div>
      </div>
    </main>
  );
}
