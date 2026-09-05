/**
 * Single source of truth for the storefront catalogue.
 *
 * Shape mirrors the PrintStop information architecture the client asked us to
 * match: department (nav tab) -> category -> product. Listing pages, the mega
 * menu, search and the product page all read from here, so a product only ever
 * has to be described once.
 */

import { IMAGES, img, type ImageKey } from './images';

export interface PriceTier {
  qty: number;
  price: number;
}

export interface Option {
  name: string;
  /** Rupees added to the tier price. */
  delta: number;
}

export interface OptionGroup {
  /** Rendered as the label in the configurator, e.g. "Paper". */
  label: string;
  options: Option[];
}

export type ProductLabel = 'Popular' | 'Best Seller' | 'New';

export interface CatalogProduct {
  slug: string;
  name: string;
  brand: string;
  /** Category slug this product lives under. */
  category: string;
  /** Short blurb used on cards. */
  summary: string;
  /** Bullet list shown next to the gallery. */
  highlights: string[];
  description: string;
  imageKey: ImageKey;
  /** Index into the image set, so sibling products don't share a photo. */
  imageIndex: number;
  /** Lowest price, matching the first pricing tier. */
  price: number;
  /** "for 100 pieces" / "per unit" — printed under the price. */
  unit: string;
  tiers: PriceTier[];
  optionGroups: OptionGroup[];
  sizes: string[];
  rating: number;
  reviews: number;
  shipsInDays: number;
  labels: ProductLabel[];
}

export interface CatalogCategory {
  slug: string;
  name: string;
  description: string;
  imageKey: ImageKey;
  products: CatalogProduct[];
}

export interface Department {
  slug: string;
  name: string;
  /** Short label used in the nav bar when the full name is too long. */
  navLabel: string;
  description: string;
  imageKey: ImageKey;
  categories: CatalogCategory[];
}

// ---------------------------------------------------------------------------
// Builders
// ---------------------------------------------------------------------------

/** Standard paper/lamination/corner groups reused across print products. */
const PRINT_OPTIONS: OptionGroup[] = [
  {
    label: 'Paper',
    options: [
      { name: 'Standard', delta: 0 },
      { name: 'Stiff', delta: 40 },
      { name: 'Extra Stiff', delta: 180 },
      { name: 'Super White', delta: 180 },
      { name: 'White Textured', delta: 180 },
      { name: 'Metallic', delta: 420 },
      { name: 'Non Tearable', delta: 240 },
      { name: 'Recycled', delta: 180 },
    ],
  },
  {
    label: 'Lamination',
    options: [
      { name: 'None', delta: 0 },
      { name: 'Matt', delta: 0 },
      { name: 'Gloss', delta: 0 },
      { name: 'Velvet', delta: 240 },
    ],
  },
  {
    label: 'Corner',
    options: [
      { name: 'Standard', delta: 0 },
      { name: 'Rounded', delta: 0 },
    ],
  },
];

const APPAREL_OPTIONS: OptionGroup[] = [
  {
    label: 'Branding',
    options: [
      { name: 'Embroidery', delta: 0 },
      { name: 'Screen Print', delta: 0 },
      { name: 'DTF Print', delta: 45 },
      { name: 'Sublimation', delta: 70 },
    ],
  },
  {
    label: 'Placement',
    options: [
      { name: 'Left Chest', delta: 0 },
      { name: 'Full Front', delta: 60 },
      { name: 'Front & Back', delta: 110 },
      { name: 'Sleeve', delta: 35 },
    ],
  },
];

const MERCH_OPTIONS: OptionGroup[] = [
  {
    label: 'Branding',
    options: [
      { name: 'Single Colour Print', delta: 0 },
      { name: 'Multi Colour Print', delta: 45 },
      { name: 'Laser Engraving', delta: 90 },
      { name: 'UV Print', delta: 70 },
    ],
  },
  {
    label: 'Packaging',
    options: [
      { name: 'Standard Box', delta: 0 },
      { name: 'Branded Sleeve', delta: 55 },
      { name: 'Gift Box', delta: 120 },
    ],
  },
];

/**
 * Derive quantity tiers from a base price. Larger runs get progressively
 * better unit economics, the way a real print quote does.
 */
function tiers(base: number, startQty: number): PriceTier[] {
  const steps = [1, 2, 3, 5, 10, 20];
  const discounts = [1, 0.81, 0.74, 0.66, 0.58, 0.52];
  return steps.map((mult, i) => ({
    qty: startQty * mult,
    // Tier 0 is the advertised "starts at" price, so it must not be rounded.
    price: i === 0 ? base : Math.round((base * mult * discounts[i]) / 10) * 10,
  }));
}

let seed = 7;
/** Deterministic pseudo-random so ratings/review counts stay stable per build. */
function rand(min: number, max: number): number {
  seed = (seed * 1103515245 + 12345) % 2147483648;
  return min + (seed / 2147483648) * (max - min);
}

interface ProductSeed {
  name: string;
  price: number;
  /** Pack size the price refers to. Defaults to 1 (i.e. "per unit"). */
  qty?: number;
  labels?: ProductLabel[];
  summary?: string;
}

interface CategorySeed {
  slug: string;
  name: string;
  description: string;
  imageKey: ImageKey;
  /** Which option groups the configurator shows. */
  kind: 'print' | 'apparel' | 'merch';
  sizes?: string[];
  brand?: string;
  products: ProductSeed[];
}

function buildCategory(dept: string, seedCat: CategorySeed): CatalogCategory {
  const optionGroups =
    seedCat.kind === 'print'
      ? PRINT_OPTIONS
      : seedCat.kind === 'apparel'
        ? APPAREL_OPTIONS
        : MERCH_OPTIONS;

  const products = seedCat.products.map((p, i): CatalogProduct => {
    const qty = p.qty ?? 1;
    const unit = qty === 1 ? 'per unit' : `for ${qty} pieces`;
    const rating = Math.round(rand(4.1, 4.9) * 10) / 10;
    const reviews = Math.round(rand(18, 320));
    return {
      slug: slugify(p.name),
      name: p.name,
      brand: seedCat.brand ?? 'PrintOrbit',
      category: seedCat.slug,
      summary:
        p.summary ??
        `${p.name} customised with your brand — ordered online, delivered pan-India.`,
      highlights: highlightsFor(seedCat, p),
      description: descriptionFor(seedCat, p),
      imageKey: seedCat.imageKey,
      imageIndex: i,
      price: p.price,
      unit,
      tiers: tiers(p.price, qty),
      optionGroups,
      sizes: seedCat.sizes ?? ['Standard Size'],
      rating,
      reviews,
      shipsInDays: seedCat.kind === 'print' ? 3 : 5,
      labels: p.labels ?? [],
    };
  });

  return {
    slug: seedCat.slug,
    name: seedCat.name,
    description: seedCat.description,
    imageKey: seedCat.imageKey,
    products,
  };
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function highlightsFor(cat: CategorySeed, p: ProductSeed): string[] {
  if (cat.kind === 'print') {
    return [
      `${p.name} printed to your artwork.`,
      'Choose from multiple paper stocks and finishes.',
      'Matt, gloss or no lamination.',
      'Straight or rounded corners.',
      'Digital proof shared before printing.',
    ];
  }
  if (cat.kind === 'apparel') {
    return [
      `${p.name} branded with your logo.`,
      'Embroidery, screen print, DTF or sublimation.',
      'Sizes from S to XXL.',
      'Bulk pricing on quantities of 25 and above.',
      'Size set available before you commit to a bulk run.',
    ];
  }
  return [
    `${p.name} personalised with your brand.`,
    'Single colour, multi colour, UV print or laser engraving.',
    'Gift-box and branded sleeve packaging available.',
    'Order a single unit before placing a bulk order.',
    'Multi-location delivery on one consolidated order.',
  ];
}

function descriptionFor(cat: CategorySeed, p: ProductSeed): string {
  return (
    `${p.name} from PrintOrbit is built for business use — consistent output, ` +
    `reliable fulfilment and brand-accurate colour on every reorder. ` +
    `${cat.description} ` +
    `Upload your artwork or start from a template, approve the digital proof, ` +
    `and we handle production and delivery. Products are printed to your exact ` +
    `brand colour specification using CMYK references, so a reorder months later ` +
    `matches the first run. Your designs are saved to your account, which means ` +
    `no re-uploading files or re-briefing requirements each time you order.`
  );
}

// ---------------------------------------------------------------------------
// Catalogue data
// ---------------------------------------------------------------------------

const DEPARTMENT_SEEDS: {
  slug: string;
  name: string;
  navLabel: string;
  description: string;
  imageKey: ImageKey;
  categories: CategorySeed[];
}[] = [
  {
    slug: 'gift-hampers',
    name: 'Gift Hampers',
    navLabel: 'Gift Hampers',
    description:
      'Curated festive and corporate hampers, personalised with your logo and ready for bulk despatch.',
    imageKey: 'gift-hampers',
    categories: [
      {
        slug: 'gift-hampers',
        name: 'Gift Hampers',
        description:
          'Ready-to-gift hampers combining drinkware, desk pieces, snacks and tech, packed in branded boxes.',
        imageKey: 'gift-hampers',
        kind: 'merch',
        products: [
          { name: 'Bright Bites Smart Diary Hamper', price: 1249, labels: ['Popular'] },
          { name: 'Festive Beats Bluetooth Headphones Hamper', price: 2499, labels: ['Best Seller'] },
          { name: 'Festive Glow Anti-Theft Sling Hamper', price: 1899 },
          { name: 'Festive Luxe Premium Bluetooth Hamper', price: 3299 },
          { name: 'Glow Good Smart Water Bottle Hamper', price: 1799 },
          { name: 'Lotus Glow Diwali Hamper', price: 999, labels: ['Popular'] },
          { name: 'Power Play Earbuds Hamper', price: 2199 },
          { name: 'Rooted Joy Eco-Friendly Hamper', price: 1349 },
          { name: 'Sip N Sparkle Insulated Bottle Hamper', price: 1599 },
          { name: 'Sizzle N Shine Nonstick Pan Hamper', price: 2099 },
          { name: 'Whirl of Joy Electric Chopper Hamper', price: 1899 },
          { name: 'Celebration Essentials Hamper', price: 899 },
        ],
      },
    ],
  },
  {
    slug: 'visiting-business-cards-id-cards',
    name: 'Visiting Cards & ID Cards',
    navLabel: 'Visiting Cards & ID Cards',
    description:
      'High-definition card printing on premium stocks, plus the ID cards, lanyards and holders that go with them.',
    imageKey: 'visiting-cards',
    categories: [
      {
        slug: 'visiting-cards',
        name: 'Visiting Cards',
        description:
          'High-definition printing that captures rich colours on premium paper, in multiple stocks, finishes and sizes.',
        imageKey: 'visiting-cards',
        kind: 'print',
        sizes: ['Standard Size', 'Back to Back', 'Single Side'],
        products: [
          { name: 'Visiting Cards (Single Sided)', price: 179, qty: 100, labels: ['Popular'] },
          { name: 'Visiting Cards (Front and Back)', price: 279, qty: 100, labels: ['Best Seller'] },
          { name: 'Sandwich/Trifecta Business Cards', price: 1249, qty: 50 },
          { name: 'Slim Visiting Cards', price: 179, qty: 100 },
          { name: 'Folded Visiting Cards', price: 779, qty: 100 },
          { name: 'Spot Laminated Visiting Cards', price: 1619, qty: 500 },
          { name: 'PVC Plastic Visiting Cards', price: 2429, qty: 48, labels: ['Popular'] },
          { name: 'Non-Tearable Visiting Cards', price: 179, qty: 100 },
          { name: 'Recycled Eco-Friendly Business Cards', price: 179, qty: 100 },
          { name: 'Square Visiting Cards', price: 179, qty: 100 },
          { name: 'Circular Visiting Cards', price: 179, qty: 100 },
          { name: 'Doctor Business Cards', price: 179, qty: 100 },
          { name: 'Textured Visiting Cards', price: 179, qty: 100 },
          { name: 'Standard Business Cards', price: 179, qty: 100, labels: ['Popular'] },
          { name: 'Thick Premium Visiting Cards', price: 179, qty: 100 },
          { name: 'Super White Visiting Cards', price: 179, qty: 100 },
          { name: 'Velvet Visiting Cards', price: 419, qty: 100 },
          { name: 'Rounded Corner Visiting Cards', price: 179, qty: 100 },
          { name: 'Matte Visiting Cards', price: 179, qty: 100 },
          { name: 'Gloss Visiting Cards', price: 179, qty: 100 },
          { name: 'QR Code Visiting Cards', price: 179, qty: 100, labels: ['New'] },
          { name: 'Contractor Visiting Cards', price: 279, qty: 100 },
          { name: 'Lawyer and Advocate Visiting Cards', price: 279, qty: 100 },
          { name: 'Real Estate Agent Visiting Cards', price: 279, qty: 100 },
          { name: 'Jewellery Visiting Cards', price: 279, qty: 100 },
          { name: 'Graphic Designer Visiting Cards', price: 279, qty: 100 },
        ],
      },
      {
        slug: 'id-cards-accessories',
        name: 'ID Cards & Accessories',
        description:
          'Employee, event and student identity cards with the lanyards, holders and badges that complete them.',
        imageKey: 'id-cards',
        kind: 'print',
        products: [
          { name: 'Business Corporate ID Cards', price: 49, labels: ['Best Seller'] },
          { name: 'Customised Lanyards', price: 59, labels: ['Popular'] },
          { name: 'ID Card Holder', price: 39 },
          { name: 'Name Badges', price: 89 },
          { name: 'Yoyo ID Card Holder', price: 119 },
          { name: 'Hospital and Doctor ID Cards', price: 55 },
          { name: 'Student ID Cards', price: 39 },
          { name: 'Event and Conference ID Cards', price: 45 },
          { name: 'Membership ID Cards', price: 59 },
          { name: 'Visitor ID Cards', price: 35 },
        ],
      },
      {
        slug: 'visiting-card-holders',
        name: 'Visiting Card Holders',
        description:
          'Engraved, leather and metal-plated holders that keep a stack of cards presentable.',
        imageKey: 'visiting-card-holders',
        kind: 'merch',
        products: [
          { name: 'Engraved Visiting Card Holder', price: 449, labels: ['Popular'] },
          { name: 'Leather Visiting Card Holder', price: 599 },
          { name: 'Metal Plated Visiting Card Holder', price: 749 },
        ],
      },
    ],
  },
  {
    slug: 'office-stationery',
    name: 'Stationery & Office Supplies',
    navLabel: 'Stationery & Office Supplies',
    description:
      'Everything the office runs on — pens, letterheads, diaries, calendars, stamps and desk pieces, all brandable.',
    imageKey: 'pens',
    categories: [
      {
        slug: 'pens',
        name: 'Pens',
        description:
          'Classic, premium and promotional pens engraved or printed with your company name.',
        imageKey: 'pens',
        kind: 'merch',
        products: [
          { name: 'Classic Metal Ball Pen', price: 89, labels: ['Best Seller'] },
          { name: 'Executive Corporate Pen', price: 249 },
          { name: 'Premium Roller Ball Pen', price: 549, labels: ['Popular'] },
          { name: 'Twist Action Metal Pen', price: 149 },
          { name: 'Promotional Plastic Pen', price: 19 },
          { name: 'Wooden Eco Pen', price: 79 },
          { name: 'Stylus Combo Pen', price: 129 },
          { name: 'Gift Pen Set of Two', price: 899 },
        ],
      },
      {
        slug: 'letterheads-envelopes',
        name: 'Letterheads & Envelopes',
        description:
          'Company letterheads and envelopes in every standard size, printed to your brand palette.',
        imageKey: 'letterheads-envelopes',
        kind: 'print',
        sizes: ['A4', 'A5', 'No 10', 'DL', 'C4'],
        products: [
          { name: 'Company Letterheads', price: 899, qty: 250, labels: ['Best Seller'] },
          { name: 'Envelopes No 10', price: 649, qty: 250 },
          { name: 'Envelopes A4', price: 1149, qty: 250 },
          { name: 'Envelopes A5', price: 849, qty: 250 },
          { name: 'Window Envelopes', price: 999, qty: 250 },
          { name: 'Cloth Lined Envelopes', price: 1499, qty: 250 },
          { name: 'Recycled Kraft Envelopes', price: 899, qty: 250 },
          { name: 'Executive Letterheads', price: 1249, qty: 250 },
        ],
      },
      {
        slug: 'personal-stationery',
        name: 'Personal Stationery',
        description:
          'Note cards, money envelopes and kraft pads for personal and small-team use.',
        imageKey: 'personal-stationery',
        kind: 'print',
        products: [
          { name: 'Customised Money Envelope', price: 349, qty: 50 },
          { name: 'Folded Note Cards with Envelopes', price: 649, qty: 50, labels: ['Popular'] },
          { name: 'Rectangle Kraft Pad', price: 199 },
          { name: 'Kraft Pocket Wiro Pad', price: 249 },
          { name: 'Personalised Memo Pad', price: 179 },
          { name: 'Sticky Note Cube', price: 229 },
        ],
      },
      {
        slug: 'diaries-notebooks',
        name: 'Diaries & Notebooks',
        description:
          'Hardbound diaries, wiro notebooks and organisers, foil-stamped or printed with your identity.',
        imageKey: 'diaries-notebooks',
        kind: 'merch',
        sizes: ['A4', 'A5', 'B5', 'Pocket'],
        products: [
          { name: 'Executive Hardbound Diary', price: 449, labels: ['Best Seller'] },
          { name: 'A5 Soft Touch Diary', price: 349 },
          { name: 'Wiro Bound Notebook', price: 249, labels: ['Popular'] },
          { name: 'Recycled Kraft Notebook', price: 199 },
          { name: 'Diary Organiser with Pen Loop', price: 649 },
          { name: 'PU Leather Notebook', price: 549 },
          { name: 'Dotted Grid Journal', price: 299 },
          { name: 'Pocket Notebook Set of 3', price: 399 },
        ],
      },
      {
        slug: 'desk-accessories',
        name: 'Desk Accessories',
        description:
          'Desk organisers, luggage tags, tea lights and the small pieces that dress a workspace.',
        imageKey: 'desk-accessories',
        kind: 'merch',
        products: [
          { name: 'Multi-Compartment Desk Organiser', price: 899, labels: ['Popular'] },
          { name: 'Customised Luggage Tag', price: 149 },
          { name: 'Tea Lights Set of 3', price: 299 },
          { name: 'Wooden Pen Stand', price: 449 },
          { name: 'Desk Lamp with Pen Holder', price: 1299 },
          { name: 'Mouse Pad with Wrist Rest', price: 349 },
          { name: 'Acrylic Card Stand', price: 249 },
          { name: 'Cork Desk Mat', price: 799 },
        ],
      },
      {
        slug: 'calendars',
        name: 'Calendars',
        description:
          'Desk, tent, wall and perpetual wooden calendars printed with your yearly campaign.',
        imageKey: 'calendars',
        kind: 'print',
        products: [
          { name: 'Desk Calendar', price: 249, labels: ['Best Seller'] },
          { name: 'Tent Calendar', price: 199 },
          { name: 'Wall Calendar', price: 299 },
          { name: 'Circular Perpetual Wooden Calendar', price: 899, labels: ['Popular'] },
          { name: 'Sliding Perpetual Wooden Calendar', price: 949 },
          { name: 'Soccer Shaped Calendar', price: 449 },
          { name: 'Warli Multi-Utility Calendar Desk Organizer', price: 1099 },
        ],
      },
      {
        slug: 'invitation-greeting-cards',
        name: 'Invitation & Greeting Cards',
        description:
          'Invitation and greeting cards for corporate events, festivals and milestones.',
        imageKey: 'invitation-greeting-cards',
        kind: 'print',
        products: [
          { name: 'Customised Invitation Cards', price: 799, qty: 50, labels: ['Popular'] },
          { name: 'Corporate Greeting Cards', price: 649, qty: 50 },
          { name: 'Festival Greeting Cards', price: 599, qty: 50 },
          { name: 'Thank You Cards', price: 449, qty: 50 },
          { name: 'Event Invitation Cards', price: 899, qty: 50 },
        ],
      },
      {
        slug: 'stamps-files-folders',
        name: 'Stamps, Files & Folders',
        description:
          'Self-inking stamps, presentation folders and document files for everyday office use.',
        imageKey: 'stamps-files-folders',
        kind: 'print',
        products: [
          { name: 'Self Inking Rubber Stamp', price: 349, labels: ['Best Seller'] },
          { name: 'Pre-Inked Pocket Stamp', price: 449 },
          { name: 'Round Company Seal Stamp', price: 399 },
          { name: 'Presentation Folder', price: 1299, qty: 50, labels: ['Popular'] },
          { name: 'Ring Binder File', price: 249 },
          { name: 'Document Pocket Folder', price: 999, qty: 50 },
          { name: 'Numbering Stamp', price: 549 },
        ],
      },
      {
        slug: 'other-stationery',
        name: 'Other Stationery',
        description:
          'Paper files, receipt books and dockets for back-office and billing work.',
        imageKey: 'other-stationery',
        kind: 'print',
        products: [
          { name: 'Paper Files', price: 799, qty: 50 },
          { name: 'Receipt and Challan Books', price: 899, qty: 10, labels: ['Popular'] },
          { name: 'Folders and Dockets', price: 1099, qty: 50 },
          { name: 'Carbonless Bill Books', price: 1249, qty: 10 },
          { name: 'Delivery Note Books', price: 949, qty: 10 },
        ],
      },
    ],
  },
  {
    slug: 'custom-clothing',
    name: 'Apparel',
    navLabel: 'Apparel',
    description:
      'From formal shirts to casual tees — corporate apparel branded with embroidery, print or sublimation.',
    imageKey: 'polo-t-shirts',
    categories: [
      {
        slug: 'polo-t-shirts',
        name: 'Polo T-Shirts',
        description:
          'Combed cotton, dryfit and tipping polos, embroidered or printed with your logo.',
        imageKey: 'polo-t-shirts',
        kind: 'apparel',
        sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
        products: [
          { name: 'Classic Cotton Polo T-Shirt', price: 449, labels: ['Best Seller'] },
          { name: 'Tipping Polo T-Shirt Pre-Shrunk', price: 549 },
          { name: 'Dryfit Polo T-Shirt', price: 499, labels: ['Popular'] },
          { name: 'Womens Kelci Polo T-Shirt', price: 599 },
          { name: 'Pique Knit Polo T-Shirt', price: 529 },
          { name: 'Long Sleeve Polo T-Shirt', price: 649 },
          { name: 'Contrast Collar Polo T-Shirt', price: 579 },
          { name: 'Premium Mercerised Polo T-Shirt', price: 899 },
        ],
      },
      {
        slug: 'round-neck-t-shirts',
        name: 'Round Neck T-Shirts',
        description:
          'Cotton, dryfit and oversized round-neck tees for teams, events and campaigns.',
        imageKey: 'round-neck-t-shirts',
        kind: 'apparel',
        sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
        products: [
          { name: 'Cotton Round Neck T-Shirt', price: 345, labels: ['Best Seller'] },
          { name: 'Dryfit Round Neck T-Shirt', price: 429 },
          { name: 'Oversized Drop Shoulder T-Shirt', price: 599, labels: ['Popular'] },
          { name: 'Bio-Wash Round Neck T-Shirt', price: 399 },
          { name: 'Organic Cotton T-Shirt', price: 649 },
          { name: 'Full Sleeve Round Neck T-Shirt', price: 499 },
          { name: 'Melange Round Neck T-Shirt', price: 379 },
        ],
      },
      {
        slug: 'shirts',
        name: 'Shirts',
        description:
          'Oxford, denim and easy-care formal shirts for front-office and uniform programmes.',
        imageKey: 'shirts',
        kind: 'apparel',
        sizes: ['38', '40', '42', '44', '46'],
        products: [
          { name: 'Easy Care Oxford Shirt', price: 1249, labels: ['Best Seller'] },
          { name: 'Scott Denim Shirt', price: 1449 },
          { name: 'Newcastle Formal Shirt', price: 1349 },
          { name: 'Womens Oxford Shirt', price: 1299, labels: ['Popular'] },
          { name: 'Poplin Corporate Shirt', price: 1099 },
          { name: 'Twill Uniform Shirt', price: 999 },
          { name: 'Half Sleeve Formal Shirt', price: 949 },
        ],
      },
      {
        slug: 'pants',
        name: 'Pants',
        description:
          'Track pants and corporate trousers to complete a uniform or event kit.',
        imageKey: 'pants',
        kind: 'apparel',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        products: [
          { name: 'Colour Block Track Pant', price: 1099 },
          { name: 'Slim Fit Track Pant', price: 949, labels: ['Popular'] },
          { name: 'Cotton Jogger Pant', price: 899 },
          { name: 'Corporate Formal Trouser', price: 1299 },
        ],
      },
      {
        slug: 'jackets-hoodies',
        name: 'Jackets & Hoodies',
        description:
          'All-weather jackets, varsity jackets, hoodies and sweatshirts in team colours.',
        imageKey: 'jackets-hoodies',
        kind: 'apparel',
        sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
        products: [
          { name: 'All Weather Jacket', price: 2499, labels: ['Best Seller'] },
          { name: 'Austin Bomber Jacket', price: 2199 },
          { name: 'AWG Varsity Jacket', price: 2399, labels: ['Popular'] },
          { name: 'Fleece Hoodie', price: 1099 },
          { name: 'Zipper Hoodie', price: 1299 },
          { name: 'Crew Neck Sweatshirt', price: 949 },
          { name: 'Softshell Corporate Jacket', price: 2799 },
          { name: 'Puffer Jacket', price: 3199 },
        ],
      },
      {
        slug: 'womens-clothing',
        name: "Women's Clothing",
        description:
          'Polos, oxford shirts and tees cut for women, in the same fabrics as the core range.',
        imageKey: 'womens-clothing',
        kind: 'apparel',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        products: [
          { name: 'Womens Kelci Polo', price: 599, labels: ['Popular'] },
          { name: 'Womens Formal Oxford Shirt', price: 1299 },
          { name: 'Womens Round Neck T-Shirt', price: 379 },
          { name: 'Womens Fleece Hoodie', price: 1099 },
        ],
      },
      {
        slug: 'sports-apparel',
        name: 'Sports Apparel',
        description:
          'Dryfit jerseys and sublimated sportswear for tournaments, runs and team events.',
        imageKey: 'sports-apparel',
        kind: 'apparel',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        products: [
          { name: 'Dryfit Polo Jersey', price: 549, labels: ['Best Seller'] },
          { name: 'Sublimated Round Neck Jersey', price: 649 },
          { name: 'Mandarin Collar Jersey with Zipper', price: 799, labels: ['Popular'] },
          { name: 'Basketball Jersey Set', price: 1199 },
          { name: 'Marathon Running Tee', price: 499 },
        ],
      },
      {
        slug: 'caps',
        name: 'Caps',
        description:
          'Dryfit, cotton and poly twill caps embroidered with your mark.',
        imageKey: 'caps',
        kind: 'apparel',
        sizes: ['Free Size'],
        products: [
          { name: 'Cotton Cap', price: 249, labels: ['Popular'] },
          { name: 'Dryfit Cap', price: 299 },
          { name: 'Poly Twill Cap', price: 279 },
          { name: 'Trucker Mesh Cap', price: 329 },
          { name: 'Bucket Hat', price: 399 },
        ],
      },
    ],
  },
  {
    slug: 'drinkware-lunchboxes',
    name: 'Drinkware & Lunchboxes',
    navLabel: 'Drinkware & Lunchboxes',
    description:
      'Bottles, flasks, tumblers, mugs and lunch boxes — laser engraved or UV printed with your logo.',
    imageKey: 'everyday-bottles',
    categories: [
      {
        slug: 'everyday-bottles',
        name: 'Everyday Bottles',
        description:
          'Single-wall steel and aluminium bottles for daily carry and event giveaways.',
        imageKey: 'everyday-bottles',
        kind: 'merch',
        sizes: ['500 ml', '750 ml', '1 L'],
        products: [
          { name: 'Aluminium Water Bottle', price: 299, labels: ['Best Seller'] },
          { name: 'Alaska Stainless Steel Bottle', price: 549 },
          { name: 'Barrel Pro Single Wall Bottle', price: 449, labels: ['Popular'] },
          { name: 'Sports Sipper Bottle', price: 245 },
          { name: 'Tritan Everyday Bottle', price: 399 },
          { name: 'Steel Gym Bottle', price: 499 },
        ],
      },
      {
        slug: 'insulated-bottles-flasks',
        name: 'Insulated Bottles & Flasks',
        description:
          'Double-wall vacuum bottles and flasks that hold temperature through the working day.',
        imageKey: 'insulated-bottles-flasks',
        kind: 'merch',
        sizes: ['500 ml', '700 ml', '900 ml', '1 L'],
        products: [
          { name: 'Trek Insulated Bottle 700ml', price: 1099, labels: ['Best Seller'] },
          { name: 'Gosport Black Bottle 900ml', price: 1299 },
          { name: 'Vacuum Insulated Water Bottle', price: 899, labels: ['Popular'] },
          { name: 'Copper Vacuum Flask', price: 1499 },
          { name: 'Travel Coffee Flask', price: 1199 },
          { name: 'Wide Mouth Insulated Flask', price: 1349 },
        ],
      },
      {
        slug: 'tumblers-quenchers',
        name: 'Tumblers & Quenchers',
        description:
          'Handle-and-straw tumblers and quenchers in the sizes people actually keep on their desk.',
        imageKey: 'tumblers-quenchers',
        kind: 'merch',
        sizes: ['500 ml', '900 ml', '1.2 L', '1.5 L'],
        products: [
          { name: 'Vacuum Insulated Steel Tumbler with Handle and Straw', price: 1499, labels: ['Popular'] },
          { name: 'Mug Tumbler with Handle and Straw Lid 1500ml', price: 1699 },
          { name: 'Oasis 500ml Mug', price: 799 },
          { name: 'Quencher Travel Tumbler', price: 1299, labels: ['Best Seller'] },
          { name: 'Ceramic Coated Tumbler', price: 999 },
        ],
      },
      {
        slug: 'mugs-travel-mugs',
        name: 'Mugs & Travel Mugs',
        description:
          'Ceramic, metal and spill-proof mugs, sublimated or engraved to your artwork.',
        imageKey: 'mugs-travel-mugs',
        kind: 'merch',
        sizes: ['11 oz', '15 oz'],
        products: [
          { name: 'Classic Ceramic Mug', price: 249, labels: ['Best Seller'] },
          { name: 'Magic Heat Reveal Mug', price: 449, labels: ['Popular'] },
          { name: 'Stainless Steel Travel Mug', price: 699 },
          { name: 'Spill Proof Coffee Mug', price: 599 },
          { name: 'Bone China Mug', price: 549 },
          { name: 'Enamel Camp Mug', price: 399 },
          { name: 'Double Wall Glass Mug', price: 649 },
        ],
      },
      {
        slug: 'glass-bottles',
        name: 'Glass Bottles',
        description:
          'Borosilicate glass bottles and tumblers with protective silicone sleeves.',
        imageKey: 'glass-bottles',
        kind: 'merch',
        sizes: ['500 ml', '750 ml'],
        products: [
          { name: 'Sleek Glass Tumbler', price: 549 },
          { name: 'Borosilicate Glass Bottle with Silicone Sleeve', price: 899, labels: ['Popular'] },
          { name: 'Signature Glass Bottle 750ml', price: 999 },
          { name: 'Infuser Glass Bottle', price: 849 },
        ],
      },
      {
        slug: 'lunch-boxes',
        name: 'Lunch Boxes',
        description:
          'Microwave-safe glass and steel tiffins in single and multi-compartment sets.',
        imageKey: 'lunch-boxes',
        kind: 'merch',
        products: [
          { name: 'Microwave Safe 2pc Glass Lunch Box', price: 899, labels: ['Best Seller'] },
          { name: 'FoodSafe Glass Lunch Box Set of 4', price: 1499 },
          { name: 'FoodSafe Glass Lunch Box Set of 3', price: 1199, labels: ['Popular'] },
          { name: 'Stainless Steel Tiffin 3 Tier', price: 1099 },
          { name: 'Insulated Lunch Bag with Box', price: 1299 },
        ],
      },
    ],
  },
  {
    slug: 'marketing-materials',
    name: 'Marketing',
    navLabel: 'Marketing',
    description:
      'Signage, brochures, booklets and retail material that carry a campaign into the real world.',
    imageKey: 'flyers-brochures',
    categories: [
      {
        slug: 'signages',
        name: 'Signages',
        description:
          'Indoor signs, roll-up banners and event signage in weatherproof materials.',
        imageKey: 'signages',
        kind: 'print',
        sizes: ['2x5 ft', '3x6 ft', '4x8 ft', 'Custom'],
        products: [
          { name: 'Roll Up Standee Banner', price: 1899, labels: ['Best Seller'] },
          { name: 'Indoor Acrylic Sign', price: 2499 },
          { name: 'Flex Outdoor Banner', price: 899, labels: ['Popular'] },
          { name: 'Backdrop Banner with Stand', price: 4999 },
          { name: 'Reception Desk Signage', price: 3499 },
          { name: 'Directional Floor Sign', price: 1299 },
        ],
      },
      {
        slug: 'flyers-brochures',
        name: 'Flyers & Brochures',
        description:
          'Flyers, leaflets, pamphlets and multi-fold brochures on coated and uncoated stocks.',
        imageKey: 'flyers-brochures',
        kind: 'print',
        sizes: ['A4', 'A5', 'A6', 'DL'],
        products: [
          { name: 'A5 Flyers', price: 899, qty: 500, labels: ['Best Seller'] },
          { name: 'A4 Flyers', price: 1299, qty: 500 },
          { name: 'Bi-Fold Brochures', price: 2199, qty: 250, labels: ['Popular'] },
          { name: 'Tri-Fold Brochures', price: 2499, qty: 250 },
          { name: 'Z-Fold Leaflets', price: 2099, qty: 250 },
          { name: 'Product Catalogue', price: 4999, qty: 100 },
        ],
      },
      {
        slug: 'booklets',
        name: 'Booklets',
        description:
          'Saddle-stitched and perfect-bound booklets in portrait and landscape formats.',
        imageKey: 'booklets',
        kind: 'print',
        sizes: ['A4 Portrait', 'A4 Landscape', 'A5 Portrait', 'A5 Landscape'],
        products: [
          { name: 'A4 Portrait Booklets', price: 3499, qty: 100, labels: ['Popular'] },
          { name: 'A4 Landscape Booklets', price: 3699, qty: 100 },
          { name: 'A5 Portrait Booklets', price: 2499, qty: 100 },
          { name: 'Annual Report Booklet', price: 5999, qty: 100 },
        ],
      },
      {
        slug: 'retail-advertising',
        name: 'Retail Advertising Material',
        description:
          'Danglers, wobblers, tent cards and shelf strips for in-store campaigns.',
        imageKey: 'retail-advertising',
        kind: 'print',
        products: [
          { name: 'Danglers', price: 1199, qty: 100, labels: ['Popular'] },
          { name: 'Wobblers', price: 999, qty: 100 },
          { name: 'Tent Cards', price: 1499, qty: 100, labels: ['Best Seller'] },
          { name: 'Shelf Strips', price: 899, qty: 100 },
        ],
      },
      {
        slug: 'promotional-bags',
        name: 'Promotional Bags',
        description:
          'Shopping bags, takeaway bags and eco paper bags printed with your identity.',
        imageKey: 'promotional-bags',
        kind: 'print',
        sizes: ['Small', 'Medium', 'Large'],
        products: [
          { name: 'Black Shopping Bag', price: 1899, qty: 100, labels: ['Popular'] },
          { name: 'Eco-Friendly Paper Bag', price: 1499, qty: 100, labels: ['Best Seller'] },
          { name: 'Takeaway Paper Bags', price: 1299, qty: 100 },
          { name: 'Laminated Carry Bag', price: 2199, qty: 100 },
          { name: 'Rope Handle Gift Bag', price: 2499, qty: 100 },
        ],
      },
      {
        slug: 'marketing-giveaways',
        name: 'Marketing Giveaways',
        description:
          'Wristbands, fridge magnets, badges and the small giveaways that travel furthest.',
        imageKey: 'marketing-giveaways',
        kind: 'merch',
        products: [
          { name: 'Silicone Wrist Bands', price: 39, labels: ['Popular'] },
          { name: 'Customized Fridge Magnet', price: 59 },
          { name: 'Round Badges', price: 29, labels: ['Best Seller'] },
          { name: 'Metal Keychain', price: 149 },
          { name: 'Acrylic Keychain', price: 79 },
          { name: 'Lapel Pin', price: 189 },
        ],
      },
    ],
  },
  {
    slug: 'gadgets-accessories',
    name: 'Gadgets and Accessories',
    navLabel: 'Gadgets and Accessories',
    description:
      'Power banks, audio, smart devices and desk tech — branded for gifting and onboarding kits.',
    imageKey: 'power-banks-chargers',
    categories: [
      {
        slug: 'power-banks-chargers',
        name: 'Power Banks & Chargers',
        description:
          'Fast-charge power banks, wireless pads and multi-port chargers.',
        imageKey: 'power-banks-chargers',
        kind: 'merch',
        sizes: ['5000 mAh', '10000 mAh', '20000 mAh'],
        products: [
          { name: '10000mAh Slim Power Bank', price: 1299, labels: ['Best Seller'] },
          { name: '20000mAh Fast Charge Power Bank', price: 1999 },
          { name: 'Wireless Charging Pad', price: 899, labels: ['Popular'] },
          { name: 'Magnetic Power Bank', price: 1699 },
          { name: 'Multi-Port Travel Charger', price: 1199 },
          { name: 'Solar Power Bank', price: 2199 },
        ],
      },
      {
        slug: 'appliances',
        name: 'Appliances',
        description:
          'Compact home and personal appliances that work as premium gifting.',
        imageKey: 'appliances',
        kind: 'merch',
        products: [
          { name: 'Electric Chopper', price: 1899, labels: ['Popular'] },
          { name: 'Nonstick Pan Set', price: 2099 },
          { name: 'Sandwich Maker', price: 1699 },
          { name: 'Handheld Garment Steamer', price: 2299 },
          { name: 'Electric Kettle 1.5L', price: 1499 },
        ],
      },
      {
        slug: 'laptop-accessories',
        name: 'Laptop Accessories',
        description:
          'Stands, docks and wireless peripherals for hybrid work setups.',
        imageKey: 'laptop-accessories',
        kind: 'merch',
        products: [
          { name: 'Aluminium Laptop Stand', price: 1299, labels: ['Best Seller'] },
          { name: 'Chicklet Wireless Keyboard', price: 1499 },
          { name: 'USB-C Docking Hub', price: 2299, labels: ['Popular'] },
          { name: 'Foldable Laptop Riser', price: 899 },
        ],
      },
      {
        slug: 'earbuds-headphones',
        name: 'Earbuds & Headphones',
        description:
          'True wireless earbuds and over-ear headphones for gifting and joining kits.',
        imageKey: 'earbuds-headphones',
        kind: 'merch',
        products: [
          { name: 'True Wireless Earbuds', price: 1799, labels: ['Best Seller'] },
          { name: 'ANC Over-Ear Headphones', price: 3499, labels: ['Popular'] },
          { name: 'Neckband Bluetooth Earphones', price: 1199 },
          { name: 'Sports Wireless Earbuds', price: 1599 },
          { name: 'Studio Wired Headphones', price: 2199 },
        ],
      },
      {
        slug: 'bluetooth-speakers',
        name: 'Bluetooth Speakers',
        description:
          'Portable and desk speakers, from pocket size to karaoke-capable.',
        imageKey: 'bluetooth-speakers',
        kind: 'merch',
        products: [
          { name: 'Retro Karaoke Speaker with Mic', price: 2999, labels: ['Popular'] },
          { name: 'Multifunctional Wireless Speaker', price: 1899 },
          { name: 'Ambient Digital Clock Speaker', price: 2299, labels: ['Best Seller'] },
          { name: 'Pocket Bluetooth Speaker', price: 999 },
          { name: 'Outdoor Waterproof Speaker', price: 2499 },
        ],
      },
      {
        slug: 'desk-gadgets',
        name: 'Desk Gadgets',
        description:
          'Lamps, wireless chargers and desk pieces that combine utility with branding.',
        imageKey: 'desk-gadgets',
        kind: 'merch',
        products: [
          { name: 'Round Lamp with Pen Stand', price: 1299, labels: ['Popular'] },
          { name: 'LED Desk Lamp with Wireless Charger', price: 1899 },
          { name: 'Digital Desk Clock', price: 899 },
          { name: 'Aroma Diffuser Desk Unit', price: 1499 },
        ],
      },
      {
        slug: 'smart-devices',
        name: 'Smart Devices',
        description:
          'Smart watches, bands and streaming devices for high-value gifting tiers.',
        imageKey: 'smart-devices',
        kind: 'merch',
        products: [
          { name: 'Smart Fitness Watch', price: 2999, labels: ['Best Seller'] },
          { name: 'Fitness Band', price: 1799 },
          { name: 'TV Streaming Stick', price: 2499, labels: ['Popular'] },
          { name: 'Smart Tracker Tag', price: 1299 },
        ],
      },
      {
        slug: 'vr-headsets',
        name: 'VR Headsets',
        description:
          'VR headsets with and without controllers, for experiential campaigns.',
        imageKey: 'vr-headsets',
        kind: 'merch',
        products: [
          { name: 'VR Headset without Remote Controller', price: 1499 },
          { name: 'VR Headset with Remote Controller', price: 1999, labels: ['Popular'] },
          { name: 'PlayVR Plus Headset', price: 2299 },
        ],
      },
      {
        slug: 'keyboards-mouse',
        name: 'Keyboards and Mouse',
        description:
          'Wireless keyboard and mouse combos for office rollouts and joining kits.',
        imageKey: 'keyboards-mouse',
        kind: 'merch',
        products: [
          { name: 'Wireless Keyboard and Mouse Combo', price: 1799, labels: ['Best Seller'] },
          { name: 'Slim Bluetooth Keyboard', price: 1499 },
          { name: 'Ergonomic Wireless Mouse', price: 899, labels: ['Popular'] },
          { name: 'Mechanical Compact Keyboard', price: 2999 },
        ],
      },
    ],
  },
  {
    slug: 'bags',
    name: 'Bags',
    navLabel: 'Bags',
    description:
      'Laptop bags, luggage, totes, wallets and tech organisers branded for teams and gifting.',
    imageKey: 'laptop-bags',
    categories: [
      {
        slug: 'tech-organisers',
        name: 'Tech Organisers',
        description:
          'Cable pouches and gadget organisers that keep a work bag in order.',
        imageKey: 'tech-organisers',
        kind: 'merch',
        products: [
          { name: 'Allen Tech Kit Organiser', price: 999, labels: ['Popular'] },
          { name: 'Mini Tech Pouch', price: 699 },
          { name: 'Waterproof Gadget Organizer Pouch', price: 899, labels: ['Best Seller'] },
          { name: 'Cable Roll Organiser', price: 549 },
        ],
      },
      {
        slug: 'laptop-bags',
        name: 'Laptop Bags',
        description:
          'Laptop backpacks and messenger bags with padded compartments, logo embroidered.',
        imageKey: 'laptop-bags',
        kind: 'merch',
        sizes: ['14 inch', '15.6 inch', '16 inch'],
        products: [
          { name: 'Intellect Laptop Backpack', price: 2499, labels: ['Best Seller'] },
          { name: 'Beam Laptop Backpack', price: 1999 },
          { name: 'Century Laptop Backpack', price: 2299, labels: ['Popular'] },
          { name: 'Anti-Theft Laptop Backpack', price: 2799 },
          { name: 'Canvas Laptop Messenger Bag', price: 1899 },
          { name: 'Executive Laptop Briefcase', price: 3299 },
        ],
      },
      {
        slug: 'laptop-sleeves',
        name: 'Laptop Sleeves',
        description:
          'Slim sleeves and messenger cases in leather, felt and canvas.',
        imageKey: 'laptop-sleeves',
        kind: 'merch',
        sizes: ['13 inch', '14 inch', '15.6 inch'],
        products: [
          { name: 'Oblique Laptop Messenger Bag', price: 1499, labels: ['Popular'] },
          { name: 'Metro Executive Laptop Messenger Bag', price: 1899 },
          { name: 'Xavier Laptop Sleeve', price: 999, labels: ['Best Seller'] },
          { name: 'Felt Laptop Sleeve', price: 749 },
        ],
      },
      {
        slug: 'luggage-bags',
        name: 'Luggage Bags',
        description:
          'Hard trolleys, duffle trolleys and cabin bags for milestone and long-service gifting.',
        imageKey: 'luggage-bags',
        kind: 'merch',
        sizes: ['Cabin', 'Medium', 'Large'],
        products: [
          { name: 'Hard Luggage Trolley Bag', price: 4999, labels: ['Best Seller'] },
          { name: 'Duffle Trolley Bag', price: 3499 },
          { name: 'Colorado Hard Luggage Trolley Bag', price: 5499, labels: ['Popular'] },
          { name: 'Cabin Size Trolley', price: 3999 },
          { name: 'Expandable Check-In Trolley', price: 6499 },
        ],
      },
      {
        slug: 'ladies-handbags',
        name: 'Ladies Handbags',
        description:
          'Denim, canvas and structured handbags for women, brandable on the panel.',
        imageKey: 'ladies-handbags',
        kind: 'merch',
        products: [
          { name: 'Floral Motif Denim Tote Bag', price: 1299, labels: ['Popular'] },
          { name: 'Pocket Tote Bag', price: 1099 },
          { name: 'Structured Shoulder Bag', price: 1899 },
          { name: 'Compact Sling Bag', price: 999 },
        ],
      },
      {
        slug: 'travel-accessories',
        name: 'Travel Accessories',
        description:
          'Gym bags, travel pouches and organisers for road-warrior teams.',
        imageKey: 'travel-accessories',
        kind: 'merch',
        products: [
          { name: 'Goofy Gym Bag', price: 1299 },
          { name: 'Jake Gym Bag', price: 1499, labels: ['Popular'] },
          { name: 'Digipouch Pro Travel Pouch', price: 899 },
          { name: 'Travel Toiletry Kit', price: 1099, labels: ['Best Seller'] },
          { name: 'Passport Holder and Organiser', price: 749 },
        ],
      },
      {
        slug: 'hiking-bags',
        name: 'Hiking Bags',
        description:
          'Rucksacks from 40L to 60L for offsites, treks and adventure programmes.',
        imageKey: 'hiking-bags',
        kind: 'merch',
        sizes: ['40 L', '50 L', '55 L', '60 L'],
        products: [
          { name: 'Wildquest 50L Travel Backpack', price: 3499, labels: ['Popular'] },
          { name: 'Alpine 55L Travel Backpack', price: 3999 },
          { name: 'Armor Pro 60L Backpack', price: 4499, labels: ['Best Seller'] },
          { name: 'Trail 40L Daypack', price: 2799 },
        ],
      },
      {
        slug: 'wallets',
        name: 'Wallets',
        description:
          'Leather card wallets and bifolds, embossed or foil-stamped with a name.',
        imageKey: 'wallets',
        kind: 'merch',
        products: [
          { name: 'Personalised Card Wallet', price: 699, labels: ['Popular'] },
          { name: 'Personalised Mens Wallet', price: 1099, labels: ['Best Seller'] },
          { name: 'Personalised Womens Wallet', price: 1199 },
          { name: 'RFID Blocking Card Holder', price: 849 },
          { name: 'Travel Passport Wallet', price: 999 },
        ],
      },
      {
        slug: 'tote-bags',
        name: 'Customised Tote Bags',
        description:
          'Canvas and jute totes for events, conferences and retail giveaways.',
        imageKey: 'tote-bags',
        kind: 'merch',
        sizes: ['Small', 'Medium', 'Large'],
        products: [
          { name: 'Long Strap Canvas Tote Bag', price: 349, labels: ['Best Seller'] },
          { name: 'Everyday Canvas Tote', price: 299, labels: ['Popular'] },
          { name: 'Box Base Canvas Tote', price: 449 },
          { name: 'Jute Bag with Logo', price: 249 },
          { name: 'Zippered Canvas Tote', price: 499 },
        ],
      },
    ],
  },
  {
    slug: 'kits-hampers',
    name: 'Kits & Hampers',
    navLabel: 'Kits & Hampers',
    description:
      'Employee joining kits, welcome kits and chocolate gifting, assembled and despatched by us.',
    imageKey: 'joining-kits',
    categories: [
      {
        slug: 'joining-kits',
        name: 'Joining Kits',
        description:
          'Onboarding kits that pair stationery, drinkware and tech in one branded box.',
        imageKey: 'joining-kits',
        kind: 'merch',
        products: [
          { name: 'Radiant Onboarding Kit', price: 1499, labels: ['Best Seller'] },
          { name: 'Zenith Onboarding Kit', price: 2299 },
          { name: 'Synergy Employee Joining Kit', price: 1899, labels: ['Popular'] },
          { name: 'Odyssey Onboarding Kit', price: 2799 },
          { name: 'Crescendo Employee Joining Kit', price: 1699 },
          { name: 'Coherent Onboarding Kit', price: 1299 },
        ],
      },
      {
        slug: 'chocolates',
        name: 'Chocolates',
        description:
          'Assorted chocolate boxes in branded sleeves for festive and client gifting.',
        imageKey: 'chocolates',
        kind: 'merch',
        products: [
          { name: 'Assorted Brittle Gift Box Pack of 8', price: 899, labels: ['Popular'] },
          { name: 'Premium Chocolate Box 4 Pieces', price: 249 },
          { name: 'Premium Chocolate Box 16 Pieces', price: 849, labels: ['Best Seller'] },
          { name: 'Premium Chocolate Box 8 Pieces', price: 449 },
          { name: 'Chocolate Moments Box 16 Pieces', price: 799 },
          { name: 'Chocolate Collection Box 24 Pieces', price: 1299 },
        ],
      },
    ],
  },
  {
    slug: 'awards-trophies',
    name: 'Awards & Trophies',
    navLabel: 'Awards & Trophies',
    description:
      'Trophies, mementos and certificates for recognition programmes and annual awards.',
    imageKey: 'trophies',
    categories: [
      {
        slug: 'trophies',
        name: 'Trophies',
        description:
          'Crystal, metal and acrylic trophies engraved with recipient names.',
        imageKey: 'trophies',
        kind: 'merch',
        sizes: ['Small', 'Medium', 'Large'],
        products: [
          { name: 'Crystal Star Trophy', price: 1299, labels: ['Best Seller'] },
          { name: 'Acrylic Achievement Trophy', price: 899, labels: ['Popular'] },
          { name: 'Metal Cup Trophy', price: 1499 },
          { name: 'Wooden Base Trophy', price: 1099 },
          { name: 'Glass Pillar Trophy', price: 1699 },
        ],
      },
      {
        slug: 'mementos-plaques',
        name: 'Momento & Plaque',
        description:
          'Wall plaques and desk mementos for long-service and milestone recognition.',
        imageKey: 'mementos-plaques',
        kind: 'merch',
        products: [
          { name: 'Engraved Wooden Plaque', price: 1199, labels: ['Popular'] },
          { name: 'Acrylic Wall Memento', price: 999 },
          { name: 'Metal Plated Memento', price: 1499 },
        ],
      },
      {
        slug: 'certificates',
        name: 'Certificates',
        description:
          'Printed certificates on textured stocks, with optional foil and frames.',
        imageKey: 'certificates',
        kind: 'print',
        sizes: ['A4', 'A3'],
        products: [
          { name: 'Appreciation Certificates', price: 899, qty: 50, labels: ['Best Seller'] },
          { name: 'Foil Stamped Certificates', price: 1499, qty: 50 },
          { name: 'Framed Certificate', price: 699 },
          { name: 'Training Completion Certificates', price: 799, qty: 50 },
        ],
      },
    ],
  },
  {
    slug: 'labels-stickers-packaging',
    name: 'Labels, Stickers & Packaging',
    navLabel: 'Labels, Stickers & Packaging',
    description:
      'Stickers, product labels, tags, paper bags, gift boxes and food packaging.',
    imageKey: 'stickers',
    categories: [
      {
        slug: 'stickers',
        name: 'Stickers',
        description:
          'Die-cut, sheet and roll stickers in vinyl, paper and transparent finishes.',
        imageKey: 'stickers',
        kind: 'print',
        sizes: ['Circle', 'Square', 'Rectangle', 'Die Cut'],
        products: [
          { name: 'Die Cut Vinyl Stickers', price: 799, qty: 100, labels: ['Best Seller'] },
          { name: 'Sheet Stickers', price: 599, qty: 100 },
          { name: 'Transparent Stickers', price: 899, qty: 100, labels: ['Popular'] },
          { name: 'Roll Stickers', price: 1299, qty: 500 },
          { name: 'Holographic Stickers', price: 1099, qty: 100 },
          { name: 'Bumper Stickers', price: 949, qty: 100 },
        ],
      },
      {
        slug: 'labels',
        name: 'Labels',
        description:
          'Product, bottle and shipping labels on adhesive stocks that survive handling.',
        imageKey: 'labels',
        kind: 'print',
        products: [
          { name: 'Product Labels', price: 899, qty: 250, labels: ['Best Seller'] },
          { name: 'Bottle Labels', price: 999, qty: 250 },
          { name: 'Waterproof Labels', price: 1199, qty: 250, labels: ['Popular'] },
          { name: 'Shipping Labels', price: 749, qty: 250 },
          { name: 'Barcode Labels', price: 699, qty: 250 },
        ],
      },
      {
        slug: 'tags',
        name: 'Tags',
        description:
          'Hang tags, price tags and name tags in card, kraft and plastic.',
        imageKey: 'tags',
        kind: 'print',
        products: [
          { name: 'Clothing Hang Tags', price: 899, qty: 250, labels: ['Popular'] },
          { name: 'Kraft Gift Tags', price: 599, qty: 250 },
          { name: 'Price Tags', price: 649, qty: 250 },
          { name: 'Luggage Name Tags', price: 149 },
        ],
      },
      {
        slug: 'paper-bags',
        name: 'Paper Bags',
        description:
          'Printed kraft and art-paper bags with rope or flat handles.',
        imageKey: 'paper-bags',
        kind: 'print',
        sizes: ['Small', 'Medium', 'Large'],
        products: [
          { name: 'Kraft Paper Bag', price: 1499, qty: 100, labels: ['Best Seller'] },
          { name: 'Laminated Paper Bag', price: 2199, qty: 100 },
          { name: 'Rope Handle Paper Bag', price: 2499, qty: 100, labels: ['Popular'] },
          { name: 'Flat Handle Paper Bag', price: 1699, qty: 100 },
        ],
      },
      {
        slug: 'gift-boxes',
        name: 'Gift Boxes',
        description:
          'Rigid, magnetic-close and corrugated boxes for hampers and product packs.',
        imageKey: 'gift-boxes',
        kind: 'print',
        sizes: ['Small', 'Medium', 'Large'],
        products: [
          { name: 'Rigid Gift Box', price: 2999, qty: 50, labels: ['Popular'] },
          { name: 'Magnetic Closure Box', price: 3999, qty: 50, labels: ['Best Seller'] },
          { name: 'Corrugated Mailer Box', price: 1899, qty: 50 },
          { name: 'Drawer Style Gift Box', price: 3499, qty: 50 },
          { name: 'Window Gift Box', price: 2599, qty: 50 },
        ],
      },
      {
        slug: 'food-packaging',
        name: 'Food Packaging Products',
        description:
          'Food-grade takeaway boxes, cups and sleeves printed with your branding.',
        imageKey: 'food-packaging',
        kind: 'print',
        products: [
          { name: 'Takeaway Food Box', price: 1699, qty: 100, labels: ['Best Seller'] },
          { name: 'Printed Paper Cups', price: 1299, qty: 100 },
          { name: 'Burger and Wrap Boxes', price: 1499, qty: 100, labels: ['Popular'] },
          { name: 'Pizza Boxes', price: 2199, qty: 100 },
          { name: 'Cup Sleeves', price: 899, qty: 100 },
        ],
      },
    ],
  },
  {
    slug: 'photo-products',
    name: 'Photo Products',
    navLabel: 'Photo Products',
    description:
      'Framed prints, canvas prints and photo gifts produced from your own images.',
    imageKey: 'framed-prints',
    categories: [
      {
        slug: 'framed-prints',
        name: 'Framed Prints',
        description:
          'Gallery-quality prints in wood and metal frames, ready to hang.',
        imageKey: 'framed-prints',
        kind: 'print',
        sizes: ['8x10 in', '12x16 in', '16x20 in', '24x36 in'],
        products: [
          { name: 'Wooden Framed Print', price: 1299, labels: ['Best Seller'] },
          { name: 'Metal Framed Print', price: 1599 },
          { name: 'Gallery Wall Set of 3', price: 3499, labels: ['Popular'] },
          { name: 'Certificate Frame', price: 699 },
        ],
      },
      {
        slug: 'photo-gifts',
        name: 'Photo Gifts',
        description:
          'Photo mugs, cushions, keepsakes and desk frames from your own pictures.',
        imageKey: 'photo-gifts',
        kind: 'merch',
        products: [
          { name: 'Personalised Photo Frame', price: 649, labels: ['Popular'] },
          { name: 'Photo Mug', price: 349 },
          { name: 'Photo Cushion', price: 799 },
        ],
      },
      {
        slug: 'canvas-prints',
        name: 'Canvas Prints',
        description:
          'Stretched canvas prints on wooden frames, in single panels and splits.',
        imageKey: 'canvas-prints',
        kind: 'print',
        sizes: ['12x16 in', '16x24 in', '24x36 in'],
        products: [
          { name: 'Stretched Canvas Print', price: 1499, labels: ['Best Seller'] },
          { name: 'Split Canvas Set of 3', price: 3299 },
          { name: 'Panoramic Canvas Print', price: 2299, labels: ['Popular'] },
          { name: 'Rolled Canvas Print', price: 999 },
        ],
      },
    ],
  },
  {
    slug: 'health-ergonomics',
    name: 'Health and Ergonomics',
    navLabel: 'Health and Ergonomics',
    description:
      'Ergonomic desk accessories and wellness kits for employee wellbeing programmes.',
    imageKey: 'ergonomic-accessories',
    categories: [
      {
        slug: 'ergonomic-accessories',
        name: 'Ergonomic Accessories',
        description:
          'Laptop risers, footrests, lumbar supports and wrist rests for desk comfort.',
        imageKey: 'ergonomic-accessories',
        kind: 'merch',
        products: [
          { name: 'Adjustable Footrest', price: 1499, labels: ['Popular'] },
          { name: 'Lumbar Support Cushion', price: 1299, labels: ['Best Seller'] },
          { name: 'Monitor Riser Stand', price: 1699 },
          { name: 'Gel Wrist Rest Set', price: 599 },
        ],
      },
      {
        slug: 'health-wellness',
        name: 'Health & Wellness',
        description:
          'Yoga mats, resistance kits and wellness sets for employee engagement.',
        imageKey: 'health-wellness',
        kind: 'merch',
        products: [
          { name: 'Yoga Mat with Carry Strap', price: 1299, labels: ['Popular'] },
          { name: 'Resistance Band Kit', price: 799 },
          { name: 'Dumbbell Pair 2kg', price: 999 },
          { name: 'Wellness Gift Set', price: 1899, labels: ['Best Seller'] },
        ],
      },
    ],
  },
  {
    slug: 'eco-friendly-items',
    name: 'Eco-Friendly Items',
    navLabel: 'Eco-Friendly Items',
    description:
      'Recycled, bamboo and plantable products for sustainability-led gifting.',
    imageKey: 'eco-friendly-items',
    categories: [
      {
        slug: 'eco-friendly-items',
        name: 'Eco-Friendly Items',
        description:
          'Bamboo, jute, kraft and recycled products that cut the footprint of a campaign.',
        imageKey: 'eco-friendly-items',
        kind: 'merch',
        products: [
          { name: 'Bamboo Toothbrush Pack of 4', price: 299, labels: ['Popular'] },
          { name: 'Jute Bag with Logo', price: 249, labels: ['Best Seller'] },
          { name: 'Rectangle Kraft Pad', price: 199 },
          { name: 'Kraft Pocket Wiro Pad', price: 249 },
          { name: 'Plantable Seed Pencils Set', price: 349 },
          { name: 'Bamboo Cutlery Set', price: 449 },
          { name: 'Recycled Paper Notebook', price: 229 },
          { name: 'Cork Coaster Set of 4', price: 399 },
        ],
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Derived exports
// ---------------------------------------------------------------------------

export const DEPARTMENTS: Department[] = DEPARTMENT_SEEDS.map((d) => ({
  slug: d.slug,
  name: d.name,
  navLabel: d.navLabel,
  description: d.description,
  imageKey: d.imageKey,
  categories: d.categories.map((c) => buildCategory(d.slug, c)),
}));

export const ALL_CATEGORIES: CatalogCategory[] = DEPARTMENTS.flatMap(
  (d) => d.categories,
);

export const ALL_PRODUCTS: CatalogProduct[] = ALL_CATEGORIES.flatMap(
  (c) => c.products,
);

const productBySlug = new Map(ALL_PRODUCTS.map((p) => [p.slug, p]));
const categoryBySlug = new Map(ALL_CATEGORIES.map((c) => [c.slug, c]));
const departmentBySlug = new Map(DEPARTMENTS.map((d) => [d.slug, d]));

export function getProduct(slug: string): CatalogProduct | undefined {
  return productBySlug.get(slug);
}

export function getCategory(slug: string): CatalogCategory | undefined {
  return categoryBySlug.get(slug);
}

export function getDepartment(slug: string): Department | undefined {
  return departmentBySlug.get(slug);
}

/** The department a category belongs to, for breadcrumbs. */
export function getDepartmentForCategory(
  categorySlug: string,
): Department | undefined {
  return DEPARTMENTS.find((d) =>
    d.categories.some((c) => c.slug === categorySlug),
  );
}

/** Hero/card image for a product at its assigned index. */
export function productImage(p: CatalogProduct, w = 600, h = 600): string {
  return img(IMAGES[p.imageKey][p.imageIndex % IMAGES[p.imageKey].length], w, h);
}

/** Full gallery for a product — its own photo first, then category siblings. */
export function productGallery(p: CatalogProduct, w = 800, h = 800): string[] {
  const set = IMAGES[p.imageKey];
  return Array.from({ length: Math.min(4, set.length) }, (_, i) =>
    img(set[(p.imageIndex + i) % set.length], w, h),
  );
}

export function categoryImage(c: CatalogCategory, w = 600, h = 450): string {
  return img(IMAGES[c.imageKey][0], w, h);
}

export function departmentImage(d: Department, w = 600, h = 450): string {
  return img(IMAGES[d.imageKey][0], w, h);
}

/** Cheapest price in a category, for "starting at" copy on listing pages. */
export function categoryFrom(c: CatalogCategory): number {
  return Math.min(...c.products.map((p) => p.price));
}

export function relatedProducts(p: CatalogProduct, limit = 4): CatalogProduct[] {
  const siblings = getCategory(p.category)?.products ?? [];
  const others = siblings.filter((s) => s.slug !== p.slug);
  if (others.length >= limit) return others.slice(0, limit);
  const filler = ALL_PRODUCTS.filter(
    (s) => s.slug !== p.slug && !others.includes(s),
  ).slice(0, limit - others.length);
  return [...others, ...filler];
}

export function searchProducts(query: string, limit = 24): CatalogProduct[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return ALL_PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q),
  ).slice(0, limit);
}

export const CATALOG_STATS = {
  departments: DEPARTMENTS.length,
  categories: ALL_CATEGORIES.length,
  products: ALL_PRODUCTS.length,
};
