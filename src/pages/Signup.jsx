import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="mx-auto mt-16 max-w-md px-6">
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-3xl font-semibold text-slate-900">Create account</h1>
        <p className="mb-6 text-sm text-slate-500">Demo authentication is enabled for now.</p>
        <Link to="/login" className="inline-block rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800">Go to login</Link>
      </div>
    </div>
  );
}
