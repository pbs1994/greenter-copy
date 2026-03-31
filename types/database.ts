// types/database.ts

export interface Category {
  id: string;
  name: string;
  slug: string;
  spec_fields: SpecField[];
  created_at: string;
}

export interface SpecField {
  name: string;
  key: string;
  type: 'text' | 'number' | 'textarea' | 'select';
  required: boolean;
  options?: string[]; // for select type
  unit?: string; // e.g., "kW", "kWh"
}

export interface Product {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  price: number; // cents
  image_url: string | null;
  images: string[]; // images secondaires
  description: string | null;
  short_description: string | null;
  specs: Record<string, string | number>;
  features: ProductFeature[];
  faq: FAQItem[];
  stripe_product_id: string | null;
  stripe_price_id: string | null;
  stripe_price_id_test: string | null;
  is_active: boolean;
  is_custom_page: boolean;
  is_featured: boolean;
  created_at: string;
}

export interface ProductFeature {
  icon: string;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Customer {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  created_at: string;
}

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  order_number: string;
  stripe_session_id: string | null;
  customer_id: string;
  status: OrderStatus;
  amount: number; // cents
  shipping_address: Address | null;
  billing_address: Address | null;
  created_at: string;
}

export interface Address {
  line1?: string;
  line2?: string;
  city?: string;
  postal_code?: string;
  country?: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  product_name: string;
  quantity: number;
  unit_price: number; // cents
}
