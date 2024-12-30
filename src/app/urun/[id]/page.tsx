import { products } from "@/data/products";
import ProductDetails from "./ProductDetails";

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === parseInt(params.id));

  if (!product) {
    return <div>Ürün bulunamadı</div>;
  }

  return <ProductDetails product={product} />;
}
