// Prerenders every route to a real HTML file so crawlers (and AI bots that do
// not execute JavaScript) receive full content instead of an empty #root.
// Runs after `vite build` + `vite build --ssr`; see package.json scripts.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { ROUTES, ORIGIN } from './route-meta.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = resolve(root, 'dist');
const ssrDir = resolve(root, '.ssr-build');

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const { render } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href);

const template = readFileSync(join(distDir, 'index.html'), 'utf8');

// Strip the placeholder tags the template ships with; each page injects its own.
const stripped = template
  .replace(/<title>[\s\S]*?<\/title>\s*/i, '')
  .replace(/<meta\s+name="description"[^>]*>\s*/i, '')
  .replace(/<meta\s+property="og:title"[^>]*>\s*/i, '')
  .replace(/<meta\s+property="og:description"[^>]*>\s*/i, '')
  .replace(/<meta\s+property="og:url"[^>]*>\s*/i, '');

if (!stripped.includes('<div id="root"></div>')) {
  throw new Error('prerender: could not find <div id="root"></div> in dist/index.html');
}

let ok = 0;
const failures = [];

for (const route of ROUTES) {
  const { path, title, description, canonical } = route;
  let body;
  try {
    body = render(path);
  } catch (err) {
    failures.push(`${path} -> ${err.message}`);
    continue;
  }

  if (!body || body.length < 200) {
    failures.push(`${path} -> rendered body suspiciously small (${body ? body.length : 0} chars)`);
    continue;
  }

  const head = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<link rel="canonical" href="${ORIGIN}${canonical}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${ORIGIN}${canonical}" />`,
  ].join('\n    ');

  const html = stripped
    .replace('</head>', `  ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);

  // "/" -> dist/index.html ; "/spo2" -> dist/spo2/index.html
  const outPath =
    path === '/' ? join(distDir, 'index.html') : join(distDir, path, 'index.html');
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html, 'utf8');
  ok += 1;
}

// Dedicated 404 document. Vercel serves it for unmatched paths, so unknown
// URLs stop rendering as a 200 copy of the homepage (a soft 404 to Google).
// noindex keeps it out of the index even if a crawler reaches it directly.
{
  const body = render('/__not-found__');
  const head = [
    '<title>Page not found | Medke</title>',
    '<meta name="robots" content="noindex, follow" />',
    `<meta name="description" content="This page does not exist. Browse compatible medical sensors and cables at ${ORIGIN}/products." />`,
  ].join('\n    ');
  const html = stripped
    .replace('</head>', `  ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  writeFileSync(join(distDir, '404.html'), html, 'utf8');
  ok += 1;
}

rmSync(ssrDir, { recursive: true, force: true });

if (failures.length) {
  console.error(`\nprerender FAILED for ${failures.length} route(s):`);
  failures.forEach((f) => console.error(`  - ${f}`));
  process.exit(1);
}

console.log(`prerender: ${ok} HTML files written`);
