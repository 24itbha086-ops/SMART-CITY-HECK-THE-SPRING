import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Unauthorized() {
  const { isAuthenticated, user } = useAuth();

  // Redirect path based on role
  const homePath = isAuthenticated && user?.role === "admin" ? "/admin" : "/citizen";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4">
      <div className="text-center">
        <span className="material-symbols-outlined mb-4 text-8xl text-red-300">
          gpp_bad
        </span>
        <h1 className="text-4xl font-bold text-slate-900">Access Denied</h1>
        <h2 className="mt-2 text-lg font-medium text-slate-700">401 - Unauthorized</h2>
        <p className="mt-4 max-w-md text-slate-600">
          You don&apos;t have permission to access this page. Please contact your administrator if you believe this is an error.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to={homePath}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <span className="material-symbols-outlined text-lg">home</span>
            Go to Dashboard
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
