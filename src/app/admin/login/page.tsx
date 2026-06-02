
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/admin/dashboard");
  };

  return (
    <>
      <style>{`
        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
        }

        .login-page{
          min-height:100vh;

          display:flex;
          justify-content:center;
          align-items:center;

          padding:20px;

          background:linear-gradient(
            135deg,
            #f8fbff 0%,
            #eef5ff 50%,
            #dbeafe 100%
          );

          position:relative;
          overflow:hidden;
        }

        .login-page::before{
          content:"";
          position:absolute;

          width:500px;
          height:500px;

          border-radius:50%;

          top:-250px;
          left:-250px;

          background:rgba(37,99,235,.15);
        }

        .login-page::after{
          content:"";
          position:absolute;

          width:600px;
          height:600px;

          border-radius:50%;

          bottom:-300px;
          right:-300px;

          background:rgba(96,165,250,.15);
        }

        .login-card{
          position:relative;
          z-index:2;

          width:100%;
          max-width:430px;

          background:rgba(255,255,255,.95);

          backdrop-filter:blur(15px);

          border-radius:28px;

          padding:40px;

          box-shadow:
            0 25px 60px rgba(37,99,235,.15);
        }

        .logo{
          width:80px;
          height:80px;

          margin:0 auto 20px;

          border-radius:20px;

          background:linear-gradient(
            135deg,
            #2563eb,
            #1d4ed8
          );

          display:flex;
          align-items:center;
          justify-content:center;

          color:white;
          font-size:30px;
          font-weight:800;
        }

        .title{
          text-align:center;
          font-size:32px;
          font-weight:800;

          color:#0f172a;

          margin-bottom:8px;
        }

        .subtitle{
          text-align:center;
          color:#64748b;

          margin-bottom:32px;
          line-height:1.6;
        }

        .form-group{
          margin-bottom:18px;
        }

        .label{
          display:block;

          margin-bottom:8px;

          font-size:14px;
          font-weight:600;

          color:#334155;
        }

        .input{
          width:100%;
          height:56px;

          border:1px solid #dbeafe;
          border-radius:14px;

          padding:0 16px;

          font-size:15px;

          transition:.2s;
        }

        .input:focus{
          outline:none;

          border-color:#2563eb;

          box-shadow:
            0 0 0 4px rgba(37,99,235,.12);
        }

        .login-btn{
          width:100%;
          height:56px;

          border:none;
          border-radius:14px;

          background:linear-gradient(
            135deg,
            #2563eb,
            #1d4ed8
          );

          color:white;

          font-size:16px;
          font-weight:700;

          cursor:pointer;

          transition:.2s;
        }

        .login-btn:hover{
          transform:translateY(-2px);

          box-shadow:
            0 10px 25px rgba(37,99,235,.25);
        }

        .login-btn:disabled{
          opacity:.7;
          cursor:not-allowed;
        }

        .footer-text{
          text-align:center;

          margin-top:20px;

          font-size:13px;
          color:#94a3b8;
        }
      `}</style>

      <div className="login-page">
        <div className="login-card">

          <div className="logo">
            AL
          </div>

          <h1 className="title">
            Login Admin
          </h1>

          <p className="subtitle">
            Aura Laundry Management System
          </p>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="label">
                Email
              </label>

              <input
                type="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label className="label">
                Password
              </label>

              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? "Memproses..." : "Masuk Dashboard"}
            </button>
          </form>

          <div className="footer-text">
            © 2026 Aura Laundry
          </div>

        </div>
      </div>
    </>
  );
}

