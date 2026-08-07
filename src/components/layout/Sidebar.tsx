import { Link, useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  CheckSquare,
  Users,
  Calendar,
  FileText,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const menus = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Tasks",
    path: "/tasks",
    icon: CheckSquare,
  },
  {
    name: "Users",
    path: "/users",
    icon: Users,
  },
  {
    name: "Calendar",
    path: "/calendar",
    icon: Calendar,
  },
  {
    name: "Reports",
    path: "/reports",
    icon: FileText,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen">

      <div className="p-6 border-b border-slate-700">

        <h1 className="text-3xl font-extrabold tracking-wide text-blue-400">
          TaskFlow
        </h1>

        <p className="text-xs text-slate-400 mt-2">
          Enterprise Task Manager
        </p>

      </div>

      <nav className="p-4 space-y-2">

        {menus.map((menu) => (

          <Link
            key={menu.path}
            to={menu.path}
            className={`flex items-center gap-3 rounded-lg px-4 py-3 transition

            ${
              location.pathname === menu.path
                ? "bg-blue-600"
                : "hover:bg-slate-800"
            }`}
          >

            <menu.icon size={20} />

          <span className="font-medium">
             {menu.name}
            </span>

          </Link>

        ))}

      </nav>

    </aside>
  );
}