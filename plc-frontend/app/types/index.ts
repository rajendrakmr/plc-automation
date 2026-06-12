export interface ProductMeta {
  plc_trn_pmeta_id: number;
  product_id: number;
  meta_key: string;
  meta_title: string;
  meta_desc: string;
  created_at: string;
}

export interface Category {
  category_id: number;
  cat_name: string;
}

export interface ProductType {
  product_type_id: number;
  name: string;
}

 

export interface Product {
  product_id: number;
  part_no: string;
  short_desc: string;
  image_url: string;
  meta_keywords: string;
  stock: "in-stock" | "limited" | "out-stock";
  url: string;
  product_desc: string;
  meta_title: string;
  meta_description: string;
  meta: ProductMeta[];
  category: Category;
  product_type: ProductType;
}

export interface Categories {
  category_id: number;
  cat_name: string;
  cat_desc: string;
  image_url: string;
  cat_slug: string;
}