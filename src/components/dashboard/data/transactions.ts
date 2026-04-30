import type { Transaction } from "../../../types";

export const transactions: Transaction[] = [
  { id: 1, name: "Netflix",        category: "Entertainment", amount: -15.99,  date: "Today",        icon: "🎬", color: "#E50914" },
  { id: 2, name: "Salary Deposit", category: "Income",        amount: 4200.00, date: "Yesterday",    icon: "💼", color: "#22c55e" },
  { id: 3, name: "Whole Foods",    category: "Groceries",     amount: -87.43,  date: "Mon, Apr 19",  icon: "🛒", color: "#f59e0b" },
  { id: 4, name: "Uber Ride",      category: "Transport",     amount: -12.50,  date: "Mon, Apr 19",  icon: "🚗", color: "#3b82f6" },
  { id: 5, name: "Spotify Premium",category: "Entertainment", amount: -9.99,   date: "Sun, Apr 18",  icon: "🎵", color: "#1DB954" },
];