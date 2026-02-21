import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function RegisterScreen() {
  const navigate = useNavigate();
  const { register, loading, error, clearError } = useAuth();
  
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [localError, setLocalError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setLocalError("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLocalError("");
    clearError();

    // Validation
    if (!formData.name.trim()) {
      setLocalError("Full name is required");
      return;
    }
    if (!formData.email.trim()) {
      setLocalError("Email is required");
      return;
    }
    if (!formData.phone.trim()) {
      setLocalError("Phone number is required");
      return;
    }
    if (!formData.password) {
      setLocalError("Password is required");
      return;
    }
    if (formData.password.length < 6) {
      setLocalError("Password must be at least 6 characters");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    try {
      await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: "citizen",
      });
      navigate("/citizen", { replace: true });
    } catch {
      // Error handled by context
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-5xl flex-col items-center justify-center gap-4 sm:gap-6">
        <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-8">
          <div className="mb-6 flex items-center justify-center gap-2">
            <div className="flex items-center justify-center rounded-lg bg-[#13b6ec] p-2 text-white">
              <span className="material-symbols-outlined">location_city</span>
            </div>
            <h1 className="text-xl font-bold">CityTransparency</h1>
          </div>

          <h2 className="text-2xl font-bold text-slate-900">Create Account</h2>
          <p className="mt-2 text-xs text-slate-600 sm:text-sm">
            Register to report civic issues in your area.
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

          <form onSubmit={handleRegister} className="mt-6 space-y-4">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
                Full Name
              </label>
              <div className="flex items-center rounded-lg border border-slate-300 bg-white px-3 py-2.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                <span className="material-symbols-outlined text-slate-400 text-lg">person</span>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="ml-2 w-full bg-transparent text-sm text-slate-900 outline-none"
                  autoComplete="name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
                Email
              </label>
              <div className="flex items-center rounded-lg border border-slate-300 bg-white px-3 py-2.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                <span className="material-symbols-outlined text-slate-400 text-lg">mail</span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="ml-2 w-full bg-transparent text-sm text-slate-900 outline-none"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="mb-1 block text-sm font-medium text-slate-700">
                Phone
              </label>
              <div className="flex items-center rounded-lg border border-slate-300 bg-white px-3 py-2.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                <span className="material-symbols-outlined text-slate-400 text-lg">phone</span>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  className="ml-2 w-full bg-transparent text-sm text-slate-900 outline-none"
                  autoComplete="tel"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="flex items-center rounded-lg border border-slate-300 bg-white px-3 py-2.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                <span className="material-symbols-outlined text-slate-400 text-lg">lock</span>
                <input
                  id="password"
                  name="password"
                  type={showPass ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="ml-2 w-full bg-transparent text-sm text-slate-900 outline-none"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <span className="material-symbols-outlined text-lg">
                    {showPass ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-slate-700">
                Confirm Password
              </label>
              <div className="flex items-center rounded-lg border border-slate-300 bg-white px-3 py-2.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                <span className="material-symbols-outlined text-slate-400 text-lg">lock</span>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  className="ml-2 w-full bg-transparent text-sm text-slate-900 outline-none"
                  autoComplete="new-password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Creating account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-slate-600 sm:text-sm">
            Already registered?{" "}
            <Link to="/login" className="font-semibold text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
