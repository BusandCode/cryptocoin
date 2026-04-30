export interface Transaction {
  id: number;
  name: string;
  category: string;
  amount: number;
  date: string;
  icon: string;
  color: string;
}

export interface NavItem {
  label: string;
  icon: React.ComponentType<{ active: boolean }>;
}