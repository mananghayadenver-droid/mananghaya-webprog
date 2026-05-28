import Button from '../components/Button'
import articles from '../assets/styles/article-content'

function AboutPage() {
  const showcase = articles.slice(0, 4)

  return (
    <div className="flex w-full flex-col gap-5">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_1fr]">
          <div className="rounded-[1.5rem] border-2 border-zinc-900 bg-zinc-100 p-3">
            <div className="grid grid-cols-2 gap-3">
              {showcase.map((article) => (
                <img
                  key={article.name}
                  src={article.image}
                  alt={article.title}
                  className="aspect-4/3 w-full rounded-xl border-2 border-zinc-900 bg-zinc-200 object-cover"
                />
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-zinc-500">
              About Denver James
            </p>
            <h1 className="max-w-2xl text-3xl font-black leading-tight text-zinc-950 sm:text-4xl">
              Denver James is a game developer focused on retro games, arcade
              mechanics, and playful interactive systems.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-600">
              Denver James is a game developer who enjoys building worlds that
              feel energetic, readable, and fun to explore. His work focuses on
              gameplay flow, interface clarity, level structure, and small
              details that make games feel responsive.
            </p>
            <p className="mt-3 max-w-xl text-sm leading-7 text-zinc-600">
              This project shows retro game ideas through article cards about
              platformers, shooters, racers, puzzles, boss fights, UI, sound,
              and level design.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" variant="primary">
                Back Home
              </Button>
              <Button to="/articles">View Game Ideas</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 lg:px-8">
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.32em] text-zinc-500">
          Profile overview
        </p>
        <h2 className="mb-4 text-xl font-bold text-zinc-950">
          Quick summary blocks
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Game Dev', 'Main role'],
            ['Retro', 'Design focus'],
            ['Interfaces', 'UX specialty'],
            ['Games', 'Creative goal'],
          ].map(([value, label]) => (
            <div
              key={label}
              className="rounded-xl border-2 border-zinc-900 bg-zinc-100 p-4"
            >
              <p className="text-xl font-black text-zinc-950">{value}</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.24em] text-zinc-500">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default AboutPage
