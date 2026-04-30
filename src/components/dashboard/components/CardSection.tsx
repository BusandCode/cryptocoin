interface CardSectionProps {
  budgetUsed: number;
  budgetTotal: number;
}

export const CardSection = ({ budgetUsed, budgetTotal }: CardSectionProps) => {
  const budgetPercent = Math.round((budgetUsed / budgetTotal) * 100);
  const budgetLeft    = budgetTotal - budgetUsed;

  return (
    <div className="section">
      <div className="section-header">
        <span className="section-title">My Card</span>
        <button className="see-all">Manage</button>
      </div>

      <div className="card-wrap">
        <div className="card-type-row">
          <div>
            <div className="card-label">Debit · Visa</div>
            <div className="card-type">Everyday</div>
          </div>
          <div className="card-nfc">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8">
              <path d="M5 12.55a11 11 0 0 1 14.08 0"/>
              <path d="M1.42 9a16 16 0 0 1 21.16 0"/>
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
              <circle cx="12" cy="20" r="1" fill="rgba(255,255,255,0.7)" stroke="none"/>
            </svg>
          </div>
        </div>
        <div className="card-chip" />
        <div className="card-number">•••• •••• •••• 4892</div>
        <div className="card-footer">
          <div>
            <div className="card-holder-label">Card Holder</div>
            <div className="card-holder-name">Thomas NLegg</div>
          </div>
          <div>
            <div className="card-holder-label">Expires</div>
            <div className="card-holder-name">08/29</div>
          </div>
          <div className="visa-logo">VISA</div>
        </div>
      </div>

      <div className="budget-card">
        <div className="budget-label">Monthly Budget</div>
        <div className="budget-header" style={{ marginTop: 8 }}>
          <div className="budget-amounts">
            <span className="budget-spent">${budgetUsed.toLocaleString()}</span>
            <span className="budget-total"> / ${budgetTotal.toLocaleString()}</span>
          </div>
          <div className="budget-percent">{budgetPercent}%<span> used</span></div>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${budgetPercent}%` }} />
        </div>
        <div className="budget-hint">
          You have <strong>${budgetLeft.toLocaleString()}</strong> left to spend this month
        </div>
      </div>
    </div>
  );
};