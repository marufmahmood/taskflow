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
    <div className="bg-white rounded-2xl shadow-sm border p-5 hover:shadow-lg transition-all duration-300">

      <div className="flex justify-between items-center">

        <div>
          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {value}
          </h2>
        </div>

        <div
          className={`h-14 w-14 rounded-xl flex items-center justify-center ${color}`}
        >
          <Icon className="text-white" size={28} />
        </div>

      </div>

    </div>
  );
}