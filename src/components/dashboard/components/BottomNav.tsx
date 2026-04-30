import { HomeIcon, PaymentsIcon, CardsIcon, InsightsIcon, ProfileIcon } from "./NavIcons";

const navItems = [
  { label: "Home",     icon: HomeIcon },
  { label: "Payments", icon: PaymentsIcon },
  { label: "Cards",    icon: CardsIcon },
  { label: "Insights", icon: InsightsIcon },
  { label: "Profile",  icon: ProfileIcon },
];

interface BottomNavProps {
  active: number;
  onChange: (i: number) => void;
}

export const BottomNav = ({ active, onChange }: BottomNavProps) => (
  <nav className="bottom-nav">
    {navItems.map((item, i) => {
      const Icon = item.icon;
      const isActive = active === i;
      return (
        <button key={item.label} className="nav-item" onClick={() => onChange(i)}>
          <Icon active={isActive} />
          <span className={`nav-label ${isActive ? "active" : "inactive"}`}>{item.label}</span>
        </button>
      );
    })}
  </nav>
);