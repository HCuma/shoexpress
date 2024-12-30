export default function Newsletter() {
  return (
    <section className="py-16 bg-black text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Yeni Koleksiyonlardan Haberdar Olun
        </h2>
        <p className="mb-8 text-gray-300">
          En yeni ürünler ve kampanyalardan ilk siz haberdar olun
        </p>
        <div className="max-w-md mx-auto flex gap-4">
          <input
            type="email"
            placeholder="E-posta adresiniz"
            className="flex-1 px-4 py-3 rounded-full text-black"
          />
          <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            Kaydol
          </button>
        </div>
      </div>
    </section>
  );
}
