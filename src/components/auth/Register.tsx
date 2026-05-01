import { useState, useEffect } from "react";
import type { ChangeEvent, ReactNode } from "react";
import { 
  ArrowRight, 
  Shield, 
  Clock, 
  TrendingUp, 
  Eye, 
  EyeOff,
  CheckCircle,
  Lock,
  Mail,
  Phone,
  User,
  // Sparkles
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const CryptoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const features = [
  { icon: <TrendingUp size={18} />, title: "Fast Trading", desc: "Execute trades in milliseconds with our high-speed engine." },
  { icon: <Shield size={18} />, title: "Cold Storage", desc: "98% of assets stored offline in multi-signature wallets." },
  { icon: <Clock size={18} />, title: "24/7 Support", desc: "Round-the-clock customer support for all your needs." },
];

interface FieldProps {
  label: string;
  type?: string;
  placeholder: string;
  icon?: ReactNode;
  suffix?: ReactNode;
  value?: string;
  error?: string;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Field = ({ label, type = "text", placeholder, icon, suffix, value = "", error, name, onChange }: FieldProps) => {
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

const Register = () => {
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();



  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) return "Email is required";
        if (!emailRegex.test(value)) return "Invalid email address";
        return "";
      case "phone":
        if (!value) return "Phone number is required";
        if (value.length < 10) return "Enter a valid phone number";
        return "";
      case "password":
        if (!value) return "Password is required";
        if (value.length < 8) return "Password must be at least 8 characters";
        if (!/[A-Z]/.test(value)) return "Include at least one uppercase letter";
        if (!/[0-9]/.test(value)) return "Include at least one number";
        return "";
      case "confirmPassword":
        if (!value) return "Please confirm your password";
        if (value !== formData.password) return "Passwords do not match";
        return "";
      default:
        if (!value && name !== "confirmPassword") return `${name} is required`;
        return "";
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) newErrors[key] = error;
    });
    
    if (Object.keys(newErrors).length === 0 && agreed) {
      console.log("Form submitted:", formData);
      alert("Account created successfully!");
    } else if (!agreed) {
      alert("Please agree to the Terms of Service and Privacy Policy");
    } else {
      setErrors(newErrors);
    }
  };

  const passwordStrength = () => {
    const pwd = formData.password;
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;
    return strength;
  };

  const strengthText = () => {
    const s = passwordStrength();
    if (s === 0) return "Very weak";
    if (s === 1) return "Weak";
    if (s === 2) return "Fair";
    if (s === 3) return "Strong";
    return "Very strong";
  };

  const strengthColor = () => {
    const s = passwordStrength();
    if (s === 0) return "#ef4444";
    if (s === 1) return "#f59e0b";
    if (s === 2) return "#eab308";
    if (s === 3) return "#16a34a";
    return "#22c55e";
  };

  return (
    <div className={`register-container ${isLoaded ? 'loaded' : ''}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
        
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        body {
          font-family: 'DM Sans', 'Nunito', sans-serif;
        }
        
        .register-container {
          min-height: 100vh;
          display: flex;
          background: linear-gradient(135deg, #f4f6f9 0%, #ffffff 100%);
          font-family: 'DM Sans', 'Nunito', sans-serif;
          opacity: 0;
          transition: opacity 0.6s ease;
        }
        
        .register-container.loaded {
          opacity: 1;
        }
        
        input::placeholder {
          color: #d1d5db;
        }
        
        input[type="checkbox"] {
          accent-color: #16a34a;
        }
        
        /* Sidebar Styles */
        .reg-sidebar {
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
        
        /* Form Styles */
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
          transform: translateY(0);
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
          padding: 12px 16px 12px 44px;
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
        .reg-btn {
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
        
        .reg-btn::before {
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
        
        .reg-btn:hover::before {
          width: 300px;
          height: 300px;
        }
        
        .reg-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(22,163,74,0.38);
        }
        
        .reg-btn:active {
          transform: scale(0.98);
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
        .stagger-6 { animation-delay: 0.3s; }
        
        /* Hover Effects */
        .hover-grow {
          transition: transform 0.3s ease;
        }
        
        .hover-grow:hover {
          transform: scale(1.05);
        }
        
        /* Responsive */
        @media (min-width: 1024px) {
          .reg-sidebar {
            display: flex !important;
          }
          .mobile-logo {
            display: none !important;
          }
        }
        
        @media (max-width: 768px) {
          .reg-sidebar {
            display: none;
          }
        }
      `}</style>

      {/* Sidebar */}
      <aside className="reg-sidebar animate-sidebar">
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
              <span style={{ fontSize: 12, fontWeight: 700, color: "#15803d" }}>✨ TRUSTED PLATFORM</span>
            </div>
            <h1 className="animate-fade-up stagger-2" style={{
              fontSize: 34, fontWeight: 800, color: "#111827",
              lineHeight: 1.2, marginBottom: 12, letterSpacing: "-0.03em",
            }}>
              Start your crypto<br />journey today
            </h1>
            <p className="animate-fade-up stagger-3" style={{
              fontSize: 14, color: "#6b7280",
              lineHeight: 1.6, maxWidth: 340,
            }}>
              Join 100,000+ traders already making smarter moves with real-time insights and advanced analytics.
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
          <div className="animate-fade-up stagger-4" style={{
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
                TK
              </div>
              <div>
                <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.6, marginBottom: 8 }}>
                  "Signing up took less than 2 minutes. Now I finally understand crypto trading and where my money goes."
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <p style={{ fontSize: 12, color: "#16a34a", fontWeight: 700 }}>Tunde K.</p>
                  <span style={{ fontSize: 10, color: "#d1d5db" }}>|</span>
                  <p style={{ fontSize: 11, color: "#9ca3af" }}>Abuja, NG</p>
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
        <div style={{ width: "100%", maxWidth: 480 }}>

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
                <CheckCircle size={12} />
                SECURE REGISTRATION
              </div>
              <h2 className="animate-fade-up stagger-2" style={{
                fontSize: 28, fontWeight: 800, color: "#111827",
                letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 8,
              }}>
                Create your account
              </h2>
              <p className="animate-fade-up stagger-3" style={{
                fontSize: 14, color: "#6b7280",
              }}>
                Start your crypto journey in seconds
              </p>
            </div>

            {/* Form Fields */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Field
                  label="First name"
                  placeholder="Ada"
                  icon={<User size={16} />}
                  value={formData.firstName}
                  onChange={handleChange}
                  name="firstName"
                  error={errors.firstName}
                />
                <Field
                  label="Last name"
                  placeholder="Obi"
                  icon={<User size={16} />}
                  value={formData.lastName}
                  onChange={handleChange}
                  name="lastName"
                  error={errors.lastName}
                />
              </div>

              <Field
                label="Email address"
                type="email"
                placeholder="you@example.com"
                icon={<Mail size={16} />}
                value={formData.email}
                onChange={handleChange}
                name="email"
                error={errors.email}
              />

              <Field
                label="Phone number"
                type="tel"
                placeholder="+234 800 000 0000"
                icon={<Phone size={16} />}
                value={formData.phone}
                onChange={handleChange}
                name="phone"
                error={errors.phone}
              />

              <Field
                label="Password"
                type={showPw ? "text" : "password"}
                placeholder="Create a strong password"
                icon={<Lock size={16} />}
                suffix={
                  <span onClick={() => setShowPw(!showPw)} className="hover-grow">
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </span>
                }
                value={formData.password}
                onChange={handleChange}
                name="password"
                error={errors.password}
              />

              {/* Password strength indicator */}
              {formData.password && (
                <div className="animate-fade-up" style={{ marginTop: -12, marginBottom: 4 }}>
                  <div style={{
                    display: "flex", gap: 4,
                    background: "#f3f4f6", borderRadius: 6,
                    padding: 2, height: 6,
                  }}>
                    {[0, 1, 2, 3].map(i => (
                      <div key={i} style={{
                        flex: 1,
                        background: i < passwordStrength() ? strengthColor() : "#e5e7eb",
                        borderRadius: 4,
                        transition: "all 0.3s ease",
                        width: `${(i + 1) * 25}%`,
                      }} />
                    ))}
                  </div>
                  <p style={{ fontSize: 10, color: strengthColor(), marginTop: 6, fontWeight: 600 }}>
                    {strengthText() === "Very strong" && "🛡️ "}
                    {strengthText() === "Strong" && "🔒 "}
                    {strengthText() === "Fair" && "🔐 "}
                    {strengthText() === "Weak" && "🔓 "}
                    {strengthText() === "Very weak" && "⚠️ "}
                    {strengthText()} password
                  </p>
                </div>
              )}

              <Field
                label="Confirm password"
                type={showConfirm ? "text" : "password"}
                placeholder="Repeat your password"
                icon={<Lock size={16} />}
                suffix={
                  <span onClick={() => setShowConfirm(!showConfirm)} className="hover-grow">
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </span>
                }
                value={formData.confirmPassword}
                onChange={handleChange}
                name="confirmPassword"
                error={errors.confirmPassword}
              />

              {/* Terms */}
              <label className="hover-grow" style={{
                display: "flex", alignItems: "flex-start", gap: 12,
                cursor: "pointer", padding: "8px 0",
              }}>
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  style={{ marginTop: 2, width: 18, height: 18, cursor: "pointer", flexShrink: 0 }}
                />
                <span style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.5 }}>
                  I agree to the{" "}
                  <span style={{ color: "#16a34a", fontWeight: 600, cursor: "pointer" }}>
                    Terms of Service
                  </span>
                  {" "}and{" "}
                  <span style={{ color: "#16a34a", fontWeight: 600, cursor: "pointer" }}>
                    Privacy Policy
                  </span>
                </span>
              </label>

              {/* Divider */}
              <div style={{ height: 1, background: "#f3f4f6", margin: "4px 0" }} />

              {/* Submit Button */}
              <button className="reg-btn" onClick={handleSubmit}>
                Create free account <ArrowRight size={18} />
              </button>

              {/* Login Link */}
              <p style={{ textAlign: "center", fontSize: 14, color: "#6b7280" }}>
                Already have an account?{" "}
                <span onClick={handleLogin} className="hover-grow" style={{
                  color: "#16a34a", fontWeight: 700,
                  cursor: "pointer",
                }}>
                  Sign in
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

export default Register;