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

export const PRODUCT_CATEGORIES = [
  {
    name: 'Business Cards',
    slug: 'business-cards',
    description: 'Make a lasting first impression with premium business cards',
    icon: 'CreditCard',
  },
  {
    name: 'Banners & Posters',
    slug: 'banners-posters',
    description: 'Eye-catching banners and posters for every occasion',
    icon: 'Image',
  },
  {
    name: 'Stationery',
    slug: 'stationery',
    description: 'Professional letterheads, envelopes, and more',
    icon: 'FileText',
  },
  {
    name: 'Labels & Stickers',
    slug: 'labels-stickers',
    description: 'Custom labels and stickers for branding and packaging',
    icon: 'Tag',
  },
  {
    name: 'Packaging',
    slug: 'packaging',
    description: 'Custom boxes, bags, and packaging solutions',
    icon: 'Package',
  },
  {
    name: 'Clothing & Merchandise',
    slug: 'clothing-merchandise',
    description: 'Custom t-shirts, caps, and promotional merchandise',
    icon: 'Shirt',
  },
  {
    name: 'Photo Gifts',
    slug: 'photo-gifts',
    description: 'Personalized photo mugs, frames, and gifts',
    icon: 'Camera',
  },
  {
    name: 'Pens & Drinkware',
    slug: 'pens-drinkware',
    description: 'Branded pens, mugs, and drinkware',
    icon: 'PenTool',
  },
];

export const HOW_IT_WORKS = [
  {
    step: 1,
    title: 'Choose Your Product',
    description: 'Browse our wide range of printing products and select what you need.',
  },
  {
    step: 2,
    title: 'Customize Design',
    description: 'Use our design studio or upload your own artwork.',
  },
  {
    step: 3,
    title: 'Get a Quote',
    description: 'Submit your requirements and receive a competitive quote.',
  },
  {
    step: 4,
    title: 'Fast Delivery',
    description: 'We print and deliver to your doorstep across India.',
  },
];

export const CLIENT_INDUSTRIES = [
  'IT & Software',
  'Manufacturing',
  'Healthcare',
  'Education',
  'Retail & E-commerce',
  'Real Estate',
  'Hospitality',
  'NGOs & Non-profits',
  'Government',
  'Automotive',
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
