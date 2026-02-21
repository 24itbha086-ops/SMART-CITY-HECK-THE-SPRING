import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, logout, loading, error, clearError, isAuthenticated, user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  // If already authenticated, show option to continue or switch accounts
  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md flex-col items-center justify-center">
          <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <span className="material-symbols-outlined text-3xl text-blue-600">person</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">Already Signed In</h2>
            <p className="mt-2 text-sm text-slate-600">
              You are logged in as <strong>{user.name}</strong>
            </p>
            <p className="text-xs text-slate-500">({user.email} - {user.role})</p>
            
            <div className="mt-6 space-y-3">
              <button
                onClick={() => navigate(user.role === "admin" ? "/admin" : "/citizen")}
                className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Continue to {user.role === "admin" ? "Admin" : "Citizen"} Dashboard
              </button>
              <button
                onClick={() => {
                  logout();
                }}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Sign Out &amp; Use Different Account
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setLocalError("");
    clearError();
    const normalizedEmail = email.trim();
    const normalizedPassword = password.trim();

    // Basic validation
    if (!normalizedEmail) {
      setLocalError("Email is required");
      return;
    }
    if (!normalizedPassword) {
      setLocalError("Password is required");
      return;
    }

    try {
      const loggedInUser = await login(normalizedEmail, normalizedPassword);
      // Redirect based on role or to the page they tried to access
      const from = location.state?.from?.pathname;
      const defaultPath = loggedInUser.role === "admin" ? "/admin" : "/citizen";
      navigate(from || defaultPath, { replace: true });
    } catch {
      // Error is handled by AuthContext
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-5xl flex-col items-center justify-center gap-4 sm:gap-6">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-8">
          <div className="mb-6 flex items-center justify-center gap-2">
            <div className="flex items-center justify-center rounded-lg bg-[#13b6ec] p-2 text-white">
              <span className="material-symbols-outlined">location_city</span>
            </div>
            <h1 className="text-xl font-bold">CityTransparency</h1>
          </div>

          <h2 className="text-2xl font-bold text-slate-900">Welcome Back</h2>
          <p className="mt-2 text-xs text-slate-600 sm:text-sm">
            Secure login for urban maintenance management
          </p>

          {/* Error display */}
          {(error || localError) && (
            <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">error</span>
                {error || localError}
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
                Email or Username
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@cityhall.gov"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                autoComplete="current-password"
              />
            </div>

            <div className="flex items-center justify-between gap-3 text-xs text-slate-600 sm:text-sm">
              <label htmlFor="remember" className="flex items-center">
                <input type="checkbox" id="remember" className="rounded border-slate-300" />
                <span className="ml-2">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Signing in...
                </span>
              ) : (
                <>Login &rarr;</>
              )}
            </button>
          </form>

          <div className="relative my-5 text-center">
            <div className="absolute inset-x-0 top-1/2 border-t border-slate-200" />
          </div>

          {/* Demo credentials info */}
          <div className="mt-4 rounded-lg bg-blue-50 p-3 text-xs text-blue-700">
            <p className="font-semibold">Demo Credentials:</p>
            <p className="mt-1">Citizen: alex@citizen.gov (any password)</p>
            <p>Admin: admin@cityhall.gov or admin (any password)</p>
          </div>

          <p className="mt-5 text-center text-xs text-slate-600 sm:text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="font-semibold text-blue-600 hover:underline">
              Register your account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
