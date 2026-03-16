import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto mt-12 px-6">
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-5">
          <img
            src={user.avatar}
            alt={user.name}
            className="size-20 rounded-full border border-slate-200"
          />
          <div>
            <p className="text-slate-900 text-lg">User Profile</p>
            <p className="text-slate-600 mt-1">
              Name -{" "}
              <span className="font-medium text-slate-800">{user.name}</span>
            </p>
            <p className="text-slate-600 mt-1">
              EMAIL -{" "}
              <span className="font-medium text-slate-800">{user.email}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
