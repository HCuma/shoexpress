"use client";

import Header from "@/components/Header";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form gönderme işlemi burada yapılacak
    console.log("Form gönderildi:", formData);
    // Formu sıfırla
    setFormData({ name: "", email: "", subject: "", message: "" });
    alert("Mesajınız başarıyla gönderildi!");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="pt-20">
        <div className="bg-gray-100 py-16">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl font-bold mb-4">İletişim</h1>
            <p className="text-gray-600 text-lg">
              Bizimle iletişime geçmek için aşağıdaki formu kullanabilir veya
              mağazamızı ziyaret edebilirsiniz.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* İletişim Formu */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-6">Bize Ulaşın</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Adınız Soyadınız
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    E-posta Adresiniz
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Konu
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Mesajınız
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Gönder
                </button>
              </form>
            </div>

            {/* İletişim Bilgileri ve Harita */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-6">
                  İletişim Bilgileri
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Adres</h3>
                    <p className="text-gray-600">
                      Atatürk Caddesi No:123
                      <br />
                      Merkez / İstanbul
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Telefon</h3>
                    <p className="text-gray-600">+90 (212) 123 45 67</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">E-posta</h3>
                    <p className="text-gray-600">info@shoexpress.com</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Çalışma Saatleri
                    </h3>
                    <p className="text-gray-600">
                      Pazartesi - Cumartesi: 10:00 - 22:00
                      <br />
                      Pazar: 11:00 - 20:00
                    </p>
                  </div>
                </div>
              </div>

              {/* Google Harita */}
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-6">Mağaza Konumu</h2>
                <div className="aspect-video">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.1375984685657!2d28.97705081537615!3d41.03705757929861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab9e7a7777c43%3A0x4c76cf3dcc8b330b!2zVGFrc2ltIE1leWRhbsSxLCBHw7xtw7zFn3N1eXUsIDM0NDM1IEJleW_En2x1L8Swc3RhbmJ1bA!5e0!3m2!1str!2str!4v1647789415897!5m2!1str!2str"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
