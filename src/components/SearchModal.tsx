"use client";

import { useState } from "react";
import { products } from "@/data/products";
import Link from "next/link";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(products);

  if (!isOpen) return null;

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim() === "") {
      setSearchResults(products);
      return;
    }

    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.color.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(filtered);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute left-1/2 top-0 h-full w-full max-w-2xl -translate-x-1/2 bg-white shadow-xl">
        <div className="flex h-full flex-col">
          <div className="border-b p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Ürün ara..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full rounded-full border px-12 py-3 focus:border-gray-400 focus:outline-none"
                autoFocus
              />
              <svg
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <button
                onClick={onClose}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {searchResults.length === 0 ? (
              <p className="text-center text-gray-500">Sonuç bulunamadı</p>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    href={`/urun/${product.id}`}
                    className="flex gap-4 rounded-lg border p-4 hover:border-gray-400"
                    onClick={onClose}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-24 w-24 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-sm text-gray-500">{product.color}</p>
                      <p className="mt-2 font-semibold">₺{product.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
