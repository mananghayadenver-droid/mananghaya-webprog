import { NavLink, Outlet } from 'react-router-dom';

const dashboardLinks = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Reports', to: '/dashboard/reports' },
  { label: 'Users', to: '/dashboard/users' },
];

const linkClassName = ({ isActive }) =>
  [
    'rounded-full border-2 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] transition',
    isActive
      ? 'border-zinc-900 bg-lime-200 text-zinc-950 shadow-[3px_3px_0_#18181b]'
      : 'border-zinc-900 bg-white text-zinc-700 hover:-translate-y-0.5 hover:bg-zinc-100',
  ].join(' ');

function DashboardLayout() {
  return (
    <section className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#fff7ed_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[1.75rem] border-2 border-zinc-900 bg-white shadow-[10px_10px_0_#18181b]">
          <header className="border-b-2 border-zinc-900 px-6 py-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">
                  Control Center
                </p>
                <h1 className="mt-2 text-3xl font-black text-zinc-950">
                  Denver James Dashboard
                </h1>
              </div>
              <nav className="flex flex-wrap gap-2">
                {dashboardLinks.map((link) => (
                  <NavLink key={link.to} to={link.to} end={link.to === '/dashboard'} className={linkClassName}>
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </div>
          </header>

          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </section>
  );
}

export default DashboardLayout;
