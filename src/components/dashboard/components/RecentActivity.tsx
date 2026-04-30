import type { Transaction } from "../../../types";

interface RecentActivityProps {
  transactions: Transaction[];
}

export const RecentActivity = ({ transactions }: RecentActivityProps) => (
  <div className="section" style={{ paddingBottom: 20 }}>
    <div className="section-header">
      <span className="section-title">Recent Activity</span>
      <button className="see-all">See all</button>
    </div>
    <div className="activity-list">
      {transactions.map((txn) => (
        <div key={txn.id} className="txn-item">
          <div className="txn-icon" style={{ background: `${txn.color}18` }}>{txn.icon}</div>
          <div className="txn-details">
            <div className="txn-name">{txn.name}</div>
            <div className="txn-cat">{txn.category}</div>
          </div>
          <div className="txn-right">
            <div className={`txn-amount ${txn.amount > 0 ? "positive" : "negative"}`}>
              {txn.amount > 0 ? "+" : ""}${Math.abs(txn.amount).toFixed(2)}
            </div>
            <div className="txn-date">{txn.date}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);