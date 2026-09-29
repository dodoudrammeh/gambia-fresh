export type Tone = "green" | "orange" | "red";

export interface Product {
  id: string;
  name: string;
  weight: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  tone?: Tone;
  category: string;
  showInAll?: boolean;
}

export interface CartLine {
  id: string;
  name: string;
  price: number;
  image: string;
  qty: number;
}

export interface ReceiptLine {
  id: string;
  name: string;
  qty: number;
  total: number;
}

export interface Receipt {
  number: string;
  placedAt: string;
  shopName: string;
  customerName: string;
  customerPhone: string;
  area: string;
  landmark: string;
  deliveryTime: string;
  changeUntil: string;
  lines: ReceiptLine[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  whatsappUrl: string;
}

export type Panel =
  | "categories"
  | "shop"
  | "orders"
  | "account"
  | "cart"
  | "saved"
  | "mobile"
  | null;

export type Legal = "privacy" | "terms" | "help" | null;
