import { useEffect, useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useIssues from "../../hooks/useIssues";
import Loader from "../../components/common/Loader";
import IssueStatusBadge from "../../components/issue/IssueStatusBadge";
import { formatDate } from "../../utils/formatDate";
import { ISSUE_CATEGORIES, ISSUE_STATUSES } from "../../data/mockData";

export default function MyIssues() {
  const { user } = useAuth();
  const { issues, loading, error, fetchIssues } = useIssues();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    fetchIssues({ userId: user?.id });
  }, [fetchIssues, user?.id]);

  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || issue.status === statusFilter;
      const matchesCategory = categoryFilter === "all" || issue.category === categoryFilter;
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [issues, searchTerm, statusFilter, categoryFilter]);

  const handleClearFilters = useCallback(() => {
    setSearchTerm("");
    setStatusFilter("all");
    setCategoryFilter("all");
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-6 text-center">
        <span className="material-symbols-outlined mb-2 text-4xl text-red-400">error</span>
        <h3 className="text-lg font-semibold text-red-800">Error Loading Issues</h3>
        <p className="mt-1 text-red-600">{error}</p>
        <button
          onClick={() => fetchIssues({ userId: user?.id })}
          className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Issues</h1>
          <p className="mt-1 text-sm text-slate-600">
            Track and manage your reported issues
          </p>
        </div>
        <Link
          to="/citizen/report-issue"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Report New Issue
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 sm:flex-row sm:items-center">
        <div className="flex-1">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search issues..."
              className="w-full rounded-lg border border-slate-300 py-2 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
        >
          <option value="all">All Statuses</option>
          {Object.values(ISSUE_STATUSES).map((status) => (
            <option key={status.id} value={status.id}>
              {status.label}
            </option>
          ))}
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
        >
          <option value="all">All Categories</option>
          {ISSUE_CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.label}
            </option>
          ))}
        </select>
        {(searchTerm || statusFilter !== "all" || categoryFilter !== "all") && (
          <button
            onClick={handleClearFilters}
            className="text-sm text-slate-600 hover:text-slate-900"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Issues List */}
      {filteredIssues.length === 0 ? (
        <div className="rounded-lg border border-slate-200 bg-white p-12 text-center">
          <span className="material-symbols-outlined mb-4 text-6xl text-slate-300">
            inbox
          </span>
          <h3 className="text-lg font-semibold text-slate-700">No Issues Found</h3>
          <p className="mt-2 text-sm text-slate-500">
            {issues.length === 0
              ? "You haven't reported any issues yet."
              : "No issues match your current filters."}
          </p>
          {issues.length === 0 && (
            <Link
              to="/citizen/report-issue"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline"
            >
              <span className="material-symbols-outlined text-lg">add</span>
              Report your first issue
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredIssues.map((issue) => (
            <Link
              key={issue.id}
              to={`/citizen/issues/${issue.id}`}
              className="block rounded-lg border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate font-semibold text-slate-900">
                      {issue.title}
                    </h3>
                    <IssueStatusBadge status={issue.status} />
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                    {issue.description}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">category</span>
                      {ISSUE_CATEGORIES.find((c) => c.id === issue.category)?.label || issue.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      {issue.location?.address || issue.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      {formatDate(issue.createdAt)}
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-400">
                  chevron_right
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Summary */}
      <div className="text-center text-sm text-slate-500">
        Showing {filteredIssues.length} of {issues.length} issues
      </div>
    </div>
  );
}
