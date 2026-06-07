import { notFound } from "next/navigation";
import ProductDetailsClient from "./ProductDetailsClient";
import { catalogProductPages } from "@/app/data/content";

type Props = {
  params: Promise<{
    detail: string;
  }>;
};

export default async function ProductDetails({
  params,
}: Props) {
  const { detail } = await params;

  const products = catalogProductPages.flat();

  const product = products.find(
    (item) => item.partNumber === decodeURIComponent(detail)
  );

  if (!product) {
    notFound();
  }

  return <ProductDetailsClient product={product} />;
}