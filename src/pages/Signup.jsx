import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="mx-auto mt-16 max-w-md px-6">
      <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-8 shadow-2xl">
        <h1 className="mb-2 text-3xl font-bold">Create account</h1>
        <p className="mb-6 text-sm text-slate-400">Quick demo mode enabled. Use Login to continue.</p>
        <Link to="/login" className="inline-block rounded-lg bg-cyan-500 px-5 py-3 font-semibold text-slate-900 hover:bg-cyan-400">Go to Login</Link>
      </div>
    </div>
  );
}
