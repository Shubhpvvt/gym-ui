import { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 800);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-100">

      {/* LEFT: BRAND */}
      <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-slate-900 to-slate-800 text-white p-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Gym Management System
          </h1>
          <p className="mt-4 text-slate-300 max-w-md leading-relaxed">
            A centralized platform to manage gyms, trainers, members,
            diet plans, workouts and payments efficiently.
          </p>

          <ul className="mt-8 space-y-2 text-slate-300 text-sm">
            <li>• Role based access control</li>
            <li>• Secure & scalable system</li>
            <li>• Designed for admins & trainers</li>
          </ul>
        </div>

        <p className="text-xs text-slate-400">
          © 2026 Gym Management System
        </p>
      </div>

      {/* RIGHT: LOGIN FORM */}
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

          <h2 className="text-2xl font-bold text-slate-800">
            Sign in to your account
          </h2>
          <p className="text-sm text-slate-500 mt-1 mb-8">
            Use your admin credentials to continue
          </p>

          {error && (
            <div className="mb-4 rounded-md bg-red-50 text-red-600 text-sm px-3 py-2">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5
                         focus:outline-none focus:ring-2 focus:ring-slate-900
                         disabled:bg-slate-100"
            />
          </div>

          {/* Password with Show / Hide */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 pr-14
                           focus:outline-none focus:ring-2 focus:ring-slate-900
                           disabled:bg-slate-100"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
                className="absolute right-3 top-1/2 -translate-y-1/2
                           text-sm font-medium text-slate-500 hover:text-slate-900
                           disabled:opacity-50"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center text-sm text-slate-600">
              <input
                type="checkbox"
                className="mr-2 accent-slate-900"
                disabled={loading}
              />
              Remember me
            </label>
            <button
              type="button"
              className="text-sm font-medium text-slate-700 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full rounded-lg bg-slate-900 hover:bg-slate-800
                       text-white py-2.5 font-semibold transition
                       disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-xs text-slate-400 text-center mt-6">
            Authorized personnel only
          </p>
        </div>
      </div>
    </div>
  );
}
