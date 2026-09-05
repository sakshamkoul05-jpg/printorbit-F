# PrintOrbit

Online printing, branded merchandise and corporate gifting storefront, built with
Next.js 16 (App Router), React 19, Bootstrap 5 and Zustand.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Architecture

### Catalogue

`src/lib/catalog.ts` is the single source of truth for everything the storefront
sells. It is organised as **department → category → product**:

- 14 departments (the nav tabs)
- ~60 categories
- ~390 products

Everything downstream reads from it — the mega menu, department pages, category
listings, product pages, search, the quote form and the footer. Adding a product
means adding one entry to a `products` array; no other file needs to change.

Prices are modelled the way a real print quote works: each product has quantity
tiers with progressively better unit economics, plus option groups (paper /
lamination / corner for print, branding / placement for apparel, branding /
packaging for merchandise) that add to the tier price.

### Images

`src/lib/images.ts` holds a curated photo library keyed by category. Every entry
is an Unsplash photo id chosen so the subject matches its category, and every id
is load-checked against the public Unsplash CDN.

> Unsplash+ (paid) photos 404 on `images.unsplash.com`, so they cannot be used
> here. Always run the verifier after adding ids.

```bash
npm run verify:images
```

### Routes

| Route | Purpose |
| --- | --- |
| `/` | Homepage |
| `/shop/[department]` | Department landing — category grid + most loved |
| `/category/[slug]` | Product listing with price / sort / size / label filters |
| `/products/[slug]` | Product detail — configurator, tier pricing, order summary |
| `/products` | All departments + best sellers |
| `/search?q=` | Product search |
| `/policies/[slug]` | Returns, privacy, terms |

## Verification

With the dev server running:

```bash
npm run verify:images                              # every photo id resolves
npm run check:links http://localhost:3000          # crawl for broken internal links
npm run check:page-images http://localhost:3000    # every image on a page resolves
```

## Local development note

If the Next.js image optimiser fails with `UNABLE_TO_VERIFY_LEAF_SIGNATURE`,
antivirus TLS interception (Avast, Kaspersky and similar) is re-signing HTTPS
traffic and Node does not trust the interception CA. Those tools usually export
a certificate and set `NODE_EXTRA_CA_CERTS`; make sure the dev server process
inherits that environment variable. This only affects local development —
hosted builds fetch Unsplash directly.
