import { useEffect, useState } from "react";
import { analyticsService } from "../../services/analyticsService";
import Loader from "../../components/common/Loader";

export default function PerformanceReports() {
  const [loading, setLoading] = useState(true);
  const [monthlyTrends, setMonthlyTrends] = useState([]);
  const [departmentPerf, setDepartmentPerf] = useState([]);
  const [resolutionMetrics, setResolutionMetrics] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const [trends, deptPerf, metrics] = await Promise.all([
        analyticsService.getMonthlyTrends(),
        analyticsService.getDepartmentPerformance(),
        analyticsService.getResolutionMetrics(),
      ]);
      setMonthlyTrends(trends);
      setDepartmentPerf(deptPerf);
      setResolutionMetrics(metrics);
    } catch (err) {
      setError(err.message || "Failed to load reports");
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
        <h1 className="text-2xl font-bold text-slate-900">Performance Reports</h1>
        <p className="mt-1 text-sm text-slate-600">
          Detailed analytics and performance metrics
        </p>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>
      )}

      {/* Resolution Metrics */}
      {resolutionMetrics && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Total Resolved</p>
            <p className="mt-1 text-2xl font-bold text-green-600">
              {resolutionMetrics.totalResolved}
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Avg. Time (days)</p>
            <p className="mt-1 text-2xl font-bold text-blue-600">
              {resolutionMetrics.avgDays}
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Within SLA</p>
            <p className="mt-1 text-2xl font-bold text-purple-600">
              {resolutionMetrics.withinSLA}%
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Citizen Rating</p>
            <p className="mt-1 text-2xl font-bold text-amber-600">
              {resolutionMetrics.avgRating}/5
            </p>
          </div>
        </div>
      )}

      {/* Monthly Trends */}
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="mb-4 font-semibold text-slate-900">Monthly Issue Trends</h2>
        <div className="space-y-3">
          {monthlyTrends.map((month) => {
            const maxReported = Math.max(...monthlyTrends.map((m) => m.reported));
            const reportedWidth = maxReported ? (month.reported / maxReported) * 100 : 0;
            const resolvedWidth = maxReported ? (month.resolved / maxReported) * 100 : 0;
            return (
              <div key={month.month} className="flex items-center gap-4">
                <div className="w-16 text-sm font-medium text-slate-700">{month.month}</div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-blue-500"
                        style={{ width: `${reportedWidth}%` }}
                      />
                    </div>
                    <span className="w-8 text-xs text-slate-500">{month.reported}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-green-500"
                        style={{ width: `${resolvedWidth}%` }}
                      />
                    </div>
                    <span className="w-8 text-xs text-slate-500">{month.resolved}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex items-center gap-6 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-blue-500" /> Reported
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-green-500" /> Resolved
          </span>
        </div>
      </div>

      {/* Department Performance Table */}
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="mb-4 font-semibold text-slate-900">Department Performance</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 text-xs uppercase text-slate-500">
              <tr>
                <th className="pb-3">Department</th>
                <th className="pb-3 text-center">Total Issues</th>
                <th className="pb-3 text-center">Resolved</th>
                <th className="pb-3 text-center">Resolution Rate</th>
                <th className="pb-3 text-center">Avg. Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {departmentPerf.map((dept) => (
                <tr key={dept.id}>
                  <td className="py-3 font-medium text-slate-900">{dept.name}</td>
                  <td className="py-3 text-center text-slate-600">{dept.totalIssues}</td>
                  <td className="py-3 text-center text-green-600">{dept.resolved}</td>
                  <td className="py-3 text-center">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        dept.resolutionRate >= 80
                          ? "bg-green-100 text-green-700"
                          : dept.resolutionRate >= 50
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {dept.resolutionRate}%
                    </span>
                  </td>
                  <td className="py-3 text-center text-slate-600">{dept.avgDays} days</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
