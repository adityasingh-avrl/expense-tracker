import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { SummaryCard } from "@/components/dashboard/summary-card";
import { DollarSign, CreditCard, ArrowDownCircle, ArrowUpCircle } from "lucide-react";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  // TODO: Fetch real data from the database
  const summaryData = {
    totalBalance: 5240.50,
    monthlyIncome: 8500.00,
    monthlyExpenses: 3259.50,
    savingsRate: 35.2,
  };

  return (
    <main className="flex-1 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
        <SummaryCard
          title="Total Balance"
          value={summaryData.totalBalance}
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        />
        <SummaryCard
          title="Monthly Income"
          value={summaryData.monthlyIncome}
          icon={<ArrowUpCircle className="h-4 w-4 text-green-500" />}
        />
        <SummaryCard
          title="Monthly Expenses"
          value={summaryData.monthlyExpenses}
          icon={<ArrowDownCircle className="h-4 w-4 text-red-500" />}
        />
        <SummaryCard
          title="Savings Rate"
          value={summaryData.savingsRate}
          description="Of monthly income"
          icon={<CreditCard className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-8">
        <div className="col-span-4">
          {/* Transaction list will go here */}
          <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
          <p className="text-muted-foreground">Transaction list coming soon...</p>
        </div>
        <div className="col-span-3">
          {/* Expense chart will go here */}
          <h3 className="text-xl font-semibold mb-4">Expense Breakdown</h3>
          <p className="text-muted-foreground">Charts coming soon...</p>
        </div>
      </div>
    </main>
  );
} 