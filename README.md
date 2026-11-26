# Outline Theory

A research series on editing outlines stored as plain text, published at
<https://laughedelic.github.io/outline-theory/>.

The site is [Quartz](https://quartz.jzhao.xyz) 5 with its blog template. Posts are Obsidian
Markdown under `content/posts/`, so wiki links, callouts and tags work as they do in a vault.
The interactive pages are plain HTML under `quartz/static/lab/`, served as they are at
`static/lab/`. A pull request builds the site, and a push to the default branch publishes it to
GitHub Pages (`.github/workflows/deploy.yml`).

## Preview

```bash
npm ci
npx quartz plugin install
npx quartz build --serve     # http://localhost:8080
```

## A post

One Markdown file in `content/posts/`, with front matter:

```yaml
---
title: Four keys reach every outline
date: 2026-11-25
description: One or two sentences, used for the feed and link previews.
tags:
  - keyboard
---
```

`draft: true` keeps a post off the site. Each post is also added to the list in
`content/index.md`.

Editor states are drawn as fenced blocks under a label (`before`, `after ⇥`), in Markdown source
with two spaces per level, the way the True Outliner repository draws them.

## An interactive page

The pages are built in a private research vault, so a page is copied here when a post needs it:

```bash
node scripts/import-pages.mjs /path/to/outliner-research/learning keys-to-anywhere
```

The script wraps the page in a full HTML document. A link to another page points at that page's
copy here, or becomes plain text while that page is not published, and every page already here
is written again so its links follow the set. A page is public from the moment it is pushed, so
it is read before it is imported.

To show one figure of a page inside a post, frame the page with the figure's id after `#`:

```html
<iframe src="../static/lab/keys-to-anywhere.html#fig1" title="…" loading="lazy"
        style="width:100%;height:1440px;border:0"></iframe>
```

Inside a frame the page shows that figure alone. The height is the figure's own, measured once.

Three things Quartz does that shaped this:

- An `.html` file under `content/` is published without its extension, which GitHub Pages
  serves as a download. That is why the pages live under `quartz/static/`.
- A `?query` on a frame's address is dropped by the link rewriting. A `#fragment` is kept.
- The build lists links into `static/lab/` as pointing to pages that are not on the site. They
  resolve once published.

## Upgrading Quartz

`npx quartz upgrade` merges the latest Quartz into this repository. The files changed here are
`README.md`, `quartz.config.yaml`, `.github/workflows/deploy.yml`, and the removed
`.github/dependabot.yml`; everything else under `quartz/` is Quartz's own.
