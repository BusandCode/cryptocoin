import { useState } from "react";
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
  // CreditCard,
  Sparkles
} from "lucide-react";

const features = [
  { icon: <TrendingUp size={18} />, title: "Fast approvals", desc: "Get loan decisions in minutes, not days." },
  { icon: <Shield size={18} />, title: "Bank-grade security", desc: "256-bit encryption. Your data stays private." },
  { icon: <Clock size={18} />, title: "Flexible repayment", desc: "Plans that adapt to your income and schedule." },
];

interface FieldProps {
  label: string;
  type?: string;
  placeholder: string;
  icon?: ReactNode;
  suffix?: ReactNode;
  value?: string;
  error?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Field = ({ label, type = "text", placeholder, icon, suffix, value = "", error, onChange }: FieldProps) => {
  const [focused, setFocused] = useState(false);
  
  return (
    <div>
      <label style={{
        display: "block",
        fontSize: 12,
        fontWeight: 600,
        color: "#374151",
        marginBottom: 8,
        fontFamily: "'DM Sans', 'Nunito', sans-serif",
      }}>
        {label}
      </label>
      <div style={{ position: "relative" }}>
        {icon && (
          <div style={{
            position: "absolute",
            left: 14,
            top: "50%",
            transform: "translateY(-50%)",
            color: focused ? "#16a34a" : "#9ca3af",
            transition: "color 0.2s",
            zIndex: 1,
          }}>
            {icon}
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            padding: `12px ${suffix ? 44 : 16}px 12px ${icon ? 44 : 16}px`,
            fontSize: 14,
            fontFamily: "'DM Sans', 'Nunito', sans-serif",
            background: focused ? "#f0fdf4" : "#ffffff",
            border: `1.5px solid ${error ? "#ef4444" : focused ? "#16a34a" : "#e5e7eb"}`,
            borderRadius: 12,
            color: "#111827",
            outline: "none",
            boxSizing: "border-box",
            transition: "all 0.2s ease",
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
      {error && (
        <p style={{ fontSize: 11, color: "#ef4444", marginTop: 6, fontWeight: 500 }}>
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
        if (!value) return `${name} is required`;
        return "";
    }
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

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      background: "linear-gradient(135deg, #f4f6f9 0%, #ffffff 100%)",
      fontFamily: "'DM Sans', 'Nunito', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        input::placeholder { color: #d1d5db; }
        input[type="checkbox"] { accent-color: #16a34a; }
        
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
        }
        
        .sidebar-glow-2 {
          position: absolute;
          bottom: -100px;
          left: -100px;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(22,163,74,0.08) 0%, transparent 70%);
          border-radius: 50%;
        }
        
        .sidebar-pattern {
          position: absolute;
          top: 20%;
          right: -50px;
          width: 200px;
          height: 200px;
          background: repeating-linear-gradient(45deg, rgba(34,197,94,0.03) 0px, rgba(34,197,94,0.03) 2px, transparent 2px, transparent 8px);
          border-radius: 50%;
        }
        
        .mobile-logo { display: flex; }
        
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
          transition: all 0.2s ease;
          letter-spacing: -0.01em;
        }
        
        .reg-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(22,163,74,0.38);
        }
        
        .reg-btn:active {
          transform: scale(0.98);
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-sidebar {
          animation: slideIn 0.6s ease-out;
        }
        
        @media (min-width: 1024px) {
          .reg-sidebar { display: flex !important; }
          .mobile-logo { display: none !important; }
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
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 56 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 14,
              background: "linear-gradient(135deg, #16a34a, #22c55e)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 10px 24px rgba(22,163,74,0.25)",
            }}>
              <Sparkles size={22} color="white" />
            </div>
            <div>
              <span style={{ fontSize: 22, fontWeight: 800, color: "#111827", letterSpacing: "-0.03em" }}>CryptoCoin</span>
              <p style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>Crypto Trading Platform</p>
            </div>
          </div>

          {/* Headline */}
          <div style={{ marginBottom: 32 }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#dcfce7",
              padding: "6px 14px",
              borderRadius: 99,
              marginBottom: 20,
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: "50%",
                background: "#16a34a", display: "inline-block",
                animation: "pulse 2s infinite",
              }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: "#15803d" }}>✨ TRUSTED PLATFORM</span>
            </div>
            <h1 style={{
              fontSize: 34, fontWeight: 800, color: "#111827",
              lineHeight: 1.2, marginBottom: 12, letterSpacing: "-0.03em",
            }}>
              Start your crypto<br />journey today
            </h1>
            <p style={{
              fontSize: 14, color: "#6b7280",
              lineHeight: 1.6, maxWidth: 340,
            }}>
              Join 100,000+ traders already making smarter moves with real-time insights and advanced analytics.
            </p>
          </div>

          {/* Features */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 48 }}>
            {features.map((f, idx) => (
              <div key={f.title} style={{ display: "flex", gap: 16, alignItems: "flex-start", opacity: 0, animation: `slideIn 0.4s ease-out ${idx * 0.1}s forwards` }}>
                <div style={{
                  width: 48, height: 48, minWidth: 48, borderRadius: 16,
                  background: "linear-gradient(135deg, #dcfce7, #f0fdf4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#16a34a",
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
          <div style={{
            background: "linear-gradient(135deg, #f9fafb, #ffffff)",
            border: "1px solid #e5e7eb",
            borderRadius: 20,
            padding: "20px 24px",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 3,
              background: "linear-gradient(90deg, #16a34a, #22c55e, #4ade80)",
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
          <span>🔒 REGULATED</span>
          <span>·</span>
          <span>📊 TRANSPARENT</span>
          <span>·</span>
          <span>✓ TRUSTED</span>
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
          <div className="mobile-logo" style={{ alignItems: "center", gap: 12, marginBottom: 32, justifyContent: "center" }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: "linear-gradient(135deg, #16a34a, #22c55e)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 8px 20px rgba(22,163,74,0.25)",
            }}>
              <Sparkles size={22} color="white" />
            </div>
            <div>
              <span style={{ fontSize: 20, fontWeight: 800, color: "#111827", letterSpacing: "-0.02em" }}>CryptoCoin</span>
              <p style={{ fontSize: 10, color: "#6b7280" }}>Crypto Trading Platform</p>
            </div>
          </div>

          {/* Form Card */}
          <div style={{
            background: "white",
            borderRadius: 28,
            padding: "40px 36px",
            boxShadow: "0 20px 40px -12px rgba(0,0,0,0.12)",
            border: "1px solid #f0fdf4",
          }}>

            {/* Header */}
            <div style={{ marginBottom: 32 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "#dcfce7", color: "#15803d",
                fontSize: 11, fontWeight: 700,
                padding: "6px 14px", borderRadius: 99,
                marginBottom: 16, letterSpacing: "0.06em",
              }}>
                <CheckCircle size={12} />
                SECURE REGISTRATION
              </div>
              <h2 style={{
                fontSize: 28, fontWeight: 800, color: "#111827",
                letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 8,
              }}>
                Create your account
              </h2>
              <p style={{ fontSize: 14, color: "#6b7280" }}>
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
                  // name="firstName"
                  error={errors.firstName}
                />
                <Field
                  label="Last name"
                  placeholder="Obi"
                  icon={<User size={16} />}
                  value={formData.lastName}
                  onChange={handleChange}
                  // name="lastName"
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
                // name="email"
                error={errors.email}
              />

              <Field
                label="Phone number"
                type="tel"
                placeholder="+234 800 000 0000"
                icon={<Phone size={16} />}
                value={formData.phone}
                onChange={handleChange}
                // name="phone"
                error={errors.phone}
              />

              <Field
                label="Password"
                type={showPw ? "text" : "password"}
                placeholder="Create a strong password"
                icon={<Lock size={16} />}
                suffix={
                  <span onClick={() => setShowPw(!showPw)} style={{ color: "#9ca3af", cursor: "pointer", display: "flex" }}>
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </span>
                }
                value={formData.password}
                onChange={handleChange}
                // name="password"
                error={errors.password}
              />

              {/* Password strength indicator */}
              {formData.password && (
                <div style={{ marginTop: -12, marginBottom: 4 }}>
                  <div style={{
                    display: "flex", gap: 4,
                    background: "#f3f4f6", borderRadius: 6,
                    padding: 2, height: 6,
                  }}>
                    {[0, 1, 2, 3].map(i => (
                      <div key={i} style={{
                        flex: 1,
                        background: i < passwordStrength() ? "#16a34a" : "#e5e7eb",
                        borderRadius: 4,
                        transition: "background 0.2s",
                      }} />
                    ))}
                  </div>
                  <p style={{ fontSize: 10, color: "#6b7280", marginTop: 6 }}>
                    {passwordStrength() === 0 && "🔒 Very weak"}
                    {passwordStrength() === 1 && "🔓 Weak"}
                    {passwordStrength() === 2 && "🔐 Fair"}
                    {passwordStrength() === 3 && "🔒 Strong"}
                    {passwordStrength() === 4 && "🛡️ Very strong"}
                  </p>
                </div>
              )}

              <Field
                label="Confirm password"
                type={showConfirm ? "text" : "password"}
                placeholder="Repeat your password"
                icon={<Lock size={16} />}
                suffix={
                  <span onClick={() => setShowConfirm(!showConfirm)} style={{ color: "#9ca3af", cursor: "pointer", display: "flex" }}>
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </span>
                }
                value={formData.confirmPassword}
                onChange={handleChange}
                // name="confirmPassword"
                error={errors.confirmPassword}
              />

              {/* Terms */}
              <label style={{
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
                <span style={{
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
            ].map((badge, _i) => (
              <div key={badge.text} style={{ display: "flex", alignItems: "center", gap: 8 }}>
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