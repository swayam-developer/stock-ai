import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto mt-12 px-6">
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-5">
          <img src={user.avatar} alt={user.name} className="size-20 rounded-full border border-slate-200" />
          <div>
            <p className="text-slate-500 text-sm">Profile</p>
            <h1 className="text-3xl font-semibold text-slate-900">{user.name}</h1>
            <p className="text-slate-600 mt-1">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
