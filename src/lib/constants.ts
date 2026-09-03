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
}

export interface MegaMenuCategory {
  name: string;
  slug: string;
  items: MegaMenuItem[];
}

export interface MegaMenuTab {
  id: string;
  label: string;
  categories: MegaMenuCategory[];
}

export const MEGA_MENU_DATA: MegaMenuTab[] = [
  {
    id: 'gift-hampers',
    label: 'Gift Hampers',
    categories: [
      {
        name: 'Gift Hampers',
        slug: 'gift-hampers',
        items: [
          { name: 'Diwali Hampers', slug: 'diwali-hampers' },
          { name: 'Welcome Kits', slug: 'welcome-kits' },
          { name: 'Festival Gifts', slug: 'festival-gifts' },
          { name: 'Employee Gifts', slug: 'employee-gifts' },
        ],
      },
    ],
  },
  {
    id: 'visiting-cards',
    label: 'Visiting Cards & ID Cards',
    categories: [
      {
        name: 'Visiting Cards',
        slug: 'visiting-cards',
        items: [
          { name: 'Single Sided', slug: 'visiting-cards-single-sided' },
          { name: 'Front and Back', slug: 'visiting-cards-front-back' },
          { name: 'Sandwich', slug: 'visiting-cards-sandwich' },
          { name: 'Slim', slug: 'visiting-cards-slim' },
          { name: 'Folded', slug: 'visiting-cards-folded' },
          { name: 'Spot Laminated', slug: 'visiting-cards-spot-laminated' },
          { name: 'PVC', slug: 'visiting-cards-pvc' },
          { name: 'Non-Tearable', slug: 'visiting-cards-non-tearable' },
          { name: 'Recycled', slug: 'visiting-cards-recycled' },
          { name: 'Square', slug: 'visiting-cards-square' },
        ],
      },
      {
        name: 'ID Cards',
        slug: 'id-cards',
        items: [
          { name: 'Corporate ID Cards', slug: 'id-cards-corporate' },
          { name: 'Lanyards', slug: 'id-cards-lanyards' },
          { name: 'ID Card Holder', slug: 'id-card-holder' },
          { name: 'Name Badges', slug: 'id-cards-name-badges' },
          { name: 'Yoyo Holder', slug: 'id-cards-yoyo-holder' },
          { name: 'Hospital/Doctor ID', slug: 'id-cards-hospital' },
          { name: 'Student ID Cards', slug: 'id-cards-student' },
          { name: 'Event ID Cards', slug: 'id-cards-event' },
          { name: 'Membership Cards', slug: 'id-cards-membership' },
          { name: 'Visitor ID Cards', slug: 'id-cards-visitor' },
        ],
      },
      {
        name: 'Visiting Card Holders',
        slug: 'visiting-card-holders',
        items: [
          { name: 'Engraved Card Holders', slug: 'visiting-card-holders-engraved' },
          { name: 'Leather Card Holders', slug: 'visiting-card-holders-leather' },
          { name: 'Metal Plated Card Holders', slug: 'visiting-card-holders-metal' },
        ],
      },
    ],
  },
  {
    id: 'stationery',
    label: 'Stationery & Office Supplies',
    categories: [
      {
        name: 'Pens',
        slug: 'pens',
        items: [
          { name: 'Classic Pens', slug: 'pens-classic' },
          { name: 'Premium Pens', slug: 'pens-premium' },
          { name: 'Promotional Pens', slug: 'pens-promotional' },
        ],
      },
      {
        name: 'Letterheads & Envelopes',
        slug: 'letterheads-envelopes',
        items: [
          { name: 'A4 Letterheads', slug: 'letterheads-a4' },
          { name: 'A5 Letterheads', slug: 'letterheads-a5' },
          { name: 'Corporate Letterheads', slug: 'letterheads-corporate' },
          { name: 'DL Envelopes', slug: 'envelopes-dl' },
          { name: 'C4 Envelopes', slug: 'envelopes-c4' },
          { name: 'Branded Envelopes', slug: 'envelopes-branded' },
        ],
      },
      {
        name: 'Personal Stationery',
        slug: 'personal-stationery',
        items: [
          { name: 'Notepads', slug: 'personal-notepads' },
          { name: 'Memo Pads', slug: 'personal-memo-pads' },
          { name: 'Sticky Notes', slug: 'personal-sticky-notes' },
          { name: 'Note Cards', slug: 'personal-note-cards' },
        ],
      },
      {
        name: 'Diaries & Notebooks',
        slug: 'diaries-notebooks',
        items: [
          { name: 'Personalised Diaries', slug: 'diaries-personalised' },
          { name: 'A5 Diaries', slug: 'diaries-a5' },
          { name: 'Notebooks', slug: 'notebooks-custom' },
          { name: 'A4 Notebooks', slug: 'notebooks-a4' },
        ],
      },
      {
        name: 'Desk Accessories',
        slug: 'desk-accessories',
        items: [
          { name: 'Desk Pads', slug: 'desk-pads' },
          { name: 'Mouse Pads', slug: 'mouse-pads' },
          { name: 'Pen Holders', slug: 'pen-holders' },
          { name: 'Coasters', slug: 'coasters' },
        ],
      },
      {
        name: 'Calendars',
        slug: 'calendars',
        items: [
          { name: 'Desk Calendars', slug: 'calendars-desk' },
          { name: 'Wall Calendars', slug: 'calendars-wall' },
          { name: 'Flip Calendars', slug: 'calendars-flip' },
          { name: 'Poster Calendars', slug: 'calendars-poster' },
        ],
      },
      {
        name: 'Invitation & Greeting Cards',
        slug: 'invitation-greeting-cards',
        items: [
          { name: 'Wedding Invitations', slug: 'invitations-wedding' },
          { name: 'Birthday Invitations', slug: 'invitations-birthday' },
          { name: 'Corporate Invitations', slug: 'invitations-corporate' },
          { name: 'Greeting Cards', slug: 'greeting-cards' },
          { name: 'Thank You Cards', slug: 'thank-you-cards' },
        ],
      },
      {
        name: 'Stamps Files & Folders',
        slug: 'stamps-files-folders',
        items: [
          { name: 'Self Inking Stamps', slug: 'stamps-self-inking' },
          { name: 'Rubber Stamps', slug: 'stamps-rubber' },
          { name: 'Presentation Folders', slug: 'folders-presentation' },
          { name: 'Ring Binder Files', slug: 'files-ring-binder' },
          { name: 'Pocket Folders', slug: 'folders-pocket' },
        ],
      },
      {
        name: 'Other Stationery',
        slug: 'other-stationery',
        items: [
          { name: 'Bill Books', slug: 'bill-books' },
          { name: 'Invoice Books', slug: 'invoice-books' },
          { name: 'Lanyards', slug: 'lanyards-stationery' },
          { name: 'Certificates', slug: 'certificates' },
          { name: 'Cash Vouchers', slug: 'cash-vouchers' },
        ],
      },
    ],
  },
  {
    id: 'apparel',
    label: 'Apparel',
    categories: [
      {
        name: 'Polo T-Shirts',
        slug: 'polo-t-shirts',
        items: [
          { name: 'Cotton Polo T-Shirts', slug: 'polo-t-shirts-cotton' },
          { name: 'Premium Polo T-Shirts', slug: 'polo-t-shirts-premium' },
          { name: 'Embroidered Polo T-Shirts', slug: 'polo-t-shirts-embroidered' },
          { name: 'Bulk Polo T-Shirts', slug: 'polo-t-shirts-bulk' },
        ],
      },
      {
        name: 'T-Shirts',
        slug: 't-shirts',
        items: [
          { name: 'Cotton T-Shirts', slug: 't-shirts-cotton' },
          { name: 'V-Neck T-Shirts', slug: 't-shirts-vneck' },
          { name: 'Long Sleeve T-Shirts', slug: 't-shirts-long-sleeve' },
          { name: 'Tank Tops', slug: 't-shirts-tank-tops' },
          { name: 'Uniform T-Shirts', slug: 't-shirts-uniform' },
        ],
      },
      {
        name: 'Jackets & Hoodies',
        slug: 'jackets-hoodies',
        items: [
          { name: 'Hoodies', slug: 'hoodies' },
          { name: 'Zip Hoodies', slug: 'zip-hoodies' },
          { name: 'Jackets', slug: 'jackets' },
          { name: 'Sweatshirts', slug: 'sweatshirts' },
        ],
      },
      {
        name: 'Sportswear',
        slug: 'sportswear',
        items: [
          { name: 'Sports T-Shirts', slug: 'sportswear-t-shirts' },
          { name: 'Track Pants', slug: 'sportswear-track-pants' },
          { name: 'Sports Jerseys', slug: 'sportswear-jerseys' },
        ],
      },
      {
        name: 'Formal Shirts',
        slug: 'formal-shirts',
        items: [
          { name: 'Corporate Formal Shirts', slug: 'formal-shirts-corporate' },
          { name: 'Custom Formal Shirts', slug: 'formal-shirts-custom' },
        ],
      },
    ],
  },
  {
    id: 'corporate-gifts',
    label: 'Corporate Gifts',
    categories: [
      {
        name: 'Corporate Gifts',
        slug: 'corporate-gifts',
        items: [
          { name: 'Executive Gifts', slug: 'corporate-executive' },
          { name: 'Desk Accessories', slug: 'corporate-desk-accessories' },
          { name: 'Tech Gifts', slug: 'corporate-tech' },
          { name: 'Wellness Gifts', slug: 'corporate-wellness' },
        ],
      },
      {
        name: 'Diwali Gifts',
        slug: 'diwali-gifts',
        items: [
          { name: 'Diwali Gift Boxes', slug: 'diwali-gift-boxes' },
          { name: 'Sweet Hampers', slug: 'diwali-sweet-hampers' },
          { name: 'Corporate Diwali Gifts', slug: 'diwali-corporate' },
        ],
      },
      {
        name: 'Welcome Kits',
        slug: 'welcome-kits',
        items: [
          { name: 'Employee Welcome Kits', slug: 'welcome-kits-employee' },
          { name: 'Corporate Welcome Kits', slug: 'welcome-kits-corporate' },
          { name: 'Onboarding Kits', slug: 'welcome-kits-onboarding' },
        ],
      },
      {
        name: 'Employee Gifts',
        slug: 'employee-gifts',
        items: [
          { name: 'Work Anniversary Gifts', slug: 'employee-work-anniversary' },
          { name: 'Festival Gifts', slug: 'employee-festival' },
          { name: 'Achievement Gifts', slug: 'employee-achievement' },
          { name: 'Retirement Gifts', slug: 'employee-retirement' },
        ],
      },
    ],
  },
  {
    id: 'marketing',
    label: 'Marketing & Promotions',
    categories: [
      {
        name: 'Flyers',
        slug: 'flyers',
        items: [
          { name: 'A5 Flyers', slug: 'flyers-a5' },
          { name: 'A4 Flyers', slug: 'flyers-a4' },
          { name: 'A6 Flyers', slug: 'flyers-a6' },
          { name: 'DL Flyers', slug: 'flyers-dl' },
          { name: 'Leaflets', slug: 'flyers-leaflets' },
        ],
      },
      {
        name: 'Brochures',
        slug: 'brochures',
        items: [
          { name: 'Bi-Fold Brochures', slug: 'brochures-bi-fold' },
          { name: 'Tri-Fold Brochures', slug: 'brochures-tri-fold' },
          { name: 'Z-Fold Brochures', slug: 'brochures-z-fold' },
          { name: 'Booklet Brochures', slug: 'brochures-booklet' },
        ],
      },
      {
        name: 'Posters',
        slug: 'posters',
        items: [
          { name: 'A3 Posters', slug: 'posters-a3' },
          { name: 'A2 Posters', slug: 'posters-a2' },
          { name: 'A1 Posters', slug: 'posters-a1' },
          { name: 'A0 Posters', slug: 'posters-a0' },
          { name: 'Foam Board Posters', slug: 'posters-foam-board' },
        ],
      },
      {
        name: 'Banners',
        slug: 'banners',
        items: [
          { name: 'Vinyl Banners', slug: 'banners-vinyl' },
          { name: 'Mesh Banners', slug: 'banners-mesh' },
          { name: 'Fabric Banners', slug: 'banners-fabric' },
          { name: 'Pull-Up Banners', slug: 'banners-pull-up' },
          { name: 'Backdrop Banners', slug: 'banners-backdrop' },
        ],
      },
      {
        name: 'Standees',
        slug: 'standees',
        items: [
          { name: 'Foam Board Standees', slug: 'standees-foam-board' },
          { name: 'Tabletop Standees', slug: 'standees-tabletop' },
          { name: 'Pull-Up Standees', slug: 'standees-pull-up' },
        ],
      },
      {
        name: 'Marketing Materials',
        slug: 'marketing-materials',
        items: [
          { name: 'Presentation Folders', slug: 'marketing-presentation-folders' },
          { name: 'Postcards', slug: 'marketing-postcards' },
          { name: 'Loyalty Cards', slug: 'marketing-loyalty-cards' },
          { name: 'Booklets', slug: 'marketing-booklets' },
          { name: 'Menu Cards', slug: 'marketing-menu-cards' },
        ],
      },
    ],
  },
  {
    id: 'labels-packaging',
    label: 'Labels, Stickers & Packaging',
    categories: [
      {
        name: 'Labels',
        slug: 'labels',
        items: [
          { name: 'Product Labels', slug: 'labels-product' },
          { name: 'Return Address Labels', slug: 'labels-address' },
          { name: 'Iron-on Labels', slug: 'labels-iron-on' },
          { name: 'Transparent Labels', slug: 'labels-transparent' },
          { name: 'Shipping Labels', slug: 'labels-shipping' },
          { name: 'Industrial Labels', slug: 'labels-industrial' },
        ],
      },
      {
        name: 'Stickers',
        slug: 'stickers',
        items: [
          { name: 'Sheet Stickers', slug: 'stickers-sheet' },
          { name: 'Die-Cut Stickers', slug: 'stickers-die-cut' },
          { name: 'Clear Stickers', slug: 'stickers-clear' },
          { name: 'Holographic Stickers', slug: 'stickers-holographic' },
          { name: 'Foil Stickers', slug: 'stickers-foil' },
          { name: 'Dome Stickers', slug: 'stickers-dome' },
          { name: 'QR Code Stickers', slug: 'stickers-qr-code' },
        ],
      },
      {
        name: 'Custom Boxes',
        slug: 'custom-boxes',
        items: [
          { name: 'Mailer Boxes', slug: 'boxes-mailer' },
          { name: 'Product Boxes', slug: 'boxes-product' },
          { name: 'Gift Boxes', slug: 'boxes-gift' },
          { name: 'Tuck Top Boxes', slug: 'boxes-tuck-top' },
          { name: 'Lock Bottom Boxes', slug: 'boxes-lock-bottom' },
        ],
      },
      {
        name: 'Bags & Envelopes',
        slug: 'bags-envelopes',
        items: [
          { name: 'Paper Bags', slug: 'bags-paper' },
          { name: 'Tote Bags', slug: 'bags-tote' },
          { name: 'Courier Bags', slug: 'bags-courier' },
          { name: 'Gift Envelopes', slug: 'envelopes-gift' },
          { name: 'Carry Bags', slug: 'bags-carry' },
        ],
      },
      {
        name: 'Packaging Tape',
        slug: 'packaging-tape',
        items: [
          { name: 'Custom Packaging Tape', slug: 'packaging-tape-custom' },
          { name: 'Branded Packing Tape', slug: 'packaging-tape-branded' },
          { name: 'Kraft Tape', slug: 'packaging-tape-kraft' },
        ],
      },
    ],
  },
  {
    id: 'drinkware',
    label: 'Drinkware & Lunchboxes',
    categories: [
      {
        name: 'Water Bottles',
        slug: 'water-bottles',
        items: [
          { name: 'Plastic Water Bottles', slug: 'water-bottles-plastic' },
          { name: 'Steel Water Bottles', slug: 'water-bottles-steel' },
          { name: 'Glass Water Bottles', slug: 'water-bottles-glass' },
          { name: 'Filter Water Bottles', slug: 'water-bottles-filter' },
        ],
      },
      {
        name: 'Sippers',
        slug: 'sippers',
        items: [
          { name: 'Plastic Sippers', slug: 'sippers-plastic' },
          { name: 'Steel Sippers', slug: 'sippers-steel' },
          { name: 'Kids Sippers', slug: 'sippers-kids' },
        ],
      },
      {
        name: 'Lunch Boxes',
        slug: 'lunch-boxes',
        items: [
          { name: 'Steel Lunch Boxes', slug: 'lunch-boxes-steel' },
          { name: 'Plastic Lunch Boxes', slug: 'lunch-boxes-plastic' },
          { name: 'Insulated Lunch Boxes', slug: 'lunch-boxes-insulated' },
        ],
      },
      {
        name: 'Mugs',
        slug: 'mugs',
        items: [
          { name: 'Ceramic Mugs', slug: 'mugs-ceramic' },
          { name: 'Magic Mugs', slug: 'mugs-magic' },
          { name: 'Travel Mugs', slug: 'mugs-travel' },
          { name: 'Glass Mugs', slug: 'mugs-glass' },
        ],
      },
      {
        name: 'Tumblers',
        slug: 'tumblers',
        items: [
          { name: 'Steel Tumblers', slug: 'tumblers-steel' },
          { name: 'Plastic Tumblers', slug: 'tumblers-plastic' },
          { name: 'Insulated Tumblers', slug: 'tumblers-insulated' },
        ],
      },
    ],
  },
  {
    id: 'awards',
    label: 'Awards & Trophies',
    categories: [
      {
        name: 'Trophies',
        slug: 'trophies',
        items: [
          { name: 'Crystal Trophies', slug: 'trophies-crystal' },
          { name: 'Glass Trophies', slug: 'trophies-glass' },
          { name: 'Acrylic Trophies', slug: 'trophies-acrylic' },
          { name: 'Wooden Trophies', slug: 'trophies-wooden' },
        ],
      },
      {
        name: 'Plaques',
        slug: 'plaques',
        items: [
          { name: 'Wooden Plaques', slug: 'plaques-wooden' },
          { name: 'Acrylic Plaques', slug: 'plaques-acrylic' },
          { name: 'Metal Plaques', slug: 'plaques-metal' },
        ],
      },
      {
        name: 'Medals',
        slug: 'medals',
        items: [
          { name: 'Sports Medals', slug: 'medals-sports' },
          { name: 'Corporate Medals', slug: 'medals-corporate' },
          { name: 'Custom Medals', slug: 'medals-custom' },
        ],
      },
      {
        name: 'Certificates',
        slug: 'certificates',
        items: [
          { name: 'Certificate Frames', slug: 'certificates-frames' },
          { name: 'Printed Certificates', slug: 'certificates-printed' },
          { name: 'Achievement Certificates', slug: 'certificates-achievement' },
        ],
      },
    ],
  },
  {
    id: 'bags',
    label: 'Bags',
    categories: [
      {
        name: 'Tote Bags',
        slug: 'tote-bags',
        items: [
          { name: 'Cotton Tote Bags', slug: 'tote-bags-cotton' },
          { name: 'Canvas Tote Bags', slug: 'tote-bags-canvas' },
          { name: 'Non-Woven Tote Bags', slug: 'tote-bags-non-woven' },
          { name: 'Jute Tote Bags', slug: 'tote-bags-jute' },
        ],
      },
      {
        name: 'Backpacks',
        slug: 'backpacks',
        items: [
          { name: 'Corporate Backpacks', slug: 'backpacks-corporate' },
          { name: 'Laptop Backpacks', slug: 'backpacks-laptop' },
          { name: 'Travel Backpacks', slug: 'backpacks-travel' },
        ],
      },
      {
        name: 'Duffel Bags',
        slug: 'duffel-bags',
        items: [
          { name: 'Sports Duffel Bags', slug: 'duffel-bags-sports' },
          { name: 'Corporate Duffel Bags', slug: 'duffel-bags-corporate' },
          { name: 'Travel Duffel Bags', slug: 'duffel-bags-travel' },
        ],
      },
      {
        name: 'Laptop Bags',
        slug: 'laptop-bags',
        items: [
          { name: 'Laptop Sleeves', slug: 'laptop-bags-sleeves' },
          { name: 'Laptop Backpacks', slug: 'laptop-bags-backpacks' },
          { name: 'Laptop Messenger Bags', slug: 'laptop-bags-messenger' },
        ],
      },
    ],
  },
  {
    id: 'gadgets',
    label: 'Gadgets & Accessories',
    categories: [
      {
        name: 'Power Banks',
        slug: 'power-banks',
        items: [
          { name: 'Mini Power Banks', slug: 'power-banks-mini' },
          { name: 'Standard Power Banks', slug: 'power-banks-standard' },
          { name: 'Wireless Power Banks', slug: 'power-banks-wireless' },
        ],
      },
      {
        name: 'USB Drives',
        slug: 'usb-drives',
        items: [
          { name: 'Swivel USB Drives', slug: 'usb-drives-swivel' },
          { name: 'Card USB Drives', slug: 'usb-drives-card' },
          { name: 'Wooden USB Drives', slug: 'usb-drives-wooden' },
          { name: 'Metal USB Drives', slug: 'usb-drives-metal' },
        ],
      },
      {
        name: 'Phone Cases',
        slug: 'phone-cases',
        items: [
          { name: 'iPhone Cases', slug: 'phone-cases-iphone' },
          { name: 'Android Cases', slug: 'phone-cases-android' },
          { name: 'Universal Phone Cases', slug: 'phone-cases-universal' },
        ],
      },
      {
        name: 'Mouse Pads',
        slug: 'mouse-pads',
        items: [
          { name: 'Standard Mouse Pads', slug: 'mouse-pads-standard' },
          { name: 'XL Mouse Pads', slug: 'mouse-pads-xl' },
          { name: 'Ergonomic Mouse Pads', slug: 'mouse-pads-ergonomic' },
        ],
      },
    ],
  },
  {
    id: 'umbrellas',
    label: 'Umbrellas & Raincoats',
    categories: [
      {
        name: 'Compact Umbrellas',
        slug: 'compact-umbrellas',
        items: [
          { name: 'Standard Compact Umbrellas', slug: 'compact-umbrellas-standard' },
          { name: 'Windproof Compact Umbrellas', slug: 'compact-umbrellas-windproof' },
          { name: 'Auto Open Umbrellas', slug: 'compact-umbrellas-auto' },
        ],
      },
      {
        name: 'Golf Umbrellas',
        slug: 'golf-umbrellas',
        items: [
          { name: 'Classic Golf Umbrellas', slug: 'golf-umbrellas-classic' },
          { name: 'Windproof Golf Umbrellas', slug: 'golf-umbrellas-windproof' },
          { name: 'Double Canopy Golf Umbrellas', slug: 'golf-umbrellas-double' },
        ],
      },
      {
        name: 'Raincoats',
        slug: 'raincoats',
        items: [
          { name: 'Poncho Raincoats', slug: 'raincoats-poncho' },
          { name: 'Jacket Raincoats', slug: 'raincoats-jacket' },
          { name: 'Kids Raincoats', slug: 'raincoats-kids' },
        ],
      },
    ],
  },
];

export const PRODUCT_CATEGORIES = [
  { name: 'Gift Hampers', slug: 'gift-hampers', description: 'Curated gift hampers for corporate gifting', icon: 'Gift', count: '4 products' },
  { name: 'Visiting Cards', slug: 'visiting-cards', description: 'Premium visiting cards for businesses', icon: 'CreditCard', count: '10 products' },
  { name: 'ID Cards', slug: 'id-cards', description: 'Corporate and event ID cards', icon: 'CreditCard', count: '10 products' },
  { name: 'Pens', slug: 'pens', description: 'Custom printed and engraved pens', icon: 'PenLine', count: '3 products' },
  { name: 'Letterheads', slug: 'letterheads', description: 'Professional letterheads for businesses', icon: 'FileText', count: '6 products' },
  { name: 'Envelopes', slug: 'envelopes', description: 'Custom printed envelopes', icon: 'Mail', count: '3 products' },
  { name: 'Diaries & Notebooks', slug: 'diaries-notebooks', description: 'Personalised diaries and notebooks', icon: 'BookOpen', count: '4 products' },
  { name: 'Calendars', slug: 'calendars', description: 'Custom printed calendars', icon: 'Calendar', count: '4 products' },
  { name: 'Polo T-Shirts', slug: 'polo-t-shirts', description: 'Custom polo t-shirts for corporates', icon: 'Shirt', count: '4 products' },
  { name: 'T-Shirts', slug: 't-shirts', description: 'Custom printed t-shirts', icon: 'Shirt', count: '5 products' },
  { name: 'Jackets & Hoodies', slug: 'jackets-hoodies', description: 'Custom jackets and hoodies', icon: 'Shirt', count: '4 products' },
  { name: 'Flyers', slug: 'flyers', description: 'Eye-catching promotional flyers', icon: 'FileText', count: '5 products' },
  { name: 'Brochures', slug: 'brochures', description: 'Informative multi-fold brochures', icon: 'BookOpen', count: '4 products' },
  { name: 'Posters', slug: 'posters', description: 'Large format posters and prints', icon: 'Image', count: '5 products' },
  { name: 'Banners', slug: 'banners', description: 'Indoor and outdoor banners', icon: 'Flag', count: '5 products' },
  { name: 'Stickers', slug: 'stickers', description: 'Custom stickers in any shape', icon: 'Tag', count: '7 products' },
  { name: 'Labels', slug: 'labels', description: 'Product and packaging labels', icon: 'Tag', count: '6 products' },
  { name: 'Custom Boxes', slug: 'custom-boxes', description: 'Premium packaging boxes', icon: 'Package', count: '5 products' },
  { name: 'Water Bottles', slug: 'water-bottles', description: 'Custom printed water bottles', icon: 'Coffee', count: '4 products' },
  { name: 'Mugs', slug: 'mugs', description: 'Custom printed mugs', icon: 'Coffee', count: '4 products' },
  { name: 'Trophies', slug: 'trophies', description: 'Custom trophies and awards', icon: 'Award', count: '4 products' },
  { name: 'Tote Bags', slug: 'tote-bags', description: 'Custom tote bags for promotions', icon: 'ShoppingBag', count: '4 products' },
  { name: 'Backpacks', slug: 'backpacks', description: 'Corporate backpacks', icon: 'ShoppingBag', count: '3 products' },
  { name: 'Power Banks', slug: 'power-banks', description: 'Branded power banks', icon: 'Battery', count: '3 products' },
  { name: 'USB Drives', slug: 'usb-drives', description: 'Custom USB flash drives', icon: 'Usb', count: '4 products' },
  { name: 'Umbrellas', slug: 'umbrellas', description: 'Custom printed umbrellas', icon: 'Umbrella', count: '3 products' },
  { name: 'Raincoats', slug: 'raincoats', description: 'Custom raincoats and ponchos', icon: 'Cloud', count: '3 products' },
];

export const NAV_LINKS = [
  { label: 'Gift Hampers', href: '/products?category=gift-hampers' },
  { label: 'Visiting Cards & ID Cards', href: '/products?category=visiting-cards' },
  { label: 'Stationery & Office Supplies', href: '/products?category=stationery' },
  { label: 'Apparel', href: '/products?category=apparel' },
  { label: 'Corporate Gifts', href: '/products?category=corporate-gifts' },
  { label: 'Marketing & Promotions', href: '/products?category=marketing' },
  { label: 'Labels, Stickers & Packaging', href: '/products?category=labels-packaging' },
  { label: 'Drinkware & Lunchboxes', href: '/products?category=drinkware' },
  { label: 'Awards & Trophies', href: '/products?category=awards' },
  { label: 'Bags', href: '/products?category=bags' },
  { label: 'Gadgets & Accessories', href: '/products?category=gadgets' },
  { label: 'Umbrellas & Raincoats', href: '/products?category=umbrellas' },
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
  'Visiting Cards', 'ID Cards', 'Pens', 'Letterheads', 'T-Shirts', 'Mugs', 'Flyers', 'Banners', 'Stickers', 'Gift Hampers',
];

export const TESTIMONIALS = [
  { name: 'Priya Sharma', company: 'TechVista Solutions', content: 'PrintOrbit delivered exceptional quality business cards. The metallic finish exceeded our expectations.', rating: 5 },
  { name: 'Rahul Mehta', company: 'GreenLeaf Organics', content: 'Our product labels are stunning. The team understood our brand perfectly and delivered on time.', rating: 5 },
  { name: 'Anjali Patel', company: 'Sparkle Events', content: 'The banners for our exhibition were vibrant and high-quality. Will definitely order again.', rating: 5 },
  { name: 'Vikram Singh', company: 'Urban Eats', content: 'Custom packaging boxes transformed our brand perception. Customers love the unboxing experience.', rating: 5 },
];
