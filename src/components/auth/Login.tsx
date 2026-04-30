import { useState } from "react";
import type { ChangeEvent, ReactNode } from "react";
import { Eye, EyeOff, ArrowRight, Shield, Clock, TrendingUp } from "lucide-react";

const features = [
  {
    icon: <TrendingUp size={16} />,
    title: "Fast approvals",
    desc: "Get loan decisions in minutes, not days.",
  },
  {
    icon: <Shield size={16} />,
    title: "Bank-grade security",
    desc: "256-bit encryption. Your data stays private.",
  },
  {
    icon: <Clock size={16} />,
    title: "Flexible repayment",
    desc: "Plans that adapt to your income and schedule.",
  },
];

interface FieldProps {
  label: string;
  type?: string;
  placeholder: string;
  suffix?: ReactNode;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Field = ({ label, type = "text", placeholder, suffix, value, onChange }: FieldProps) => {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={{
        display: "block",
        fontSize: 11,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "#6b7280",
        marginBottom: 7,
        fontFamily: "'DM Sans', 'Nunito', sans-serif",
        fontWeight: 600,
      }}>
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            padding: "12px 16px",
            paddingRight: suffix ? 44 : 16,
            fontSize: 14,
            fontFamily: "'DM Sans', 'Nunito', sans-serif",
            background: focused ? "#f0fdf4" : "#f9fafb",
            border: `1.5px solid ${focused ? "#16a34a" : "#e5e7eb"}`,
            borderRadius: 12,
            color: "#111827",
            outline: "none",
            boxSizing: "border-box",
            transition: "border-color 0.2s, background 0.2s",
          }}
        />
        {suffix && (
          <div style={{
            position: "absolute", right: 14, top: "50%",
            transform: "translateY(-50%)", display: "flex",
          }}>
            {suffix}
          </div>
        )}
      </div>
    </div>
  );
};

const Login = () => {
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      background: "#f4f6f9",
      fontFamily: "'DM Sans', 'Nunito', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder { color: #d1d5db; }

        .login-sidebar {
          display: none;
          width: 420px;
          min-width: 420px;
          background: white;
          border-right: 1px solid #f3f4f6;
          padding: 48px 40px;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }

        .sidebar-glow {
          position: absolute;
          top: -80px; right: -80px;
          width: 280px; height: 280px;
          background: radial-gradient(circle, rgba(34,197,94,0.10) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .sidebar-glow-bottom {
          position: absolute;
          bottom: -60px; left: -60px;
          width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(22,163,74,0.07) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .mobile-logo { display: flex; }

        .login-btn {
          width: 100%;
          padding: 14px 20px;
          border-radius: 14px;
          border: none;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: linear-gradient(135deg, #16a34a, #22c55e);
          color: white;
          box-shadow: 0 8px 20px rgba(22,163,74,0.30);
          font-family: 'DM Sans', 'Nunito', sans-serif;
          transition: transform 0.15s, box-shadow 0.15s;
          letter-spacing: -0.01em;
        }
        .login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(22,163,74,0.38);
        }
        .login-btn:active {
          transform: scale(0.97);
          box-shadow: 0 4px 12px rgba(22,163,74,0.2);
        }

        @media (min-width: 900px) {
          .login-sidebar { display: flex !important; }
          .mobile-logo   { display: none !important; }
        }
      `}</style>

      {/* ── Sidebar ───────────────────────────────────────── */}
      <aside className="login-sidebar">
        <div className="sidebar-glow" />
        <div className="sidebar-glow-bottom" />

        <div style={{ position: "relative", zIndex: 1 }}>

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 48 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: "linear-gradient(135deg, #1a6b3a, #22c55e)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 8px 20px rgba(22,163,74,0.30)",
            }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: "white", letterSpacing: -1 }}>F</span>
            </div>
            <span style={{ fontSize: 20, fontWeight: 800, color: "#111827", letterSpacing: "-0.03em" }}>FinSight</span>
          </div>

          {/* Headline */}
          <p style={{
            fontSize: 30, fontWeight: 800, color: "#111827",
            lineHeight: 1.2, marginBottom: 10, letterSpacing: "-0.03em",
          }}>
            Clarity for your<br />financial future.
          </p>
          <p style={{
            fontSize: 14, color: "#6b7280",
            lineHeight: 1.7, marginBottom: 40, maxWidth: 300,
          }}>
            Real-time insights and analytics to help you make smarter decisions — all in one place.
          </p>

          {/* Features */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 40 }}>
            {features.map((f) => (
              <div key={f.title} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{
                  width: 40, height: 40, minWidth: 40, borderRadius: 12,
                  background: "#dcfce7",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#16a34a",
                }}>
                  {f.icon}
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 2 }}>{f.title}</p>
                  <p style={{ fontSize: 12, color: "#9ca3af", lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div style={{
            background: "#f4f6f9",
            border: "1px solid #f3f4f6",
            borderRadius: 16, padding: "18px 20px",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 2,
              background: "linear-gradient(90deg, #16a34a, #4ade80, transparent)",
            }} />
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{
                width: 38, height: 38, minWidth: 38, borderRadius: "50%",
                background: "linear-gradient(135deg, #bbf7d0, #86efac)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 700, color: "#15803d",
              }}>
                AO
              </div>
              <div>
                <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.65 }}>
                  "FinSight gave me total clarity on my finances. Transparent insights, zero confusion."
                </p>
                <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 6, fontWeight: 600 }}>
                  Amara O. — Lagos, NG
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          display: "flex", gap: 12, fontSize: 11,
          color: "#9ca3af", fontWeight: 600,
          letterSpacing: "0.08em", position: "relative", zIndex: 1,
        }}>
          <span>REGULATED</span><span>·</span><span>TRANSPARENT</span><span>·</span><span>TRUSTED</span>
        </div>
      </aside>

      {/* ── Form Panel ────────────────────────────────────── */}
      <main style={{
        flex: 1,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "40px 24px",
      }}>
        <div style={{ width: "100%", maxWidth: 400 }}>

          {/* Mobile logo */}
          <div className="mobile-logo" style={{ alignItems: "center", gap: 10, marginBottom: 32 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "linear-gradient(135deg, #1a6b3a, #22c55e)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 6px 16px rgba(22,163,74,0.3)",
            }}>
              <span style={{ fontSize: 16, fontWeight: 800, color: "white" }}>F</span>
            </div>
            <span style={{ fontSize: 18, fontWeight: 800, color: "#111827", letterSpacing: "-0.02em" }}>FinSight</span>
          </div>

          {/* White card */}
          <div style={{
            background: "white",
            borderRadius: 20,
            padding: "32px 28px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            border: "1px solid #f3f4f6",
          }}>

            {/* Badge + heading */}
            <div style={{ marginBottom: 28 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: "#dcfce7", color: "#15803d",
                fontSize: 11, fontWeight: 700,
                padding: "4px 10px", borderRadius: 20,
                marginBottom: 14, letterSpacing: "0.06em",
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: "#16a34a", display: "inline-block",
                }} />
                SIGN IN
              </div>
              <h1 style={{
                fontSize: 26, fontWeight: 800, color: "#111827",
                letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 6,
              }}>
                Welcome back
              </h1>
              <p style={{ fontSize: 13, color: "#9ca3af" }}>
                Sign in to continue with FinSight.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

              <Field
                label="Email address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              />

              <div>
                <Field
                  label="Password"
                  type={showPw ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  suffix={
                    <span
                      onClick={() => setShowPw(!showPw)}
                      style={{ color: "#9ca3af", cursor: "pointer", display: "flex" }}
                    >
                      {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </span>
                  }
                />
                <div style={{ marginTop: 8, textAlign: "right" }}>
                  <span style={{
                    fontSize: 12, color: "#16a34a", cursor: "pointer",
                    fontWeight: 600,
                    textDecoration: "underline", textUnderlineOffset: 3,
                  }}>
                    Forgot password?
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: "#f3f4f6", margin: "2px 0" }} />

              <button className="login-btn">
                Sign in <ArrowRight size={16} />
              </button>

              <p style={{ textAlign: "center", fontSize: 13, color: "#9ca3af" }}>
                Don't have an account?{" "}
                <span style={{
                  color: "#16a34a", fontWeight: 700,
                  cursor: "pointer",
                  textDecoration: "underline", textUnderlineOffset: 2,
                }}>
                  Sign up for free
                </span>
              </p>
            </div>
          </div>

          {/* Trust row */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 6, marginTop: 24, flexWrap: "wrap",
          }}>
            {["256-bit SSL", "Bank-grade security", "Zero ads"].map((badge, i) => (
              <div key={badge} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {i > 0 && <span style={{ color: "#e5e7eb" }}>·</span>}
                <span style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600 }}>{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;