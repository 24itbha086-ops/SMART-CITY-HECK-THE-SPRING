import { useEffect, useState } from "react";
import { departmentService } from "../../services/departmentService";
import Loader from "../../components/common/Loader";

export default function ManageDepartments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      const depts = await departmentService.listDepartments();
      // Load stats for each department
      const deptsWithStats = await Promise.all(
        depts.map(async (dept) => {
          try {
            const stats = await departmentService.getDepartmentStats(dept.id);
            return { ...dept, stats };
          } catch {
            return { ...dept, stats: null };
          }
        })
      );
      setDepartments(deptsWithStats);
    } catch (err) {
      setError(err.message || "Failed to load departments");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Departments</h1>
          <p className="mt-1 text-sm text-slate-600">
            Manage city departments and their performance
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>
      )}

      {/* Departments Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {departments.map((dept) => (
          <div
            key={dept.id}
            className="rounded-lg border border-slate-200 bg-white p-5 transition hover:shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <span className="material-symbols-outlined text-blue-600">
                  {dept.icon || "business"}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900">{dept.name}</h3>
                <p className="text-sm text-slate-500">{dept.head}</p>
              </div>
            </div>

            {dept.stats && (
              <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-4">
                <div className="text-center">
                  <p className="text-lg font-bold text-slate-900">{dept.stats.totalIssues || 0}</p>
                  <p className="text-xs text-slate-500">Total</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-green-600">{dept.stats.resolved || 0}</p>
                  <p className="text-xs text-slate-500">Resolved</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-amber-600">{dept.stats.pending || 0}</p>
                  <p className="text-xs text-slate-500">Pending</p>
                </div>
              </div>
            )}

            <div className="mt-4 flex items-center gap-2">
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                  dept.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {dept.status || "active"}
              </span>
              <span className="text-xs text-slate-500">
                {dept.memberCount || 0} members
              </span>
            </div>
          </div>
        ))}
      </div>

      {departments.length === 0 && !error && (
        <div className="rounded-lg bg-slate-50 p-12 text-center">
          <span className="material-symbols-outlined mb-4 text-6xl text-slate-300">
            business
          </span>
          <h3 className="text-lg font-semibold text-slate-700">No Departments</h3>
          <p className="mt-2 text-sm text-slate-500">No departments have been created yet.</p>
        </div>
      )}
    </div>
  );
}
