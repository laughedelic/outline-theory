// Copies interactive pages from the research vault into quartz/static/lab/ as complete HTML
// documents. Quartz serves that folder as it is, at static/lab/.
//
// The vault keeps each page as a fragment (title, styles, body, scripts) because its first host
// wrapped it. Here each page gets a document skeleton. A link to another page points at that
// page's copy here when it has one, and becomes plain text when it has none, so the site holds
// no link to a private address. Inside a frame, an address ending in `#<figure id>` shows that
// figure alone, so a post can embed it.
//
//   node scripts/import-pages.mjs /path/to/outliner-research/learning [name ...]
//
// The named pages are added. Every page already in quartz/static/lab/ is written again from the
// vault, so its links follow the set of pages published here.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from "node:fs"
import { join, basename } from "node:path"

const [src, ...named] = process.argv.slice(2)
if (!src) {
  console.error("usage: node scripts/import-pages.mjs <vault>/learning [name ...]")
  process.exit(1)
}
const out = join(import.meta.dirname, "..", "quartz", "static", "lab")
mkdirSync(out, { recursive: true })

const published = new Set([
  ...readdirSync(out).filter((f) => f.endsWith(".html")),
  ...named.map((n) => `${basename(n, ".html")}.html`),
])
for (const f of published) {
  if (!existsSync(join(src, f))) {
    console.error(`${f}: not in ${src}`)
    process.exit(1)
  }
}

// The private address each page was first published at, from the vault's own list of pages.
const readme = readFileSync(join(src, "README.md"), "utf8")
const address = new Map()
for (const m of readme.matchAll(/\]\((https:\/\/claude\.ai\/artifact\/[A-Za-z0-9]+)\) · \[`([a-z0-9-]+\.html)`\]/g))
  address.set(m[1], m[2])

const embed = `<script>
(() => {
  if (window.self === window.top) return
  const el = location.hash.length > 1 && document.getElementById(location.hash.slice(1))
  if (!el) return
  for (let n = el; n !== document.body; n = n.parentElement) {
    for (const s of n.parentElement.children)
      if (s !== n && !/^(SCRIPT|STYLE)$/.test(s.tagName)) s.style.setProperty("display", "none", "important")
    n.style.margin = "0"; n.style.padding = "0"; n.style.maxWidth = "none"
  }
  document.body.style.margin = "0"; document.body.style.padding = "8px"
  scrollTo(0, 0)
})()
</script>`

for (const f of [...published].sort()) {
  let page = readFileSync(join(src, f), "utf8")
  let unlinked = 0
  page = page.replace(
    /<a\s[^>]*href="(https:\/\/claude\.ai\/artifact\/[A-Za-z0-9]+)"[^>]*>([\s\S]*?)<\/a>/g,
    (whole, url, text) => {
      const target = address.get(url)
      if (target && published.has(target)) return `<a href="${target}">${text}</a>`
      unlinked++
      return text
    },
  )
  const left = (page.match(/https:\/\/claude\.ai\//g) ?? []).length
  if (left) {
    console.error(`${f}: ${left} private address(es) outside a link; not written`)
    process.exit(1)
  }
  const doc = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${page}
${embed}
`
  writeFileSync(join(out, f), doc)
  console.log(`${f}${unlinked ? `: ${unlinked} link(s) to pages not published here, left as text` : ""}`)
}
