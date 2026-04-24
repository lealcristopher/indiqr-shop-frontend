export interface Category {
  id: number;
  name: string;
  image_url: string | null;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price_points: number;
  image_url: string | null;
  category_id: number;
}

export interface StoreData {
  categories: Category[];
  products: Product[];
}
