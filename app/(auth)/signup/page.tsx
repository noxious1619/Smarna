"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Github, Zap, Command } from "lucide-react";
import Link from "next/link";
import s from "./style.module.css"; 
import toast from "react-hot-toast";
import axios from "axios"
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async () => {
    if(!email || !username || !name || !password) {
      toast.error("All fields are required !!");
      return;
    }

    try {
      setLoading(true);
  
      const res = await axios.post("/api/auth/signup", {
        email,
        username, 
        password, 
        name
      })

      if(res) {
        toast.success("User Signed up successfully !!")
        router.push("/login")
      }else {
        toast.error("Something went wrong while signing you up !!");
      }
    } catch (error: any) {
      console.log(error)
      toast.error(error.response?.data?.error || "Something went wrong, pls try again !!")
    } finally {
      setLoading(false);
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
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-4">
              Consistency Starts Here
            </p>
            <h2 className={s.marketingText}>
              Build habits that actually stick with personalized AI accountability.
            </h2>
            <p className={s.marketingSub}>
              "We are what we repeatedly do. Excellence, then, is not an act, but a habit."
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: Form */}
        <div className={s.formSide}>
          <div className={s.asterisk}>*</div>
          <h1 className={s.title}>Join Smarna</h1>
          <p className={s.subtitle}>
            Start your journey towards a better version of yourself. 
            Create, track, and sustain your daily goals.
          </p>

          <form className={s.form}>
            <div>
              <label className={s.label}>Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. John Doe" 
                className={s.input} 
              />
            </div>

            <div>
              <label className={s.label}>username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={s.input} 
              />
            </div>

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

            <div>
              <label className={s.label}>Create Password</label>
              <div className={s.inputWrapper}>
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <button onClick={handleSignup} disabled={loading} type="button" className={s.submitBtn}>
              Create Free Account
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
            Already have an account? 
            <Link href="/login" className={s.link}>Log in</Link>
          </p>
        </div>

      </div>
    </div>
  );
}