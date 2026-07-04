import type { SceneDef } from './mockupEngine';

// Reliable Unsplash photo URLs for product mockups
const U = {
  // Business Cards - desk scenes
  bcDesk: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80',
  bcMarble: 'https://images.unsplash.com/photo-1618220179428-22790b461b2b?w=1400&q=80',
  bcHand: 'https://images.unsplash.com/photo-1560472355-536de1c6f351?w=1400&q=80',
  bcHolder: 'https://images.unsplash.com/photo-1497366750803-cb25e05f55a6?w=1400&q=80',
  bcFlatlay: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=1400&q=80',

  // T-Shirts
  tsModel: 'https://images.unsplash.com/photo-1572495641004-28421e3c0a21?w=1400&q=80',
  tsFlat: 'https://images.unsplash.com/photo-1562157873-818bc1926d68?w=1400&q=80',
  tsHanger: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1400&q=80',
  tsLife: 'https://images.unsplash.com/photo-1548372290-8d96b5c8c1f4?w=1400&q=80',

  // Mugs
  mugDesk: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1400&q=80',
  mugHand: 'https://images.unsplash.com/photo-1509042239860-f550ce710b4b?w=1400&q=80',
  mugShelf: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1400&q=80',

  // Posters
  posterGallery: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=1400&q=80',
  posterBrick: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1400&q=80',
  posterFrame: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80',

  // Banners
  bannerBuilding: 'https://images.unsplash.com/photo-1462045504115-6c1e7a1a2c2b?w=1400&q=80',
  bannerEvent: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=1400&q=80',
  bannerStore: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&q=80',

  // Stickers
  stickerLaptop: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1400&q=80',
  stickerBottle: 'https://images.unsplash.com/photo-1558089687-282d6d5ef9cc?w=1400&q=80',
  stickerNotebook: 'https://images.unsplash.com/photo-1531346680769-a1d0c1f24b0d?w=1400&q=80',

  // Packaging
  boxTable: 'https://images.unsplash.com/photo-1493957983989-65e5507ccf3f?w=1400&q=80',
  boxShelf: 'https://images.unsplash.com/photo-1490111718990-3d1e6e440e59?w=1400&q=80',

  // Books
  bookOpen: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1400&q=80',
  bookShelf: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=1400&q=80',

  // Flyers
  flyerHand: 'https://images.unsplash.com/photo-1512485694743-34c2f7d7d6b8?w=1400&q=80',
  flyerTable: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1400&q=80',
  flyerWall: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1400&q=80',

  // Caps
  capModel: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=1400&q=80',
  toteFlat: 'https://images.unsplash.com/photo-1598628478990-2e6aae0d614f?w=1400&q=80',
};

export const SCENES: SceneDef[] = [
  // ── BUSINESS CARDS ──
  {
    id: 'bc-desk',
    name: 'Office Desk Scene',
    product: 'Business Cards',
    photoUrl: U.bcDesk,
    description: 'Elegant wooden desk setup with card',
    corners: { tl: { x: 0.55, y: 0.55 }, tr: { x: 0.82, y: 0.52 }, bl: { x: 0.58, y: 0.72 }, br: { x: 0.85, y: 0.69 } },
    shadow: { angle: 45, distance: 0.5, blur: 4, opacity: 0.25 },
    textureOverlay: 'paper',
  },
  {
    id: 'bc-marble',
    name: 'Marble Surface',
    product: 'Business Cards',
    photoUrl: U.bcMarble,
    description: 'Luxury marble stone background',
    corners: { tl: { x: 0.3, y: 0.35 }, tr: { x: 0.6, y: 0.3 }, bl: { x: 0.35, y: 0.6 }, br: { x: 0.65, y: 0.55 } },
    shadow: { angle: 60, distance: 0.3, blur: 3, opacity: 0.2 },
    textureOverlay: 'paper',
  },
  {
    id: 'bc-hand',
    name: 'Held in Hand',
    product: 'Business Cards',
    photoUrl: U.bcHand,
    description: 'Natural hand holding business card',
    corners: { tl: { x: 0.38, y: 0.32 }, tr: { x: 0.62, y: 0.35 }, bl: { x: 0.36, y: 0.62 }, br: { x: 0.6, y: 0.65 } },
    shadow: { angle: 30, distance: 0.2, blur: 2, opacity: 0.15 },
    textureOverlay: 'paper',
  },
  {
    id: 'bc-holder',
    name: 'Leather Card Holder',
    product: 'Business Cards',
    photoUrl: U.bcHolder,
    description: 'Premium leather card holder on desk',
    corners: { tl: { x: 0.45, y: 0.25 }, tr: { x: 0.7, y: 0.22 }, bl: { x: 0.48, y: 0.55 }, br: { x: 0.73, y: 0.52 } },
    shadow: { angle: 45, distance: 0.4, blur: 3, opacity: 0.3 },
    textureOverlay: 'paper',
  },
  {
    id: 'bc-flatlay',
    name: 'Flat Lay with Props',
    product: 'Business Cards',
    photoUrl: U.bcFlatlay,
    description: 'Creative flat lay photography setup',
    corners: { tl: { x: 0.25, y: 0.4 }, tr: { x: 0.55, y: 0.38 }, bl: { x: 0.28, y: 0.7 }, br: { x: 0.58, y: 0.68 } },
    shadow: { angle: 90, distance: 0.1, blur: 1.5, opacity: 0.1 },
    textureOverlay: 'paper',
  },

  // ── T-SHIRTS ──
  {
    id: 'ts-model',
    name: 'Model Front View',
    product: 'T-Shirts',
    photoUrl: U.tsModel,
    description: 'Person wearing t-shirt front view',
    corners: { tl: { x: 0.25, y: 0.28 }, tr: { x: 0.75, y: 0.28 }, bl: { x: 0.25, y: 0.78 }, br: { x: 0.75, y: 0.78 } },
    shadow: { angle: 0, distance: 0, blur: 0, opacity: 0 },
    blendMode: 'multiply',
    textureOverlay: 'fabric',
  },
  {
    id: 'ts-flat',
    name: 'Flat Lay Folded',
    product: 'T-Shirts',
    photoUrl: U.tsFlat,
    description: 'Folded t-shirt on flat surface',
    corners: { tl: { x: 0.2, y: 0.15 }, tr: { x: 0.8, y: 0.15 }, bl: { x: 0.2, y: 0.7 }, br: { x: 0.8, y: 0.7 } },
    shadow: { angle: 60, distance: 0.2, blur: 2, opacity: 0.15 },
    blendMode: 'multiply',
    textureOverlay: 'fabric',
  },
  {
    id: 'ts-hanger',
    name: 'On Hanger',
    product: 'T-Shirts',
    photoUrl: U.tsHanger,
    description: 'T-shirt hanging on wooden hanger',
    corners: { tl: { x: 0.3, y: 0.25 }, tr: { x: 0.7, y: 0.25 }, bl: { x: 0.3, y: 0.8 }, br: { x: 0.7, y: 0.8 } },
    shadow: { angle: 0, distance: 0, blur: 0, opacity: 0 },
    blendMode: 'multiply',
    textureOverlay: 'fabric',
  },
  {
    id: 'ts-life',
    name: 'Lifestyle Casual',
    product: 'T-Shirts',
    photoUrl: U.tsLife,
    description: 'Casual lifestyle t-shirt shot',
    corners: { tl: { x: 0.2, y: 0.3 }, tr: { x: 0.8, y: 0.3 }, bl: { x: 0.2, y: 0.8 }, br: { x: 0.8, y: 0.8 } },
    shadow: { angle: 0, distance: 0, blur: 0, opacity: 0 },
    blendMode: 'multiply',
    textureOverlay: 'fabric',
  },

  // ── MUGS ──
  {
    id: 'mug-desk',
    name: 'Coffee on Desk',
    product: 'Mugs',
    photoUrl: U.mugDesk,
    description: 'Coffee mug on wooden desk',
    corners: { tl: { x: 0.35, y: 0.2 }, tr: { x: 0.65, y: 0.25 }, bl: { x: 0.3, y: 0.7 }, br: { x: 0.6, y: 0.75 } },
    shadow: { angle: 45, distance: 0.3, blur: 3, opacity: 0.2 },
    clipPath: 'ellipse',
    textureOverlay: 'ceramic',
  },
  {
    id: 'mug-hand',
    name: 'Held in Hand',
    product: 'Mugs',
    photoUrl: U.mugHand,
    description: 'Hand holding warm coffee mug',
    corners: { tl: { x: 0.35, y: 0.18 }, tr: { x: 0.65, y: 0.22 }, bl: { x: 0.32, y: 0.72 }, br: { x: 0.62, y: 0.75 } },
    shadow: { angle: 30, distance: 0.15, blur: 2, opacity: 0.15 },
    textureOverlay: 'ceramic',
  },
  {
    id: 'mug-shelf',
    name: 'Shelf Display',
    product: 'Mugs',
    photoUrl: U.mugShelf,
    description: 'Mugs displayed on wooden shelf',
    corners: { tl: { x: 0.1, y: 0.2 }, tr: { x: 0.4, y: 0.2 }, bl: { x: 0.1, y: 0.7 }, br: { x: 0.4, y: 0.7 } },
    shadow: { angle: 60, distance: 0.25, blur: 2.5, opacity: 0.2 },
    textureOverlay: 'ceramic',
  },

  // ── POSTERS ──
  {
    id: 'poster-gallery',
    name: 'Gallery Wall',
    product: 'Posters',
    photoUrl: U.posterGallery,
    description: 'Art gallery wall display',
    corners: { tl: { x: 0.2, y: 0.12 }, tr: { x: 0.55, y: 0.15 }, bl: { x: 0.18, y: 0.88 }, br: { x: 0.53, y: 0.9 } },
    shadow: { angle: 45, distance: 0.15, blur: 2, opacity: 0.12 },
    textureOverlay: 'paper',
  },
  {
    id: 'poster-brick',
    name: 'Brick Wall',
    product: 'Posters',
    photoUrl: U.posterBrick,
    description: 'Urban brick wall backdrop',
    corners: { tl: { x: 0.2, y: 0.1 }, tr: { x: 0.8, y: 0.15 }, bl: { x: 0.18, y: 0.85 }, br: { x: 0.78, y: 0.88 } },
    shadow: { angle: 45, distance: 0.2, blur: 3, opacity: 0.2 },
    textureOverlay: 'paper',
  },
  {
    id: 'poster-frame',
    name: 'Framed Print',
    product: 'Posters',
    photoUrl: U.posterFrame,
    description: 'Framed poster on wall',
    corners: { tl: { x: 0.22, y: 0.1 }, tr: { x: 0.78, y: 0.12 }, bl: { x: 0.2, y: 0.85 }, br: { x: 0.76, y: 0.87 } },
    shadow: { angle: 60, distance: 0.1, blur: 1.5, opacity: 0.1 },
    textureOverlay: 'paper',
  },

  // ── BANNERS ──
  {
    id: 'banner-building',
    name: 'Building Exterior',
    product: 'Banners',
    photoUrl: U.bannerBuilding,
    description: 'Large banner on building facade',
    corners: { tl: { x: 0.15, y: 0.2 }, tr: { x: 0.85, y: 0.25 }, bl: { x: 0.12, y: 0.75 }, br: { x: 0.82, y: 0.78 } },
    shadow: { angle: 45, distance: 0.3, blur: 4, opacity: 0.25 },
    textureOverlay: 'vinyl',
  },
  {
    id: 'banner-event',
    name: 'Event Stage',
    product: 'Banners',
    photoUrl: U.bannerEvent,
    description: 'Banner on event stage backdrop',
    corners: { tl: { x: 0.1, y: 0.1 }, tr: { x: 0.9, y: 0.1 }, bl: { x: 0.1, y: 0.8 }, br: { x: 0.9, y: 0.8 } },
    shadow: { angle: 0, distance: 0.1, blur: 1, opacity: 0.08 },
    textureOverlay: 'vinyl',
  },
  {
    id: 'banner-store',
    name: 'Storefront',
    product: 'Banners',
    photoUrl: U.bannerStore,
    description: 'Hanging banner on storefront',
    corners: { tl: { x: 0.25, y: 0.15 }, tr: { x: 0.75, y: 0.18 }, bl: { x: 0.23, y: 0.7 }, br: { x: 0.73, y: 0.72 } },
    shadow: { angle: 60, distance: 0.2, blur: 3, opacity: 0.2 },
    textureOverlay: 'vinyl',
  },

  // ── STICKERS ──
  {
    id: 'sticker-laptop',
    name: 'On Laptop',
    product: 'Stickers',
    photoUrl: U.stickerLaptop,
    description: 'Sticker placed on laptop lid',
    corners: { tl: { x: 0.55, y: 0.35 }, tr: { x: 0.75, y: 0.33 }, bl: { x: 0.57, y: 0.55 }, br: { x: 0.77, y: 0.53 } },
    shadow: { angle: 45, distance: 0.1, blur: 1, opacity: 0.1 },
    textureOverlay: 'vinyl',
  },
  {
    id: 'sticker-bottle',
    name: 'On Water Bottle',
    product: 'Stickers',
    photoUrl: U.stickerBottle,
    description: 'Sticker on reusable water bottle',
    corners: { tl: { x: 0.45, y: 0.3 }, tr: { x: 0.55, y: 0.3 }, bl: { x: 0.45, y: 0.6 }, br: { x: 0.55, y: 0.6 } },
    shadow: { angle: 30, distance: 0.08, blur: 0.5, opacity: 0.08 },
    textureOverlay: 'vinyl',
  },
  {
    id: 'sticker-notebook',
    name: 'On Notebook',
    product: 'Stickers',
    photoUrl: U.stickerNotebook,
    description: 'Sticker on leather notebook',
    corners: { tl: { x: 0.5, y: 0.25 }, tr: { x: 0.7, y: 0.22 }, bl: { x: 0.52, y: 0.45 }, br: { x: 0.72, y: 0.42 } },
    shadow: { angle: 45, distance: 0.1, blur: 1, opacity: 0.1 },
    textureOverlay: 'vinyl',
  },

  // ── PACKAGING ──
  {
    id: 'box-table',
    name: 'Product Box on Table',
    product: 'Packaging',
    photoUrl: U.boxTable,
    description: 'Packaging box on surface',
    corners: { tl: { x: 0.25, y: 0.2 }, tr: { x: 0.75, y: 0.25 }, bl: { x: 0.28, y: 0.8 }, br: { x: 0.78, y: 0.82 } },
    shadow: { angle: 45, distance: 0.4, blur: 5, opacity: 0.3 },
    textureOverlay: 'cardboard',
  },
  {
    id: 'box-shelf',
    name: 'Display Shelf',
    product: 'Packaging',
    photoUrl: U.boxShelf,
    description: 'Packaging displayed on retail shelf',
    corners: { tl: { x: 0.15, y: 0.1 }, tr: { x: 0.45, y: 0.12 }, bl: { x: 0.14, y: 0.7 }, br: { x: 0.44, y: 0.72 } },
    shadow: { angle: 60, distance: 0.2, blur: 2.5, opacity: 0.2 },
    textureOverlay: 'cardboard',
  },

  // ── BOOKS ──
  {
    id: 'book-open',
    name: 'Open Book Reading',
    product: 'Books & Magazines',
    photoUrl: U.bookOpen,
    description: 'Open book on wooden table',
    corners: { tl: { x: 0.1, y: 0.18 }, tr: { x: 0.9, y: 0.15 }, bl: { x: 0.12, y: 0.82 }, br: { x: 0.88, y: 0.78 } },
    shadow: { angle: 60, distance: 0.15, blur: 2, opacity: 0.12 },
    textureOverlay: 'paper',
  },
  {
    id: 'book-shelf',
    name: 'Bookshelf Display',
    product: 'Books & Magazines',
    photoUrl: U.bookShelf,
    description: 'Books arranged on wooden shelf',
    corners: { tl: { x: 0.05, y: 0.15 }, tr: { x: 0.25, y: 0.18 }, bl: { x: 0.04, y: 0.75 }, br: { x: 0.24, y: 0.78 } },
    shadow: { angle: 30, distance: 0.15, blur: 2, opacity: 0.15 },
    textureOverlay: 'paper',
  },

  // ── FLYERS ──
  {
    id: 'flyer-hand',
    name: 'Held in Hand',
    product: 'Flyers',
    photoUrl: U.flyerHand,
    description: 'Hand holding flyer',
    corners: { tl: { x: 0.25, y: 0.15 }, tr: { x: 0.75, y: 0.2 }, bl: { x: 0.22, y: 0.75 }, br: { x: 0.72, y: 0.78 } },
    shadow: { angle: 30, distance: 0.15, blur: 2, opacity: 0.12 },
    textureOverlay: 'paper',
  },
  {
    id: 'flyer-table',
    name: 'On Desk Layout',
    product: 'Flyers',
    photoUrl: U.flyerTable,
    description: 'Flyer on desk with accessories',
    corners: { tl: { x: 0.15, y: 0.3 }, tr: { x: 0.55, y: 0.32 }, bl: { x: 0.12, y: 0.75 }, br: { x: 0.52, y: 0.77 } },
    shadow: { angle: 60, distance: 0.2, blur: 2.5, opacity: 0.15 },
    textureOverlay: 'paper',
  },
  {
    id: 'flyer-wall',
    name: 'Pinned on Wall',
    product: 'Flyers',
    photoUrl: U.flyerWall,
    description: 'Flyer pinned on cork board',
    corners: { tl: { x: 0.55, y: 0.15 }, tr: { x: 0.85, y: 0.18 }, bl: { x: 0.53, y: 0.7 }, br: { x: 0.83, y: 0.72 } },
    shadow: { angle: 45, distance: 0.1, blur: 1.5, opacity: 0.1 },
    textureOverlay: 'paper',
  },

  // ── CAPS & TOTES ──
  {
    id: 'cap-model',
    name: 'Cap on Model',
    product: 'Caps & Totes',
    photoUrl: U.capModel,
    description: 'Person wearing cap front view',
    corners: { tl: { x: 0.3, y: 0.15 }, tr: { x: 0.7, y: 0.18 }, bl: { x: 0.28, y: 0.45 }, br: { x: 0.68, y: 0.48 } },
    shadow: { angle: 0, distance: 0, blur: 0, opacity: 0 },
    clipPath: 'curve',
    textureOverlay: 'fabric',
  },
  {
    id: 'tote-flat',
    name: 'Tote Bag Flat Lay',
    product: 'Caps & Totes',
    photoUrl: U.toteFlat,
    description: 'Canvas tote bag on surface',
    corners: { tl: { x: 0.15, y: 0.15 }, tr: { x: 0.85, y: 0.18 }, bl: { x: 0.14, y: 0.7 }, br: { x: 0.84, y: 0.72 } },
    shadow: { angle: 60, distance: 0.15, blur: 2, opacity: 0.12 },
    blendMode: 'multiply',
    textureOverlay: 'fabric',
  },
];
