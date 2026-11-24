import { createFileRoute } from '@tanstack/react-router'
import { site } from '~/lib/site'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <section className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col justify-center px-4 pb-24 pt-16 sm:px-8 sm:pt-24">
      <p className="fade-up font-sans text-[14px] font-medium uppercase tracking-[0.14em] text-fg-subtle">
        {site.name}
      </p>
      <h1 className="display fade-up mt-6 text-[clamp(3.5rem,13vw,10rem)] [animation-delay:80ms]">
        Hello world
      </h1>
      <p className="fade-up mt-8 max-w-[34rem] text-[clamp(1.15rem,2.2vw,1.4rem)] leading-[1.55] text-fg-muted [animation-delay:160ms]">
        {site.description}
      </p>
      <div className="fade-up mt-10 flex flex-wrap gap-3 [animation-delay:240ms]">
        <a href={site.repoUrl} className="btn-primary">
          Read the code
        </a>
      </div>
    </section>
  )
}
