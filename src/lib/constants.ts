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

export interface Product {
  slug: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  description: string;
  longDescription: string;
  basePrice: number;
  originalPrice: number;
  minQty: number;
  maxQty: number;
  rating: number;
  reviewCount: number;
  sku: string;
  materials: { name: string; price_modifier: number }[];
  sizes: { name: string; price_modifier: number }[];
  finishes: { name: string; price_modifier: number }[];
  paperTypes: string[];
  printAreas: string[];
  printTypes: string[];
  laminationTypes: string[];
  cornerTypes: string[];
  specs: Record<string, string>;
  delivery: string;
  features: string[];
  image: string;
}

export const ALL_PRODUCTS: Product[] = [
  {
    slug: 'standard-business-cards', name: 'Standard Business Cards', brand: 'PRINTSTOP', category: 'Business Cards', subcategory: 'Visiting Cards',
    description: 'Classic business cards printed on 300gsm cardstock.', longDescription: 'Our standard business cards are printed on 300gsm cardstock with full-color digital printing. Perfect for everyday networking and professional use. Affordable, fast turnaround, and available in matte or glossy finish. These cards feature sharp text and vibrant colors that leave a lasting impression on your clients and partners.',
    basePrice: 299, originalPrice: 450, minQty: 100, maxQty: 50000, rating: 4.6, reviewCount: 384, sku: 'BC-STD-001',
    materials: [{ name: '300gsm Cardstock', price_modifier: 0 }, { name: '350gsm Cardstock', price_modifier: 30 }],
    sizes: [{ name: 'Standard (85x55)', price_modifier: 0 }, { name: 'Slim (90x50)', price_modifier: 20 }],
    finishes: [{ name: 'Matte', price_modifier: 0 }, { name: 'Glossy', price_modifier: 15 }],
    paperTypes: ['300gsm Cardstock', '350gsm Cardstock', '400gsm Cardstock'],
    printAreas: ['Front & Back', 'Front Only'],
    printTypes: ['Digital Print', 'Offset Print'],
    laminationTypes: ['No Lamination', 'Matte Lamination', 'Glossy Lamination'],
    cornerTypes: ['Standard', 'Rounded'],
    specs: { 'Material': '300gsm Premium Cardstock', 'Print': 'Full Color Both Sides', 'Finish': 'Matte or Glossy', 'Size': '85 x 55 mm', 'Bleed': '3mm on all sides', 'File Format': 'PDF, AI, PSD, PNG' },
    delivery: '2-4 Business Days', features: ['Printed on premium 300gsm cardstock', 'Full color both sides', 'Matte or glossy finish options', 'Fast 2-4 day turnaround', 'Free design proof before printing'],
    image: '',
  },
  {
    slug: 'premium-matte-business-cards', name: 'Premium Matte Business Cards', brand: 'PRINTSTOP', category: 'Business Cards', subcategory: 'Visiting Cards',
    description: 'Thick 400gsm matte cards with a luxurious feel.', longDescription: 'Our premium matte business cards are printed on 400gsm cardstock with a soft-touch matte lamination. These cards make a lasting impression with their substantial weight and smooth finish. Ideal for professionals, executives, and anyone who wants to convey quality and sophistication.',
    basePrice: 499, originalPrice: 750, minQty: 100, maxQty: 10000, rating: 4.8, reviewCount: 247, sku: 'BC-PM-002',
    materials: [{ name: '350gsm', price_modifier: -50 }, { name: '400gsm', price_modifier: 0 }, { name: '450gsm', price_modifier: 50 }],
    sizes: [{ name: 'Standard', price_modifier: 0 }, { name: 'Slim', price_modifier: 20 }],
    finishes: [{ name: 'Matte', price_modifier: 0 }, { name: 'Glossy', price_modifier: 25 }, { name: 'Soft Touch', price_modifier: 75 }],
    paperTypes: ['350gsm Cardstock', '400gsm Cardstock', '450gsm Cardstock'],
    printAreas: ['Front & Back', 'Front Only'],
    printTypes: ['Digital Print', 'Offset Print'],
    laminationTypes: ['No Lamination', 'Matte Lamination', 'Soft Touch Lamination'],
    cornerTypes: ['Standard', 'Rounded'],
    specs: { 'Material': '400gsm Premium Cardstock', 'Print': 'Full Color Both Sides', 'Finish': 'Matte Lamination', 'Size': '85 x 55 mm', 'Bleed': '3mm on all sides', 'File Format': 'PDF, AI, PSD, PNG' },
    delivery: '3-5 Business Days', features: ['Premium 400gsm thick cardstock', 'Soft-touch matte lamination', 'Luxurious tactile feel', 'Perfect for professionals'],
    image: '',
  },
  {
    slug: 'a5-flyers', name: 'A5 Double-Sided Flyers', brand: 'PRINTSTOP', category: 'Marketing', subcategory: 'Flyers',
    description: 'Vibrant full-color A5 flyers on premium 170gsm art paper.', longDescription: 'Our A5 double-sided flyers are printed on premium 170gsm art paper with full-color digital printing. Perfect for promotions, events, and marketing campaigns. Available in matte or glossy finish.',
    basePrice: 299, originalPrice: 400, minQty: 100, maxQty: 50000, rating: 4.7, reviewCount: 412, sku: 'FL-A5-001',
    materials: [{ name: '130gsm Art', price_modifier: -30 }, { name: '170gsm Art', price_modifier: 0 }, { name: '250gsm Art', price_modifier: 60 }],
    sizes: [{ name: 'A5', price_modifier: 0 }, { name: 'A4', price_modifier: 80 }, { name: 'DL', price_modifier: -20 }],
    finishes: [{ name: 'Matte', price_modifier: 0 }, { name: 'Glossy', price_modifier: 15 }],
    paperTypes: ['130gsm Art Paper', '170gsm Art Paper', '250gsm Art Paper'],
    printAreas: ['Front & Back', 'Front Only'],
    printTypes: ['Digital Print', 'Offset Print'],
    laminationTypes: ['No Lamination', 'Matte Lamination', 'Glossy Lamination'],
    cornerTypes: ['Standard'],
    specs: { 'Paper': '170gsm Art Paper', 'Print': 'Full Color Both Sides', 'Finish': 'Matte Lamination', 'Sizes': 'A5, A4, DL', 'File Format': 'PDF, AI, PSD, PNG' },
    delivery: '2-4 Business Days', features: ['Premium 170gsm art paper', 'Full color both sides', 'Available in A5, A4, DL sizes', 'Matte or glossy finish'],
    image: '',
  },
  {
    slug: 'cotton-tshirts', name: 'Custom Cotton T-Shirts', brand: 'PRINTSTOP', category: 'Apparel', subcategory: 'T-Shirts',
    description: 'Premium 100% cotton t-shirts with custom print.', longDescription: 'Get custom printed t-shirts on premium 100% cotton fabric. Available in screen print, DTG (direct-to-garment), and sublimation printing. Perfect for events, teams, businesses, and promotional giveaways.',
    basePrice: 399, originalPrice: 600, minQty: 20, maxQty: 5000, rating: 4.5, reviewCount: 312, sku: 'AP-TS-001',
    materials: [{ name: '100% Cotton', price_modifier: 0 }, { name: 'Poly-Cotton', price_modifier: -30 }, { name: 'Organic Cotton', price_modifier: 50 }],
    sizes: [{ name: 'S', price_modifier: 0 }, { name: 'M', price_modifier: 0 }, { name: 'L', price_modifier: 0 }, { name: 'XL', price_modifier: 0 }, { name: 'XXL', price_modifier: 20 }],
    finishes: [{ name: 'Screen Print', price_modifier: 0 }, { name: 'DTG Print', price_modifier: 30 }, { name: 'Sublimation', price_modifier: 50 }],
    paperTypes: [],
    printAreas: ['Front', 'Back', 'Front & Back', 'Full Front'],
    printTypes: ['Screen Print', 'DTG Print', 'Sublimation'],
    laminationTypes: [],
    cornerTypes: [],
    specs: { 'Material': '100% Cotton', 'Weight': '180 GSM', 'Print': 'Screen / DTG / Sublimation', 'Sizes': 'S, M, L, XL, XXL', 'Colors': 'White, Black, Navy, Grey, Red', 'File Format': 'PNG, AI, PSD (300 DPI)' },
    delivery: '5-7 Business Days', features: ['Premium 100% cotton fabric', 'Screen print, DTG, or sublimation', 'Available in S to XXL', '180 GSM weight'],
    image: '',
  },
  {
    slug: 'ceramic-mugs', name: 'Custom Ceramic Mugs', brand: 'PRINTSTOP', category: 'Gifts & Mugs', subcategory: 'Mugs',
    description: 'Classic ceramic mugs with custom print. Great for gifts.', longDescription: 'Our custom ceramic mugs are printed with vibrant, long-lasting colors. Available in standard 11oz and large 15oz sizes. Choose standard print or upgrade to our magic heat-reveal mug that changes color when hot liquid is poured.',
    basePrice: 299, originalPrice: 450, minQty: 10, maxQty: 5000, rating: 4.7, reviewCount: 278, sku: 'GF-MG-001',
    materials: [{ name: 'Ceramic', price_modifier: 0 }, { name: 'Glass', price_modifier: 50 }],
    sizes: [{ name: '11oz', price_modifier: 0 }, { name: '15oz', price_modifier: 40 }],
    finishes: [{ name: 'Standard Print', price_modifier: 0 }, { name: 'Magic (Heat Reveal)', price_modifier: 150 }],
    paperTypes: [],
    printAreas: ['Wrap Around', 'One Side'],
    printTypes: ['Sublimation'],
    laminationTypes: [],
    cornerTypes: [],
    specs: { 'Material': 'Ceramic', 'Capacity': '11oz / 15oz', 'Print': 'Full Color Sublimation', 'Dishwasher Safe': 'Yes', 'Microwave Safe': 'Yes', 'File Format': 'PNG, JPG, AI' },
    delivery: '3-5 Business Days', features: ['Vibrant, long-lasting colors', '11oz and 15oz sizes', 'Dishwasher and microwave safe', 'Magic heat-reveal option available'],
    image: '',
  },
  {
    slug: 'tri-fold-brochures', name: 'Tri-Fold Brochures', brand: 'PRINTSTOP', category: 'Marketing', subcategory: 'Brochures',
    description: 'Popular tri-fold format perfect for marketing and information.', longDescription: 'Our tri-fold brochures are the most popular format for marketing collateral. Printed on premium 170gsm art paper with full-color printing. The tri-fold design gives you 6 panels to showcase your business, products, and services.',
    basePrice: 599, originalPrice: 800, minQty: 50, maxQty: 10000, rating: 4.8, reviewCount: 201, sku: 'BR-TF-001',
    materials: [{ name: '130gsm Art', price_modifier: -50 }, { name: '170gsm Art', price_modifier: 0 }, { name: '250gsm Art', price_modifier: 100 }],
    sizes: [{ name: 'A4 (folded to DL)', price_modifier: 0 }],
    finishes: [{ name: 'Matte', price_modifier: 0 }, { name: 'Glossy', price_modifier: 30 }],
    paperTypes: ['130gsm Art Paper', '170gsm Art Paper', '250gsm Art Paper'],
    printAreas: ['Front & Back'],
    printTypes: ['Digital Print', 'Offset Print'],
    laminationTypes: ['No Lamination', 'Matte Lamination', 'Glossy Lamination'],
    cornerTypes: ['Standard'],
    specs: { 'Paper': '170gsm Art Paper', 'Fold': 'Tri-Fold (6 panels)', 'Print': 'Full Color Both Sides', 'Folded Size': '99 x 210 mm', 'File Format': 'PDF, AI, PSD' },
    delivery: '3-5 Business Days', features: ['6-panel tri-fold design', 'Premium 170gsm art paper', 'Full color both sides', 'Most popular brochure format'],
    image: '',
  },
  {
    slug: 'die-cut-stickers', name: 'Die-Cut Vinyl Stickers', brand: 'PRINTSTOP', category: 'Labels & Stickers', subcategory: 'Stickers',
    description: 'Custom die-cut stickers in any shape. Waterproof vinyl.', longDescription: 'Create custom die-cut stickers in any shape you want. Printed on premium waterproof vinyl with strong adhesive. Perfect for product labels, branding, laptops, water bottles, and more.',
    basePrice: 199, originalPrice: 300, minQty: 50, maxQty: 10000, rating: 4.8, reviewCount: 523, sku: 'LB-DC-001',
    materials: [{ name: 'White Vinyl', price_modifier: 0 }, { name: 'Clear Vinyl', price_modifier: 30 }, { name: 'Holographic', price_modifier: 80 }],
    sizes: [{ name: '2 inch', price_modifier: 0 }, { name: '3 inch', price_modifier: 20 }, { name: '4 inch', price_modifier: 40 }],
    finishes: [{ name: 'Matte', price_modifier: 0 }, { name: 'Glossy', price_modifier: 10 }],
    paperTypes: [],
    printAreas: ['Full Shape'],
    printTypes: ['Eco-Solvent'],
    laminationTypes: ['No Lamination'],
    cornerTypes: ['Custom Die-Cut'],
    specs: { 'Material': 'Premium Vinyl', 'Print': 'Eco-Solvent', 'Finish': 'Waterproof', 'Adhesive': 'Permanent', 'File Format': 'PDF, AI, PNG' },
    delivery: '2-4 Business Days', features: ['Custom die-cut in any shape', 'Waterproof vinyl material', 'Strong permanent adhesive', 'White, Clear, or Holographic options'],
    image: '',
  },
  {
    slug: 'mailer-boxes', name: 'Custom Mailer Boxes', brand: 'PRINTSTOP', category: 'Packaging', subcategory: 'Custom Boxes',
    description: 'Branded corrugated mailer boxes with full-color printing.', longDescription: 'Elevate your unboxing experience with custom printed mailer boxes. Full-color printing on corrugated board with easy fold assembly. Available in kraft, white, or laminated finish.',
    basePrice: 149, originalPrice: 250, minQty: 50, maxQty: 10000, rating: 4.7, reviewCount: 89, sku: 'PK-MB-001',
    materials: [{ name: 'E-Flute', price_modifier: 0 }, { name: 'B-Flute', price_modifier: 30 }],
    sizes: [{ name: 'Small', price_modifier: 0 }, { name: 'Medium', price_modifier: 60 }, { name: 'Large', price_modifier: 150 }],
    finishes: [{ name: 'Kraft', price_modifier: 0 }, { name: 'White Board', price_modifier: 20 }, { name: 'Laminated', price_modifier: 50 }],
    paperTypes: [],
    printAreas: ['Outside Only', 'Inside & Outside'],
    printTypes: ['Offset Print'],
    laminationTypes: ['No Lamination', 'Matte Lamination', 'Glossy Lamination'],
    cornerTypes: ['Standard'],
    specs: { 'Material': 'E-Flute Corrugated', 'Print': 'Full Color Offset', 'Finish': 'Matte Lamination', 'Assembly': 'Easy Fold', 'File Format': 'PDF, AI' },
    delivery: '7-10 Business Days', features: ['Full-color offset printing', 'Easy fold assembly', 'Kraft, White, or Laminated finish', 'E-Flute and B-Flute options'],
    image: '',
  },
  {
    slug: 'vinyl-banners', name: 'Vinyl Banner 3x6ft', brand: 'PRINTSTOP', category: 'Signs & Displays', subcategory: 'Banners',
    description: 'Durable vinyl banner for indoor and outdoor use.', longDescription: 'Our vinyl banners are printed on premium 13oz or 18oz vinyl with eco-solvent inks. Weather-resistant and UV-protected, these banners are perfect for events, storefronts, and exhibitions. Includes hemmed edges and grommets.',
    basePrice: 599, originalPrice: 900, minQty: 1, maxQty: 100, rating: 4.6, reviewCount: 156, sku: 'SD-VB-001',
    materials: [{ name: '13oz Vinyl', price_modifier: 0 }, { name: '18oz Vinyl', price_modifier: 200 }],
    sizes: [{ name: '3x6 ft', price_modifier: 0 }, { name: '4x8 ft', price_modifier: 300 }, { name: '6x10 ft', price_modifier: 800 }],
    finishes: [{ name: 'Standard', price_modifier: 0 }, { name: 'With Grommets', price_modifier: 50 }, { name: 'With Pole Pockets', price_modifier: 100 }],
    paperTypes: [],
    printAreas: ['Single Side'],
    printTypes: ['Eco-Solvent'],
    laminationTypes: [],
    cornerTypes: ['Hemmed'],
    specs: { 'Material': '13oz Premium Vinyl', 'Print': 'Eco-Solvent Full Color', 'Finish': 'Weather Resistant', 'Edge': 'Hemmed with Grommets', 'File Format': 'PDF, AI, PSD' },
    delivery: '3-5 Business Days', features: ['Weather-resistant and UV-protected', 'Eco-solvent inks', 'Hemmed edges with grommets', 'Indoor and outdoor use'],
    image: '',
  },
  {
    slug: 'a4-letterheads', name: 'A4 Corporate Letterheads', brand: 'PRINTSTOP', category: 'Stationery', subcategory: 'Letterheads',
    description: 'Professional A4 letterheads for businesses.', longDescription: 'Our A4 corporate letterheads are printed on premium 120gsm uncoated paper. Perfect for official correspondence, invoices, and business communication. Full-color printing with your logo and branding.',
    basePrice: 399, originalPrice: 550, minQty: 100, maxQty: 10000, rating: 4.6, reviewCount: 178, sku: 'ST-LH-001',
    materials: [{ name: '100gsm', price_modifier: -30 }, { name: '120gsm', price_modifier: 0 }, { name: '160gsm', price_modifier: 40 }],
    sizes: [{ name: 'A4', price_modifier: 0 }],
    finishes: [{ name: 'Uncoated', price_modifier: 0 }, { name: 'Wove', price_modifier: 20 }],
    paperTypes: ['100gsm Paper', '120gsm Paper', '160gsm Paper'],
    printAreas: ['Front'],
    printTypes: ['Digital Print', 'Offset Print'],
    laminationTypes: [],
    cornerTypes: ['Standard'],
    specs: { 'Paper': '120gsm Premium', 'Print': 'Full Color', 'Size': 'A4 (210 x 297 mm)', 'Finish': 'Uncoated / Wove', 'File Format': 'PDF, AI, PSD' },
    delivery: '3-5 Business Days', features: ['Premium 120gsm uncoated paper', 'Full-color logo printing', 'Perfect for official correspondence', 'Uncoated or Wove finish'],
    image: '',
  },
  {
    slug: 'polo-tshirts', name: 'Custom Polo T-Shirts', brand: 'PRINTSTOP', category: 'Apparel', subcategory: 'Polo T-Shirts',
    description: 'Premium polo shirts with custom embroidery or print.', longDescription: 'Get custom polo shirts for your team, events, or brand. Available in cotton pique, dry-fit, and premium pique fabrics. Choose screen print, DTG, or embroidery for your logo.',
    basePrice: 499, originalPrice: 750, minQty: 20, maxQty: 5000, rating: 4.6, reviewCount: 234, sku: 'AP-PT-001',
    materials: [{ name: 'Cotton Pique', price_modifier: 0 }, { name: 'Dry-Fit', price_modifier: 30 }, { name: 'Premium Pique', price_modifier: 50 }],
    sizes: [{ name: 'S', price_modifier: 0 }, { name: 'M', price_modifier: 0 }, { name: 'L', price_modifier: 0 }, { name: 'XL', price_modifier: 0 }, { name: 'XXL', price_modifier: 20 }],
    finishes: [{ name: 'Screen Print', price_modifier: 0 }, { name: 'Embroidery', price_modifier: 50 }, { name: 'DTG Print', price_modifier: 30 }],
    paperTypes: [],
    printAreas: ['Left Chest', 'Front', 'Back', 'Front & Back'],
    printTypes: ['Screen Print', 'Embroidery', 'DTG Print'],
    laminationTypes: [],
    cornerTypes: [],
    specs: { 'Material': 'Cotton Pique', 'Weight': '220 GSM', 'Print': 'Screen / Embroidery / DTG', 'Sizes': 'S, M, L, XL, XXL', 'Colors': 'White, Black, Navy, Grey, Red' },
    delivery: '5-7 Business Days', features: ['Cotton Pique, Dry-Fit, or Premium Pique', 'Screen print, DTG, or embroidery', 'Available in S to XXL', '220 GSM weight'],
    image: '',
  },
  {
    slug: 'custom-caps', name: 'Custom Caps & Headwear', brand: 'PRINTSTOP', category: 'Apparel', subcategory: 'Caps',
    description: 'Custom embroidered caps, beanies, and visors.', longDescription: 'Brand your team with custom caps and headwear. Available in baseball caps, snapbacks, beanies, and visors. Premium embroidery and print options for your logo.',
    basePrice: 199, originalPrice: 350, minQty: 20, maxQty: 5000, rating: 4.5, reviewCount: 178, sku: 'AP-CP-001',
    materials: [{ name: 'Cotton', price_modifier: 0 }, { name: 'Polyester', price_modifier: -10 }, { name: 'Wool Blend', price_modifier: 30 }],
    sizes: [{ name: 'S/M', price_modifier: 0 }, { name: 'L/XL', price_modifier: 0 }, { name: 'One Size', price_modifier: 0 }],
    finishes: [{ name: 'Embroidery', price_modifier: 0 }, { name: 'Screen Print', price_modifier: -10 }],
    paperTypes: [],
    printAreas: ['Front', 'Side', 'Back'],
    printTypes: ['Embroidery', 'Screen Print'],
    laminationTypes: [],
    cornerTypes: [],
    specs: { 'Material': 'Cotton / Polyester', 'Print': 'Embroidery / Screen Print', 'Style': 'Baseball, Snapback, Beanie, Visor', 'Closure': 'Snapback / Velcro / Strap' },
    delivery: '5-7 Business Days', features: ['Baseball caps, snapbacks, beanies, visors', 'Premium embroidery options', 'Cotton, Polyester, or Wool Blend', 'Multiple closure styles'],
    image: '',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return ALL_PRODUCTS.find(p => p.slug === slug);
}

export function getAllProducts(): Product[] {
  return ALL_PRODUCTS;
}
