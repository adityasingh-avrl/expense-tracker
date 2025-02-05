"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/transactions", label: "Transactions" },
  { href: "/dashboard/categories", label: "Categories" },
  { href: "/settings", label: "Settings" },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="border-b bg-white">
      <div className="flex h-16 items-center px-4">
        <Link href="/dashboard" className="font-bold">
          Expense Tracker
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm ${
                pathname === item.href
                  ? "text-primary font-medium"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={() => signOut()}
            className="text-sm text-gray-500 hover:text-gray-900"
          >
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
} 