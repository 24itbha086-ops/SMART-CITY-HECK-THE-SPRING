import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useIssues from "../../hooks/useIssues";
import { formatDate } from "../../utils/formatDate";

export default function CitizenProfile() {
  const { user, logout } = useAuth();
  const { issueStats } = useIssues();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    // Simulate API save
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSaving(false);
    setEditing(false);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Profile Header */}
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">{user?.name || "User"}</h1>
            <p className="text-sm text-slate-600">{user?.email}</p>
            <span className="mt-1 inline-block rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
              {user?.role === "admin" ? "Administrator" : "Citizen"}
            </span>
          </div>
        </div>

        <div className="mt-6 grid gap-4 border-t border-slate-100 pt-6 sm:grid-cols-3">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{issueStats?.total || 0}</p>
            <p className="text-xs text-slate-500">Total Issues</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{issueStats?.resolved || 0}</p>
            <p className="text-xs text-slate-500">Resolved</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-amber-600">{issueStats?.pending || 0}</p>
            <p className="text-xs text-slate-500">Pending</p>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">Profile Details</h2>
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Edit Profile
            </button>
          )}
        </div>

        <form onSubmit={handleSave} className="mt-4 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!editing}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 disabled:bg-slate-50 disabled:text-slate-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!editing}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 disabled:bg-slate-50 disabled:text-slate-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!editing}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 disabled:bg-slate-50 disabled:text-slate-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Member Since</label>
            <p className="text-sm text-slate-600">
              {formatDate(user?.createdAt || new Date().toISOString())}
            </p>
          </div>

          {editing && (
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditing(false);
                  setFormData({
                    name: user?.name || "",
                    email: user?.email || "",
                    phone: user?.phone || "",
                  });
                }}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Account Actions */}
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="font-semibold text-slate-900">Account Actions</h2>
        <div className="mt-4 space-y-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 transition hover:bg-red-100"
          >
            <span className="material-symbols-outlined">logout</span>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
