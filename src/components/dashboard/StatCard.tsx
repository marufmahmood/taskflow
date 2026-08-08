import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
}: StatCardProps) {
  return (
    <div className="flex justify-between items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-sm">

      <div>
        <p className="text-gray-500 dark:text-slate-400 text-sm font-medium">
          {title}
        </p>

        <h2 className="text-4xl font-bold mt-2 text-slate-900 dark:text-white">
          {value}
        </h2>
      </div>

      <div
        className={`h-14 w-14 rounded-xl flex items-center justify-center ${color}`}
      >
        <Icon
          className="text-white"
          size={28}
        />
      </div>

    </div>
  );
}