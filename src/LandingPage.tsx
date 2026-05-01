import React, { useState, useEffect, useRef } from 'react';
import "./styles/landing.css";
import "./styles/landing-mobile.css"; // add this import

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinksRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (navLinksRef.current && !navLinksRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  // Close menu on resize past mobile breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
  };

  const handleNavLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <div className="landing-container">
      {/* Navigation Bar */}
      <nav className="landing-nav animate-slide-down">
        <div className="nav-brand">
          <div className="brand-icon animate-spin-slow">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="brand-name">CryptoCoin</span>
        </div>

        <div ref={navLinksRef} className={`nav-links${menuOpen ? ' open' : ''}`}>
          <a href="#features" className="nav-link" onClick={handleNavLinkClick}>Features</a>
          <a href="#security" className="nav-link" onClick={handleNavLinkClick}>Security</a>
          <a href="#pricing" className="nav-link" onClick={handleNavLinkClick}>Pricing</a>
          <a href="/login" className="nav-login" onClick={handleNavLinkClick}>Login</a>
          <a href="/register" className="nav-signup" onClick={handleNavLinkClick}>Sign Up</a>
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge animate-fade-in-up">
            <span className="badge-icon">🚀</span>
            <span>Trusted by 100,000+ crypto traders</span>
          </div>
          <h1 className="hero-title animate-fade-in-up animation-delay-1">
            Trade Crypto <span className="gradient-text">Effortlessly</span>
          </h1>
          <p className="hero-subtitle animate-fade-in-up animation-delay-2">
            Buy, sell, and manage your cryptocurrency portfolio all in one place.
            Join thousands of satisfied traders who trust CryptoCoin for their digital assets.
          </p>
          <div className="hero-buttons animate-fade-in-up animation-delay-3">
            <a href="/register" className="btn-primary shimmer-button">
              Get Started Free
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a href="#demo" className="btn-secondary">
              Watch Demo
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" />
              </svg>
            </a>
          </div>
          <div className="hero-stats animate-fade-in-up animation-delay-4">
            <div className="stat">
              <span className="stat-number">$2.5B+</span>
              <span className="stat-label">Trading volume</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-number">99.99%</span>
              <span className="stat-label">Uptime guaranteed</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-number">4.8★</span>
              <span className="stat-label">User rating</span>
            </div>
          </div>
        </div>

        <div className="hero-dashboard-preview animate-scale-in animation-delay-2">
          <div className="preview-card floating">
            <div className="preview-header">
              <div className="preview-avatar pulse">CC</div>
              <div className="preview-greeting">
                <small>Welcome back</small>
                <h3>Thomas NLegg</h3>
              </div>
            </div>
            <div className="preview-balance">
              <div className="balance-label">Total Portfolio Value</div>
              <div className="balance-amount shimmer">$22,750,000.00</div>
              <div className="balance-change">
                <span className="change-positive">↑ +12.4%</span>
                <span className="change-label">vs last month</span>
              </div>
            </div>
            <div className="preview-crypto-stats">
              <div className="crypto-row">
                <span>Bitcoin (BTC)</span>
                <span className="crypto-value">2.45 BTC</span>
              </div>
              <div className="crypto-row">
                <span>Ethereum (ETH)</span>
                <span className="crypto-value">32.8 ETH</span>
              </div>
            </div>
            <div className="preview-actions">
              <div className="action-chip hover-grow">Buy</div>
              <div className="action-chip hover-grow">Sell</div>
              <div className="action-chip hover-grow">Swap</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-tag">Features</span>
            <h2>Everything you need in a crypto trading platform</h2>
            <p>Powerful tools to help you trade, track, and grow your crypto portfolio</p>
          </div>
          <div className="features-grid">
            {[
              { icon: '📊', title: 'Live Market Data', desc: 'Real-time prices, charts, and depth data for 500+ cryptocurrencies' },
              { icon: '🔒', title: 'Cold Storage Security', desc: '98% of assets stored in offline cold wallets with multi-signature protection' },
              { icon: '⚡', title: 'Instant Swaps', desc: 'Swap between any cryptocurrencies instantly with competitive rates' },
              { icon: '💰', title: 'Staking Rewards', desc: 'Earn up to 12% APY on your idle crypto assets through staking' },
              { icon: '🌐', title: 'Multi-Chain Support', desc: 'Trade across Ethereum, Solana, BSC, Polygon, and more' },
              { icon: '📱', title: 'Mobile Trading', desc: 'Full-featured mobile app for trading on the go' },
            ].map((f, i) => (
              <div key={f.title} className={`feature-card animate-on-scroll stagger-${i + 1}`}>
                <div className="feature-icon" style={{ background: '#16a34a18' }}>{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="security-section">
        <div className="container">
          <div className="security-content">
            <div className="security-text animate-on-scroll">
              <span className="section-tag">Security First</span>
              <h2>Your crypto is protected by enterprise-grade security</h2>
              <p>We use institutional-grade security measures to keep your digital assets safe from threats.</p>
              <div className="security-list">
                {[
                  'Multi-signature wallets',
                  'Hardware Security Modules (HSM)',
                  'Two-factor authentication (2FA)',
                  '$500M crime insurance policy',
                ].map(item => (
                  <div key={item} className="security-item hover-slide">
                    <span className="check-mark">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="security-badge animate-on-scroll">
              <div className="badge-circle rotate">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.5">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                  <path d="M2 17L12 22L22 17" />
                  <path d="M2 12L12 17L22 12" />
                </svg>
              </div>
              <div className="badge-text">Bank-Grade Security</div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Cryptocurrencies */}
      <section className="crypto-section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-tag">Supported Assets</span>
            <h2>Trade 500+ cryptocurrencies</h2>
            <p>From Bitcoin to the hottest new altcoins</p>
          </div>
          <div className="crypto-grid">
            {[
              { icon: '₿', name: 'Bitcoin', symbol: 'BTC' },
              { icon: 'Ξ', name: 'Ethereum', symbol: 'ETH' },
              { icon: '◈', name: 'Solana', symbol: 'SOL' },
              { icon: '⨀', name: 'Cardano', symbol: 'ADA' },
              { icon: '🔷', name: 'Polygon', symbol: 'MATIC' },
              { icon: '🐶', name: 'Dogecoin', symbol: 'DOGE' },
            ].map((token, i) => (
              <div key={token.symbol} className={`crypto-token animate-on-scroll stagger-${i + 1}`}>
                <div className="token-icon">{token.icon}</div>
                <div className="token-name">{token.name}</div>
                <div className="token-symbol">{token.symbol}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing-section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <span className="section-tag">Pricing</span>
            <h2>Simple, transparent fees</h2>
            <p>No hidden fees. No surprises. Just fair crypto trading.</p>
          </div>
          <div className="pricing-grid">
            <div className="pricing-card animate-on-scroll stagger-1">
              <div className="pricing-basic">Starter</div>
              <div className="price"><span className="currency">$</span>0<span className="period">/month</span></div>
              <p className="price-desc">Perfect for beginners</p>
              <ul className="price-features">
                <li>✓ Up to $10k monthly trades</li>
                <li>✓ 0.5% trading fee</li>
                <li>✓ Basic charts & tools</li>
                <li>✓ Email support</li>
              </ul>
              <a href="/register" className="price-btn">Get Started</a>
            </div>
            <div className="pricing-card featured animate-on-scroll stagger-2">
              <div className="pricing-badge">Popular</div>
              <div className="pricing-basic">Pro</div>
              <div className="price"><span className="currency">$</span>29.99<span className="period">/month</span></div>
              <p className="price-desc">For active traders</p>
              <ul className="price-features">
                <li>✓ Unlimited trades</li>
                <li>✓ 0.2% trading fee</li>
                <li>✓ Advanced charting</li>
                <li>✓ Priority support</li>
                <li>✓ API access</li>
              </ul>
              <a href="/register" className="price-btn featured-btn">Start Free Trial</a>
            </div>
            <div className="pricing-card animate-on-scroll stagger-3">
              <div className="pricing-basic">Institutional</div>
              <div className="price"><span className="currency">$</span>299<span className="period">/month</span></div>
              <p className="price-desc">For businesses & funds</p>
              <ul className="price-features">
                <li>✓ Unlimited trades</li>
                <li>✓ 0.05% trading fee</li>
                <li>✓ OTC desk access</li>
                <li>✓ Dedicated account manager</li>
                <li>✓ Custom integrations</li>
              </ul>
              <a href="/register" className="price-btn">Contact Sales</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content animate-on-scroll">
            <h2>Ready to start trading crypto?</h2>
            <p>Join 100,000+ traders who are already building their crypto portfolio with CryptoCoin</p>
            <form className="cta-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-2 border-black outline-2"
              />
              <button type="submit" className="cta-button shimmer-button">Create Free Account →</button>
            </form>
            <p className="cta-note">No credit card required. Get $10 in BTC when you sign up.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand animate-on-scroll">
              <div className="brand-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                  <path d="M2 17L12 22L22 17" />
                  <path d="M2 12L12 17L22 12" />
                </svg>
              </div>
              <span className="brand-name">CryptoCoin</span>
              <p>Trade crypto with confidence</p>
            </div>
            <div className="footer-links">
              <div className="link-group">
                <h4>Product</h4>
                <a href="#features">Features</a>
                <a href="#pricing">Pricing</a>
                <a href="/security">Security</a>
                <a href="/staking">Staking</a>
              </div>
              <div className="link-group">
                <h4>Company</h4>
                <a href="/about">About Us</a>
                <a href="/careers">Careers</a>
                <a href="/blog">Blog</a>
                <a href="/press">Press</a>
              </div>
              <div className="link-group">
                <h4>Support</h4>
                <a href="/help">Help Center</a>
                <a href="/contact">Contact Us</a>
                <a href="/status">Status</a>
                <a href="/faq">FAQ</a>
              </div>
              <div className="link-group">
                <h4>Legal</h4>
                <a href="/privacy">Privacy Policy</a>
                <a href="/terms">Terms of Service</a>
                <a href="/cookies">Cookie Policy</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2025 CryptoCoin. All rights reserved.</span>
            <div className="social-links">
              <a href="#" className="hover-grow">Twitter</a>
              <a href="#" className="hover-grow">Discord</a>
              <a href="#" className="hover-grow">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;