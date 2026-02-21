import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-md md:px-10">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to="/citizen" className="flex items-center gap-3 text-slate-900">
          <div className="flex items-center justify-center rounded-lg bg-[#13b6ec] p-1.5 text-white">
            <span className="material-symbols-outlined">location_city</span>
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-tight">Smart City</h2>
        </Link>
        <div className="flex flex-1 items-center justify-end gap-6">
          <nav className="hidden items-center gap-6 md:flex">
            <Link 
              className="text-sm font-medium text-slate-600 transition-colors hover:text-[#13b6ec]" 
              to="/citizen"
            >
              Dashboard
            </Link>
            <Link 
              className="text-sm font-medium text-slate-600 transition-colors hover:text-[#13b6ec]" 
              to="/citizen/report-issue"
            >
              Report Issue
            </Link>
            <Link 
              className="text-sm font-medium text-slate-600 transition-colors hover:text-[#13b6ec]" 
              to="/citizen/my-issues"
            >
              My Issues
            </Link>
            <Link 
              className="text-sm font-medium text-slate-600 transition-colors hover:text-[#13b6ec]" 
              to="/community"
            >
              Community
            </Link>
            <Link 
              className="text-sm font-medium text-slate-600 transition-colors hover:text-[#13b6ec]" 
              to="/citizen/help"
            >
              Help
            </Link>
          </nav>
          <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
            <Link to="/citizen/profile" className="hidden text-right sm:block">
              <p className="text-xs font-medium text-slate-400">{user?.rank || "Citizen"}</p>
              <p className="text-sm font-semibold text-slate-900">{user?.name || "User"}</p>
            </Link>
            <Link to="/citizen/profile" className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-[#13b6ec] bg-blue-100 text-blue-600 font-bold">
              {user?.avatar ? (
                <img
                  alt="Profile"
                  className="h-full w-full object-cover"
                  src={user.avatar}
                />
              ) : (
                user?.name?.charAt(0)?.toUpperCase() || "U"
              )}
            </Link>
            <button
              onClick={handleLogout}
              className="hidden rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 md:block"
              title="Logout"
            >
              <span className="material-symbols-outlined">logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
