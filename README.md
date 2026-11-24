# Ricky-is-great

A collection of original jokes that celebrate Ricky Liang, written in two styles:
"Most Interesting Man in the World"-style facts and Chuck Norris-style facts.

See [CLAUDE.md](CLAUDE.md) for the style guide and [jokes/](jokes/) for the batches.

## Website

`server.js` is a tiny dependency-free Node server that serves `public/index.html` and
`/api/jokes` (parsed from `jokes/batch-*.md`). Run it locally with `npm start`
(port 3000, or `$PORT`). It deploys to Railway from `main`.
