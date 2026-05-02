import { useState, useEffect } from "react";
import type { ChangeEvent, ReactNode } from "react";
import { Eye, EyeOff, ArrowRight, Shield, Clock, TrendingUp } from "lucide-react";

const CryptoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const features = [
  {
    icon: <TrendingUp size={18} />,
    title: "Real-time Trading",
    desc: "Execute trades instantly with our high-speed trading engine.",
  },
  {
    icon: <Shield size={18} />,
    title: "Cold Storage Security",
    desc: "98% of assets stored in offline multi-signature wallets.",
  },
  {
    icon: <Clock size={18} />,
    title: "24/7 Market Access",
    desc: "Trade cryptocurrencies anytime, anywhere with zero downtime.",
  },
];

interface FieldProps {
  label: string;
  type?: string;
  placeholder: string;
  icon?: ReactNode;
  suffix?: ReactNode;
  value: string;
  error?: string;
  name?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Field = ({ label, type = "text", placeholder, icon, suffix, value, error, name, onChange }: FieldProps) => {
  const [focused, setFocused] = useState(false);
  
  return (
    <div className="field-container">
      <label className="field-label">
        {label}
      </label>
      <div style={{ position: "relative" }}>
        {icon && (
          <div className={`field-icon ${focused ? 'focused' : ''}`}>
            {icon}
          </div>
        )}
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`field-input ${error ? 'error' : ''} ${focused ? 'focused' : ''}`}
          style={{
            paddingLeft: icon ? 44 : 16,
          }}
        />
        {suffix && (
          <div className="field-suffix">
            {suffix}
          </div>
        )}
      </div>
      {error && (
        <p className="field-error">
          {error}
        </p>
      )}
    </div>
  );
};

const Login = () => {
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Invalid email address";
    return "";
  };

  const validatePassword = (password: string) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    return "";
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value));
  };

  const handleSubmit = () => {
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    
    setEmailError(emailErr);
    setPasswordError(passwordErr);
    
    if (!emailErr && !passwordErr) {
      console.log("Login submitted:", { email, password });
      alert("Login successful!");
    }
  };

  // const handleKeyPress = (e: React.KeyboardEvent) => {
  //   if (e.key === 'Enter') {
  //     handleSubmit();
  //   }
  // };

  return (
    <div className={`login-container ${isLoaded ? 'loaded' : ''}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
        
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        .login-container {
          min-height: 100vh;
          display: flex;
          background: linear-gradient(135deg, #f4f6f9 0%, #ffffff 100%);
          font-family: 'DM Sans', 'Nunito', sans-serif;
          opacity: 0;
          transition: opacity 0.6s ease;
        }
        
        .login-container.loaded {
          opacity: 1;
        }
        
        input::placeholder {
          color: #d1d5db;
        }
        
        /* Sidebar Styles */
        .login-sidebar {
          display: none;
          width: 480px;
          min-width: 480px;
          background: linear-gradient(135deg, #ffffff 0%, #fefce8 100%);
          padding: 48px 40px;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }
        
        .sidebar-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          pointer-events: none;
        }
        
        .sidebar-glow-1 {
          position: absolute;
          top: -150px;
          right: -150px;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%);
          border-radius: 50%;
          animation: float 20s ease-in-out infinite;
        }
        
        .sidebar-glow-2 {
          position: absolute;
          bottom: -100px;
          left: -100px;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(22,163,74,0.08) 0%, transparent 70%);
          border-radius: 50%;
          animation: float 15s ease-in-out infinite reverse;
        }
        
        .sidebar-pattern {
          position: absolute;
          top: 20%;
          right: -50px;
          width: 200px;
          height: 200px;
          background: repeating-linear-gradient(45deg, rgba(34,197,94,0.03) 0px, rgba(34,197,94,0.03) 2px, transparent 2px, transparent 8px);
          border-radius: 50%;
          animation: spin 30s linear infinite;
        }
        
        .mobile-logo {
          display: flex;
        }
        
        /* Form Field Styles */
        .field-container {
          margin-bottom: 0;
        }
        
        .field-label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 8px;
          font-family: 'DM Sans', 'Nunito', sans-serif;
          transition: all 0.2s ease;
        }
        
        .field-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          transition: all 0.2s ease;
          z-index: 1;
        }
        
        .field-icon.focused {
          color: #16a34a;
          transform: translateY(-50%) scale(1.05);
        }
        
        .field-input {
          width: 100%;
          padding: 12px 16px;
          font-size: 14px;
          font-family: 'DM Sans', 'Nunito', sans-serif;
          background: #ffffff;
          border: 1.5px solid #e5e7eb;
          border-radius: 12px;
          color: #111827;
          outline: none;
          box-sizing: border-box;
          transition: all 0.2s ease;
        }
        
        .field-input.focused {
          background: #f0fdf4;
          border-color: #16a34a;
          transform: scale(1.01);
        }
        
        .field-input.error {
          border-color: #ef4444;
          animation: shake 0.3s ease;
        }
        
        .field-suffix {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .field-suffix:hover {
          transform: translateY(-50%) scale(1.1);
        }
        
        .field-error {
          font-size: 11px;
          color: #ef4444;
          margin-top: 6px;
          font-weight: 500;
          animation: slideDown 0.2s ease;
        }
        
        /* Button Styles */
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
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        
        .login-btn::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }
        
        .login-btn:hover::before {
          width: 300px;
          height: 300px;
        }
        
        .login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(22,163,74,0.38);
        }
        
        .login-btn:active {
          transform: scale(0.98);
        }
        
        /* Forgot password link */
        .forgot-link {
          font-size: 12px;
          color: #16a34a;
          cursor: pointer;
          font-weight: 600;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: all 0.2s ease;
          display: inline-block;
        }
        
        .forgot-link:hover {
          color: #15803d;
          transform: translateX(2px);
        }
        
        /* Sign up link */
        .signup-link {
          color: #16a34a;
          font-weight: 700;
          cursor: pointer;
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: all 0.2s ease;
        }
        
        .signup-link:hover {
          color: #15803d;
          transform: translateX(2px);
        }
        
        /* Animations */
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        /* Animation Classes */
        .animate-sidebar {
          animation: slideIn 0.6s ease-out;
        }
        
        .animate-fade-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-scale {
          animation: scaleIn 0.5s ease-out forwards;
        }
        
        .float-animation {
          animation: float 6s ease-in-out infinite;
        }
        
        .spin-slow {
          animation: spin 20s linear infinite;
        }
        
        .pulse-animation {
          animation: pulse 2s ease-in-out infinite;
        }
        
        /* Stagger Animations */
        .stagger-1 { animation-delay: 0.05s; }
        .stagger-2 { animation-delay: 0.1s; }
        .stagger-3 { animation-delay: 0.15s; }
        .stagger-4 { animation-delay: 0.2s; }
        .stagger-5 { animation-delay: 0.25s; }
        
        /* Hover Effects */
        .hover-grow {
          transition: transform 0.3s ease;
        }
        
        .hover-grow:hover {
          transform: scale(1.05);
        }
        
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px -12px rgba(0, 0, 0, 0.15);
        }
        
        /* Responsive */
        @media (min-width: 1024px) {
          .login-sidebar {
            display: flex !important;
          }
          .mobile-logo {
            display: none !important;
          }
        }
        
        @media (max-width: 768px) {
          .login-sidebar {
            display: none;
          }
        }
      `}</style>

      {/* Sidebar */}
      <aside className="login-sidebar animate-sidebar">
        <div className="sidebar-bg">
          <div className="sidebar-glow-1" />
          <div className="sidebar-glow-2" />
          <div className="sidebar-pattern" />
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Logo with animation */}
          <div className="float-animation" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 56 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              background: "linear-gradient(135deg, #16a34a, #22c55e)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 10px 24px rgba(22,163,74,0.25)",
            }}>
              <CryptoIcon />
            </div>
            <div>
              <span style={{ fontSize: 22, fontWeight: 800, color: "#111827", letterSpacing: "-0.03em" }}>CryptoCoin</span>
              <p style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>Crypto Trading Platform</p>
            </div>
          </div>

          {/* Headline with staggered animation */}
          <div style={{ marginBottom: 32 }}>
            <div className="animate-fade-up stagger-1" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#dcfce7",
              padding: "6px 14px",
              borderRadius: 99,
              marginBottom: 20,
            }}>
              <span className="pulse-animation" style={{
                width: 8, height: 8, borderRadius: "50%",
                background: "#16a34a", display: "inline-block",
              }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: "#15803d" }}>✨ WELCOME BACK</span>
            </div>
            <h1 className="animate-fade-up stagger-2" style={{
              fontSize: 34, fontWeight: 800, color: "#111827",
              lineHeight: 1.2, marginBottom: 12, letterSpacing: "-0.03em",
            }}>
              Welcome to your<br />crypto future
            </h1>
            <p className="animate-fade-up stagger-3" style={{
              fontSize: 14, color: "#6b7280",
              lineHeight: 1.6, maxWidth: 340,
            }}>
              Access your portfolio, track performance, and execute trades with confidence.
            </p>
          </div>

          {/* Features */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 48 }}>
            {features.map((f, idx) => (
              <div 
                key={f.title} 
                className="hover-grow"
                style={{ 
                  display: "flex", 
                  gap: 16, 
                  alignItems: "flex-start",
                  opacity: 0,
                  animation: `slideIn 0.5s ease-out ${0.2 + idx * 0.1}s forwards`
                }}
              >
                <div style={{
                  width: 48, height: 48, minWidth: 48, borderRadius: 16,
                  background: "linear-gradient(135deg, #dcfce7, #f0fdf4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#16a34a",
                  transition: "all 0.3s ease",
                }}>
                  {f.icon}
                </div>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 4 }}>{f.title}</p>
                  <p style={{ fontSize: 13, color: "#9ca3af", lineHeight: 1.5 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="animate-fade-up stagger-4 hover-lift" style={{
            background: "linear-gradient(135deg, #f9fafb, #ffffff)",
            border: "1px solid #e5e7eb",
            borderRadius: 20,
            padding: "20px 24px",
            position: "relative",
            overflow: "hidden",
            transition: "all 0.3s ease",
          }}>
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 3,
              background: "linear-gradient(90deg, #16a34a, #22c55e, #4ade80)",
              animation: "shimmer 2s linear infinite",
              backgroundSize: "200% auto",
            }} />
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div style={{
                width: 44, height: 44, minWidth: 44, borderRadius: "50%",
                background: "linear-gradient(135deg, #16a34a, #22c55e)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, fontWeight: 700, color: "white",
              }}>
                AO
              </div>
              <div>
                <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.6, marginBottom: 8 }}>
                  "CryptoCoin gave me total clarity on my crypto portfolio. Real-time insights, zero confusion."
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <p style={{ fontSize: 12, color: "#16a34a", fontWeight: 700 }}>Amara O.</p>
                  <span style={{ fontSize: 10, color: "#d1d5db" }}>|</span>
                  <p style={{ fontSize: 11, color: "#9ca3af" }}>Lagos, NG</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          display: "flex", gap: 16, fontSize: 11,
          color: "#9ca3af", fontWeight: 600,
          letterSpacing: "0.08em", position: "relative", zIndex: 1,
          paddingTop: 40,
        }}>
          <span className="hover-grow">🔒 REGULATED</span>
          <span>·</span>
          <span className="hover-grow">📊 TRANSPARENT</span>
          <span>·</span>
          <span className="hover-grow">✓ TRUSTED</span>
        </div>
      </aside>

      {/* Form Panel */}
      <main style={{
        flex: 1,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "40px 24px",
      }}>
        <div style={{ width: "100%", maxWidth: 440 }}>

          {/* Mobile logo */}
          <div className="mobile-logo animate-fade-up" style={{ alignItems: "center", gap: 12, marginBottom: 32, justifyContent: "center" }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: "linear-gradient(135deg, #16a34a, #22c55e)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 8px 20px rgba(22,163,74,0.25)",
            }}>
              <CryptoIcon />
            </div>
            <div>
              <span style={{ fontSize: 20, fontWeight: 800, color: "#111827", letterSpacing: "-0.02em" }}>CryptoCoin</span>
              <p style={{ fontSize: 10, color: "#6b7280" }}>Crypto Trading Platform</p>
            </div>
          </div>

          {/* Form Card */}
          <div className="animate-scale" style={{
            background: "white",
            borderRadius: 28,
            padding: "40px 36px",
            boxShadow: "0 20px 40px -12px rgba(0,0,0,0.12)",
            border: "1px solid #f0fdf4",
          }}>

            {/* Header */}
            <div style={{ marginBottom: 32 }}>
              <div className="animate-fade-up stagger-1" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "#dcfce7", color: "#15803d",
                fontSize: 11, fontWeight: 700,
                padding: "6px 14px", borderRadius: 99,
                marginBottom: 16, letterSpacing: "0.06em",
              }}>
                <span className="pulse-animation" style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: "#16a34a", display: "inline-block",
                }} />
                SIGN IN
              </div>
              <h2 className="animate-fade-up stagger-2" style={{
                fontSize: 28, fontWeight: 800, color: "#111827",
                letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 8,
              }}>
                Welcome back
              </h2>
              <p className="animate-fade-up stagger-3" style={{
                fontSize: 14, color: "#6b7280",
              }}>
                Sign in to continue trading with CryptoCoin
              </p>
            </div>

            {/* Form Fields */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <Field
                label="Email address"
                type="email"
                placeholder="you@example.com"
                icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
                value={email}
                error={emailError}
                onChange={handleEmailChange}
                // onKeyPress={handleKeyPress}
              />

              <div>
                <Field
                  label="Password"
                  type={showPw ? "text" : "password"}
                  placeholder="Enter your password"
                  icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>}
                  value={password}
                  error={passwordError}
                  onChange={handlePasswordChange}
                  // onKeyPress={handleKeyPress}
                  suffix={
                    <span onClick={() => setShowPw(!showPw)} className="hover-grow">
                      {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                    </span>
                  }
                />
                <div style={{ marginTop: 8, textAlign: "right" }}>
                  <span className="forgot-link">
                    Forgot password?
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: "#f3f4f6", margin: "4px 0" }} />

              {/* Submit Button */}
              <button className="login-btn" onClick={handleSubmit}>
                Sign in <ArrowRight size={18} />
              </button>

              {/* Sign Up Link */}
              <p style={{ textAlign: "center", fontSize: 14, color: "#6b7280" }}>
                Don't have an account?{" "}
                <span className="signup-link">
                  Sign up for free
                </span>
              </p>
            </div>
          </div>

          {/* Trust badges */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 24, marginTop: 32, flexWrap: "wrap",
          }}>
            {[
              { icon: "🔒", text: "256-bit SSL" },
              { icon: "🛡️", text: "Bank-grade security" },
              { icon: "📊", text: "Real-time data" },
            ].map((badge, i) => (
              <div 
                key={badge.text} 
                className="hover-grow"
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: 8,
                  opacity: 0,
                  animation: `fadeInUp 0.4s ease-out ${0.6 + i * 0.1}s forwards`
                }}
              >
                <span style={{ fontSize: 14 }}>{badge.icon}</span>
                <span style={{ fontSize: 12, color: "#9ca3af", fontWeight: 600 }}>{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;