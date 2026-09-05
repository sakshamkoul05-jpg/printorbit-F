/**
 * Crawls the running dev/prod server and reports non-OK internal routes.
 * Usage: node scripts/check-links.mjs [baseUrl]
 */
const BASE = process.argv[2] ?? 'http://localhost:3200';

const seen = new Set();
const queue = ['/'];
const broken = [];
const externals = new Set();

function normalise(href) {
  if (!href) return null;
  // hrefs come out of HTML source, so entities are still encoded.
  href = href.replace(/&amp;/g, '&');
  if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return null;
  if (/^https?:\/\//.test(href)) {
    if (!href.startsWith(BASE)) {
      externals.add(href.split('?')[0]);
      return null;
    }
    href = href.slice(BASE.length) || '/';
  }
  // Query strings select content on an already-covered route; visiting one
  // instance per path is enough and keeps heavy pages from being hammered.
  return href.split('#')[0].split('?')[0];
}

let checked = 0;
while (queue.length) {
  const path = queue.shift();
  if (seen.has(path)) continue;
  seen.add(path);

  let res;
  try {
    res = await fetch(BASE + path);
  } catch (err) {
    broken.push(`${path} -> fetch error ${err.message}`);
    continue;
  }
  checked++;
  if (!res.ok) {
    broken.push(`${path} -> ${res.status}`);
    continue;
  }

  const html = await res.text();
  for (const m of html.matchAll(/href="([^"]+)"/g)) {
    const next = normalise(m[1]);
    if (next && next.startsWith('/') && !next.startsWith('/_next') && !seen.has(next)) {
      queue.push(next);
    }
  }
}

console.log(`Crawled ${checked} internal routes.`);
console.log(`External links referenced: ${externals.size}`);
if (broken.length) {
  console.error(`\n${broken.length} broken:`);
  for (const b of broken) console.error('  ' + b);
  process.exit(1);
}
console.log('No broken internal links.');
