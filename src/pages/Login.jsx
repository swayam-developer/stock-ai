export default function Login(){

  return(

    <div className="flex justify-center mt-32">

      <div className="bg-slate-800 p-10 rounded-xl w-96">

        <h2 className="text-2xl mb-6">Login</h2>

        <input
          placeholder="Email"
          className="w-full mb-4 p-3 rounded bg-slate-900"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 rounded bg-slate-900"
        />

        <button className="bg-blue-500 w-full py-3 rounded">
          Login
        </button>

      </div>

    </div>

  );
}