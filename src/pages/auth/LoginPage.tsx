import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600">
          TaskFlow
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Welcome back! Please sign in.
        </p>

        <form className="mt-8 space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>

            <Input
              type="email"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Password
            </label>

            <Input
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <Button className="w-full">
            Login
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <span className="text-blue-600 font-medium cursor-pointer">
            Sign Up
          </span>
        </p>
      </Card>
    </div>
  );
}