/**
 * Verifies that every Unsplash photo id in src/lib/images.ts still resolves.
 * Usage: node scripts/verify-images.mjs
 */
import { readFileSync } from 'node:fs';

const src = readFileSync(new URL('../src/lib/images.ts', import.meta.url), 'utf8');
const ids = [...new Set(src.match(/photo-[0-9a-f]{13}-[0-9a-f]{12}/g) ?? [])];

console.log(`Checking ${ids.length} photo ids...`);

const bad = [];
const CONCURRENCY = 12;
let cursor = 0;

async function worker() {
  while (cursor < ids.length) {
    const id = ids[cursor++];
    const url = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=64&h=64&q=60`;
    try {
      const res = await fetch(url, { method: 'GET' });
      if (!res.ok) bad.push(`${res.status} ${id}`);
    } catch (err) {
      bad.push(`ERR ${id} ${err.message}`);
    }
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, worker));

if (bad.length) {
  console.error(`\n${bad.length} broken:`);
  for (const b of bad) console.error('  ' + b);
  process.exit(1);
}
console.log('All image ids resolve.');
