import type { ReactNode } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface Props {
  children: ReactNode;
  userName?: string;
}

export default function DashboardLayout({
  children,
  userName,
}: Props) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Navbar userName={userName} />

        <main className="flex-1 p-6 overflow-auto bg-slate-950">
          {children}
        </main>

      </div>

    </div>
  );
}