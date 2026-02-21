import PropTypes from "prop-types";
import { formatDate } from "../../utils/formatDate";

const UPDATE_ICONS = {
  submitted: "upload",
  acknowledged: "check_circle",
  in_progress: "engineering",
  resolved: "task_alt",
  closed: "lock",
  comment: "chat",
  assigned: "person_add",
};

export default function IssueTimeline({ updates = [] }) {
  if (updates.length === 0) {
    return (
      <div className="py-4 text-center text-sm text-slate-500">
        No activity yet
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 top-0 h-full w-0.5 bg-slate-200" />

      <div className="space-y-4">
        {updates.map((update, index) => (
          <div key={update.id || index} className="relative flex gap-4 pl-10">
            {/* Icon */}
            <div className="absolute left-0 flex h-8 w-8 items-center justify-center rounded-full bg-white ring-2 ring-slate-200">
              <span className="material-symbols-outlined text-lg text-slate-500">
                {UPDATE_ICONS[update.type] || "info"}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 rounded-lg bg-slate-50 p-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium text-slate-900">{update.actor}</span>
                <span className="text-xs text-slate-500">
                  {formatDate(update.timestamp)}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-600">{update.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

IssueTimeline.propTypes = {
  updates: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      type: PropTypes.string,
      actor: PropTypes.string,
      message: PropTypes.string,
      timestamp: PropTypes.string,
    })
  ),
};
