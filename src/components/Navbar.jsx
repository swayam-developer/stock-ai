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
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-bold text-cyan-300">FinVise Pro</Link>

        <nav className="flex items-center gap-3 text-sm">
          <Link to="/" className="rounded-lg px-3 py-2 hover:bg-slate-800">Home</Link>

          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="rounded-lg px-3 py-2 hover:bg-slate-800">Dashboard</Link>
              <Link to="/profile" className="flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 hover:bg-slate-800">
                <img src={user.avatar} alt={user.name} className="size-6 rounded-full" />
                <span>{user.name}</span>
              </Link>
              <button onClick={handleLogout} className="rounded-lg bg-rose-500/90 px-3 py-2 font-medium hover:bg-rose-500">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="rounded-lg px-3 py-2 hover:bg-slate-800">Login</Link>
              <Link to="/signup" className="rounded-lg bg-cyan-500 px-3 py-2 font-medium text-slate-900 hover:bg-cyan-400">Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
