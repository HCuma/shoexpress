const categories = [
  {
    name: "Spor Ayakkabılar",
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c",
  },
  {
    name: "Günlük Ayakkabılar",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772",
  },
  {
    name: "Klasik Ayakkabılar",
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4",
  },
];

export default function Categories() {
  return (
    <section className="py-16 container mx-auto px-6">
      <h2 className="text-3xl font-bold mb-8">Popüler Kategoriler</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category) => (
          <div key={category.name} className="relative group cursor-pointer">
            <div className="h-64 rounded-lg overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-xl font-semibold">
                  {category.name}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
