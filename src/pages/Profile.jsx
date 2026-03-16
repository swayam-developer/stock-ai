import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto mt-12 px-6">
      <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-8 shadow-2xl">
        <div className="flex items-center gap-5">
          <img src={user.avatar} alt={user.name} className="size-20 rounded-full border border-slate-600" />
          <div>
            <p className="text-slate-400 text-sm">Profile</p>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-slate-300 mt-1">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
