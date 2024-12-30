"use client";

export default function Newsletter() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-black text-white">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
            Yeni Koleksiyonlardan Haberdar Olun
          </h2>
          <p className="text-sm md:text-base mb-6 md:mb-8 text-gray-300 max-w-xl mx-auto">
            En yeni ürünler ve kampanyalardan ilk siz haberdar olun. Özel
            indirimler ve fırsatlar için hemen kaydolun.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="E-posta adresiniz"
              className="flex-1 px-4 py-2.5 md:py-3 rounded-full text-black text-sm md:text-base placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <button className="bg-white text-black px-6 md:px-8 py-2.5 md:py-3 rounded-full font-semibold text-sm md:text-base hover:bg-gray-100 transition-colors whitespace-nowrap">
              Kaydol
            </button>
          </div>
          <p className="mt-4 text-xs text-gray-400">
            Kaydolarak{" "}
            <span className="underline cursor-pointer">
              Gizlilik Politikası
            </span>
            'nı kabul etmiş olursunuz.
          </p>
        </div>
      </div>
    </section>
  );
}
