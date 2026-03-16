import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center px-8 py-4 bg-slate-900 shadow">

      <Link to="/" className="text-xl font-bold text-blue-400">
        FinVise AI
      </Link>

      <div className="flex gap-6">

        <Link to="/" className="hover:text-blue-400">
          Home
        </Link>

        <Link to="/login" className="hover:text-blue-400">
          Login
        </Link>

        <Link
          to="/signup"
          className="bg-blue-500 px-4 py-2 rounded-lg"
        >
          Sign Up
        </Link>

      </div>
    </div>
  );
}