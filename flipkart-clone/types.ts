
export interface Product {
  name: string;
  image: string;
  price: string;
  brand: string;
}

export interface Category {
  name: string;
  submenu?: string[];
}
