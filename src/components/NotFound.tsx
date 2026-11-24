import { Link } from '@tanstack/react-router'

export function NotFound({ children }: { children?: React.ReactNode }) {
  return (
    <div className="mx-auto flex max-w-xl flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <p className="font-sans text-[14px] font-medium uppercase tracking-[0.14em] text-fg-subtle">404</p>
      <h1 className="display mt-4 text-[44px]">Page not found</h1>
      <p className="mt-4 text-[18px] text-fg-muted">
        {children ?? 'The page you’re looking for doesn’t exist.'}
      </p>
      <Link to="/" className="btn-primary mt-8">
        Back home
      </Link>
    </div>
  )
}
