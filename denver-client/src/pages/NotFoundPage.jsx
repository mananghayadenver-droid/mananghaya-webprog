import Button from '../components/Button'

function PixelPattern() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 grid grid-cols-12 border-b-2 border-zinc-900">
      {Array.from({ length: 24 }).map((_, index) => (
        <span
          key={index}
          className={[
            'h-8 border-r-2 border-zinc-900',
            index % 4 === 0
              ? 'bg-lime-300'
              : index % 4 === 1
                ? 'bg-sky-300'
                : index % 4 === 2
                  ? 'bg-fuchsia-300'
                  : 'bg-zinc-100',
          ].join(' ')}
        ></span>
      ))}
    </div>
  )
}

function BrokenArcade() {
  return (
    <div className="relative mx-auto h-72 w-72">
      <div className="absolute bottom-4 left-1/2 h-5 w-48 -translate-x-1/2 rounded-full bg-zinc-300"></div>
      <div className="absolute left-1/2 top-8 h-56 w-48 -translate-x-1/2 rounded-2xl border-4 border-zinc-900 bg-zinc-800 shadow-[8px_8px_0_#18181b]">
        <div className="mx-auto mt-6 h-28 w-36 border-4 border-zinc-900 bg-zinc-950 p-3">
          <div className="grid h-full grid-cols-5 gap-1">
            {Array.from({ length: 20 }).map((_, index) => (
              <span
                key={index}
                className={index % 3 === 0 ? 'bg-lime-300' : 'bg-zinc-700'}
              ></span>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-5 flex w-36 items-center justify-between">
          <div className="h-10 w-10 rounded-full border-4 border-zinc-900 bg-red-500"></div>
          <div className="h-10 w-10 rounded-full border-4 border-zinc-900 bg-yellow-300"></div>
          <div className="h-10 w-10 rounded-full border-4 border-zinc-900 bg-sky-400"></div>
        </div>
        <div className="mx-auto mt-5 h-4 w-28 rounded-full bg-zinc-950"></div>
      </div>
      <div className="absolute right-4 top-7 rotate-12 rounded-full border-2 border-zinc-900 bg-white px-3 py-1 text-xs font-black">
        GAME OVER
      </div>
    </div>
  )
}

function NotFoundPage() {
  return (
    <div className="flex w-full justify-center px-4 py-8 sm:px-6 lg:px-8">
      <section className="relative min-h-[520px] w-full max-w-5xl overflow-hidden rounded-[1.5rem] border-2 border-zinc-900 bg-white px-6 pb-12 pt-28 shadow-[10px_10px_0_#18181b]">
        <PixelPattern />

        <div className="relative z-10 grid items-center gap-8 md:grid-cols-[1fr_320px]">
          <div className="text-center md:text-left">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Level missing
            </p>
            <h1 className="text-[112px] font-black leading-none text-zinc-950 sm:text-[150px]">
              404
            </h1>
            <p className="mt-2 text-xl font-bold uppercase tracking-[0.08em] text-zinc-900">
              Page Not Found
            </p>
            <p className="mt-4 max-w-md text-sm leading-7 text-zinc-600">
              This route is outside the map. Head back to Denver James&apos;
              home screen and choose another level.
            </p>
            <div className="mt-8">
              <Button to="/" variant="primary">
                Back to Homepage
              </Button>
            </div>
          </div>

          <BrokenArcade />
        </div>
      </section>
    </div>
  )
}

export default NotFoundPage
