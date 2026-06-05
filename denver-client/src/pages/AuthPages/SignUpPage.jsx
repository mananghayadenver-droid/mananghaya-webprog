import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from '../../services/UserService';

const inputClasses =
  'mt-2 w-full rounded-xl border-2 border-zinc-900 bg-white px-4 py-3 text-sm text-zinc-950 shadow-[4px_4px_0_#18181b] outline-none transition placeholder:text-zinc-400 focus:-translate-y-0.5 focus:bg-yellow-50';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    contactNumber: '',
    email: '',
    username: '',
    password: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (/\s/.test(form.username.trim())) {
      setError('Username must not contain spaces.');
      return;
    }

    if (!/^\d+$/.test(form.age.trim())) {
      setError('Age must contain numbers only.');
      return;
    }

    if (!/^\d{11}$/.test(form.contactNumber.trim())) {
      setError('Contact number must be exactly 11 digits.');
      return;
    }

    if (form.password.trim().length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setSubmitting(true);

    try {
      await createUser({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        age: form.age.trim(),
        gender: form.gender.trim().toLowerCase(),
        contactNumber: form.contactNumber.trim(),
        email: form.email.trim().toLowerCase(),
        username: form.username.trim().toLowerCase(),
        password: form.password,
        address: form.address.trim(),
        isActive: true,
      });

      navigate('/auth/signin', {
        state: {
          message: 'Account created successfully. You can log in now.',
        },
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to create account.');
    } finally {
      setSubmitting(false);
    }
  };

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

      <form
        className="space-y-5 bg-[linear-gradient(180deg,#ffffff_0%,#eff6ff_100%)] px-7 py-7"
        onSubmit={handleSubmit}
      >
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
              name="firstName"
              type="text"
              placeholder="Denver"
              autoComplete="given-name"
              className={inputClasses}
              value={form.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="last-name" className="text-sm font-semibold text-zinc-800">
              Last Name
            </label>
            <input
              id="last-name"
              name="lastName"
              type="text"
              placeholder="Mananghaya"
              autoComplete="family-name"
              className={inputClasses}
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="signup-age" className="text-sm font-semibold text-zinc-800">
              Age
            </label>
            <input
              id="signup-age"
              name="age"
              type="text"
              placeholder="21"
              className={inputClasses}
              value={form.age}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="signup-gender" className="text-sm font-semibold text-zinc-800">
              Gender
            </label>
            <select
              id="signup-gender"
              name="gender"
              className={inputClasses}
              value={form.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="signup-email" className="text-sm font-semibold text-zinc-800">
            Email
          </label>
          <input
            id="signup-email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            className={inputClasses}
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="signup-contact" className="text-sm font-semibold text-zinc-800">
              Contact Number
            </label>
            <input
              id="signup-contact"
              name="contactNumber"
              type="text"
              placeholder="09171234567"
              className={inputClasses}
              value={form.contactNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="signup-username" className="text-sm font-semibold text-zinc-800">
              Username
            </label>
            <input
              id="signup-username"
              name="username"
              type="text"
              placeholder="denverjames"
              className={inputClasses}
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="signup-password" className="text-sm font-semibold text-zinc-800">
            Password
          </label>
          <input
            id="signup-password"
            name="password"
            type="password"
            placeholder="Create your password"
            autoComplete="new-password"
            className={inputClasses}
            value={form.password}
            onChange={handleChange}
            required
          />
          <p className="mt-2 text-xs leading-5 text-zinc-500">
            Use a secure password with letters, numbers, and symbols.
          </p>
        </div>

        <div>
          <label htmlFor="signup-address" className="text-sm font-semibold text-zinc-800">
            Address
          </label>
          <textarea
            id="signup-address"
            name="address"
            placeholder="Sampaloc, Manila"
            className={`${inputClasses} min-h-28 resize-y`}
            value={form.address}
            onChange={handleChange}
            required
          />
        </div>

        {error ? (
          <div className="rounded-xl border-2 border-red-400 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl border-2 border-zinc-900 bg-lime-300 px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-zinc-950 shadow-[5px_5px_0_#18181b] transition hover:-translate-y-0.5 hover:bg-lime-400 focus:outline-none"
        >
          {submitting ? 'Saving...' : 'Create Account'}
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
