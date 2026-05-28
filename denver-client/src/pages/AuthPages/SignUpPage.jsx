import { Link } from 'react-router-dom';

const inputClasses =
  'mt-2 w-full rounded-xl border-2 border-zinc-900 bg-white px-4 py-3 text-sm text-zinc-950 shadow-[4px_4px_0_#18181b] outline-none transition placeholder:text-zinc-400 focus:-translate-y-0.5 focus:bg-yellow-50';

const SignUpPage = () => {
  return (
    <section className="overflow-hidden rounded-[2rem] border-2 border-zinc-900 bg-white shadow-[12px_12px_0_#18181b]">
      <div className="border-b-2 border-zinc-900 bg-[linear-gradient(135deg,#18181b_0%,#3f3f46_100%)] px-7 py-6 text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-yellow-300">
          New Player
        </p>
        <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
          Create Save File
        </h1>
        <p className="mt-3 text-sm leading-6 text-zinc-300">
          Start a new run with a colorful retro registration screen and bold
          arcade controls.
        </p>
      </div>

      <form className="space-y-5 bg-[linear-gradient(180deg,#ffffff_0%,#eff6ff_100%)] px-7 py-7">
        <div className="grid grid-cols-4 gap-2 rounded-2xl border-2 border-zinc-900 bg-zinc-100 p-3">
          {['HP', 'XP', 'MAP', 'HUD'].map((item, index) => (
            <div
              key={item}
              className={`rounded-lg border border-zinc-900 px-3 py-2 text-center text-[10px] font-black uppercase tracking-[0.18em] text-zinc-950 ${
                index === 0
                  ? 'bg-fuchsia-300'
                  : index === 1
                    ? 'bg-lime-300'
                    : index === 2
                      ? 'bg-sky-300'
                      : 'bg-yellow-300'
              }`}
            >
              {item}
            </div>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="text-sm font-semibold text-zinc-800">
              First Name
            </label>
            <input
              id="first-name"
              type="text"
              placeholder="Denver"
              autoComplete="given-name"
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="last-name" className="text-sm font-semibold text-zinc-800">
              Last Name
            </label>
            <input
              id="last-name"
              type="text"
              placeholder="Mananghaya"
              autoComplete="family-name"
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label htmlFor="signup-email" className="text-sm font-semibold text-zinc-800">
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="signup-password" className="text-sm font-semibold text-zinc-800">
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            placeholder="Create your password"
            autoComplete="new-password"
            className={inputClasses}
          />
          <p className="mt-2 text-xs leading-5 text-zinc-500">
            Use a secure password with letters, numbers, and symbols.
          </p>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl border-2 border-zinc-900 bg-lime-300 px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-zinc-950 shadow-[5px_5px_0_#18181b] transition hover:-translate-y-0.5 hover:bg-lime-400 focus:outline-none"
        >
          Create Account
        </button>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <button
            type="button"
            className="w-full rounded-xl border-2 border-zinc-900 bg-sky-200 px-4 py-3 text-[11px] font-black uppercase tracking-[0.14em] text-zinc-950 shadow-[4px_4px_0_#18181b] transition hover:-translate-y-0.5 hover:bg-sky-300"
          >
            Sign Up with Google
          </button>
          <button
            type="button"
            className="w-full rounded-xl border-2 border-zinc-900 bg-yellow-200 px-4 py-3 text-[11px] font-black uppercase tracking-[0.14em] text-zinc-950 shadow-[4px_4px_0_#18181b] transition hover:-translate-y-0.5 hover:bg-yellow-300"
          >
            Sign Up with Apple
          </button>
        </div>

        <div className="border-t-2 border-zinc-900 pt-6 text-center text-sm text-zinc-600">
          Already have an account?{' '}
          <Link
            to="/auth/signin"
            className="font-black text-zinc-950 transition hover:text-lime-700"
          >
            Log In
          </Link>
        </div>
      </form>
    </section>
  );
};

export default SignUpPage;
