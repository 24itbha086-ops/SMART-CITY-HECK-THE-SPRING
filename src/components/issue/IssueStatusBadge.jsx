import PropTypes from "prop-types";

const STATUS_CONFIG = {
  submitted: {
    label: "Submitted",
    className: "bg-slate-100 text-slate-700",
  },
  acknowledged: {
    label: "Acknowledged",
    className: "bg-blue-100 text-blue-700",
  },
  in_progress: {
    label: "In Progress",
    className: "bg-amber-100 text-amber-700",
  },
  resolved: {
    label: "Resolved",
    className: "bg-green-100 text-green-700",
  },
  closed: {
    label: "Closed",
    className: "bg-purple-100 text-purple-700",
  },
};

export default function IssueStatusBadge({ status = "submitted" }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.submitted;

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}

IssueStatusBadge.propTypes = {
  status: PropTypes.oneOf(["submitted", "acknowledged", "in_progress", "resolved", "closed"]),
};
