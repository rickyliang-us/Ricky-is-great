/// <reference types="vite/client" />
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import appCss from '~/styles/app.css?url'
import { seo } from '~/lib/seo'
import { site } from '~/lib/site'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#faf9f5' },
      ...seo({}),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400..600&family=Source+Serif+4:ital,opsz,wght@0,8..60,400..600;1,8..60,400&display=swap',
      },
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    ],
  }),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
  component: RootLayout,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

function RootLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-4 py-5 sm:px-8">
        <Link to="/" className="flex items-center gap-2.5 font-sans text-[17px] font-semibold tracking-[-0.02em]">
          <Mark />
          {site.name}
        </Link>
        <a href={site.repoUrl} className="btn-secondary !py-2 !text-[14px]">
          View source
        </a>
      </header>
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
      <footer className="mx-auto w-full max-w-[1200px] border-t px-4 py-8 font-sans text-[13px] text-fg-subtle sm:px-8">
        © {new Date().getFullYear()} {site.name}
      </footer>
    </div>
  )
}

// A simple asterisk-like mark drawn from three strokes.
function Mark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 text-accent" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
        <path d="M12 3v18" />
        <path d="M4.2 7.5l15.6 9" />
        <path d="M4.2 16.5l15.6-9" />
      </g>
    </svg>
  )
}
