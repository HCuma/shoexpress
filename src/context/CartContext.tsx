"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  color: string;
  size?: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: number, size?: number) => void;
  updateQuantity: (productId: number, quantity: number, size?: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === product.id && item.size === product.size
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id && item.size === product.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number, size?: number) => {
    setItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(item.id === productId && (size === undefined || item.size === size))
      )
    );
  };

  const updateQuantity = (
    productId: number,
    quantity: number,
    size?: number
  ) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId && (size === undefined || item.size === size)
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = items.reduce((sum, item) => {
    const price = parseFloat(
      item.price.replace(/[^0-9,]/g, "").replace(",", ".")
    );
    return sum + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        totalPrice,
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
