"use client";

import Header from "@/components/Header";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useState, useEffect } from "react";

export default function MenPage() {
  const menProducts = products.filter(
    (product) => product.category === "erkek"
  );
  const [maxPrice, setMaxPrice] = useState(5000);
  const [currentPrice, setCurrentPrice] = useState(5000);
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "name">(
    "name"
  );

  useEffect(() => {
    const prices = menProducts.map((product) =>
      parseFloat(product.price.replace(".", ""))
    );
    const max = Math.max(...prices);
    setMaxPrice(max);
    setCurrentPrice(max);
  }, []);

  const filteredProducts = menProducts
    .filter((product) => {
      const price = parseFloat(product.price.replace(".", ""));
      return price >= 0 && price <= currentPrice;
    })
    .sort((a, b) => {
      const priceA = parseFloat(a.price.replace(".", ""));
      const priceB = parseFloat(b.price.replace(".", ""));

      switch (sortBy) {
        case "price-asc":
          return priceA - priceB;
        case "price-desc":
          return priceB - priceA;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold mb-8">Erkek Ayakkabıları</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters */}
          <div className="w-full md:w-64 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Fiyat Aralığı</h2>
              <div className="space-y-4">
                <input
                  type="range"
                  min={0}
                  max={maxPrice}
                  value={currentPrice}
                  onChange={(e) => setCurrentPrice(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>0 TL</span>
                  <span>{currentPrice} TL</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Sıralama</h2>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="sort"
                    checked={sortBy === "name"}
                    onChange={() => setSortBy("name")}
                  />
                  <span>İsme Göre</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="sort"
                    checked={sortBy === "price-asc"}
                    onChange={() => setSortBy("price-asc")}
                  />
                  <span>Artan Fiyat</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="sort"
                    checked={sortBy === "price-desc"}
                    onChange={() => setSortBy("price-desc")}
                  />
                  <span>Azalan Fiyat</span>
                </label>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <p className="text-center text-gray-500 mt-8">
                Bu kriterlere uygun ürün bulunamadı.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
