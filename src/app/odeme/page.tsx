import { Metadata } from "next";
import CheckoutForm from "./CheckoutForm";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Ödeme | SXHOEXPRESS Store",
  description: "Güvenli ödeme sayfası",
};

export default function OdemePage() {
  return (
    <>
      <Header />
      <CheckoutForm />
    </>
  );
}
