interface QuickActionsProps {
  onWithdraw: () => void;
  onTransfer: () => void;
}

export const QuickActions = ({ onWithdraw, onTransfer }: QuickActionsProps) => {
  const actions = [
    { label: "Withdraw", onClick: onWithdraw, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> },
    { label: "Transfer", onClick: onTransfer, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg> },
    { label: "Add Money", onClick: null, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg> },
    { label: "Pay Bills", onClick: null, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/></svg> },
    { label: "Airtime", onClick: null, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg> },
  ];

  return (
    <div className="quick-actions">
      {actions.map((action) => (
        <div key={action.label} className="action-item" onClick={action.onClick ?? undefined}>
          <div className="action-icon-wrap">{action.icon}</div>
          <span className="action-label">{action.label}</span>
        </div>
      ))}
    </div>
  );
};