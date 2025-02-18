import { createContext, useContext, useState, ReactNode, useEffect } from "react";


export interface Phone {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
}

interface CartItem {
  phoneId: string;
  phoneName: string;
  brand: string;
  imageUrl: string;
  selectedColor: { name: string; hexCode: string };
  selectedStorage: { capacity: string; price: number };
}

interface PhoneContextType {
  cart: CartItem[];
  addToCart: (phoneDetails: CartItem) => void;
  removeFromCart: (phoneId: string, color: string, storage: string) => void;
  clearCart: () => void;
}

const PhoneContext = createContext<PhoneContextType | undefined>(undefined);

export const PhoneProvider = ({ children }: { children: ReactNode }) => {
  console.log("🔄 PhoneProvider se ha montado/reiniciado");

  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const storedCart = sessionStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("💾 Guardando carrito en sessionStorage:", cart);
      sessionStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);
  

  const addToCart = (phoneDetails: CartItem) => {
    console.log("➕ Agregando producto al carrito:", phoneDetails);
    setCart((prevCart) => [...prevCart, phoneDetails]);
  };

  const removeFromCart = (phoneId: string, color: string, storage: string) => {
    console.log("❌ Eliminando producto del carrito:", { phoneId, color, storage });
  
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(
            item.phoneId === phoneId &&
            item.selectedColor.name === color &&
            item.selectedStorage.capacity === storage
          )
      )
    );
  };
  

  const clearCart = () => {
    console.log("🗑️ Vaciando el carrito");
    setCart([]);
  };

  return (
    <PhoneContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </PhoneContext.Provider>
  );
};

export const usePhoneContext = () => {
  const context = useContext(PhoneContext);
  if (!context) {
    throw new Error("usePhoneContext debe usarse dentro de un PhoneProvider");
  }
  return context;
};
