import { useEffect, useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import useIssues from "../../hooks/useIssues";
import Loader from "../../components/common/Loader";
import IssueStatusBadge from "../../components/issue/IssueStatusBadge";
import { formatDate } from "../../utils/formatDate";
import { ISSUE_CATEGORIES, ISSUE_STATUSES } from "../../data/mockData";

export default function ManageIssues() {
  const { issues, loading, error, fetchIssues, updateIssueStatus, deleteIssue } = useIssues();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);

  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      const matchesSearch =
        issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.reportedBy?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || issue.status === statusFilter;
      const matchesCategory = categoryFilter === "all" || issue.category === categoryFilter;
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [issues, searchTerm, statusFilter, categoryFilter]);

  const handleStatusChange = useCallback(
    async (issueId, newStatus) => {
      setActionLoading(true);
      try {
        await updateIssueStatus(issueId, newStatus);
      } finally {
        setActionLoading(false);
      }
    },
    [updateIssueStatus]
  );

  const handleDelete = useCallback(
    async (issueId) => {
      if (!window.confirm("Are you sure you want to delete this issue?")) return;
      setActionLoading(true);
      try {
        await deleteIssue(issueId);
        setSelectedIssue(null);
      } finally {
        setActionLoading(false);
      }
    },
    [deleteIssue]
  );

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Manage Issues</h1>
        <p className="mt-1 text-sm text-slate-600">
          View, update, and manage all reported issues
        </p>
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
          <button onClick={handleClearFilters} className="text-sm text-slate-600 hover:text-slate-900">
            Clear filters
          </button>
        )}
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>
      )}

      {/* Issues Table */}
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Issue</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredIssues.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-slate-500">
                    No issues found
                  </td>
                </tr>
              ) : (
                filteredIssues.map((issue) => (
                  <tr key={issue.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="max-w-xs">
                        <p className="truncate font-medium text-slate-900">{issue.title}</p>
                        <p className="truncate text-xs text-slate-500">{issue.reportedBy}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-slate-600">
                        {ISSUE_CATEGORIES.find((c) => c.id === issue.category)?.label || issue.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <IssueStatusBadge status={issue.status} />
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-medium ${
                          issue.priority === "high"
                            ? "text-red-600"
                            : issue.priority === "medium"
                            ? "text-amber-600"
                            : "text-slate-600"
                        }`}
                      >
                        {issue.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      {formatDate(issue.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedIssue(issue)}
                          className="rounded p-1 text-slate-500 hover:bg-slate-100"
                          title="View Details"
                        >
                          <span className="material-symbols-outlined text-lg">visibility</span>
                        </button>
                        <Link
                          to={`/admin/assign?issue=${issue.id}`}
                          className="rounded p-1 text-slate-500 hover:bg-slate-100"
                          title="Assign"
                        >
                          <span className="material-symbols-outlined text-lg">person_add</span>
                        </Link>
                        <button
                          onClick={() => handleDelete(issue.id)}
                          className="rounded p-1 text-red-500 hover:bg-red-50"
                          title="Delete"
                          disabled={actionLoading}
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-center text-sm text-slate-500">
        Showing {filteredIssues.length} of {issues.length} issues
      </div>

      {/* Detail Modal */}
      {selectedIssue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6">
            <div className="flex items-start justify-between">
              <h2 className="text-lg font-bold text-slate-900">{selectedIssue.title}</h2>
              <button
                onClick={() => setSelectedIssue(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-xs font-medium uppercase text-slate-500">Description</p>
                <p className="mt-1 text-sm text-slate-700">{selectedIssue.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium uppercase text-slate-500">Status</p>
                  <select
                    value={selectedIssue.status}
                    onChange={(e) => handleStatusChange(selectedIssue.id, e.target.value)}
                    disabled={actionLoading}
                    className="mt-1 w-full rounded border border-slate-300 px-2 py-1 text-sm"
                  >
                    {Object.values(ISSUE_STATUSES).map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase text-slate-500">Priority</p>
                  <p className="mt-1 text-sm capitalize text-slate-700">{selectedIssue.priority}</p>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium uppercase text-slate-500">Location</p>
                <p className="mt-1 text-sm text-slate-700">{selectedIssue.location?.address || selectedIssue.location}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase text-slate-500">Reported By</p>
                <p className="mt-1 text-sm text-slate-700">{selectedIssue.reportedBy}</p>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <Link
                to={`/admin/assign?issue=${selectedIssue.id}`}
                className="flex-1 rounded-lg bg-blue-600 py-2 text-center text-sm font-medium text-white hover:bg-blue-700"
              >
                Assign to Department
              </Link>
              <button
                onClick={() => setSelectedIssue(null)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
