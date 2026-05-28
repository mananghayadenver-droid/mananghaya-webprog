import { Link, Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,#fde68a_0%,#fef3c7_24%,#f8fafc_72%)] text-zinc-900">
      <div className="grid min-h-screen w-full lg:grid-cols-[1fr_0.95fr]">
        <div className="flex items-center justify-center border-b-2 border-zinc-900 bg-[linear-gradient(180deg,#18181b_0%,#27272a_100%)] p-8 sm:p-10 lg:border-b-0 lg:border-r-2 lg:p-16">
          <div className="w-full max-w-md rounded-[2rem] border-2 border-zinc-900 bg-zinc-100 p-6 shadow-[10px_10px_0_#18181b]">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">
              Retro access
            </p>
            <h2 className="mt-3 text-3xl font-black text-zinc-950">
              Continue Game
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-7 text-zinc-600">
              A playful auth hub for Denver James with bright retro colors,
              framed controls, and arcade-inspired panels.
            </p>

            <div className="mt-8 rounded-[1.75rem] border-2 border-zinc-900 bg-zinc-950 p-5">
              <div className="grid grid-cols-6 gap-2">
                {[
                  'bg-lime-300',
                  'bg-fuchsia-300',
                  'bg-sky-300',
                  'bg-yellow-300',
                  'bg-fuchsia-300',
                  'bg-lime-300',
                  'bg-sky-300',
                  'bg-zinc-800',
                  'bg-zinc-800',
                  'bg-yellow-300',
                  'bg-zinc-800',
                  'bg-fuchsia-300',
                ].map((tile, index) => (
                  <span
                    key={index}
                    className={`aspect-square rounded-sm border border-zinc-900 ${tile}`}
                  />
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between">
                <div className="flex gap-3">
                  <span className="h-5 w-5 rounded-full border-2 border-zinc-900 bg-red-400"></span>
                  <span className="h-5 w-5 rounded-full border-2 border-zinc-900 bg-yellow-300"></span>
                </div>
                <div className="rounded-full border-2 border-zinc-900 bg-lime-300 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-950">
                  Insert Coin
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="flex items-center bg-transparent px-6 py-10 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <Outlet />
            <div className="mt-6">
              <Link
                to="/"
                className="rounded-xl border-2 border-zinc-900 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-700 shadow-[4px_4px_0_#18181b] transition hover:-translate-y-0.5 hover:bg-zinc-100 hover:text-zinc-950"
              >
                Back Home
              </Link>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default AuthLayout;
