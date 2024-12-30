import { products } from "@/data/products";
import ProductDetails from "./ProductDetails";
import Header from "@/components/Header";
import { Metadata } from "next";

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const product = products.find((p) => p.id === parseInt(params.id));

  if (!product) {
    return {
      title: "Ürün Bulunamadı | SHOEXPRESS Store",
      description: "Aradığınız ürün bulunamadı.",
    };
  }

  return {
    title: `${product.name} | SHOEXPRESS Store`,
    description: product.description,
  };
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === parseInt(params.id));

  if (!product) {
    return <div>Ürün bulunamadı</div>;
  }

  return (
    <>
      <Header />
      <ProductDetails product={product} />
    </>
  );
}
