export const SITE_NAME = 'PrintOrbit';
export const SITE_DESCRIPTION = 'Professional Printing Services for Businesses, Industries & Organizations';
export const SITE_URL = 'https://printorbit.in';

export const OFFICES = [
  {
    city: 'Dharamshala',
    state: 'Himachal Pradesh',
    address: 'Dharamshala, HP 176219',
    phone: '+91 98765 43210',
    email: 'dharamshala@printorbit.in',
  },
  {
    city: 'Faridabad',
    state: 'Haryana',
    address: 'Faridabad, Haryana 121001',
    phone: '+91 98765 43211',
    email: 'faridabad@printorbit.in',
    is_primary: true,
  },
];

export interface MegaMenuCategory {
  name: string;
  slug: string;
  icon: string;
  subcategories: { name: string; slug: string }[];
}

export interface MegaMenuColumn {
  title: string;
  icon: string;
  categories: MegaMenuCategory[];
}

export const MEGA_MENU_DATA: MegaMenuColumn[] = [
  {
    title: 'Marketing',
    icon: 'Megaphone',
    categories: [
      {
        name: 'Business Cards',
        slug: 'business-cards',
        icon: 'CreditCard',
        subcategories: [
          { name: 'Standard Cards', slug: 'standard-business-cards' },
          { name: 'Premium Cards', slug: 'premium-business-cards' },
          { name: 'Metal Cards', slug: 'metal-business-cards' },
          { name: 'Circular Cards', slug: 'circular-business-cards' },
          { name: 'Folded Cards', slug: 'folded-business-cards' },
        ],
      },
      {
        name: 'Flyers & Brochures',
        slug: 'flyers-brochures',
        icon: 'FileText',
        subcategories: [
          { name: 'A5 Flyers', slug: 'a5-flyers' },
          { name: 'A4 Flyers', slug: 'a4-flyers' },
          { name: 'Bi-Fold Brochures', slug: 'bi-fold-brochures' },
          { name: 'Tri-Fold Brochures', slug: 'tri-fold-brochures' },
          { name: 'DL Flyers', slug: 'dl-flyers' },
        ],
      },
      {
        name: 'Posters',
        slug: 'posters',
        icon: 'Image',
        subcategories: [
          { name: 'A3 Posters', slug: 'a3-posters' },
          { name: 'A2 Posters', slug: 'a2-posters' },
          { name: 'A1 Posters', slug: 'a1-posters' },
          { name: 'Custom Size', slug: 'custom-posters' },
        ],
      },
    ],
  },
  {
    title: 'Signage',
    icon: 'Flag',
    categories: [
      {
        name: 'Banners',
        slug: 'banners',
        icon: 'RectangleHorizontal',
        subcategories: [
          { name: 'Vinyl Banners', slug: 'vinyl-banners' },
          { name: 'Mesh Banners', slug: 'mesh-banners' },
          { name: 'Fabric Banners', slug: 'fabric-banners' },
          { name: 'Pull-Up Banners', slug: 'pull-up-banners' },
          { name: 'Backdrop Banners', slug: 'backdrop-banners' },
        ],
      },
      {
        name: 'Sign Boards',
        slug: 'sign-boards',
        icon: 'Square',
        subcategories: [
          { name: 'ACM Signs', slug: 'acm-signs' },
          { name: 'LED Signs', slug: 'led-signs' },
          { name: 'Acrylic Signs', slug: 'acrylic-signs' },
          { name: 'Wayfinding Signs', slug: 'wayfinding-signs' },
        ],
      },
      {
        name: 'Wall Graphics',
        slug: 'wall-graphics',
        icon: 'Layout',
        subcategories: [
          { name: 'Wall Murals', slug: 'wall-murals' },
          { name: 'Wallpaper', slug: 'custom-wallpaper' },
          { name: 'Window Graphics', slug: 'window-graphics' },
        ],
      },
    ],
  },
  {
    title: 'Packaging',
    icon: 'Package',
    categories: [
      {
        name: 'Custom Boxes',
        slug: 'custom-boxes',
        icon: 'Box',
        subcategories: [
          { name: 'Mailer Boxes', slug: 'mailer-boxes' },
          { name: 'Product Boxes', slug: 'product-boxes' },
          { name: 'Gift Boxes', slug: 'gift-boxes' },
          { name: 'Shipping Boxes', slug: 'shipping-boxes' },
          { name: 'Food Boxes', slug: 'food-boxes' },
        ],
      },
      {
        name: 'Labels & Stickers',
        slug: 'labels-stickers',
        icon: 'Tag',
        subcategories: [
          { name: 'Product Labels', slug: 'product-labels' },
          { name: 'Bumper Stickers', slug: 'bumper-stickers' },
          { name: 'Die-Cut Stickers', slug: 'die-cut-stickers' },
          { name: 'Roll Labels', slug: 'roll-labels' },
          { name: 'Clear Stickers', slug: 'clear-stickers' },
        ],
      },
      {
        name: 'Bags & Envelopes',
        slug: 'bags-envelopes',
        icon: 'ShoppingBag',
        subcategories: [
          { name: 'Paper Bags', slug: 'paper-bags' },
          { name: 'Tote Bags', slug: 'tote-bags' },
          { name: 'Gift Envelopes', slug: 'gift-envelopes' },
          { name: 'Document Envelopes', slug: 'document-envelopes' },
        ],
      },
    ],
  },
  {
    title: 'Stationery',
    icon: 'PenLine',
    categories: [
      {
        name: 'Letterheads',
        slug: 'letterheads',
        icon: 'FileText',
        subcategories: [
          { name: 'A4 Letterheads', slug: 'a4-letterheads' },
          { name: 'A5 Letterheads', slug: 'a5-letterheads' },
          { name: 'Corporate Letterheads', slug: 'corporate-letterheads' },
        ],
      },
      {
        name: 'Envelopes',
        slug: 'envelopes',
        icon: 'Mail',
        subcategories: [
          { name: 'DL Envelopes', slug: 'dl-envelopes' },
          { name: 'C4 Envelopes', slug: 'c4-envelopes' },
          { name: 'Branded Envelopes', slug: 'branded-envelopes' },
        ],
      },
      {
        name: 'Notepads & Pads',
        slug: 'notepads',
        icon: 'StickyNote',
        subcategories: [
          { name: 'Custom Notepads', slug: 'custom-notepads' },
          { name: 'Desk Pads', slug: 'desk-pads' },
          { name: 'Memo Pads', slug: 'memo-pads' },
        ],
      },
    ],
  },
  {
    title: 'Merchandise',
    icon: 'Shirt',
    categories: [
      {
        name: 'Apparel',
        slug: 'apparel',
        icon: 'Shirt',
        subcategories: [
          { name: 'T-Shirts', slug: 'custom-tshirts' },
          { name: 'Polo Shirts', slug: 'polo-shirts' },
          { name: 'Hoodies', slug: 'hoodies' },
          { name: 'Caps & Hats', slug: 'caps-hats' },
          { name: 'Uniforms', slug: 'uniforms' },
        ],
      },
      {
        name: 'Drinkware',
        slug: 'drinkware',
        icon: 'Coffee',
        subcategories: [
          { name: 'Mugs', slug: 'custom-mugs' },
          { name: 'Water Bottles', slug: 'water-bottles' },
          { name: 'Tumblers', slug: 'tumblers' },
          { name: 'Flasks', slug: 'flasks' },
        ],
      },
      {
        name: 'Accessories',
        slug: 'accessories',
        icon: 'Gift',
        subcategories: [
          { name: 'USB Drives', slug: 'usb-drives' },
          { name: 'Power Banks', slug: 'power-banks' },
          { name: 'Keychains', slug: 'keychains' },
          { name: 'Notebooks', slug: 'custom-notebooks' },
          { name: 'Mouse Pads', slug: 'mouse-pads' },
        ],
      },
    ],
  },
  {
    title: 'Photo Gifts',
    icon: 'Camera',
    categories: [
      {
        name: 'Photo Prints',
        slug: 'photo-prints',
        icon: 'Image',
        subcategories: [
          { name: 'Canvas Prints', slug: 'canvas-prints' },
          { name: 'Photo Books', slug: 'photo-books' },
          { name: 'Collage Prints', slug: 'collage-prints' },
          { name: 'Acrylic Prints', slug: 'acrylic-prints' },
        ],
      },
      {
        name: 'Personalized Gifts',
        slug: 'personalized-gifts',
        icon: 'Heart',
        subcategories: [
          { name: 'Photo Cushions', slug: 'photo-cushions' },
          { name: 'Photo Calendars', slug: 'photo-calendars' },
          { name: 'Custom Puzzles', slug: 'custom-puzzles' },
          { name: 'Photo Magnets', slug: 'photo-magnets' },
        ],
      },
    ],
  },
];

export const PRODUCT_CATEGORIES = [
  { name: 'Business Cards', slug: 'business-cards', description: 'Make a lasting first impression with premium business cards', icon: 'CreditCard' },
  { name: 'Flyers & Brochures', slug: 'flyers-brochures', description: 'Eye-catching flyers and brochures for marketing campaigns', icon: 'FileText' },
  { name: 'Banners & Posters', slug: 'banners-posters', description: 'Large format printing for events, stores, and exhibitions', icon: 'Image' },
  { name: 'Labels & Stickers', slug: 'labels-stickers', description: 'Custom labels and stickers for branding and packaging', icon: 'Tag' },
  { name: 'Custom Boxes', slug: 'custom-boxes', description: 'Premium packaging boxes for products and gifts', icon: 'Package' },
  { name: 'Apparel', slug: 'apparel', description: 'Custom t-shirts, caps, and promotional clothing', icon: 'Shirt' },
  { name: 'Photo Gifts', slug: 'photo-gifts', description: 'Personalized photo mugs, frames, and gifts', icon: 'Camera' },
  { name: 'Drinkware', slug: 'drinkware', description: 'Branded mugs, bottles, and drinkware', icon: 'Coffee' },
  { name: 'Letterheads', slug: 'letterheads', description: 'Professional letterheads and corporate stationery', icon: 'PenLine' },
  { name: 'Envelopes', slug: 'envelopes', description: 'Custom printed envelopes for business mail', icon: 'Mail' },
  { name: 'Sign Boards', slug: 'sign-boards', description: 'LED, ACM, and acrylic sign boards for businesses', icon: 'Square' },
  { name: 'Wall Graphics', slug: 'wall-graphics', description: 'Wall murals, wallpaper, and window graphics', icon: 'Layout' },
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

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Design Studio', href: '/design-studio' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Clients', href: '/clients' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
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
  'Business Cards', 'Flyers', 'Banners', 'Stickers', 'T-Shirts', 'Mugs', 'Letterheads', 'Packaging',
];

export const TESTIMONIALS = [
  { name: 'Priya Sharma', company: 'TechVista Solutions', content: 'PrintOrbit delivered exceptional quality business cards. The metallic finish exceeded our expectations.', rating: 5 },
  { name: 'Rahul Mehta', company: 'GreenLeaf Organics', content: 'Our product labels are stunning. The team understood our brand perfectly and delivered on time.', rating: 5 },
  { name: 'Anjali Patel', company: 'Sparkle Events', content: 'The banners for our exhibition were vibrant and high-quality. Will definitely order again.', rating: 5 },
  { name: 'Vikram Singh', company: 'Urban Eats', content: 'Custom packaging boxes transformed our brand perception. Customers love the unboxing experience.', rating: 5 },
];
