import React from "react";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="w-64 flex-shrink-0 bg-white dark:bg-surface-dark border-r border-slate-200 dark:border-border-dark flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-primary rounded-lg p-1.5 text-white">
            <span className="material-symbols-outlined text-2xl fill-1">location_city</span>
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight uppercase text-slate-900 dark:text-white leading-none">City Command</h1>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-widest">Admin Center</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto no-scrollbar">
          <a className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary group" href="#">
            <span className="material-symbols-outlined text-[22px]">dashboard</span>
            <span className="text-sm font-medium">Dashboard</span>
          </a>
          <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors" href="#">
            <span className="material-symbols-outlined text-[22px]">map</span>
            <span className="text-sm font-medium">Map View</span>
          </a>
          <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors" href="#">
            <span className="material-symbols-outlined text-[22px]">engineering</span>
            <span className="text-sm font-medium">Workforce</span>
          </a>
          <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors" href="#">
            <span className="material-symbols-outlined text-[22px]">bar_chart</span>
            <span className="text-sm font-medium">Analytics</span>
          </a>
          <div className="pt-4 pb-2 px-3">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Systems</p>
          </div>
          <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors" href="#">
            <span className="material-symbols-outlined text-[22px]">campaign</span>
            <span className="text-sm font-medium">Public Alerts</span>
          </a>
          <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors" href="#">
            <span className="material-symbols-outlined text-[22px]">settings</span>
            <span className="text-sm font-medium">Settings</span>
          </a>
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-border-dark">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer">
            <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <img className="w-full h-full object-cover" alt="User profile avatar of a city official" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNYoE5uxXRdURY7OCARVUvTjnDnsu2hvsbKY3vPfQtJ_voSL1ta2iREgm5eotMIf2b1twbEF0tOQxjSUIGRyubv82I1G2bRfW2AxbXMW4P-UK10PRR9KlJB6KsiUNmqcedkVKSMbjZvt2JNDRvc3NjewOJqDQXH0ydT1J35qTgORQdQCvVRgTfKurYUEbQZmDoO4Ti5pCSyYz1rp_1KIoOyvJ68okP4LItFr10vx1v-wy-tKg4xCAeKAWq2k_HYbiZ8Sbc6W7qj9OA" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-semibold truncate">Mayor's Office</p>
              <p className="text-[10px] text-slate-500 truncate">Administrator</p>
            </div>
            <span className="material-symbols-outlined text-slate-400 text-sm">unfold_more</span>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark flex flex-col">
        <header className="h-16 border-b border-slate-200 dark:border-border-dark flex items-center justify-between px-8 bg-white/50 dark:bg-background-dark/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="relative w-72">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
              <input className="w-full bg-slate-100 dark:bg-surface-dark border-none rounded-lg pl-10 pr-4 py-1.5 text-sm focus:ring-1 focus:ring-primary dark:text-white placeholder:text-slate-400" placeholder="Search reports, crews, or citizens..." type="text" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition-all shadow-sm">
              <span className="material-symbols-outlined text-lg">add</span>
              Create Work Order
            </button>
            <button className="flex items-center gap-2 bg-slate-100 dark:bg-surface-dark hover:bg-slate-200 dark:hover:bg-border-dark text-slate-700 dark:text-slate-200 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all">
              <span className="material-symbols-outlined text-lg">electric_bolt</span>
              Dispatch Crew
            </button>
            <div className="h-6 w-px bg-slate-200 dark:border-border-dark mx-1"></div>
            <button className="p-1.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1.5 right-1.5 size-2 bg-primary rounded-full border-2 border-white dark:border-background-dark"></span>
            </button>
          </div>
        </header>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-surface-dark p-5 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm">
              <div className="flex justify-between items-start">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Avg Resolution Time</p>
                <span className="text-green-500 text-xs font-bold flex items-center">-12% <span className="material-symbols-outlined text-xs">arrow_downward</span></span>
              </div>
              <h3 className="text-2xl font-bold mt-1">4.2 <span className="text-sm font-normal text-slate-500">hrs</span></h3>
              <div className="mt-4 h-1 w-full bg-slate-100 dark:bg-border-dark rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[70%]"></div>
              </div>
            </div>

            <div className="bg-white dark:bg-surface-dark p-5 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm">
              <div className="flex justify-between items-start">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Citizen Satisfaction</p>
                <span className="text-green-500 text-xs font-bold flex items-center">+3% <span className="material-symbols-outlined text-xs">arrow_upward</span></span>
              </div>
              <h3 className="text-2xl font-bold mt-1">88%</h3>
              <div className="mt-4 flex items-center gap-1">
                <span className="material-symbols-outlined text-primary text-sm fill-1">star</span>
                <span className="material-symbols-outlined text-primary text-sm fill-1">star</span>
                <span className="material-symbols-outlined text-primary text-sm fill-1">star</span>
                <span className="material-symbols-outlined text-primary text-sm fill-1">star</span>
                <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 text-sm">star</span>
              </div>
            </div>

            <div className="bg-white dark:bg-surface-dark p-5 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm">
              <div className="flex justify-between items-start">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Reports</p>
                <span className="text-red-500 text-xs font-bold flex items-center">+5 <span className="material-symbols-outlined text-xs">priority_high</span></span>
              </div>
              <h3 className="text-2xl font-bold mt-1">142</h3>
              <p className="text-[10px] text-slate-500 mt-2 uppercase tracking-wide">24 URGENT PRIORITY</p>
            </div>

            <div className="bg-white dark:bg-surface-dark p-5 rounded-xl border border-slate-200 dark:border-border-dark shadow-sm">
              <div className="flex justify-between items-start">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Crews On-Duty</p>
                <span className="text-slate-400 text-xs font-bold">STABLE</span>
              </div>
              <h3 className="text-2xl font-bold mt-1">28</h3>
              <p className="text-[10px] text-slate-500 mt-2 uppercase tracking-wide">92% UTILIZATION</p>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-8 space-y-6">
              <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 dark:border-border-dark flex items-center justify-between bg-slate-50/50 dark:bg-white/5">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Active Maintenance Reports</h2>
                  <button className="text-xs text-primary font-semibold hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">
                        <th className="px-6 py-3">Report ID</th>
                        <th className="px-6 py-3">Category</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Priority</th>
                        <th className="px-6 py-3 text-right">Time Open</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-border-dark">
                      <tr className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium">#REP-8291</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm text-slate-400">construction</span>
                            <span className="text-sm">Main St Pothole</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-500 text-[10px] font-bold rounded uppercase">In Progress</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5">
                            <span className="size-2 rounded-full bg-red-500"></span>
                            <span className="text-xs font-semibold">High</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 text-right">2.5h</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useIssues from "../../hooks/useIssues";
import { analyticsService } from "../../services/analyticsService";
import Loader from "../../components/common/Loader";
import StatCard from "../../components/dashboard/StatCard";
import IssueStatusBadge from "../../components/issue/IssueStatusBadge";
import { formatDate } from "../../utils/formatDate";

export default function AdminDashboard() {
  const { user } = useAuth();
  const { issues, loading: issuesLoading, fetchIssues } = useIssues();
  const [analytics, setAnalytics] = useState(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(true);

  useEffect(() => {
    fetchIssues();
    loadAnalytics();
  }, [fetchIssues]);

  const loadAnalytics = async () => {
    try {
      const data = await analyticsService.getOverview();
      setAnalytics(data);
    } catch (err) {
      console.error("Failed to load analytics:", err);
    } finally {
      setLoadingAnalytics(false);
    }
  };

  const recentIssues = useMemo(() => {
    return [...issues]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  }, [issues]);

  const pendingIssues = useMemo(() => {
    return issues.filter((i) => i.status === "submitted" || i.status === "acknowledged").length;
  }, [issues]);

  if (issuesLoading || loadingAnalytics) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Welcome, {user?.name || "Admin"}
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Here&apos;s an overview of the city management system
          </p>
        </div>
        <Link
          to="/admin/issues"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <span className="material-symbols-outlined text-lg">list_alt</span>
          Manage Issues
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Issues"
          value={analytics?.totalIssues || issues.length}
          icon="report"
          trend={analytics?.issuesTrend}
          color="blue"
        />
        <StatCard
          title="Pending"
          value={pendingIssues}
          icon="pending_actions"
          color="amber"
        />
        <StatCard
          title="Resolved"
          value={analytics?.resolvedIssues || 0}
          icon="task_alt"
          trend={analytics?.resolutionTrend}
          color="green"
        />
        <StatCard
          title="Avg. Resolution"
          value={`${analytics?.avgResolutionDays || "N/A"} days`}
          icon="schedule"
          color="purple"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          to="/admin/assign"
          className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-sm"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
            <span className="material-symbols-outlined text-blue-600">assignment_ind</span>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Assign Tasks</h3>
            <p className="text-sm text-slate-600">Assign issues to departments</p>
          </div>
        </Link>
        <Link
          to="/admin/departments"
          className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-sm"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
            <span className="material-symbols-outlined text-green-600">business</span>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Departments</h3>
            <p className="text-sm text-slate-600">Manage city departments</p>
          </div>
        </Link>
        <Link
          to="/admin/analytics"
          className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-sm"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
            <span className="material-symbols-outlined text-purple-600">analytics</span>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Analytics</h3>
            <p className="text-sm text-slate-600">View performance reports</p>
          </div>
        </Link>
      </div>

      {/* Recent Issues */}
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">Recent Issues</h2>
          <Link to="/admin/issues" className="text-sm font-medium text-blue-600 hover:underline">
            View All
          </Link>
        </div>
        <div className="mt-4 divide-y divide-slate-100">
          {recentIssues.length === 0 ? (
            <p className="py-4 text-center text-sm text-slate-500">No issues reported yet</p>
          ) : (
            recentIssues.map((issue) => (
              <div key={issue.id} className="flex items-center justify-between py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-slate-900">{issue.title}</p>
                  <p className="text-xs text-slate-500">
                    {issue.reportedBy} • {formatDate(issue.createdAt)}
                  </p>
                </div>
                <IssueStatusBadge status={issue.status} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
