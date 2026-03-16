import { LayoutDashboard, LogOut, House, UserCircle2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-bold tracking-tight text-slate-900">FinVise</Link>

        <nav className="flex items-center gap-2 text-sm text-slate-700">
          <Link to="/" className="inline-flex items-center gap-1 rounded-md px-3 py-2 hover:bg-slate-100"><House className="size-4" />Home</Link>

          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="inline-flex items-center gap-1 rounded-md px-3 py-2 hover:bg-slate-100"><LayoutDashboard className="size-4" />Dashboard</Link>
              <Link to="/profile" className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 hover:bg-slate-50">
                {user?.avatar ? <img src={user.avatar} alt={user.name} className="size-6 rounded-full" /> : <UserCircle2 className="size-5 text-slate-500" />}
                <span>{user?.name || "Profile"}</span>
              </Link>
              <button onClick={handleLogout} className="inline-flex items-center gap-1 rounded-md bg-slate-900 px-3 py-2 font-medium text-white hover:bg-slate-800">
                <LogOut className="size-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="rounded-md px-3 py-2 hover:bg-slate-100">Login</Link>
              <Link to="/signup" className="rounded-md bg-blue-600 px-3 py-2 font-medium text-white hover:bg-blue-700">Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
