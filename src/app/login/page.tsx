"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/authStore";
import { validateLogin } from "../services/authService";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

const slides = [
  {
    img: "/image1.jpg",
    text: '"We love the screen sharing and whiteboarding features, which have improved our presentations. Room.me has become an essential tool for our team, allowing us to collaborate effectively. Highly recommended!"',
    name: "Sarah Markivoc - Project Manager",
  },
  {
    img: "/image2.png",
    text: '"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s"',
    name: "jon Doe - Team Lead",
  },
  {
    img: "/image3.jpg",
    text: '"the standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum"',
    name: "Emily Ha - UX Designer",
  },
  {
    img: "/image4.png",
    text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"',
    name: "Jason - Scrum Master",
  },
  {
    img: "/image5.jpg",
    text: '"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam"',
    name: "Alicia Keys - Product Owner",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state: any) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [current, setCurrent] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (validateLogin(email, password)) {
        login(email);
        router.push("/dashboard");
      } else {
        setError("Invalid credentials");
      }
      setLoading(false);
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-[#171717] flex flex-col md:flex-row items-center justify-center px-20 py-10">
      <div className="w-full md:w-1/2 max-w-xl text-white">
        <img src="/logo1.svg" alt="Room.me Logo" className="w-24 mb-10" />

        <h2 className="text-3xl md:text-4xl font-semibold mb-2">
          Welcome back to Room.me!
        </h2>
        <p className="text-lg md:text-xl mb-8">
          Room.me is an innovative video conference product that revolutionizes
          virtual meetings.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-lg font-medium mb-2">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full p-3 rounded border border-[#383838] bg-[#1D1D21] text-white placeholder:text-[#878787]"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-lg font-medium mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full p-3 rounded border border-[#383838] bg-[#1D1D21] text-white placeholder:text-[#878787] pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#878787]"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded text-white text-md font-semibold transition flex items-center justify-center gap-2 ${
              loading
                ? "bg-gradient-to-r from-[#8B80FF] to-[#5C53BC] opacity-70 cursor-not-allowed"
                : "bg-gradient-to-r from-[#8B80FF] to-[#5C53BC] hover:opacity-90"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                Loading..
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              </div>
            ) : (
              "Sign In"
            )}
          </button>

          <button
            type="button"
            className="w-full py-3 rounded bg-white text-black text-md font-semibold flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-100 transition"
          >
            <FcGoogle className="text-2xl" />
            Sign in with Google
          </button>

          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-[#A0A0A0] mt-4 gap-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4 appearance-none border border-[#878787] rounded bg-transparent checked:bg-[#1D1D21] checked:border-[#1D1D21] focus:outline-none relative before:content-[''] before:absolute before:top-[2px] before:left-[6px] before:w-[6px] before:h-[12px] before:border-r-2 before:border-b-2 before:border-[#8B80FF] before:rotate-45 before:scale-0 checked:before:scale-100 transition-all"
              />
              <span className="text-white">Remember for 30 days</span>
            </label>

            <Link
              href="/forgot-password"
              className="text-[#A89FFF] underline hover:opacity-80"
            >
              Forgot password?
            </Link>
          </div>

          <p className="text-center text-sm text-white mt-6">
            Doesn’t have an account?{" "}
            <Link
              href="/signup"
              className="font-bold underline text-white hover:text-[#A89FFF] transition"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>

      <div className="hidden md:flex w-full md:w-1/2 justify-center items-center mt-10 md:mt-0 ">
        <div className="relative w-full max-w-md h-[500px] md:h-[640px] rounded-2xl overflow-hidden">
          <img
            src={slides[current].img}
            alt={`Slide ${current}`}
            className="w-full h-full object-cover rounded-2xl transition-all duration-500"
          />
          <div className="absolute bottom-4 left-4 right-4 bg-white/20 backdrop-blur-lg text-white p-4 md:p-6 rounded-2xl">
            <p className="text-base md:text-lg mb-2">{slides[current].text}</p>
            <p className="text-sm md:text-md font-medium">
              {slides[current].name}
            </p>
          </div>

          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-14 h-[5px] rounded-full transition-all duration-300 ${
                  index === current ? "bg-[#8B80FF]" : "bg-white/40"
                }`}
                onClick={() => setCurrent(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
