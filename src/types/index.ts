export interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  company_name: string | null;
  gst_number: string | null;
  address: Address | null;
  created_at: string;
}

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  parent_id: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface ProductSize {
  name: string;
  width: number;
  height: number;
  price_modifier: number;
}

export interface ProductMaterial {
  name: string;
  price_modifier: number;
}

export interface ProductFinish {
  name: string;
  price_modifier: number;
}

export interface Product {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  base_price: number;
  min_quantity: number;
  max_quantity: number;
  materials: ProductMaterial[];
  finishes: ProductFinish[];
  sizes: ProductSize[];
  customizable: boolean;
  template_available: boolean;
  image_urls: string[];
  gallery_urls: string[];
  specs: Record<string, string>;
  is_active: boolean;
  created_at: string;
  category?: Category;
}

export interface Template {
  id: string;
  product_id: string;
  name: string;
  thumbnail_url: string | null;
  design_data: DesignData;
  category: string;
  is_premium: boolean;
  created_at: string;
}

export interface DesignData {
  width: number;
  height: number;
  objects: DesignObject[];
  background?: string;
}

export interface DesignObject {
  type: string;
  left: number;
  top: number;
  width?: number;
  height?: number;
  fill?: string;
  fontFamily?: string;
  fontSize?: number;
  text?: string;
  src?: string;
  scaleX?: number;
  scaleY?: number;
  angle?: number;
  opacity?: number;
}

export type QuoteStatus = 'pending' | 'reviewing' | 'approved' | 'rejected' | 'completed';

export interface QuoteItem {
  product_id: string;
  product_name?: string;
  quantity: number;
  material: string;
  size: string;
  finish: string;
  customization_notes: string;
  estimated_price?: number;
}

export interface Quote {
  id: string;
  user_id: string;
  status: QuoteStatus;
  items: QuoteItem[];
  design_files: string[];
  total_amount: number | null;
  notes: string | null;
  admin_notes: string | null;
  valid_until: string | null;
  created_at: string;
  updated_at: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'printing' | 'quality_check' | 'shipped' | 'delivered';
export type PaymentStatus = 'unpaid' | 'partial' | 'paid';

export interface Order {
  id: string;
  quote_id: string | null;
  user_id: string;
  status: OrderStatus;
  payment_status: PaymentStatus;
  payment_id: string | null;
  amount: number;
  shipping_address: Address | null;
  tracking_number: string | null;
  estimated_delivery: string | null;
  created_at: string;
  updated_at: string;
  quote?: Quote;
}

export interface Project {
  id: string;
  user_id: string;
  product_id: string | null;
  name: string;
  design_data: DesignData | null;
  thumbnail_url: string | null;
  created_at: string;
  updated_at: string;
  product?: Product;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  cover_image: string | null;
  author: string | null;
  tags: string[];
  is_published: boolean;
  published_at: string | null;
  created_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  company: string | null;
  content: string;
  rating: number;
  image_url: string | null;
  is_featured: boolean;
  sort_order: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  quote_id: string | null;
  status: 'unread' | 'read' | 'replied';
  created_at: string;
}

export interface Office {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  google_maps_url: string | null;
  is_primary: boolean;
}

export interface CartItem {
  product_id: string;
  product_name: string;
  product_image: string;
  quantity: number;
  material: string;
  size: string;
  finish: string;
  unit_price: number;
  customization_notes?: string;
  design_files?: string[];
}
