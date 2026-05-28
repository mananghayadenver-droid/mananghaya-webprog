import { NavLink } from 'react-router-dom'

const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
]

function Footer() {
  return (
    <footer className="border-t-2 border-zinc-900 bg-zinc-950 text-zinc-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 md:grid-cols-[1.4fr_1fr] lg:px-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-lime-300">
            Denver James
          </p>
          <h2 className="mt-3 text-2xl font-black">Retro Game Developer</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-300">
            Denver James is a game developer who enjoys making retro-inspired
            games, arcade mechanics, pixel-style screens, and playful
            interactive ideas.
          </p>
        </div>

        <div className="flex flex-col gap-3 md:items-end">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-400">
            Explore
          </p>
          <nav className="flex flex-wrap gap-2 md:justify-end">
            {footerLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="rounded-full border border-zinc-700 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-200 transition hover:border-lime-300 hover:text-lime-300"
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      <div className="border-t border-zinc-800 px-4 py-4 text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
        Denver James builds interactive worlds with React, Vite, Tailwind CSS,
        and React Router
      </div>
    </footer>
  )
}

export default Footer
