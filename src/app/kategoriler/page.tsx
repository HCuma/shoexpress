"use client";

import Header from "@/components/Header";
import Link from "next/link";

const categories = [
  {
    id: 1,
    name: "Erkek Spor Ayakkabı",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    href: "/erkek",
  },
  {
    id: 2,
    name: "Kadın Spor Ayakkabı",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
    href: "/kadin",
  },
  {
    id: 3,
    name: "Çocuk Spor Ayakkabı",
    image: "https://images.unsplash.com/photo-1514989771522-458c9b6c035a",
    href: "/cocuk",
  },
  {
    id: 4,
    name: "Koşu Ayakkabıları",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa",
    href: "/kosu",
  },
  {
    id: 5,
    name: "Günlük Ayakkabılar",
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77",
    href: "/gunluk",
  },
  {
    id: 6,
    name: "Basketbol Ayakkabıları",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5",
    href: "/basketbol",
  },
];

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="pt-20">
        <div className="container mx-auto px-6 py-16">
          <h1 className="text-4xl font-bold mb-12">Kategoriler</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className="group relative h-80 overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
