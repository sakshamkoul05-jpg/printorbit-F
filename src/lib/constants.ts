export const SITE_NAME = 'PrintOrbit';
export const SITE_DESCRIPTION = 'Professional Printing Services for Businesses, Industries & Organizations';
export const SITE_URL = 'https://printorbit.in';

export const OFFICES = [
  { city: 'Dharamshala', state: 'Himachal Pradesh', address: 'Dharamshala, HP 176219', phone: '+91 98765 43210', email: 'dharamshala@printorbit.in' },
  { city: 'Faridabad', state: 'Haryana', address: 'Faridabad, Haryana 121001', phone: '+91 98765 43211', email: 'faridabad@printorbit.in', is_primary: true },
];

export interface MegaMenuItem {
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export interface MegaMenuCategory {
  name: string;
  slug: string;
  items: MegaMenuItem[];
}

export interface MegaMenuPromo {
  title: string;
  description: string;
  href: string;
  bg: string;
}

export interface MegaMenuTab {
  id: string;
  label: string;
  icon: string;
  categories: MegaMenuCategory[];
  featured: MegaMenuItem[];
  bestsellers: MegaMenuItem[];
  newArrivals: MegaMenuItem[];
  trending: MegaMenuItem[];
  promo: MegaMenuPromo;
}

export const MEGA_MENU_DATA: MegaMenuTab[] = [
  {
    id: 'marketing',
    label: 'Marketing Materials',
    icon: 'Megaphone',
    categories: [
      {
        name: 'Business Cards',
        slug: 'business-cards',
        items: [
          { name: 'Standard Business Cards', slug: 'standard-business-cards', description: 'Classic cards, fast turnaround' },
          { name: 'Premium Business Cards', slug: 'premium-business-cards', description: 'Thick stock, luxe finishes' },
          { name: 'Metal Business Cards', slug: 'metal-business-cards', description: 'Stainless steel, unforgettable' },
          { name: 'Circular Business Cards', slug: 'circular-business-cards', description: 'Stand out from the stack' },
          { name: 'Folded Business Cards', slug: 'folded-business-cards', description: 'Extra space for info' },
          { name: 'Square Business Cards', slug: 'square-business-cards', description: 'Modern, compact format' },
          { name: 'Luxury Business Cards', slug: 'luxury-business-cards', description: 'Velvet, foil, emboss' },
          { name: 'Magnet Business Cards', slug: 'magnet-business-cards', description: 'Sticks to fridges' },
        ],
      },
      {
        name: 'Flyers',
        slug: 'flyers',
        items: [
          { name: 'A5 Flyers', slug: 'a5-flyers' },
          { name: 'A4 Flyers', slug: 'a4-flyers' },
          { name: 'A6 Flyers', slug: 'a6-flyers' },
          { name: 'DL Flyers', slug: 'dl-flyers' },
          { name: 'A3 Flyers', slug: 'a3-flyers' },
          { name: 'Leaflets', slug: 'leaflets' },
        ],
      },
      {
        name: 'Brochures',
        slug: 'brochures',
        items: [
          { name: 'Bi-Fold Brochures', slug: 'bi-fold-brochures' },
          { name: 'Tri-Fold Brochures', slug: 'tri-fold-brochures' },
          { name: 'Z-Fold Brochures', slug: 'z-fold-brochures' },
          { name: 'Gate Fold Brochures', slug: 'gate-fold-brochures' },
          { name: 'Booklet Brochures', slug: 'booklet-brochures' },
        ],
      },
      {
        name: 'Posters',
        slug: 'posters',
        items: [
          { name: 'A3 Posters', slug: 'a3-posters' },
          { name: 'A2 Posters', slug: 'a2-posters' },
          { name: 'A1 Posters', slug: 'a1-posters' },
          { name: 'A0 Posters', slug: 'a0-posters' },
          { name: 'Custom Size Posters', slug: 'custom-posters' },
        ],
      },
    ],
    featured: [
      { name: 'Premium Matte Cards', slug: 'premium-business-cards', description: '400gsm, soft touch' },
      { name: 'Tri-Fold Brochures', slug: 'tri-fold-brochures', description: 'Most popular format' },
      { name: 'A5 Flyers', slug: 'a5-flyers', description: 'Best for handouts' },
    ],
    bestsellers: [
      { name: 'Standard Business Cards', slug: 'standard-business-cards', description: '100+ orders daily' },
      { name: 'A4 Flyers', slug: 'a4-flyers', description: 'Full color both sides' },
      { name: 'Bi-Fold Brochures', slug: 'bi-fold-brochures', description: 'Corporate favorite' },
    ],
    newArrivals: [
      { name: 'Luxury Velvet Cards', slug: 'luxury-business-cards', description: 'NEW — Soft velvet finish' },
      { name: 'Magnet Cards', slug: 'magnet-business-cards', description: 'NEW — Sticks to surfaces' },
    ],
    trending: [
      { name: 'Metal Business Cards', slug: 'metal-business-cards', description: 'Trending — 200% more orders' },
      { name: 'Circular Cards', slug: 'circular-business-cards', description: 'Trending — Unique shape' },
    ],
    promo: {
      title: 'Design it yourself',
      description: 'Use our free online design tool to create your perfect marketing materials.',
      href: '/design-studio',
      bg: 'from-blue-600 to-blue-800',
    },
  },
  {
    id: 'signage',
    label: 'Signage & Banners',
    icon: 'Flag',
    categories: [
      {
        name: 'Banners',
        slug: 'banners',
        items: [
          { name: 'Vinyl Banners', slug: 'vinyl-banners' },
          { name: 'Mesh Banners', slug: 'mesh-banners' },
          { name: 'Fabric Banners', slug: 'fabric-banners' },
          { name: 'Pull-Up Banners', slug: 'pull-up-banners' },
          { name: 'Backdrop Banners', slug: 'backdrop-banners' },
          { name: 'Outdoor Banners', slug: 'outdoor-banners' },
        ],
      },
      {
        name: 'Posters',
        slug: 'large-posters',
        items: [
          { name: 'Foam Board Posters', slug: 'foam-board-posters' },
          { name: 'ACM Posters', slug: 'acm-posters' },
          { name: 'Coroplast Posters', slug: 'coroplast-posters' },
          { name: 'Acrylic Posters', slug: 'acrylic-posters' },
        ],
      },
      {
        name: 'Sign Boards',
        slug: 'sign-boards',
        items: [
          { name: 'ACM Signs', slug: 'acm-signs' },
          { name: 'LED Signs', slug: 'led-signs' },
          { name: 'Acrylic Signs', slug: 'acrylic-signs' },
          { name: 'Wayfinding Signs', slug: 'wayfinding-signs' },
          { name: 'Shop Signs', slug: 'shop-signs' },
        ],
      },
      {
        name: 'Wall & Window',
        slug: 'wall-window',
        items: [
          { name: 'Wall Murals', slug: 'wall-murals' },
          { name: 'Wallpaper', slug: 'custom-wallpaper' },
          { name: 'Window Film', slug: 'window-film' },
          { name: 'Window Graphics', slug: 'window-graphics' },
          { name: 'Wall Stickers', slug: 'wall-stickers' },
        ],
      },
    ],
    featured: [
      { name: 'Vinyl Banners', slug: 'vinyl-banners', description: 'Weather-proof' },
      { name: 'Pull-Up Banners', slug: 'pull-up-banners', description: 'Portable display' },
      { name: 'Wall Murals', slug: 'wall-murals', description: 'Transform spaces' },
    ],
    bestsellers: [
      { name: 'Vinyl Banners', slug: 'vinyl-banners', description: 'Most ordered' },
      { name: 'ACM Signs', slug: 'acm-signs', description: 'Premium signage' },
      { name: 'Window Graphics', slug: 'window-graphics', description: 'Storefront essential' },
    ],
    newArrivals: [
      { name: 'Fabric Banners', slug: 'fabric-banners', description: 'NEW — Premium textile' },
      { name: 'Window Film', slug: 'window-film', description: 'NEW — Privacy + branding' },
    ],
    trending: [
      { name: 'LED Signs', slug: 'led-signs', description: 'Trending — High visibility' },
      { name: 'Wall Murals', slug: 'wall-murals', description: 'Trending — Office makeovers' },
    ],
    promo: {
      title: 'Free banner mockup',
      description: 'See your design on a banner before you order. Free interactive preview.',
      href: '/design-studio',
      bg: 'from-emerald-600 to-teal-700',
    },
  },
  {
    id: 'packaging',
    label: 'Packaging',
    icon: 'Package',
    categories: [
      {
        name: 'Custom Boxes',
        slug: 'custom-boxes',
        items: [
          { name: 'Mailer Boxes', slug: 'mailer-boxes' },
          { name: 'Product Boxes', slug: 'product-boxes' },
          { name: 'Gift Boxes', slug: 'gift-boxes' },
          { name: 'Shipping Boxes', slug: 'shipping-boxes' },
          { name: 'Food Boxes', slug: 'food-boxes' },
          { name: 'Cosmetic Boxes', slug: 'cosmetic-boxes' },
          { name: 'Favor Boxes', slug: 'favor-boxes' },
        ],
      },
      {
        name: 'Labels & Stickers',
        slug: 'labels-stickers',
        items: [
          { name: 'Product Labels', slug: 'product-labels' },
          { name: 'Bumper Stickers', slug: 'bumper-stickers' },
          { name: 'Die-Cut Stickers', slug: 'die-cut-stickers' },
          { name: 'Roll Labels', slug: 'roll-labels' },
          { name: 'Clear Stickers', slug: 'clear-stickers' },
          { name: 'Holographic Stickers', slug: 'holographic-stickers' },
          { name: 'Foil Stickers', slug: 'foil-stickers' },
        ],
      },
      {
        name: 'Bags & Envelopes',
        slug: 'bags-envelopes',
        items: [
          { name: 'Paper Bags', slug: 'paper-bags' },
          { name: 'Tote Bags', slug: 'tote-bags' },
          { name: 'Gift Envelopes', slug: 'gift-envelopes' },
          { name: 'Document Envelopes', slug: 'document-envelopes' },
        ],
      },
      {
        name: 'Packaging Tape',
        slug: 'packaging-tape',
        items: [
          { name: 'Custom Tape', slug: 'custom-tape' },
          { name: 'Kraft Tape', slug: 'kraft-tape' },
        ],
      },
    ],
    featured: [
      { name: 'Mailer Boxes', slug: 'mailer-boxes', description: 'E-commerce essential' },
      { name: 'Product Labels', slug: 'product-labels', description: 'Professional branding' },
      { name: 'Custom Tape', slug: 'custom-tape', description: 'Branded packaging' },
    ],
    bestsellers: [
      { name: 'Mailer Boxes', slug: 'mailer-boxes', description: '#1 packaging choice' },
      { name: 'Die-Cut Stickers', slug: 'die-cut-stickers', description: 'Any shape' },
      { name: 'Product Labels', slug: 'product-labels', description: 'Roll or sheet' },
    ],
    newArrivals: [
      { name: 'Holographic Stickers', slug: 'holographic-stickers', description: 'NEW — Eye-catching' },
      { name: 'Cosmetic Boxes', slug: 'cosmetic-boxes', description: 'NEW — Premium unboxing' },
    ],
    trending: [
      { name: 'Foil Stickers', slug: 'foil-stickers', description: 'Trending — Metallic finish' },
      { name: 'Kraft Tape', slug: 'kraft-tape', description: 'Trending — Eco-friendly' },
    ],
    promo: {
      title: 'Custom packaging design',
      description: 'Our designers can create unique packaging that tells your brand story.',
      href: '/design-studio',
      bg: 'from-orange-500 to-red-600',
    },
  },
  {
    id: 'stationery',
    label: 'Stationery',
    icon: 'PenLine',
    categories: [
      {
        name: 'Letterheads',
        slug: 'letterheads',
        items: [
          { name: 'A4 Letterheads', slug: 'a4-letterheads' },
          { name: 'A5 Letterheads', slug: 'a5-letterheads' },
          { name: 'Letterhead Sets', slug: 'letterhead-sets' },
          { name: 'Corporate Letterheads', slug: 'corporate-letterheads' },
        ],
      },
      {
        name: 'Envelopes',
        slug: 'envelopes',
        items: [
          { name: 'DL Envelopes', slug: 'dl-envelopes' },
          { name: 'C4 Envelopes', slug: 'c4-envelopes' },
          { name: 'C5 Envelopes', slug: 'c5-envelopes' },
          { name: 'Branded Envelopes', slug: 'branded-envelopes' },
          { name: 'Window Envelopes', slug: 'window-envelopes' },
        ],
      },
      {
        name: 'Notepads & Pads',
        slug: 'notepads',
        items: [
          { name: 'Custom Notepads', slug: 'custom-notepads' },
          { name: 'Desk Pads', slug: 'desk-pads' },
          { name: 'Memo Pads', slug: 'memo-pads' },
          { name: 'Sticky Notes', slug: 'sticky-notes' },
        ],
      },
      {
        name: 'Presentation Folders',
        slug: 'folders',
        items: [
          { name: 'A4 Folders', slug: 'a4-folders' },
          { name: 'A5 Folders', slug: 'a5-folders' },
          { name: 'Pocket Folders', slug: 'pocket-folders' },
          { name: 'Laminated Folders', slug: 'laminated-folders' },
        ],
      },
    ],
    featured: [
      { name: 'A4 Letterheads', slug: 'a4-letterheads', description: 'Corporate essential' },
      { name: 'DL Envelopes', slug: 'dl-envelopes', description: 'Standard business' },
      { name: 'A4 Folders', slug: 'a4-folders', description: 'Professional presentations' },
    ],
    bestsellers: [
      { name: 'A4 Letterheads', slug: 'a4-letterheads', description: 'Most ordered' },
      { name: 'DL Envelopes', slug: 'dl-envelopes', description: 'Bulk discounts' },
      { name: 'Custom Notepads', slug: 'custom-notepads', description: 'Branded stationery' },
    ],
    newArrivals: [
      { name: 'Letterhead Sets', slug: 'letterhead-sets', description: 'NEW — Matching set' },
      { name: 'Sticky Notes', slug: 'sticky-notes', description: 'NEW — Custom printed' },
    ],
    trending: [
      { name: 'Laminated Folders', slug: 'laminated-folders', description: 'Trending — Premium feel' },
      { name: 'Desk Pads', slug: 'desk-pads', description: 'Trending — Office upgrade' },
    ],
    promo: {
      title: 'Business stationery bundles',
      description: 'Save 20% when you order letterheads + envelopes + folders together.',
      href: '/products',
      bg: 'from-violet-600 to-purple-700',
    },
  },
  {
    id: 'clothing',
    label: 'Clothing & Merch',
    icon: 'Shirt',
    categories: [
      {
        name: 'T-Shirts',
        slug: 'tshirts',
        items: [
          { name: 'Cotton T-Shirts', slug: 'cotton-tshirts' },
          { name: 'Polo Shirts', slug: 'polo-shirts' },
          { name: 'V-Neck T-Shirts', slug: 'vneck-tshirts' },
          { name: 'Long Sleeve T-Shirts', slug: 'longsleeve-tshirts' },
          { name: 'Tank Tops', slug: 'tank-tops' },
        ],
      },
      {
        name: 'Headwear',
        slug: 'headwear',
        items: [
          { name: 'Caps', slug: 'caps' },
          { name: 'Beanies', slug: 'beanies' },
          { name: 'Visors', slug: 'visors' },
        ],
      },
      {
        name: 'Outerwear',
        slug: 'outerwear',
        items: [
          { name: 'Hoodies', slug: 'hoodies' },
          { name: 'Jackets', slug: 'jackets' },
          { name: 'Zip Hoodies', slug: 'zip-hoodies' },
          { name: 'Sweatshirts', slug: 'sweatshirts' },
        ],
      },
      {
        name: 'Workwear',
        slug: 'workwear',
        items: [
          { name: 'Uniforms', slug: 'uniforms' },
          { name: 'Aprons', slug: 'aprons' },
          { name: 'Hi-Vis Vests', slug: 'hivis-vests' },
        ],
      },
    ],
    featured: [
      { name: 'Cotton T-Shirts', slug: 'cotton-tshirts', description: 'Premium 100% cotton' },
      { name: 'Caps', slug: 'caps', description: 'Custom embroidery' },
      { name: 'Hoodies', slug: 'hoodies', description: 'Fleece lined' },
    ],
    bestsellers: [
      { name: 'Cotton T-Shirts', slug: 'cotton-tshirts', description: '#1 seller' },
      { name: 'Polo Shirts', slug: 'polo-shirts', description: 'Corporate favorite' },
      { name: 'Caps', slug: 'caps', description: 'Bulk discounts' },
    ],
    newArrivals: [
      { name: 'V-Neck T-Shirts', slug: 'vneck-tshirts', description: 'NEW — Modern fit' },
      { name: 'Aprons', slug: 'aprons', description: 'NEW — Restaurant/hotel' },
    ],
    trending: [
      { name: 'Hoodies', slug: 'hoodies', description: 'Trending — Seasonal' },
      { name: 'Hi-Vis Vests', slug: 'hivis-vests', description: 'Trending — Safety wear' },
    ],
    promo: {
      title: 'Bulk t-shirt pricing',
      description: 'Order 100+ tees and save up to 35%. Perfect for events and teams.',
      href: '/products',
      bg: 'from-rose-500 to-pink-600',
    },
  },
  {
    id: 'gifts',
    label: 'Gifts & Mugs',
    icon: 'Gift',
    categories: [
      {
        name: 'Mugs & Drinkware',
        slug: 'mugs-drinkware',
        items: [
          { name: 'Ceramic Mugs', slug: 'ceramic-mugs' },
          { name: 'Magic Mugs', slug: 'magic-mugs' },
          { name: 'Travel Mugs', slug: 'travel-mugs' },
          { name: 'Water Bottles', slug: 'water-bottles' },
          { name: 'Tumblers', slug: 'tumblers' },
          { name: 'Flasks', slug: 'flasks' },
          { name: 'Wine Glasses', slug: 'wine-glasses' },
        ],
      },
      {
        name: 'Photo Gifts',
        slug: 'photo-gifts',
        items: [
          { name: 'Photo Books', slug: 'photo-books' },
          { name: 'Canvas Prints', slug: 'canvas-prints' },
          { name: 'Photo Cushions', slug: 'photo-cushions' },
          { name: 'Photo Calendars', slug: 'photo-calendars' },
          { name: 'Custom Puzzles', slug: 'custom-puzzles' },
          { name: 'Photo Magnets', slug: 'photo-magnets' },
          { name: 'Photo Keyrings', slug: 'photo-keyrings' },
        ],
      },
      {
        name: 'Tech Accessories',
        slug: 'tech-accessories',
        items: [
          { name: 'USB Drives', slug: 'usb-drives' },
          { name: 'Power Banks', slug: 'power-banks' },
          { name: 'Phone Cases', slug: 'phone-cases' },
          { name: 'Mouse Pads', slug: 'mouse-pads' },
          { name: 'Webcam Covers', slug: 'webcam-covers' },
        ],
      },
      {
        name: 'Bags & Accessories',
        slug: 'bags-accessories',
        items: [
          { name: 'Notebooks', slug: 'custom-notebooks' },
          { name: 'Keychains', slug: 'keychains' },
          { name: 'Pens', slug: 'pens' },
          { name: 'Lanyards', slug: 'lanyards' },
          { name: 'Wristbands', slug: 'wristbands' },
        ],
      },
    ],
    featured: [
      { name: 'Ceramic Mugs', slug: 'ceramic-mugs', description: 'Classic gift' },
      { name: 'Photo Books', slug: 'photo-books', description: 'Personalized' },
      { name: 'USB Drives', slug: 'usb-drives', description: 'Corporate gifting' },
    ],
    bestsellers: [
      { name: 'Ceramic Mugs', slug: 'ceramic-mugs', description: 'Most gifted' },
      { name: 'Magic Mugs', slug: 'magic-mugs', description: 'Heat reveal' },
      { name: 'Keychains', slug: 'keychains', description: 'Bulk promos' },
    ],
    newArrivals: [
      { name: 'Wine Glasses', slug: 'wine-glasses', description: 'NEW — Custom printed' },
      { name: 'Webcam Covers', slug: 'webcam-covers', description: 'NEW — Branded tech' },
    ],
    trending: [
      { name: 'Power Banks', slug: 'power-banks', description: 'Trending — High demand' },
      { name: 'Lanyards', slug: 'lanyards', description: 'Trending — Events & conferences' },
    ],
    promo: {
      title: 'Corporate gifting solutions',
      description: 'Bulk discounts on custom gifts. Perfect for Diwali, Christmas, and employee gifts.',
      href: '/corporate',
      bg: 'from-amber-500 to-orange-600',
    },
  },
];

export const PRODUCT_CATEGORIES = [
  { name: 'Business Cards', slug: 'business-cards', description: 'Make a lasting first impression', icon: 'CreditCard', count: '8 products' },
  { name: 'Flyers', slug: 'flyers', description: 'Eye-catching promotional flyers', icon: 'FileText', count: '6 products' },
  { name: 'Brochures', slug: 'brochures', description: 'Informative multi-fold brochures', icon: 'BookOpen', count: '5 products' },
  { name: 'Posters', slug: 'posters', description: 'Large format posters & prints', icon: 'Image', count: '5 products' },
  { name: 'Banners', slug: 'banners', description: 'Indoor & outdoor banners', icon: 'Flag', count: '6 products' },
  { name: 'Sign Boards', slug: 'sign-boards', description: 'Professional signage solutions', icon: 'Square', count: '5 products' },
  { name: 'Labels & Stickers', slug: 'labels-stickers', description: 'Custom stickers & labels', icon: 'Tag', count: '7 products' },
  { name: 'Custom Boxes', slug: 'custom-boxes', description: 'Premium packaging boxes', icon: 'Package', count: '7 products' },
  { name: 'Letterheads', slug: 'letterheads', description: 'Professional letterheads', icon: 'FileText', count: '4 products' },
  { name: 'Envelopes', slug: 'envelopes', description: 'Custom printed envelopes', icon: 'Mail', count: '5 products' },
  { name: 'T-Shirts', slug: 'tshirts', description: 'Custom printed t-shirts', icon: 'Shirt', count: '5 products' },
  { name: 'Mugs', slug: 'mugs-drinkware', description: 'Custom mugs & drinkware', icon: 'Coffee', count: '7 products' },
  { name: 'Hoodies', slug: 'hoodies', description: 'Custom hoodies & sweatshirts', icon: 'Shirt', count: '4 products' },
  { name: 'Caps', slug: 'caps', description: 'Custom caps & headwear', icon: 'Crown', count: '3 products' },
  { name: 'Notebooks', slug: 'custom-notebooks', description: 'Branded notebooks & journals', icon: 'BookOpen', count: '3 products' },
  { name: 'Photo Gifts', slug: 'photo-gifts', description: 'Personalized photo gifts', icon: 'Camera', count: '7 products' },
  { name: 'USB Drives', slug: 'usb-drives', description: 'Custom USB flash drives', icon: 'Usb', count: '3 products' },
  { name: 'Power Banks', slug: 'power-banks', description: 'Branded power banks', icon: 'Battery', count: '3 products' },
  { name: 'Tote Bags', slug: 'tote-bags', description: 'Custom tote bags', icon: 'ShoppingBag', count: '3 products' },
  { name: 'Wall & Window', slug: 'wall-window', description: 'Murals, wallpaper & graphics', icon: 'Layout', count: '5 products' },
];

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Design Studio', href: '/design-studio' },
  { label: 'Templates', href: '/templates' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export const HOW_IT_WORKS = [
  { step: 1, title: 'Choose Your Product', description: 'Browse our wide range of printing products and select what you need.' },
  { step: 2, title: 'Customize Design', description: 'Use our design studio or upload your own artwork.' },
  { step: 3, title: 'Get a Quote', description: 'Submit your requirements and receive a competitive quote.' },
  { step: 4, title: 'Fast Delivery', description: 'We print and deliver to your doorstep across India.' },
];

export const CLIENT_INDUSTRIES = [
  'IT & Software', 'Manufacturing', 'Healthcare', 'Education', 'Retail & E-commerce',
  'Real Estate', 'Hospitality', 'NGOs & Non-profits', 'Government', 'Automotive',
];

export const ORDER_STATUS_MAP: Record<string, { label: string; color: string }> = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  confirmed: { label: 'Confirmed', color: 'bg-blue-100 text-blue-800' },
  processing: { label: 'Processing', color: 'bg-indigo-100 text-indigo-800' },
  printing: { label: 'Printing', color: 'bg-purple-100 text-purple-800' },
  quality_check: { label: 'Quality Check', color: 'bg-amber-100 text-amber-800' },
  shipped: { label: 'Shipped', color: 'bg-cyan-100 text-cyan-800' },
  delivered: { label: 'Delivered', color: 'bg-green-100 text-green-800' },
};

export const QUOTE_STATUS_MAP: Record<string, { label: string; color: string }> = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  reviewing: { label: 'Under Review', color: 'bg-blue-100 text-blue-800' },
  approved: { label: 'Approved', color: 'bg-green-100 text-green-800' },
  rejected: { label: 'Rejected', color: 'bg-red-100 text-red-800' },
  completed: { label: 'Completed', color: 'bg-emerald-100 text-emerald-800' },
};

export const POPULAR_SEARCHES = [
  'Business Cards', 'Flyers', 'Brochures', 'Banners', 'Stickers', 'T-Shirts', 'Mugs', 'Letterheads', 'Packaging', 'Labels',
];

export const TESTIMONIALS = [
  { name: 'Priya Sharma', company: 'TechVista Solutions', content: 'PrintOrbit delivered exceptional quality business cards. The metallic finish exceeded our expectations.', rating: 5 },
  { name: 'Rahul Mehta', company: 'GreenLeaf Organics', content: 'Our product labels are stunning. The team understood our brand perfectly and delivered on time.', rating: 5 },
  { name: 'Anjali Patel', company: 'Sparkle Events', content: 'The banners for our exhibition were vibrant and high-quality. Will definitely order again.', rating: 5 },
  { name: 'Vikram Singh', company: 'Urban Eats', content: 'Custom packaging boxes transformed our brand perception. Customers love the unboxing experience.', rating: 5 },
];
