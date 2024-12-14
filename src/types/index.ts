export type TStepOption = {
  title: String;
  content: String;
};

export interface TCategory {
  category: string;
  _id: string;
  __v: number;
}

export interface TProduct {
  _id: string;
  title: string;
  category: string;
  subCategory: string;
  images: string[];
  weight: number;
  quantity: number;
  details: string;
  brand: string;
  sold: number;
  view: number;
  price: number;
  purchasePrice: number;
  discount: number;
  adminId: string;
  slug: string;
  __v: number;
}
