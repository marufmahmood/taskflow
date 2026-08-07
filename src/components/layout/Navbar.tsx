import { logout } from "@/services/auth.service";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Search,
  LogOut,
  UserCircle2,
} from "lucide-react";

interface NavbarProps {
  userName?: string;
}

export default function Navbar({
  userName,
}: NavbarProps) {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm">
  {/* Left */}
  <div>
    <h2 className="text-2xl font-bold text-slate-800">
      Dashboard
    </h2>

    <p className="text-sm text-slate-500">
      Welcome back, <span className="font-semibold">{userName}</span> 👋
    </p>
  </div>

  {/* Right */}
  <div className="flex items-center gap-4">

    {/* Search */}
    <div className="hidden md:flex items-center bg-slate-100 rounded-lg px-3 py-2">
      <Search size={18} className="text-slate-500" />
      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent outline-none ml-2 w-48"
      />
    </div>

    {/* Notification */}
    <button className="relative p-2 rounded-full hover:bg-slate-100">
      <Bell size={22} />

      <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
        3
      </span>
    </button>

    {/* User */}
    <div className="flex items-center gap-2">
      <UserCircle2 size={34} />
      <span className="hidden lg:block font-medium truncate max-w-[180px]">
        {userName}
      </span>
    </div>

    <Button
      onClick={logout}
      size="sm"
      className="bg-red-600 hover:bg-red-700"
    >
      <LogOut size={16} className="mr-2" />
      Sign Out
    </Button>

  </div>
</header>
  );
}