import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import Products from "@/components/Products";
import Features from "@/components/Features";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Categories />
      <Products />
      <Features />
      <Newsletter />
    </main>
  );
}
