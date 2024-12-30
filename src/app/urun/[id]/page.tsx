import Header from "@/components/Header";
import { products } from "@/data/products";
import Link from "next/link";
import { notFound } from "next/navigation";
import SizeSelector from "./SizeSelector";

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find(
    (p: (typeof products)[0]) => p.id === parseInt(params.id)
  );

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="pt-20">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Ürün Görseli */}
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Ürün Detayları */}
            <div className="flex flex-col justify-center">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-800 mb-6 inline-flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Geri Dön
              </Link>

              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              <p className="text-gray-600 mb-6">{product.color}</p>
              <div className="text-3xl font-bold mb-8">₺{product.price}</div>

              {/* Beden Seçimi */}
              <SizeSelector product={product} />

              {/* Ürün Açıklaması */}
              <div className="mt-12">
                <h3 className="text-lg font-semibold mb-4">Ürün Detayları</h3>
                <p className="text-gray-600 leading-relaxed">
                  Premium kalite malzemelerle üretilen {product.name}, maksimum
                  konfor ve şık tasarımı bir arada sunuyor. Dayanıklı dış tabanı
                  ve nefes alabilen iç yapısıyla günlük kullanım için ideal bir
                  seçim.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
