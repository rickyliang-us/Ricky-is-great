# Ricky-is-great

A full-stack starting point: React 19 and Tailwind v4 on
[TanStack Start](https://tanstack.com/start), with Postgres through
[Drizzle](https://orm.drizzle.team), deployed on [Railway](https://railway.com)
from `main`.

Right now it's a single "Hello world" home page. It started from Railway's
[TanStack Start template](https://github.com/railwayapp/railway-tanstack-start),
with the demo app removed.

The joke batches and their style guide live in [jokes/](jokes/) and [CLAUDE.md](CLAUDE.md).

## Run locally

Needs Node 22.12+, pnpm (via `corepack`), and a Postgres database.

```bash
corepack pnpm install
cp .env.example .env     # set DATABASE_URL and SESSION_SECRET
corepack pnpm db:up      # optional: Postgres in Docker
corepack pnpm db:migrate # apply migrations
corepack pnpm dev        # http://localhost:3000
```

## Project layout

| Path | What it is |
| --- | --- |
| `src/routes/__root.tsx` | HTML shell, header and footer |
| `src/routes/index.tsx` | The home page |
| `src/routes/api/health.ts` | Health check: returns 503 if Postgres is unreachable |
| `src/server/db.server.ts` | Drizzle client (server-only) |
| `src/server/schema.ts` | Database schema |
| `src/styles/app.css` | Design tokens and Tailwind setup |
| `drizzle/` | SQL migrations, applied before each deploy |
| `scripts/migrate.mjs` | Migration runner used by Railway's pre-deploy step |
| `.railway/railway.ts` | Railway infrastructure described in code |

## Database changes

1. Edit `src/server/schema.ts`.
2. Run `corepack pnpm db:generate` and commit the new file in `drizzle/`.
3. Push to `main`. Railway runs the migration before the new version takes traffic.

## Deploying

Railway project **Ricky-is-great** has two services:

- **web** builds this repo with Railpack, runs `node scripts/migrate.mjs` before
  each deploy, and only switches traffic once `/api/health` returns 200.
- **Postgres** is reached over Railway's private network through `DATABASE_URL`.

Every push to `main` redeploys **web**.
