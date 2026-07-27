export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600">
          TaskFlow
        </h1>

        <p className="mt-2 text-center text-gray-500">
          Sign in to your account
        </p>

        <form className="mt-8 space-y-5">
          <div>
            <label className="block text-sm font-medium">Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              className="mt-2 w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              className="mt-2 w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}