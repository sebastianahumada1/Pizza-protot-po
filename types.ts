
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  options?: string[];
}

export type PaymentMethod = 'cash' | 'card' | 'binance' | 'pago_movil' | 'transferencia' | 'zelle';
export type DeliveryMethod = 'delivery' | 'pickup';

export interface OrderState {
  items: CartItem[];
  notes: string;
  paymentMethod: PaymentMethod;
  address: string;
  deliveryFee: number;
  deliveryMethod: DeliveryMethod;
}
