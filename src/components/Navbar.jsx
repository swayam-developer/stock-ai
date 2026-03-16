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
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-semibold text-slate-900">FinVise</Link>

        <nav className="flex items-center gap-2 text-sm text-slate-700">
          <Link to="/" className="rounded-md px-3 py-2 hover:bg-slate-100">Home</Link>

          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="rounded-md px-3 py-2 hover:bg-slate-100">Dashboard</Link>
              <Link to="/profile" className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 hover:bg-slate-50">
                <img src={user.avatar} alt={user.name} className="size-6 rounded-full" />
                <span>{user.name}</span>
              </Link>
              <button onClick={handleLogout} className="rounded-md bg-slate-900 px-3 py-2 font-medium text-white hover:bg-slate-800">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="rounded-md px-3 py-2 hover:bg-slate-100">Login</Link>
              <Link to="/signup" className="rounded-md bg-slate-900 px-3 py-2 font-medium text-white hover:bg-slate-800">Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
