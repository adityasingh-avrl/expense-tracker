import { DashboardNav } from "@/components/dashboard/nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardNav />
      <div className="flex-1 container mx-auto">
        {children}
      </div>
    </div>
  );
} 