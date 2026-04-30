export const BalanceSection = () => (
  <div className="balance-section">
    <div className="balance-label">Available balance</div>
    <div className="balance-amount">
      <span className="balance-currency">$</span>
      <span className="balance-int">22,750,000</span>
      <span className="balance-dec">.00</span>
    </div>
    <div className="balance-meta">
      <span className="card-num">•••• 4892</span>
      <span className="growth-badge">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
          <polyline points="17 6 23 6 23 12"/>
        </svg>
        +2.4% this month
      </span>
    </div>
  </div>
);