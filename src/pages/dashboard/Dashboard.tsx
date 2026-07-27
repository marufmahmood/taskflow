import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { logout } from "@/services/auth.service";

export default function Dashboard() {
    const navigate = useNavigate();

const handleLogout = async () => {
  await logout();
  navigate("/");
};
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">
            TaskFlow Dashboard
          </h1>

          <Button onClick={handleLogout}>
             Logout
            </Button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto p-6">

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          <Card className="p-6">
            <h2 className="text-gray-500">Today's Tasks</h2>

            <p className="text-4xl font-bold mt-3">
              8
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-gray-500">
              Completed
            </h2>

            <p className="text-4xl font-bold mt-3 text-green-600">
              5
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-gray-500">
              Pending
            </h2>

            <p className="text-4xl font-bold mt-3 text-yellow-600">
              3
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-gray-500">
              Team Members
            </h2>

            <p className="text-4xl font-bold mt-3 text-blue-600">
              4
            </p>
          </Card>

        </div>

      </main>
    </div>
  );
}