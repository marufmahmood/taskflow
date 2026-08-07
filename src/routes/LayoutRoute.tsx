import { Outlet } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";

export default function LayoutRoute() {
  const { user } = useAuth();

  return (
    <DashboardLayout
  userName={user?.displayName || user?.email || "User"}
>
      <Outlet />
    </DashboardLayout>
  );
}