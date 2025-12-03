"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Github, Zap, Command } from "lucide-react";
import Link from "next/link";
import s from "./style.module.css"; 
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true)

    if(!password || !email) {
      toast.error("Both the fields are required !!")
      setLoading(false);
      return;
    }

    const res = await signIn('credentials', {
      username: email,
      password: password,
      redirect: false
    })

    if(!res?.error) {
      setLoading(false);
      router.push("/")
      toast.success("successfully signed in !!")
    } else {
      // can handle various cases here depending upon what status code does credentials provider send
      setLoading(false);
      toast.error("enter valid credentials")
    }
  }

  return (
    <div className={s.container}>
      <div className={s.card}>
        
        {/* LEFT SIDE: Visuals */}
        <div className={s.visualSide}>
          <div className={s.logo}>
            <Zap size={28} fill="currentColor" /> Smarna.
          </div>
          
          <div className="mb-10">
            <p className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: '#a1a1aa' }}>
              Welcome Back
            </p>
            <h2 className={s.marketingText}>
              Pick up right where you left off.
            </h2>
            <p className={s.marketingSub}>
              "Motivation is what gets you started. Habit is what keeps you going."
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: Form */}
        <div className={s.formSide}>
          <h1 className={s.title}>Sign In</h1>
          <p className={s.subtitle}>
            Enter your credentials to access your habit dashboard.
          </p>

          <form className={s.form}>
            {/* Email */}
            <div>
              <label className={s.label}>Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com" 
                className={s.input} 
              />
            </div>

            {/* Password */}
            <div>
              <label className={s.label}>Password</label>
              <div className={s.inputWrapper}>
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••" 
                  className={s.input} 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={s.iconBtn}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className={s.actions}>
              <label className={s.rememberMe}>
                <input type="checkbox" className={s.checkbox} />
                Remember me
              </label>
              <Link href="#" className={s.forgotLink}>
                Forgot password?
              </Link>
            </div>

            <button onClick={handleSubmit} disabled={loading} type="button" className={s.submitBtn}>
              Sign In
            </button>
          </form>

          <div className={s.divider}>
            <span className={s.dividerLine}></span>
            <span className={s.dividerText}>or continue with</span>
            <span className={s.dividerLine}></span>
          </div>

          <div className={s.socialGrid}>
            <button className={s.socialBtn}><span className="font-bold text-lg">G</span></button>
            <button className={s.socialBtn}><Github size={20} /></button>
            <button className={s.socialBtn}><Command size={20} /></button>
          </div>

          <p className={s.footer}>
            Don't have an account? 
            <Link href="/signup" className={s.link}>Sign up</Link>
          </p>
        </div>

      </div>
    </div>
  );
}