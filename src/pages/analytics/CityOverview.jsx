import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { analyticsService } from "../../services/analyticsService";
import Loader from "../../components/common/Loader";
import StatCard from "../../components/dashboard/StatCard";

export default function CityOverview() {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);
  const [statusCounts, setStatusCounts] = useState([]);
  const [categoryStats, setCategoryStats] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [overview, statuses, categories] = await Promise.all([
        analyticsService.getOverview(),
        analyticsService.getStatusCounts(),
        analyticsService.getCategoryStats(),
      ]);
      setAnalytics(overview);
      setStatusCounts(statuses);
      setCategoryStats(categories);
    } catch (err) {
      setError(err.message || "Failed to load data");
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">City Overview</h1>
          <p className="mt-1 text-sm text-slate-600">
            Real-time insights into city management
          </p>
        </div>
        <Link
          to="/analytics/reports"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <span className="material-symbols-outlined text-lg">assessment</span>
          View Reports
        </Link>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>
      )}

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Issues"
          value={analytics?.totalIssues || 0}
          icon="report"
          trend={analytics?.issuesTrend}
          color="blue"
        />
        <StatCard
          title="Resolved Today"
          value={analytics?.resolvedToday || 0}
          icon="task_alt"
          color="green"
        />
        <StatCard
          title="Active Citizens"
          value={analytics?.activeCitizens || 0}
          icon="groups"
          color="purple"
        />
        <StatCard
          title="Departments"
          value={analytics?.totalDepartments || 0}
          icon="business"
          color="amber"
        />
      </div>

      {/* Status Distribution */}
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="mb-4 font-semibold text-slate-900">Issue Status Distribution</h2>
        <div className="grid gap-4 sm:grid-cols-5">
          {statusCounts.map((status) => (
            <div
              key={status.status}
              className={`rounded-lg p-4 text-center ${status.bgColor || "bg-slate-50"}`}
            >
              <p className="text-2xl font-bold text-slate-900">{status.count}</p>
              <p className="text-sm text-slate-600">{status.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="mb-4 font-semibold text-slate-900">Issues by Category</h2>
        <div className="space-y-3">
          {categoryStats.map((cat) => {
            const percentage = analytics?.totalIssues
              ? Math.round((cat.count / analytics.totalIssues) * 100)
              : 0;
            return (
              <div key={cat.category} className="flex items-center gap-4">
                <div className="flex w-32 items-center gap-2">
                  <span className="material-symbols-outlined text-lg text-slate-500">
                    {cat.icon || "category"}
                  </span>
                  <span className="truncate text-sm font-medium text-slate-700">
                    {cat.label}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
                <div className="w-16 text-right text-sm text-slate-600">
                  {cat.count} ({percentage}%)
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-green-500">speed</span>
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {analytics?.avgResolutionDays || 0} days
              </p>
              <p className="text-sm text-slate-500">Avg. Resolution Time</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-blue-500">trending_up</span>
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {analytics?.resolutionRate || 0}%
              </p>
              <p className="text-sm text-slate-500">Resolution Rate</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-amber-500">sentiment_satisfied</span>
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {analytics?.satisfactionRate || 0}%
              </p>
              <p className="text-sm text-slate-500">Citizen Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
