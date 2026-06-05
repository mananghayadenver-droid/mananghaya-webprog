import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/UserService';
import { setAuthSession } from '../../utils/auth';

const inputClasses =
  'mt-2 w-full rounded-xl border-2 border-zinc-900 bg-white px-4 py-3 text-sm text-zinc-950 shadow-[4px_4px_0_#18181b] outline-none transition placeholder:text-zinc-400 focus:-translate-y-0.5 focus:bg-yellow-50';

const defaultCredentials = {
  email: 'mananghaya@admin.com',
  password: 'mananghaya123',
};

const SignInPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(defaultCredentials.email);
  const [password, setPassword] = useState(defaultCredentials.password);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(
    location.state?.message || ''
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccessMessage('');

    try {
      const { data } = await loginUser({
        email: email.trim().toLowerCase(),
        password,
      });

      setAuthSession({
        token: data.token,
        firstName: data.firstName,
        type: data.type,
      });
      setError('');
      navigate(data.type === 'admin' ? '/dashboard' : '/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="overflow-hidden rounded-[2rem] border-2 border-zinc-900 bg-white shadow-[12px_12px_0_#18181b]">
      <div className="border-b-2 border-zinc-900 bg-[linear-gradient(135deg,#18181b_0%,#3f3f46_100%)] px-7 py-6 text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-lime-300">
          Player One
        </p>
        <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
          Continue Game
        </h1>
        <p className="mt-3 text-sm leading-6 text-zinc-300">
          Return to the arcade with bright controls, fast access, and a retro
          login screen.
        </p>
      </div>

      <form
        className="space-y-5 bg-[linear-gradient(180deg,#ffffff_0%,#fefce8_100%)] px-7 py-7"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-3 gap-2 rounded-2xl border-2 border-zinc-900 bg-zinc-100 p-3">
          <div className="rounded-lg border border-zinc-900 bg-fuchsia-300 px-3 py-2 text-center text-[10px] font-black uppercase tracking-[0.18em] text-zinc-950">
            Save
          </div>
          <div className="rounded-lg border border-zinc-900 bg-sky-300 px-3 py-2 text-center text-[10px] font-black uppercase tracking-[0.18em] text-zinc-950">
            Load
          </div>
          <div className="rounded-lg border border-zinc-900 bg-lime-300 px-3 py-2 text-center text-[10px] font-black uppercase tracking-[0.18em] text-zinc-950">
            Play
          </div>
        </div>

        <div>
          <label htmlFor="signin-email" className="text-sm font-semibold text-zinc-800">
            Email Address or Username
          </label>
          <input
            id="signin-email"
            type="text"
            placeholder="you@example.com or username"
            autoComplete="username"
            className={inputClasses}
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setError('');
              setSuccessMessage('');
            }}
            required
          />
        </div>

        <div>
          <label htmlFor="signin-password" className="text-sm font-semibold text-zinc-800">
            Password
          </label>
          <input
            id="signin-password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            className={inputClasses}
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setError('');
              setSuccessMessage('');
            }}
            required
          />
          <p className="mt-2 text-xs leading-5 text-zinc-500">
            Use at least 8 characters with letters, numbers, and symbols.
          </p>
        </div>

        {error ? (
          <div className="rounded-xl border-2 border-red-400 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </div>
        ) : null}

        {successMessage ? (
          <div className="rounded-xl border-2 border-lime-400 bg-lime-50 px-4 py-3 text-sm font-semibold text-lime-800">
            {successMessage}
          </div>
        ) : null}

        <div className="flex items-center justify-between gap-4 text-sm">
          <label className="flex items-center gap-2 text-zinc-600">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-zinc-300 accent-zinc-900"
            />
            <span>Remember me</span>
          </label>
          <button
            type="button"
            className="font-medium text-zinc-700 transition hover:text-zinc-900"
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl border-2 border-zinc-900 bg-fuchsia-300 px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-zinc-950 shadow-[5px_5px_0_#18181b] transition hover:-translate-y-0.5 hover:bg-fuchsia-400 focus:outline-none"
        >
          {submitting ? 'Loading...' : 'Press Start'}
        </button>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <button
            type="button"
            className="w-full rounded-xl border-2 border-zinc-900 bg-sky-200 px-4 py-3 text-[11px] font-black uppercase tracking-[0.14em] text-zinc-950 shadow-[4px_4px_0_#18181b] transition hover:-translate-y-0.5 hover:bg-sky-300"
          >
            Log In with Google
          </button>
          <button
            type="button"
            className="w-full rounded-xl border-2 border-zinc-900 bg-lime-200 px-4 py-3 text-[11px] font-black uppercase tracking-[0.14em] text-zinc-950 shadow-[4px_4px_0_#18181b] transition hover:-translate-y-0.5 hover:bg-lime-300"
          >
            Log In with Apple
          </button>
        </div>

        <div className="border-t-2 border-zinc-900 pt-6 text-center text-sm text-zinc-600">
          No account yet?{' '}
          <Link
            to="/auth/signup"
            className="font-black text-zinc-950 transition hover:text-fuchsia-700"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </section>
  );
};

export default SignInPage;
