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
    <header className="h-16 bg-slate-900 border-b border-slate-700 flex items-center justify-between px-6 shadow-sm text-white">

      {/* Left */}

      <div>
        <h2 className="text-2xl font-bold text-white">
          Dashboard
        </h2>

        <p className="text-sm text-slate-400">
          Welcome back,{" "}
          <span className="font-semibold text-slate-300">
            {userName}
          </span>{" "}
          👋
        </p>
      </div>


      {/* Right */}

      <div className="flex items-center gap-4">

        {/* Search */}

        <div className="hidden md:flex items-center bg-slate-800 border border-slate-700 rounded-lg px-3 py-2">

          <Search
            size={18}
            className="text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-white placeholder:text-slate-500 outline-none ml-2 w-48"
          />

        </div>


        {/* Notification */}

        <button className="relative p-2 rounded-full hover:bg-slate-800 transition">

          <Bell
            size={22}
            className="text-slate-200"
          />

          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
            3
          </span>

        </button>


        {/* User */}

        <div className="flex items-center gap-2">

          <UserCircle2
            size={34}
            className="text-slate-200"
          />

          <span className="hidden lg:block font-medium truncate max-w-[180px] text-slate-200">
            {userName}
          </span>

        </div>


        {/* Sign Out */}

        <Button
          onClick={logout}
          size="sm"
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          <LogOut
            size={16}
            className="mr-2"
          />

          Sign Out
        </Button>

      </div>

    </header>
  );
}