import { useState } from "react";
import useAuth from "../../hooks/useAuth";

export default function AdminSettings() {
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleToggle = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    // Simulate API save
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSaving(false);
    setSaved(true);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="mt-1 text-sm text-slate-600">Manage your account and preferences</p>
      </div>

      {/* Profile Section */}
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="font-semibold text-slate-900">Account Information</h2>
        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
              {user?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>
            <div>
              <h3 className="font-medium text-slate-900">{user?.name || "Admin User"}</h3>
              <p className="text-sm text-slate-500">{user?.email || "admin@cityhall.gov"}</p>
              <span className="mt-1 inline-block rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700">
                Administrator
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="font-semibold text-slate-900">Notification Preferences</h2>
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-700">Email Notifications</p>
              <p className="text-sm text-slate-500">Receive email updates about new issues</p>
            </div>
            <button
              onClick={() => handleToggle("email")}
              className={`relative h-6 w-11 rounded-full transition ${
                notifications.email ? "bg-blue-600" : "bg-slate-200"
              }`}
            >
              <span
                className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition ${
                  notifications.email ? "translate-x-5" : ""
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-700">Push Notifications</p>
              <p className="text-sm text-slate-500">Get real-time alerts in your browser</p>
            </div>
            <button
              onClick={() => handleToggle("push")}
              className={`relative h-6 w-11 rounded-full transition ${
                notifications.push ? "bg-blue-600" : "bg-slate-200"
              }`}
            >
              <span
                className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition ${
                  notifications.push ? "translate-x-5" : ""
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-700">SMS Notifications</p>
              <p className="text-sm text-slate-500">Receive text messages for urgent issues</p>
            </div>
            <button
              onClick={() => handleToggle("sms")}
              className={`relative h-6 w-11 rounded-full transition ${
                notifications.sms ? "bg-blue-600" : "bg-slate-200"
              }`}
            >
              <span
                className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition ${
                  notifications.sms ? "translate-x-5" : ""
                }`}
              />
            </button>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : saved ? "Saved!" : "Save Preferences"}
        </button>
      </div>

      {/* Danger Zone */}
      <div className="rounded-lg border border-red-200 bg-red-50 p-6">
        <h2 className="font-semibold text-red-900">Danger Zone</h2>
        <p className="mt-1 text-sm text-red-700">
          These actions are irreversible. Please proceed with caution.
        </p>
        <div className="mt-4">
          <button
            onClick={logout}
            className="rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
