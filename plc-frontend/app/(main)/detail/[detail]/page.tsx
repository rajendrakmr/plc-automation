import { notFound } from "next/navigation";
import ProductDetailsClient from "./ProductDetailsClient";
import { Product } from "@/app/types";
import { PaginatedResponse } from "@/app/utils/useGetData";
import { Metadata } from "next";

type Props = {
  params: Promise<{
    detail: string;
  }>;
};

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
} 
async function getProduct(detail: string): Promise<PaginatedResponse<Product> | null> {
  try {
    const apiEndPoint = `${process.env.NEXT_PUBLIC_API_URL}/products/list?page=1&limit=1&url=${detail}`
    const res = await fetch(apiEndPoint, { cache: "no-store" });
    if (!res.ok) return null;
    const data: PaginatedResponse<Product> = await res.json();
    if (!data?.records?.length) return null;
    return data;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { detail } = await params;
  const products = await getProduct(detail);
  const product = products?.records?.[0];

  if (!product) {
    return {
      title: "Product Not Found",
      description: "",
    };
  }

  const metaEntry = product.meta?.[0];

  return {
    title: metaEntry?.meta_title ?? product.meta_title ?? product.part_no,
    description: stripHtml(metaEntry?.meta_desc ?? product.meta_description ?? ""),
    keywords: metaEntry?.meta_key ?? product.meta_keywords ?? product.part_no,
  };
}

export default async function ProductDetails({ params }: Props) {
  const { detail } = await params;
  const products = await getProduct(detail); 
  if (!products) notFound(); 
  const product = products.records[0];
  return <ProductDetailsClient product={product} />;
}