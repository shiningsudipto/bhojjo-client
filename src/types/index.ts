export type TResponse = {
  success: boolean;
  status: number;
  message: string;
  token?: string;
  data: any;
};

export type TErrorResponse = {
  status: number;
  data: {
    success: boolean;
    status: number;
    message: string;
  };
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

export type TUserDB = {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "admin" | "user";
  city: string;
  address?: string;
  __v: number;
};
export interface TPackage {
  _id: string;
  buyer: string;
  name: string;
  totalItems: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalPrice: number;
}

export interface TPackageItem {
  _id: string;
  product: TPackageItemProduct;
  package: string;
  quantity: number;
  __v: number;
}

export interface TPackageItemProduct {
  _id: string;
  title: string;
  images: string[];
  quantity: number;
  price: number;
}
