"use client";

const features = [
  { title: "Ücretsiz Kargo", desc: "Tüm Türkiye'ye ücretsiz kargo" },
  { title: "Güvenli Ödeme", desc: "256-bit SSL güvenlik sertifikası" },
  { title: "7/24 Destek", desc: "Her zaman yanınızdayız" },
];

export default function Features() {
  return (
    <section className="py-16 container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((item) => (
          <div key={item.title} className="text-center">
            <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
