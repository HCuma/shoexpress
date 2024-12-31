"use client";

import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Heart,
  Share2,
  Star,
  Truck,
  Shield,
  RotateCcw,
  ArrowLeft,
  Box,
  Ruler,
  Shirt,
} from "lucide-react";
import { toast } from "react-hot-toast";
import SizeSelector from "./SizeSelector";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";

export default function ProductDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const product = products.find((p) => p.id === parseInt(params.id));
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "description" | "details" | "shipping"
  >("description");
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800">Ürün bulunamadı</h1>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart({
        ...product,
        size: selectedSize,
        quantity: 1,
      });
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Favorilerden çıkarıldı" : "Favorilere eklendi");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Ürün linki kopyalandı!");
  };

  const features = [
    {
      icon: Truck,
      title: "Ücretsiz Kargo",
      description: "500 TL ve üzeri alışverişlerde",
    },
    {
      icon: Shield,
      title: "Güvenli Alışveriş",
      description: "256-bit SSL ile güvenli ödeme",
    },
    {
      icon: RotateCcw,
      title: "Kolay İade",
      description: "30 gün içinde ücretsiz iade",
    },
  ];

  const productDetails = {
    description: `${product.name}, yüksek kaliteli malzemeler kullanılarak üretilmiştir. Modern tasarımı ve rahat yapısı ile günlük kullanım için idealdir. ${product.category} kategorisinde öne çıkan ürünlerimizden biridir.`,
    details: [
      { icon: Box, label: "Paket İçeriği", value: "1 x Ürün" },
      { icon: Ruler, label: "Materyal", value: "Premium Kumaş" },
      { icon: Shirt, label: "Bakım", value: "30°C'de yıkanabilir" },
    ],
    shipping: [
      "Siparişiniz 1-3 iş günü içinde kargoya verilir",
      "Kargo takip numarası SMS ile iletilir",
      "Teslimat süresi bulunduğunuz bölgeye göre 1-4 iş günüdür",
      "Kapıda ödeme seçeneği mevcuttur",
    ],
  };

  return (
    <>
      <Header />
      <div className="min-h-screen relative pt-20 bg-gradient-to-br from-gray-50 to-white">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            opacity: 0.3,
          }}
        />

        <div className="container relative mx-auto px-4 py-8 md:py-12">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
            className="flex items-center gap-2 mb-6 text-gray-600 hover:text-black transition-colors bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Geri Dön</span>
          </motion.button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Ürün Görseli */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-lg"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleFavorite}
                  className="bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
                    }`}
                  />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleShare}
                  className="bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all"
                >
                  <Share2 className="w-5 h-5 text-gray-400" />
                </motion.button>
              </div>
            </motion.div>

            {/* Ürün Bilgileri */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1 bg-white rounded-full px-3 py-1 shadow-sm">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium">4.8</span>
                </div>
                {product.price.includes("indirim") && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                    İndirim
                  </span>
                )}
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-gray-600 mb-4">{product.color}</p>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-2xl md:text-3xl font-bold">
                  {product.price} TL
                </span>
                {product.price.includes("indirim") && (
                  <span className="text-lg text-gray-500 line-through">
                    {parseInt(product.price) * 1.2} TL
                  </span>
                )}
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Beden Seç</h3>
                <SizeSelector
                  category={product.category}
                  selectedSize={selectedSize}
                  onSelect={setSelectedSize}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`w-full py-4 rounded-full font-semibold mb-6 transition-all shadow-md hover:shadow-lg ${
                  selectedSize
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                {selectedSize ? "Sepete Ekle" : "Beden Seçiniz"}
              </motion.button>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-all"
                  >
                    <feature.icon className="w-6 h-6 mb-2 text-gray-600" />
                    <h3 className="font-semibold text-sm mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Detay Sekmeleri */}
              <div className="border-t pt-6">
                <div className="flex gap-4 mb-4">
                  {(["description", "details", "shipping"] as const).map(
                    (tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          activeTab === tab
                            ? "bg-black text-white"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {tab === "description" && "Açıklama"}
                        {tab === "details" && "Detaylar"}
                        {tab === "shipping" && "Kargo"}
                      </button>
                    )
                  )}
                </div>

                <div className="bg-white rounded-xl p-4">
                  {activeTab === "description" && (
                    <p className="text-gray-600">
                      {productDetails.description}
                    </p>
                  )}

                  {activeTab === "details" && (
                    <div className="space-y-3">
                      {productDetails.details.map((detail, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <detail.icon className="w-5 h-5 text-gray-600" />
                          <span className="font-medium">{detail.label}:</span>
                          <span className="text-gray-600">{detail.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === "shipping" && (
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      {productDetails.shipping.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
