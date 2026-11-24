import { ErrorComponent, Link, useRouter } from '@tanstack/react-router'
import type { ErrorComponentProps } from '@tanstack/react-router'

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter()
  console.error('DefaultCatchBoundary Error:', error)

  return (
    <div className="mx-auto flex max-w-xl flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="display text-[40px]">Something went wrong</h1>
      <div className="mt-6 w-full overflow-auto rounded-xl border bg-surface p-4 text-left text-[13px]">
        <ErrorComponent error={error} />
      </div>
      <div className="mt-8 flex gap-3">
        <button type="button" onClick={() => router.invalidate()} className="btn-primary">
          Try again
        </button>
        <Link to="/" className="btn-secondary">
          Home
        </Link>
      </div>
    </div>
  )
}
