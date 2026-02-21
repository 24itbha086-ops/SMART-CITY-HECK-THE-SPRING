import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * Reusable Button component with variants, loading state, and link support
 */
const Button = ({
  children,
  variant = "primary",
  size = "medium",
  loading = false,
  disabled = false,
  to = null,
  onClick,
  type = "button",
  className = "",
  leftIcon,
  rightIcon,
  fullWidth = false,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-500",
    outline: "border-2 border-slate-200 text-slate-700 hover:bg-slate-50 focus:ring-slate-500",
    ghost: "text-slate-600 hover:bg-slate-100 focus:ring-slate-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
    accent: "bg-[#13b6ec] text-white hover:bg-[#0ea5e9] focus:ring-[#13b6ec]",
  };

  const sizes = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2.5 text-sm",
    large: "px-6 py-3 text-base",
  };

  const classes = `
    ${baseStyles}
    ${variants[variant] || variants.primary}
    ${sizes[size] || sizes.medium}
    ${fullWidth ? "w-full" : ""}
    ${className}
  `.trim();

  const content = (
    <>
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {!loading && leftIcon && <span className="material-symbols-outlined text-lg">{leftIcon}</span>}
      {children}
      {!loading && rightIcon && <span className="material-symbols-outlined text-lg">{rightIcon}</span>}
    </>
  );

  // If 'to' prop is provided, render as Link
  if (to && !disabled) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
      {...props}
    >
      {content}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["primary", "secondary", "outline", "ghost", "danger", "success", "accent"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  to: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  className: PropTypes.string,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
  fullWidth: PropTypes.bool,
};

export default Button;
