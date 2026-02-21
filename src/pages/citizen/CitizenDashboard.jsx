import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useIssues from "../../hooks/useIssues";
import Loader from "../../components/common/Loader";
import IssueStatusBadge from "../../components/issue/IssueStatusBadge";
import { formatDate } from "../../utils/formatDate";

const CitizenDashboard = () => {
  const { user } = useAuth();
  const { issues, loading, fetchIssues, issueStats } = useIssues();

  useEffect(() => {
    fetchIssues({ userId: user?.id });
  }, [fetchIssues, user?.id]);

  const recentIssues = useMemo(() => {
    return [...issues]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);
  }, [issues]);

  const resolvedCount = useMemo(() => {
    return issues.filter((i) => i.status === "resolved" || i.status === "closed").length;
  }, [issues]);

  const activeCount = useMemo(() => {
    return issues.filter((i) => i.status !== "resolved" && i.status !== "closed").length;
  }, [issues]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <section>
        <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:p-8">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#13b6ec] to-blue-600 text-white shadow-lg shadow-[#13b6ec]/20 md:h-24 md:w-24">
                <span className="material-symbols-outlined filled-icon text-4xl">
                  military_tech
                </span>
              </div>
              <div className="absolute -bottom-2 -right-2 rounded-full border-2 border-white bg-[#078836] px-2 py-1 text-[10px] font-bold text-white">
                LVL {Math.min(Math.floor(issues.length / 3) + 1, 20)}
              </div>
            </div>
            <div>
              <h1 className="mb-1 text-2xl font-black md:text-3xl">
                Welcome back, {user?.name?.split(" ")[0] || "Citizen"}!
              </h1>
              <p className="text-slate-500">
                {issues.length > 0
                  ? `You have ${activeCount} active ${activeCount === 1 ? "issue" : "issues"} being tracked.`
                  : "Start making an impact by reporting your first issue."}
              </p>
            </div>
          </div>
          <div className="flex w-full gap-4 md:w-auto">
            <div className="flex-1 rounded-xl border border-[#13b6ec]/20 bg-blue-50 px-6 py-4 text-center md:flex-none md:text-left">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#13b6ec]">
                Total Reports
              </p>
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <span className="material-symbols-outlined filled-icon text-[#13b6ec]">
                  description
                </span>
                <span className="text-2xl font-black leading-none">
                  {issues.length}
                </span>
              </div>
            </div>
            <div className="flex-1 rounded-xl border border-green-200 bg-green-50 px-6 py-4 text-center md:flex-none md:text-left">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-green-600">
                Resolved
              </p>
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <span className="material-symbols-outlined filled-icon text-green-600">
                  task_alt
                </span>
                <span className="text-2xl font-black leading-none">
                  {resolvedCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <span className="material-symbols-outlined">description</span>
            </div>
            <span className="text-xs font-bold text-slate-400">Lifetime</span>
          </div>
          <p className="text-3xl font-black">{issueStats?.total || issues.length}</p>
          <p className="text-sm font-bold text-slate-500">My Total Reports</p>
          <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-500"
              style={{ width: `${Math.min(issues.length * 10, 100)}%` }}
            />
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
              <span className="material-symbols-outlined">task_alt</span>
            </div>
            <span className="text-xs font-bold text-green-600">
              {resolvedCount > 0 ? `${resolvedCount} resolved` : "—"}
            </span>
          </div>
          <p className="text-3xl font-black">{resolvedCount}</p>
          <p className="text-sm font-bold text-slate-500">Issues Resolved</p>
          <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-green-500"
              style={{
                width: issues.length > 0 ? `${(resolvedCount / issues.length) * 100}%` : "0%",
              }}
            />
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
              <span className="material-symbols-outlined">pending_actions</span>
            </div>
            {activeCount > 0 && (
              <span className="text-xs font-bold text-amber-600">Action needed</span>
            )}
          </div>
          <p className="text-3xl font-black">{activeCount}</p>
          <p className="text-sm font-bold text-slate-500">Active Issues</p>
          <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-amber-500"
              style={{
                width: issues.length > 0 ? `${(activeCount / issues.length) * 100}%` : "0%",
              }}
            />
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="space-y-6 lg:col-span-2">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-bold">My Recent Activity</h2>
            <Link
              to="/citizen/my-issues"
              className="text-sm font-bold text-blue-600 hover:underline"
            >
              View all reports
            </Link>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {recentIssues.length === 0 ? (
              <div className="p-8 text-center">
                <span className="material-symbols-outlined mb-3 text-5xl text-slate-300">
                  inbox
                </span>
                <p className="font-semibold text-slate-600">No issues yet</p>
                <p className="mt-1 text-sm text-slate-500">
                  Report your first issue to get started!
                </p>
              </div>
            ) : (
              recentIssues.map((issue, index) => (
                <Link
                  key={issue.id}
                  to={`/citizen/issues/${issue.id}`}
                  className={`block p-6 transition-colors hover:bg-slate-50 ${
                    index < recentIssues.length - 1 ? "border-b border-slate-100" : ""
                  }`}
                >
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white ${
                          issue.status === "resolved" || issue.status === "closed"
                            ? "bg-green-500"
                            : issue.status === "in_progress"
                            ? "bg-blue-500"
                            : "bg-slate-400"
                        }`}
                      >
                        <span className="material-symbols-outlined text-xl">
                          {issue.status === "resolved" || issue.status === "closed"
                            ? "check_circle"
                            : issue.status === "in_progress"
                            ? "engineering"
                            : "send"}
                        </span>
                      </div>
                      {index < recentIssues.length - 1 && (
                        <div className="my-2 h-full w-0.5 bg-slate-100" />
                      )}
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="mb-1 flex items-center justify-between">
                        <h4 className="text-base font-bold">{issue.title}</h4>
                        <span className="text-xs font-medium text-slate-400">
                          {formatDate(issue.createdAt)}
                        </span>
                      </div>
                      <div className="mb-2 flex items-center gap-2">
                        <IssueStatusBadge status={issue.status} />
                        <span className="text-xs text-slate-500">{issue.location?.address || issue.location}</span>
                      </div>
                      <p className="line-clamp-2 text-sm text-slate-600">
                        {issue.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
          <Link
            to="/citizen/report-issue"
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 py-4 font-bold text-slate-500 transition-colors hover:bg-slate-50 hover:border-blue-300 hover:text-blue-600"
          >
            <span className="material-symbols-outlined">add_circle</span>
            Report a New Issue
          </Link>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Quick Links */}
          <section>
            <h3 className="mb-4 px-2 text-lg font-bold">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                to="/citizen/report-issue"
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-blue-200 hover:shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <span className="material-symbols-outlined">add_circle</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Report Issue</p>
                  <p className="text-xs text-slate-500">Submit a new complaint</p>
                </div>
              </Link>
              <Link
                to="/citizen/my-issues"
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-blue-200 hover:shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
                  <span className="material-symbols-outlined">list_alt</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">My Issues</p>
                  <p className="text-xs text-slate-500">Track your reports</p>
                </div>
              </Link>
              <Link
                to="/citizen/help"
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-blue-200 hover:shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                  <span className="material-symbols-outlined">help</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Help Center</p>
                  <p className="text-xs text-slate-500">Get support</p>
                </div>
              </Link>
            </div>
          </section>

          {/* Profile Card */}
          <section>
            <h3 className="mb-4 px-2 text-lg font-bold">Profile</h3>
            <Link
              to="/citizen/profile"
              className="block rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-blue-200 hover:shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{user?.name || "User"}</p>
                  <p className="text-sm text-slate-500">{user?.email}</p>
                </div>
                <span className="material-symbols-outlined ml-auto text-slate-400">
                  chevron_right
                </span>
              </div>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CitizenDashboard;
