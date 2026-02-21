import { useEffect, useState } from "react";
import { analyticsService } from "../../services/analyticsService";
import Loader from "../../components/common/Loader";
import StatCard from "../../components/dashboard/StatCard";

export default function DepartmentAnalytics() {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);
  const [departmentPerf, setDepartmentPerf] = useState([]);
  const [categoryStats, setCategoryStats] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const [overview, deptPerf, catStats] = await Promise.all([
        analyticsService.getOverview(),
        analyticsService.getDepartmentPerformance(),
        analyticsService.getCategoryStats(),
      ]);
      setAnalytics(overview);
      setDepartmentPerf(deptPerf);
      setCategoryStats(catStats);
    } catch (err) {
      setError(err.message || "Failed to load analytics");
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
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Department Analytics</h1>
        <p className="mt-1 text-sm text-slate-600">
          Performance metrics and insights across all departments
        </p>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>
      )}

      {/* Overview Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Issues"
          value={analytics?.totalIssues || 0}
          icon="report"
          color="blue"
        />
        <StatCard
          title="Resolved"
          value={analytics?.resolvedIssues || 0}
          icon="task_alt"
          color="green"
        />
        <StatCard
          title="Avg. Resolution"
          value={`${analytics?.avgResolutionDays || 0} days`}
          icon="schedule"
          color="purple"
        />
        <StatCard
          title="Satisfaction"
          value={`${analytics?.satisfactionRate || 0}%`}
          icon="sentiment_satisfied"
          color="amber"
        />
      </div>

      {/* Department Performance */}
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="mb-4 font-semibold text-slate-900">Department Performance</h2>
        <div className="space-y-4">
          {departmentPerf.map((dept) => (
            <div key={dept.id} className="flex items-center gap-4">
              <div className="w-32 truncate text-sm font-medium text-slate-700">
                {dept.name}
              </div>
              <div className="flex-1">
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-blue-500 transition-all"
                    style={{ width: `${dept.resolutionRate || 0}%` }}
                  />
                </div>
              </div>
              <div className="w-16 text-right text-sm font-medium text-slate-600">
                {dept.resolutionRate || 0}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Stats */}
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="mb-4 font-semibold text-slate-900">Issues by Category</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categoryStats.map((cat) => (
            <div
              key={cat.category}
              className="flex items-center gap-3 rounded-lg bg-slate-50 p-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                <span className="material-symbols-outlined text-slate-500">
                  {cat.icon || "category"}
                </span>
              </div>
              <div>
                <p className="font-medium text-slate-900">{cat.label}</p>
                <p className="text-sm text-slate-500">{cat.count} issues</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
