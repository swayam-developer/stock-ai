import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
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

  return (
    <div className="mx-auto mt-16 max-w-md px-6">
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="mb-2 text-3xl font-semibold text-slate-900">Welcome back</h2>
        <p className="mb-6 text-sm text-slate-500">Login to access your dashboard.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-lg border border-slate-300 bg-white p-3" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full rounded-lg border border-slate-300 bg-white p-3" />
          <button className="w-full rounded-lg bg-slate-900 py-3 font-semibold text-white hover:bg-slate-800">Login</button>
        </form>

        <p className="mt-5 text-sm text-slate-500">No account? <Link to="/signup" className="text-slate-900 underline">Create one</Link></p>
      </div>
    </div>
  );
}
