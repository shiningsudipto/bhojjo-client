export interface TUserOrderHistory {
  _id: string;
  price: number;
  buyer: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  totalProducts: number;
  __v: number;
  items: TUserOrderHistoryItem[];
}

export interface TUserOrderHistoryItem {
  _id: string;
  orderId: string;
  productId: TUserOrderHistoryItemProduct;
  quantity: number;
  status: string;
  __v: number;
}

export interface TUserOrderHistoryItemProduct {
  _id: string;
  title: string;
  brand: string;
  price: number;
  slug: string;
}
