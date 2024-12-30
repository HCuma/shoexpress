interface Product {
  id: number;
  name: string;
  color: string;
  price: string;
  image: string;
  category: string;
  description: string;
  material: string;
  sizes: number[];
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Nike Air Max",
    color: "Siyah / Kırmızı",
    price: "2.199",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    category: "erkek",
    description:
      "Nike Air Max, maksimum konfor ve stil için tasarlanmış premium bir spor ayakkabıdır. Yenilikçi Air yastıklama sistemi ile her adımda üstün konfor sunar.",
    material: "Sentetik deri ve file kumaş",
    sizes: [40, 41, 42, 43, 44],
    inStock: true,
  },
  {
    id: 2,
    name: "Adidas Superstar",
    color: "Beyaz",
    price: "1.999",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5",
    category: "erkek",
    description:
      "Adidas Superstar, klasik tasarımı ve üstün kalitesiyle öne çıkan bir sokak stili ikonu. Shell-toe tasarımı ve üç şeritli görünümüyle dikkat çeker.",
    material: "Deri",
    sizes: [39, 40, 41, 42, 43, 44],
    inStock: true,
  },
  {
    id: 3,
    name: "New Balance 990",
    color: "Gri",
    price: "4.299",
    image: "https://images.unsplash.com/photo-1578021046026-483fa99ffad2",
    category: "erkek",
    description:
      "New Balance 990, premium malzemeler ve üstün işçilikle üretilmiş bir koşu ayakkabısıdır. ENCAP teknolojisi ile maksimum konfor sağlar.",
    material: "Süet deri ve mesh",
    sizes: [41, 42, 43, 44, 45],
    inStock: true,
  },
  {
    id: 4,
    name: "Nike Air Force",
    color: "Beyaz",
    price: "2.499",
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
    category: "kadin",
    description:
      "Nike Air Force, zamansız tasarımı ve üstün kalitesiyle öne çıkan bir klasik. Air teknolojisi ile konforlu bir yürüyüş deneyimi sunar.",
    material: "Deri",
    sizes: [36, 37, 38, 39, 40],
    inStock: true,
  },
  {
    id: 5,
    name: "Puma RS-X",
    color: "Siyah / Beyaz",
    price: "1.899",
    image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329",
    category: "kadin",
    description:
      "Puma RS-X, retro tasarımı modern teknolojilerle birleştiren bir yaşam tarzı ayakkabısıdır. Running System teknolojisi ile üstün yastıklama sağlar.",
    material: "Tekstil ve sentetik",
    sizes: [36, 37, 38, 39, 40],
    inStock: false,
  },
  {
    id: 6,
    name: "Adidas Stan Smith",
    color: "Beyaz / Yeşil",
    price: "1.799",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86",
    category: "kadin",
    description:
      "Adidas Stan Smith, tenis kortlarından sokak modasına uzanan bir ikon. Minimalist tasarımı ve rahat yapısıyla günlük kullanım için ideal.",
    material: "Premium deri",
    sizes: [36, 37, 38, 39, 40],
    inStock: true,
  },
  {
    id: 7,
    name: "Nike Air Max Junior",
    color: "Mavi / Beyaz",
    price: "1.599",
    image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de",
    category: "cocuk",
    description:
      "Nike Air Max Junior, çocuklar için tasarlanmış konforlu ve dayanıklı bir spor ayakkabı. Air yastıklama sistemi ile enerji dolu günler için ideal.",
    material: "Sentetik ve tekstil",
    sizes: [28, 29, 30, 31, 32, 33, 34],
    inStock: true,
  },
  {
    id: 8,
    name: "Adidas Superstar Kids",
    color: "Siyah / Beyaz",
    price: "1.399",
    image: "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f",
    category: "cocuk",
    description:
      "Adidas Superstar Kids, klasik Superstar modelinin çocuklar için özel olarak tasarlanmış versiyonu. Dayanıklı yapısı ve rahat kullanımıyla öne çıkar.",
    material: "Sentetik deri",
    sizes: [28, 29, 30, 31, 32, 33],
    inStock: true,
  },
  {
    id: 9,
    name: "Puma Suede Classic",
    color: "Lacivert",
    price: "1.899",
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77",
    category: "erkek",
    description:
      "Puma Suede Classic, sokak stilinin vazgeçilmez parçası. Süet deri üst yüzeyi ve klasik tasarımıyla her kombine uyum sağlar.",
    material: "Süet deri",
    sizes: [40, 41, 42, 43, 44],
    inStock: true,
  },
  {
    id: 10,
    name: "Reebok Classic",
    color: "Beyaz / Gri",
    price: "1.699",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772",
    category: "erkek",
    description:
      "Reebok Classic, retro tasarımı modern detaylarla buluşturan bir yaşam tarzı ayakkabısı. Hafif ve dayanıklı yapısıyla günlük kullanım için ideal.",
    material: "Deri ve tekstil",
    sizes: [40, 41, 42, 43, 44],
    inStock: true,
  },
];
