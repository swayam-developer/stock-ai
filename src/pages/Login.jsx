import { LineChart, ShieldCheck } from "lucide-react";
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
    <div className="mx-auto mt-12 grid max-w-5xl gap-8 px-6 lg:grid-cols-2 lg:items-center">
      <section className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 p-8 shadow-sm">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-3 py-1 text-xs font-semibold text-blue-700">
          <LineChart className="size-4" />
          Market intelligence platform
        </div>
        <h1 className="mt-4 text-3xl font-bold leading-tight text-slate-900">Welcome back to FinVise</h1>
        <p className="mt-3 text-slate-600">Track stock momentum, market-moving headlines, and AI video updates in one focused dashboard.</p>
        <div className="mt-6 flex items-center gap-2 text-sm text-slate-600">
          <ShieldCheck className="size-4 text-emerald-600" />
          Session-protected dashboard access
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="mb-2 text-3xl font-semibold text-slate-900">Sign in</h2>
        <p className="mb-6 text-sm text-slate-500">Use your account to continue.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full rounded-lg border border-slate-300 bg-white p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-lg border border-slate-300 bg-white p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <button className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700">Login</button>
        </form>

        <p className="mt-5 text-sm text-slate-500">
          No account?{" "}
          <Link to="/signup" className="font-semibold text-blue-700 hover:text-blue-800">
            Create one
          </Link>
        </p>
      </section>
    </div>
  );
}
