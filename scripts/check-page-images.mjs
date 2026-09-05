/**
 * Fetches a sample of routes and verifies every remote image they reference
 * actually resolves. Usage: node scripts/check-page-images.mjs [baseUrl]
 */
const BASE = process.argv[2] ?? 'http://localhost:3200';

const ROUTES = [
  '/', '/products', '/search?q=bottle', '/blog', '/about', '/contact',
  '/corporate', '/portfolio', '/testimonials', '/templates', '/clients',
  '/faq', '/sample-kit', '/cart', '/policies/returns',
  '/shop/gift-hampers', '/shop/visiting-business-cards-id-cards',
  '/shop/custom-clothing', '/shop/drinkware-lunchboxes', '/shop/bags',
  '/shop/gadgets-accessories', '/shop/marketing-materials',
  '/shop/office-stationery', '/shop/kits-hampers', '/shop/awards-trophies',
  '/shop/labels-stickers-packaging', '/shop/photo-products',
  '/shop/health-ergonomics', '/shop/eco-friendly-items',
  '/category/visiting-cards', '/category/polo-t-shirts', '/category/mugs-travel-mugs',
  '/category/laptop-bags', '/category/trophies', '/category/stickers',
  '/products/visiting-cards-single-sided', '/products/classic-cotton-polo-t-shirt',
  '/products/classic-ceramic-mug', '/products/crystal-star-trophy',
];

const urls = new Set();
for (const route of ROUTES) {
  const res = await fetch(BASE + route);
  if (!res.ok) {
    console.error(`route ${route} -> ${res.status}`);
    continue;
  }
  const html = await res.text();
  for (const m of html.matchAll(/https:\/\/images\.unsplash\.com\/photo-[0-9a-f-]+/g)) {
    urls.add(m[0]);
  }
}

console.log(`Found ${urls.size} distinct remote images across ${ROUTES.length} routes.`);

const list = [...urls];
const bad = [];
let i = 0;
await Promise.all(
  Array.from({ length: 12 }, async () => {
    while (i < list.length) {
      const u = list[i++];
      try {
        const r = await fetch(u + '?w=64&h=64&fit=crop');
        if (!r.ok) bad.push(`${r.status} ${u}`);
      } catch (e) {
        bad.push(`ERR ${u} ${e.message}`);
      }
    }
  }),
);

if (bad.length) {
  console.error(`\n${bad.length} broken images:`);
  for (const b of bad) console.error('  ' + b);
  process.exit(1);
}
console.log('All page images resolve.');
