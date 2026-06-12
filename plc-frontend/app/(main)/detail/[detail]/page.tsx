import { notFound } from "next/navigation";
import ProductDetailsClient from "./ProductDetailsClient";
import { Product } from "@/app/types";
import { PaginatedResponse } from "@/app/utils/useGetData"; 
type Props = {
  params: Promise<{
    detail: string;
  }>;
};

export default async function ProductDetails({
  params,
}: Props) {
  const { detail } = await params;
  let products: PaginatedResponse<Product> | null = null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/list?page=1&limit=1&url=${detail}`, { cache: "no-store" });
    if (!res.ok) {
      notFound();
    }
    products = await res.json();
    if (!products || !products.records || products.records.length === 0) {
      notFound();
    }
    console.log('resresresresres', products.records)
  } catch (error) {
    notFound();
  }
  const product = products?.records?.[0]
  return <ProductDetailsClient product={product} />;
}