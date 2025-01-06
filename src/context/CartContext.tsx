"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, Product } from "@/types";
import { products } from "@/data/products";
import { toast } from "react-hot-toast";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number, size: number) => void;
  updateQuantity: (id: number, size: number, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  totalItems: number;
  totalPrice: number;
  stockData: Product[];
  refreshStockData: () => void;
  getProductStock: (productId: number, size: number) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [stockData, setStockData] = useState<Product[]>(products);

  // Sepeti localStorage'dan yükle
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Sepeti localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Stok verilerini yenileme fonksiyonu
  const refreshStockData = () => {
    setStockData([...products]);
  };

  // Belirli aralıklarla stok verilerini güncelle
  useEffect(() => {
    const interval = setInterval(refreshStockData, 60000); // Her 60 saniyede bir güncelle
    return () => clearInterval(interval);
  }, []);

  // Ürün ve beden için stok miktarını getir
  const getProductStock = (productId: number, size: number): number => {
    const product = stockData.find((p) => p.id === productId);
    return product?.sizeStock[size] || 0;
  };

  // Stok kontrolü yap
  const checkStock = (
    productId: number,
    size: number,
    requestedQuantity: number
  ): boolean => {
    const currentStock = getProductStock(productId, size);
    const currentInCart = cartItems
      .filter((item) => item.id === productId && item.size === size)
      .reduce((sum, item) => sum + item.quantity, 0);

    return currentStock >= currentInCart + requestedQuantity;
  };

  // Sepete ürün ekle
  const addToCart = (item: CartItem) => {
    // Önce stok kontrolü yap
    if (!checkStock(item.id, item.size, item.quantity)) {
      const availableStock = getProductStock(item.id, item.size);
      toast.error(
        `Üzgünüz, bu beden için sadece ${availableStock} adet stok bulunmaktadır.`
      );
      return;
    }

    setCartItems((prevItems) => {
      // Aynı ürün ve bedenden var mı kontrol et
      const existingItemIndex = prevItems.findIndex(
        (i) => i.id === item.id && i.size === item.size
      );

      if (existingItemIndex > -1) {
        // Varsa miktarı güncelle
        const updatedItems = [...prevItems];
        const existingItem = updatedItems[existingItemIndex];
        const newQuantity = existingItem.quantity + item.quantity;

        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: newQuantity,
        };

        return updatedItems;
      } else {
        // Yoksa yeni ürün olarak ekle
        return [...prevItems, item];
      }
    });

    // Başarılı ekleme bildirimi
    toast.success(`${item.quantity} adet ürün sepete eklendi`);
    refreshStockData();
  };

  // Sepetten ürün çıkar
  const removeFromCart = (id: number, size: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.id === id && item.size === size))
    );
    toast.success("Ürün sepetten çıkarıldı");
  };

  // Ürün miktarını güncelle
  const updateQuantity = (id: number, size: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id, size);
      return;
    }

    const currentItem = cartItems.find(
      (item) => item.id === id && item.size === size
    );
    if (!currentItem) return;

    const quantityDiff = quantity - currentItem.quantity;
    if (!checkStock(id, size, quantityDiff)) {
      const availableStock = getProductStock(id, size);
      toast.error(
        `Üzgünüz, bu beden için sadece ${availableStock} adet stok bulunmaktadır.`
      );
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity: quantity }
          : item
      )
    );

    refreshStockData(); // Stok verilerini güncelle
  };

  // Sepeti temizle
  const clearCart = () => {
    setCartItems([]);
    toast.success("Sepet temizlendi");
  };

  // Toplam ürün sayısı ve fiyat hesapla
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => {
    const price = parseFloat(
      item.price.replace(/[^\d,]/g, "").replace(",", ".")
    );
    return sum + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        totalPrice,
        stockData,
        refreshStockData,
        getProductStock,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
