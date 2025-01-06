export interface Product {
  id: number;
  name: string;
  color: string;
  price: string;
  image: string;
  images: string[];
  category: string;
  description: string;
  material: string;
  sizes: number[];
  stock: number;
  sizeStock: { [key: number]: number };
}

export interface CartItem {
  id: number;
  name: string;
  color: string;
  price: string;
  image: string;
  size: number;
  quantity: number;
  category: string;
  description: string;
  material: string;
}
