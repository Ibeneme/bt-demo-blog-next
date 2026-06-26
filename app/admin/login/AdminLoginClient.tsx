<<<<<<< HEAD
// app/admin/login/AdminLoginClient.tsx
=======
>>>>>>> feature/improved-dashboard
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
<<<<<<< HEAD
import { createClient } from "@/lib/supabase/client";
import { ShieldCheck, Mail, Lock, Loader2 } from "lucide-react";

export default function AdminLoginClient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      console.error("Login Error:", loginError);
      setError(loginError.message);
    } else {
      console.log("✅ Login Successful!");

      if (data.session?.access_token) {
        localStorage.setItem("adminToken", data.session.access_token);
        localStorage.setItem("adminUser", JSON.stringify(data.user));
      }

      router.push("/admin/dashboard");
      router.refresh();
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="mx-auto w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-6">
            <ShieldCheck className="w-9 h-9 text-[#067F76]" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Portal</h1>
          <p className="text-slate-500 mt-2">ARIAD Psychological Services</p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl"
        >
          <div className="space-y-6">
            <div>
              <label className="text-xs uppercase tracking-widest text-slate-500 block mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-4 text-slate-400"
                  size={20}
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 py-4 focus:border-[#067F76] outline-none"
                  placeholder="admin@ariadpsychservices.com"
                />
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-widest text-slate-500 block mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-4 text-slate-400"
                  size={20}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-20 py-4 focus:border-[#067F76] outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-[#067F76] hover:text-[#05635c] text-sm font-medium"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center bg-red-50 py-2 rounded-lg">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#067F76] hover:bg-[#05635c] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} /> Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </form>
=======
import {
  ShieldCheck,
  Mail,
  Lock,
  Loader2,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";

type AuthMode = "login" | "forgot" | "reset";

export default function AdminLoginClient() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const endpoint = "/api/auth"; // ← Single endpoint

    const body = {
      action:
        mode === "login"
          ? "signin"
          : mode === "forgot"
          ? "forgot-password"
          : "reset-password",
      ...(mode === "login" && { email, password }),
      ...(mode === "forgot" && { email }),
      ...(mode === "reset" && { email, otp, newPassword }),
    };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        const text = await res.text();
        throw new Error(text || "Server error");
      }

      if (!res.ok) throw new Error(data.error || "Authentication failed");

      if (mode === "login") {
        localStorage.setItem("adminToken", data.token);
        router.push("/admin/dashboard");
      } else if (mode === "forgot") {
        setMode("reset");
        setSuccess("OTP sent! Please check your email.");
      } else {
        setMode("login");
        setSuccess("Password reset successfully. Please login.");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const deleteAllAdmins = async () => {
    if (!confirm("⚠️ This will delete ALL admins. Are you 100% sure?")) return;

    const res = await fetch("/api/admin/delete-all", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-[#067F76] to-teal-700 rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-teal-500/20">
            <ShieldCheck className="w-11 h-11 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
            {mode === "login" && "Welcome Back"}
            {mode === "forgot" && "Reset Password"}
            {mode === "reset" && "Create New Password"}
          </h1>
          <p className="text-slate-600 mt-3 text-lg">
            {mode === "login" && "Sign in to access admin dashboard"}
            {mode === "forgot" && "We'll send you an OTP"}
            {mode === "reset" && "Enter OTP and new password"}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-10 shadow-2xl shadow-slate-300/60 backdrop-blur-xl">
          <form onSubmit={handleAuth} className="space-y-8">
            {/* Email Field */}
            {mode !== "reset" && (
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.125em] text-slate-500 font-medium block">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Mail size={20} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 pl-12 pr-5 py-4 rounded-2xl focus:outline-none focus:border-[#067F76] focus:ring-1 focus:ring-[#067F76] transition-all placeholder:text-slate-400"
                    placeholder="admin@company.com"
                  />
                </div>
              </div>
            )}

            {/* Login Password Field */}
            {mode === "login" && (
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.125em] text-slate-500 font-medium block">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Lock size={20} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 pl-12 pr-12 py-4 rounded-2xl focus:outline-none focus:border-[#067F76] focus:ring-1 focus:ring-[#067F76] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setMode("forgot")}
                  className="text-sm text-[#067F76] hover:text-teal-700 font-semibold transition-colors mt-2 block"
                >
                  Forgot your password?
                </button>
                {/**/}
              </div>
            )}

            {/* Reset Mode Fields */}
            {mode === "reset" && (
              <>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.125em] text-slate-500 font-medium block">
                    OTP Code
                  </label>
                  <input
                    type="text"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 px-5 py-4 rounded-2xl focus:outline-none focus:border-[#067F76] focus:ring-1 focus:ring-[#067F76] transition-all text-center text-xl tracking-widest placeholder:text-slate-400"
                    placeholder="123456"
                    maxLength={6}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.125em] text-slate-500 font-medium block">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <Lock size={20} />
                    </div>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 pl-12 pr-12 py-4 rounded-2xl focus:outline-none focus:border-[#067F76] focus:ring-1 focus:ring-[#067F76] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showNewPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Messages */}
            {error && (
              <p className="text-red-500 text-sm text-center bg-red-50 border border-red-100 py-3 rounded-2xl">
                {error}
              </p>
            )}
            {success && (
              <p className="text-emerald-600 text-sm text-center bg-emerald-50 border border-emerald-100 py-3 rounded-2xl">
                {success}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#067F76] to-teal-700 hover:from-teal-700 hover:to-[#067F76] text-white py-4 rounded-2xl font-semibold text-lg shadow-lg shadow-teal-500/30 transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-3 active:scale-[0.985]"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={22} />
                  Processing...
                </>
              ) : mode === "login" ? (
                "Sign In"
              ) : mode === "forgot" ? (
                "Send OTP"
              ) : (
                "Reset Password"
              )}
            </button>

            {/* Back Button */}
            {mode !== "login" && (
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setError("");
                  setSuccess("");
                }}
                className="w-full flex items-center justify-center gap-2 text-slate-500 hover:text-slate-700 text-sm font-medium py-3 transition-colors"
              >
                <ArrowLeft size={18} /> Back to Login
              </button>
            )}
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-400 text-xs mt-8">
          Secure Admin Portal • Powered by your system
        </p>
>>>>>>> feature/improved-dashboard
      </div>
    </div>
  );
}
