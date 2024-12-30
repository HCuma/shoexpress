"use client";

import { products } from "@/data/products";
import ProductCard from "./ProductCard";
import { useState, useEffect, useRef } from "react";

export default function Products() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [productsPerPage, setProductsPerPage] = useState(4);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselProducts = products.slice(0, 8);
  const totalProducts = carouselProducts.length;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setProductsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setProductsPerPage(2);
      } else {
        setProductsPerPage(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  useEffect(() => {
    if (!isHovering) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalPages);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isHovering, totalPages]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrev();
    }
  };

  const visibleProducts = carouselProducts.slice(
    currentIndex * productsPerPage,
    (currentIndex + 1) * productsPerPage
  );

  return (
    <section
      className="py-8 md:py-12 lg:py-16 bg-gray-50"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
          Öne Çıkan Ürünler
        </h2>
        <div className="relative">
          <div
            ref={carouselRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 touch-pan-y"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {visibleProducts.map((product) => (
              <div
                key={product.id}
                className="opacity-0 animate-fadeSlide"
                style={{
                  animationDelay: `${visibleProducts.indexOf(product) * 150}ms`,
                }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="absolute inset-y-0 -left-4 -right-4 md:-left-8 md:-right-8 lg:-left-16 lg:-right-16 flex items-center justify-between pointer-events-none">
            <button
              onClick={handlePrev}
              className={`w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white flex items-center justify-center transition-all duration-300 pointer-events-auto transform hover:scale-110 ${
                isHovering ? "opacity-100" : "opacity-0 sm:opacity-0"
              }`}
              aria-label="Previous slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className={`w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white flex items-center justify-center transition-all duration-300 pointer-events-auto transform hover:scale-110 ${
                isHovering ? "opacity-100" : "opacity-0 sm:opacity-0"
              }`}
              aria-label="Next slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-4 md:mt-6 lg:mt-8 gap-1.5 md:gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 md:w-2.5 h-2 md:h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "bg-black w-4 md:w-6"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeSlide {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeSlide {
          animation: fadeSlide 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
