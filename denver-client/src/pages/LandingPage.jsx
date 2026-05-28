import Button from '../components/Button'
import articles from '../assets/styles/article-content'

function LandingPage() {
  const highlights = articles.slice(0, 4)

  return (
    <div className="flex w-full flex-col gap-5">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-zinc-500">
              Landing page
            </p>
            <h1 className="max-w-2xl text-4xl font-black leading-tight text-zinc-950 sm:text-5xl">
              Denver James builds retro-inspired games with clear systems and
              arcade energy.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-600">
              This screen acts as an entry point for the project structure in
              your reference tree, with links into the main pages and auth flow.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/home" variant="primary">
                Enter Site
              </Button>
              <Button to="/sign-in">Sign In</Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {highlights.map((article) => (
              <img
                key={article.name}
                src={article.image}
                alt={article.title}
                className="aspect-4/3 w-full rounded-[1rem] border-2 border-zinc-900 bg-zinc-200 object-cover"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
