import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4">
      <div className="text-center">
        <span className="material-symbols-outlined mb-4 text-8xl text-slate-300">
          search_off
        </span>
        <h1 className="text-6xl font-bold text-slate-900">404</h1>
        <h2 className="mt-2 text-xl font-semibold text-slate-700">Page Not Found</h2>
        <p className="mt-4 max-w-md text-slate-600">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <span className="material-symbols-outlined text-lg">home</span>
            Go Home
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
