// Tiny dependency-free server: serves public/ and a JSON list of jokes
// parsed from jokes/batch-NN.md.
import { createServer } from "node:http";
import { readFile, readdir } from "node:fs/promises";
import { join, extname, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const publicDir = join(root, "public");
const jokesDir = join(root, "jokes");
const port = Number(process.env.PORT) || 3000;

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
};

// Parse a batch file into { batch, sections: [{ title, jokes: [] }] }.
function parseBatch(name, text) {
  const batch = { batch: name.replace(/\.md$/, ""), title: name, sections: [] };
  let current = null;
  for (const line of text.split("\n")) {
    const h1 = line.match(/^#\s+(.+)/);
    const h2 = line.match(/^##\s+(.+)/);
    const item = line.match(/^\d+\.\s+(.+)/);
    if (h2) {
      current = { title: h2[1].trim(), jokes: [] };
      batch.sections.push(current);
    } else if (h1) {
      batch.title = h1[1].trim();
    } else if (item && current) {
      current.jokes.push(item[1].trim());
    }
  }
  return batch;
}

async function loadJokes() {
  const files = (await readdir(jokesDir))
    .filter((f) => /^batch-\d+\.md$/.test(f))
    .sort();
  return Promise.all(
    files.map(async (f) => parseBatch(f, await readFile(join(jokesDir, f), "utf8")))
  );
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://localhost");
    if (url.pathname === "/healthz") {
      res.writeHead(200, { "content-type": "text/plain" }).end("ok");
      return;
    }
    if (url.pathname === "/api/jokes") {
      res.writeHead(200, { "content-type": "application/json; charset=utf-8" });
      res.end(JSON.stringify(await loadJokes()));
      return;
    }
    const rel = url.pathname === "/" ? "index.html" : url.pathname.slice(1);
    const file = normalize(join(publicDir, rel));
    if (!file.startsWith(publicDir)) {
      res.writeHead(403).end("Forbidden");
      return;
    }
    const body = await readFile(file);
    res.writeHead(200, { "content-type": types[extname(file)] || "application/octet-stream" });
    res.end(body);
  } catch (err) {
    if (err.code === "ENOENT" || err.code === "EISDIR") {
      res.writeHead(404, { "content-type": "text/plain" }).end("Not found");
    } else {
      console.error(err);
      res.writeHead(500, { "content-type": "text/plain" }).end("Server error");
    }
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Ricky-is-great listening on port ${port}`);
});
