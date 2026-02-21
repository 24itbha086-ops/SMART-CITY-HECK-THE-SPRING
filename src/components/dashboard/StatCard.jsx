import PropTypes from "prop-types";

const COLOR_CLASSES = {
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-600",
    icon: "text-blue-500",
  },
  green: {
    bg: "bg-green-100",
    text: "text-green-600",
    icon: "text-green-500",
  },
  amber: {
    bg: "bg-amber-100",
    text: "text-amber-600",
    icon: "text-amber-500",
  },
  red: {
    bg: "bg-red-100",
    text: "text-red-600",
    icon: "text-red-500",
  },
  purple: {
    bg: "bg-purple-100",
    text: "text-purple-600",
    icon: "text-purple-500",
  },
};

export default function StatCard({ title, value, icon, trend, color = "blue" }) {
  const colors = COLOR_CLASSES[color] || COLOR_CLASSES.blue;

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg}`}>
          <span className={`material-symbols-outlined ${colors.icon}`}>{icon}</span>
        </div>
        {trend !== undefined && trend !== null && (
          <span
            className={`flex items-center text-xs font-medium ${
              trend >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            <span className="material-symbols-outlined text-sm">
              {trend >= 0 ? "trending_up" : "trending_down"}
            </span>
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold text-slate-900">{value}</p>
        <p className="mt-1 text-sm text-slate-500">{title}</p>
      </div>
    </article>
  );
}

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.string.isRequired,
  trend: PropTypes.number,
  color: PropTypes.oneOf(["blue", "green", "amber", "red", "purple"]),
};
