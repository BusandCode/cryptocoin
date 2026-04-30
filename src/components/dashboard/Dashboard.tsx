
import { useState } from "react";
import { Header }          from "./components/Header"
import { QuickActions }    from "./components/QuickActions";
import { CardSection }     from "./components/CardSection";
import { BalanceSection }  from "./components/BalanceSection";
import { RecentActivity }  from "./components/RecentActivity";
import { BottomNav }       from "./components/BottomNav";
import { WithdrawalModal } from "./components/WithdrawalModal";
import { transactions }    from "./data/transactions";
import "./styles/dashboard.css";

const BUDGET_USED  = 1840;
const BUDGET_TOTAL = 3000;

const Dashboard = () => {
  const [activeNav, setActiveNav]               = useState(0);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);

  return (
    <div style={{ fontFamily: "'DM Sans', 'Nunito', sans-serif", background: "#f4f6f9", minHeight: "100vh", display: "flex", justifyContent: "center" }}>
      <div className="phone-shell">
        <div className="scroll-content">
          <Header />
          <BalanceSection />
          <QuickActions
            onWithdraw={() => setShowWithdrawalModal(true)}
            onTransfer={() => setShowWithdrawalModal(true)}
          />
          <CardSection budgetUsed={BUDGET_USED} budgetTotal={BUDGET_TOTAL} />
          <RecentActivity transactions={transactions} />
        </div>
        <BottomNav active={activeNav} onChange={setActiveNav} />
      </div>

      <WithdrawalModal
        visible={showWithdrawalModal}
        onClose={() => setShowWithdrawalModal(false)}
      />
    </div>
  );
};

export default Dashboard;