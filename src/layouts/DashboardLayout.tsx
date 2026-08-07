import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { Background } from "@/components/shared/Background";
import { MobileTopbar } from "@/components/layout/MobileTopbar";

export function DashboardLayout() {
  return (
    <div className="relative flex min-h-screen">
      <Background />
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <MobileTopbar />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
