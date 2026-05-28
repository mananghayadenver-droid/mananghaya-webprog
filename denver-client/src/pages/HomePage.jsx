import Button from '../components/Button'
import articles from '../assets/styles/article-content'

function HomePage() {
  const featuredArticles = articles.slice(0, 3)

  return (
    <div className="flex w-full flex-col gap-5">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.32em] text-zinc-500">
              Hello, Denver James here
            </p>
            <h1 className="max-w-xl text-4xl font-black leading-tight text-zinc-950 sm:text-5xl">
              Denver James is a game developer creating retro-inspired games
              and arcade-style experiences.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-600">
              He focuses on simple controls, readable game UI, level design,
              boss battles, power-ups, and the kind of fast feedback that makes
              classic games fun to replay.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/about" variant="primary">
                About Me
              </Button>
              <Button to="/articles">View Game Ideas</Button>
            </div>
          </div>

          <div className="rounded-[1.5rem] border-2 border-zinc-900 bg-zinc-100 p-3 shadow-[8px_8px_0_#18181b]">
            <div className="grid grid-cols-2 gap-3">
              {featuredArticles.map((article) => (
                <img
                  key={article.name}
                  src={article.image}
                  alt={article.title}
                  className="aspect-4/3 w-full rounded-[1rem] border-2 border-zinc-900 bg-zinc-200 object-cover"
                />
              ))}
              <div className="flex aspect-4/3 items-center justify-center rounded-[1rem] border-2 border-dashed border-zinc-400 bg-white text-center text-xs font-bold uppercase tracking-[0.24em] text-zinc-500">
                Retro Games
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 lg:px-8">
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.32em] text-zinc-500">
          Background
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['10', 'Game topics'],
            ['Unity', 'Game mindset'],
            ['React', 'Interface stack'],
            ['Retro', 'Design focus'],
          ].map(([value, label]) => (
            <div
              key={label}
              className="rounded-xl border-2 border-zinc-900 bg-zinc-100 p-4"
            >
              <p className="text-2xl font-black text-zinc-950">{value}</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.24em] text-zinc-500">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 lg:px-8">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-zinc-500">
          Featured Articles
        </p>
        <h2 className="text-2xl font-bold text-zinc-950">
          Retro game ideas and mechanics
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {featuredArticles.map((article) => (
            <article
              key={article.name}
              className="rounded-2xl border-2 border-zinc-900 bg-zinc-100 p-4"
            >
              <img
                src={article.image}
                alt={article.title}
                className="aspect-4/3 w-full rounded-xl border-2 border-zinc-900 bg-zinc-200 object-cover"
              />
              <h3 className="mt-4 text-xl font-bold text-zinc-950">
                {article.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                {article.content[0]} Denver uses these ideas to shape game
                feel, pacing, challenge, and player feedback.
              </p>
              <Button to={`/articles/${article.name}`} className="mt-4">
                Read More
              </Button>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage
