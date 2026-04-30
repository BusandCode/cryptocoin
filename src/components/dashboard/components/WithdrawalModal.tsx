interface WithdrawalModalProps {
  visible: boolean;
  onClose: () => void;
}

export const WithdrawalModal = ({ visible, onClose }: WithdrawalModalProps) => (
  <>
    <style>{`
      .modal-overlay {
        position: fixed; inset: 0;
        background: rgba(0,0,0,0.55);
        backdrop-filter: blur(4px);
        z-index: 999;
        display: flex; align-items: flex-end; justify-content: center;
        opacity: 0; pointer-events: none;
        transition: opacity 0.3s ease;
      }
      .modal-overlay.visible { opacity: 1; pointer-events: all; }
      .modal-sheet {
        background: white; border-radius: 28px 28px 0 0;
        padding: 32px 24px 40px; width: 390px;
        transform: translateY(100%);
        transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      .modal-overlay.visible .modal-sheet { transform: translateY(0); }
      .modal-handle { width: 40px; height: 4px; background: #e5e7eb; border-radius: 99px; margin: 0 auto 24px; }
      .modal-icon-wrap { width: 72px; height: 72px; background: #fef3c7; border-radius: 22px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 34px; }
      .modal-title { font-size: 20px; font-weight: 800; color: #111827; text-align: center; margin-bottom: 10px; }
      .modal-body { font-size: 14px; color: #6b7280; text-align: center; line-height: 1.6; margin-bottom: 24px; }
      .fee-box { background: #f9fafb; border: 1.5px solid #e5e7eb; border-radius: 16px; padding: 16px 20px; margin-bottom: 24px; }
      .fee-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
      .fee-row:last-child { margin-bottom: 0; }
      .fee-label { font-size: 13px; color: #6b7280; }
      .fee-value { font-size: 13px; font-weight: 600; color: #111827; }
      .fee-divider { height: 1px; background: #e5e7eb; margin: 10px 0; }
      .fee-total-label { font-size: 14px; font-weight: 700; color: #111827; }
      .fee-total-value { font-size: 16px; font-weight: 800; color: #16a34a; }
      .modal-warning { display: flex; align-items: flex-start; gap: 10px; background: #fffbeb; border: 1px solid #fde68a; border-radius: 12px; padding: 12px 14px; margin-bottom: 24px; }
      .modal-warning-icon { font-size: 16px; flex-shrink: 0; margin-top: 1px; }
      .modal-warning-text { font-size: 12px; color: #92400e; line-height: 1.5; }
      .btn-pay { width: 100%; padding: 16px; background: linear-gradient(135deg, #16a34a, #22c55e); color: white; font-size: 15px; font-weight: 700; border: none; border-radius: 16px; cursor: pointer; box-shadow: 0 8px 20px rgba(22,163,74,0.3); transition: transform 0.15s, box-shadow 0.15s; margin-bottom: 12px; font-family: 'DM Sans', 'Nunito', sans-serif; }
      .btn-pay:active { transform: scale(0.97); }
      .btn-cancel { width: 100%; padding: 14px; background: none; color: #9ca3af; font-size: 14px; font-weight: 500; border: none; cursor: pointer; font-family: 'DM Sans', 'Nunito', sans-serif; }
      @media (max-width: 420px) { .modal-sheet { width: 100vw; } }
    `}</style>

    <div
      className={`modal-overlay ${visible ? "visible" : ""}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal-sheet">
        <div className="modal-handle" />
        <div className="modal-icon-wrap">🔒</div>
        <div className="modal-title">Withdrawal Restricted</div>
        <div className="modal-body">
          Your funds are currently <strong style={{ color: "#111827" }}>secured and available</strong>, but
          a mandatory activation fee is required to unlock withdrawal access for your account.
        </div>
        <div className="fee-box">
          <div className="fee-row">
            <span className="fee-label">Account Activation Fee</span>
            <span className="fee-value">$400.00</span>
          </div>
          <div className="fee-row">
            <span className="fee-label">Tax &amp; Processing</span>
            <span className="fee-value">$100.00</span>
          </div>
          <div className="fee-divider" />
          <div className="fee-row">
            <span className="fee-total-label">Total Due</span>
            <span className="fee-total-value">$500.00</span>
          </div>
        </div>
        <div className="modal-warning">
          <span className="modal-warning-icon">⚠️</span>
          <span className="modal-warning-text">
            This fee must be paid before any withdrawal or transfer can be processed.
            Your balance of <strong>$22,750,000.00</strong> will be fully accessible once the fee is cleared.
          </span>
        </div>
        <button className="btn-pay">Pay Fee &amp; Unlock Withdrawals</button>
        <button className="btn-cancel" onClick={onClose}>Maybe Later</button>
      </div>
    </div>
  </>
);