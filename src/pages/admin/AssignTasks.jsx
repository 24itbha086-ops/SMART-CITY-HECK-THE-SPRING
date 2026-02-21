import { useEffect, useState, useMemo, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom";
import useIssues from "../../hooks/useIssues";
import Loader from "../../components/common/Loader";
import IssueStatusBadge from "../../components/issue/IssueStatusBadge";
import { departmentService } from "../../services/departmentService";

export default function AssignTasks() {
  const [searchParams] = useSearchParams();
  const preselectedIssue = searchParams.get("issue");

  const { issues, loading, fetchIssues, assignIssue } = useIssues();
  const [departments, setDepartments] = useState([]);
  const [loadingDepts, setLoadingDepts] = useState(true);
  const [selectedIssueId, setSelectedIssueId] = useState(preselectedIssue || "");
  const [selectedDeptId, setSelectedDeptId] = useState("");
  const [assigning, setAssigning] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchIssues();
    loadDepartments();
  }, [fetchIssues]);

  const loadDepartments = async () => {
    try {
      const depts = await departmentService.listDepartments();
      setDepartments(depts);
    } catch (err) {
      console.error("Failed to load departments:", err);
    } finally {
      setLoadingDepts(false);
    }
  };

  // Filter unassigned or reassignable issues
  const assignableIssues = useMemo(() => {
    return issues.filter((i) => i.status !== "closed" && i.status !== "resolved");
  }, [issues]);

  const selectedIssue = useMemo(() => {
    return issues.find((i) => i.id === selectedIssueId);
  }, [issues, selectedIssueId]);

  const handleAssign = useCallback(async () => {
    if (!selectedIssueId || !selectedDeptId) {
      setError("Please select both an issue and a department");
      return;
    }

    setAssigning(true);
    setError("");
    setSuccess("");

    try {
      await assignIssue(selectedIssueId, selectedDeptId);
      const dept = departments.find((d) => d.id === selectedDeptId);
      setSuccess(`Issue assigned to ${dept?.name || "department"} successfully!`);
      setSelectedIssueId("");
      setSelectedDeptId("");
    } catch (err) {
      setError(err.message || "Failed to assign issue");
    } finally {
      setAssigning(false);
    }
  }, [selectedIssueId, selectedDeptId, assignIssue, departments]);

  if (loading || loadingDepts) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Assign Tasks</h1>
        <p className="mt-1 text-sm text-slate-600">
          Assign reported issues to the appropriate departments
        </p>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="flex items-center gap-2 rounded-lg bg-green-50 p-4 text-green-700">
          <span className="material-symbols-outlined">check_circle</span>
          {success}
        </div>
      )}
      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 p-4 text-red-700">
          <span className="material-symbols-outlined">error</span>
          {error}
        </div>
      )}

      {/* Assignment Form */}
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="mb-4 font-semibold text-slate-900">New Assignment</h2>

        <div className="space-y-4">
          {/* Select Issue */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Select Issue
            </label>
            <select
              value={selectedIssueId}
              onChange={(e) => setSelectedIssueId(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">Choose an issue...</option>
              {assignableIssues.map((issue) => (
                <option key={issue.id} value={issue.id}>
                  {issue.title} - {issue.location?.address || issue.location}
                </option>
              ))}
            </select>
          </div>

          {/* Issue Preview */}
          {selectedIssue && (
            <div className="rounded-lg bg-slate-50 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-slate-900">{selectedIssue.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{selectedIssue.description}</p>
                </div>
                <IssueStatusBadge status={selectedIssue.status} />
              </div>
              <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  {selectedIssue.location?.address || selectedIssue.location}
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">person</span>
                  {selectedIssue.reportedBy}
                </span>
                {selectedIssue.department && (
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">business</span>
                    Currently: {selectedIssue.department}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Select Department */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Assign to Department
            </label>
            <select
              value={selectedDeptId}
              onChange={(e) => setSelectedDeptId(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">Choose a department...</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleAssign}
            disabled={assigning || !selectedIssueId || !selectedDeptId}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {assigning ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Assigning...
              </span>
            ) : (
              "Assign Issue"
            )}
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{assignableIssues.length}</p>
          <p className="text-xs text-slate-500">Pending Assignment</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{departments.length}</p>
          <p className="text-xs text-slate-500">Departments</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4 text-center">
          <p className="text-2xl font-bold text-amber-600">
            {issues.filter((i) => i.status === "in_progress").length}
          </p>
          <p className="text-xs text-slate-500">In Progress</p>
        </div>
      </div>

      {/* Link to Issues */}
      <div className="text-center">
        <Link
          to="/admin/issues"
          className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
        >
          <span className="material-symbols-outlined text-lg">list_alt</span>
          View All Issues
        </Link>
      </div>
    </div>
  );
}
