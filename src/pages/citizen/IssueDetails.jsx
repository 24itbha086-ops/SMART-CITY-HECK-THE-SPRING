import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useIssues from "../../hooks/useIssues";
import Loader from "../../components/common/Loader";
import IssueStatusBadge from "../../components/issue/IssueStatusBadge";
import IssueTimeline from "../../components/issue/IssueTimeline";
import { formatDate } from "../../utils/formatDate";
import { ISSUE_CATEGORIES, PRIORITY_LEVELS } from "../../data/mockData";

export default function IssueDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedIssue: issue, loading, error, fetchIssueById } = useIssues();

  useEffect(() => {
    if (id) {
      fetchIssueById(id);
    }
  }, [id, fetchIssueById]);

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
        <h3 className="text-lg font-semibold text-red-800">Error Loading Issue</h3>
        <p className="mt-1 text-red-600">{error}</p>
        <button
          onClick={() => navigate("/citizen/my-issues")}
          className="mt-4 rounded-lg bg-slate-600 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          Back to My Issues
        </button>
      </div>
    );
  }

  if (!issue) {
    return (
      <div className="rounded-lg bg-slate-50 p-12 text-center">
        <span className="material-symbols-outlined mb-4 text-6xl text-slate-300">
          search_off
        </span>
        <h3 className="text-lg font-semibold text-slate-700">Issue Not Found</h3>
        <p className="mt-2 text-sm text-slate-500">
          The issue you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link
          to="/citizen/my-issues"
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Back to My Issues
        </Link>
      </div>
    );
  }

  const category = ISSUE_CATEGORIES.find((c) => c.id === issue.category);
  const priority = PRIORITY_LEVELS.find((p) => p.id === issue.priority);

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <Link
        to="/citizen/my-issues"
        className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900"
      >
        <span className="material-symbols-outlined text-lg">arrow_back</span>
        Back to My Issues
      </Link>

      {/* Header */}
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900">{issue.title}</h1>
              <IssueStatusBadge status={issue.status} />
            </div>
            <p className="mt-2 text-slate-600">{issue.description}</p>
          </div>
        </div>

        {/* Meta Info */}
        <div className="mt-6 grid gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs font-medium uppercase text-slate-500">Category</p>
            <p className="mt-1 flex items-center gap-1 text-sm font-medium text-slate-900">
              <span className="material-symbols-outlined text-lg text-slate-500">
                {category?.icon || "category"}
              </span>
              {category?.label || issue.category}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase text-slate-500">Priority</p>
            <p className={`mt-1 text-sm font-medium ${priority?.color || "text-slate-900"}`}>
              {priority?.label || issue.priority}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase text-slate-500">Location</p>
            <p className="mt-1 flex items-center gap-1 text-sm text-slate-900">
              <span className="material-symbols-outlined text-lg text-slate-500">location_on</span>
              {issue.location?.address || issue.location}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase text-slate-500">Reported On</p>
            <p className="mt-1 text-sm text-slate-900">
              {formatDate(issue.createdAt)}
            </p>
          </div>
        </div>

        {/* Assigned Department */}
        {issue.department && (
          <div className="mt-4 rounded-lg bg-blue-50 p-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-600">business</span>
              <div>
                <p className="text-sm font-medium text-blue-900">
                  Assigned to: {issue.department}
                </p>
                {issue.assignedTo && (
                  <p className="text-xs text-blue-700">
                    Contact: {issue.assignedTo}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Image */}
      {issue.image && (
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <h3 className="mb-3 font-semibold text-slate-900">Attached Image</h3>
          <img
            src={issue.image}
            alt="Issue"
            className="max-h-80 w-full rounded-lg object-cover"
          />
        </div>
      )}

      {/* Timeline */}
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <h3 className="mb-4 font-semibold text-slate-900">Activity Timeline</h3>
        <IssueTimeline updates={issue.updates || []} />
      </div>
    </div>
  );
}
