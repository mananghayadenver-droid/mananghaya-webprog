import { NavLink } from 'react-router-dom'

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
]

const navLinkClassName = ({ isActive }) =>
  [
    'rounded-full border-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition',
    isActive
      ? 'border-zinc-900 bg-lime-200 text-zinc-950 shadow-[3px_3px_0_#18181b]'
      : 'border-transparent text-zinc-500 hover:border-zinc-900 hover:bg-zinc-50 hover:text-zinc-900',
  ].join(' ')

function NavBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-zinc-900 bg-white/95 shadow-[0_4px_0_rgba(24,24,27,0.12)] backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          className="group flex min-w-fit items-center gap-3"
          aria-label="Denver James home"
        >
          <span className="grid h-12 w-12 place-items-center rounded-full border-2 border-zinc-900 bg-lime-300 text-sm font-black tracking-[0.08em] text-zinc-950 shadow-[4px_4px_0_#18181b] transition group-hover:-translate-y-0.5">
            DJ
          </span>
          <span className="leading-none">
            <span className="block text-base font-black uppercase tracking-[0.18em] text-zinc-950 sm:text-lg">
              Denver James
            </span>
            <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.32em] text-lime-700">
              Game Developer
            </span>
          </span>
        </NavLink>

        <div className="flex items-center gap-2 overflow-x-auto">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={navLinkClassName}>
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to="/auth/signin"
            className="rounded-full border-2 border-zinc-900 bg-fuchsia-200 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-zinc-950 shadow-[3px_3px_0_#18181b] transition hover:-translate-y-0.5 hover:bg-fuchsia-300"
          >
            Sign In
          </NavLink>
          <NavLink
            to="/auth/signup"
            className="rounded-full border-2 border-zinc-900 bg-lime-200 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-zinc-950 shadow-[3px_3px_0_#18181b] transition hover:-translate-y-0.5 hover:bg-lime-300"
          >
            Sign Up
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

export default NavBar
