export default function Hero() {
  return (
    <section className="relative h-screen">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
      </div>
      <div className="container mx-auto px-6 h-full flex items-center relative z-10">
        <div className="max-w-2xl text-white">
          <h1 className="text-6xl font-bold mb-6">
            Tarzınızı Yansıtan Adımlar
          </h1>
          <p className="text-xl mb-8">
            En yeni koleksiyonlarımızla tarzınızı tamamlayın. %30'a varan
            indirimlerle şimdi alışverişe başlayın.
          </p>
          <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            Koleksiyonu Keşfet
          </button>
        </div>
      </div>
    </section>
  );
}
