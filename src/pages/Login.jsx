import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login(){
  const [email, setEmail] = useState("demo@finvise.ai");
  const [password, setPassword] = useState("password123");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/dashboard";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;

    login({ email });
    navigate(from, { replace: true });
  };

  return(
    <div className="mx-auto mt-16 max-w-md px-6">
      <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-8 shadow-2xl">
        <h2 className="mb-2 text-3xl font-bold">Welcome back</h2>
        <p className="mb-6 text-sm text-slate-400">Login to access your market intelligence dashboard.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3" />
          <button className="w-full rounded-lg bg-cyan-500 py-3 font-semibold text-slate-900 hover:bg-cyan-400">Login</button>
        </form>

        <p className="mt-5 text-sm text-slate-400">No account? <Link to="/signup" className="text-cyan-300">Create one</Link></p>
      </div>
    </div>
  );
}
