import { createContext, useContext, useState, ReactNode } from "react";

// 📌 Definimos los tipos de datos
interface Phone {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
}

// 📌 Ahora cada `CartItem` representa una unidad individual
interface CartItem {
  phoneId: string;
  phoneName: string;
  brand: string;
  imageUrl: string;
  selectedColor: { name: string; hexCode: string };
  selectedStorage: { capacity: string; price: number };
}

interface PhoneContextType {
  phones: Phone[];
  loadPhones: (phones: Phone[]) => void;
  cart: CartItem[];
  addToCart: (phoneDetails: CartItem) => void;
  removeFromCart: (phoneId: string, color: string, storage: string) => void;
  clearCart: () => void;
}

// 📌 Creamos el contexto
const PhoneContext = createContext<PhoneContextType | undefined>(undefined);

// 📌 Proveedor del contexto
export const PhoneProvider = ({ children }: { children: ReactNode }) => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  // 📌 Cargar los teléfonos en el estado global
  const loadPhones = (phones: Phone[]) => {
    setPhones(phones);
  };

  // 📌 Agregar un teléfono al carrito como una entrada separada
  const addToCart = (phoneDetails: CartItem) => {
    setCart((prevCart) => [...prevCart, phoneDetails]);
  };

  // 📌 Eliminar solo una unidad específica del carrito
  const removeFromCart = (phoneId: string, color: string, storage: string) => {
    setCart((prevCart) => {
      const indexToRemove = prevCart.findIndex(
        (item) =>
          item.phoneId === phoneId &&
          item.selectedColor.name === color &&
          item.selectedStorage.capacity === storage
      );

      if (indexToRemove !== -1) {
        return prevCart.filter((_, index) => index !== indexToRemove);
      }
      return prevCart;
    });
  };

  // 📌 Vaciar todo el carrito
  const clearCart = () => {
    setCart([]);
  };

  return (
    <PhoneContext.Provider
      value={{ phones, cart, loadPhones, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </PhoneContext.Provider>
  );
};

// 📌 Hook para consumir el contexto
export const usePhoneContext = () => {
  const context = useContext(PhoneContext);
  if (!context) {
    throw new Error("usePhoneContext debe usarse dentro de un PhoneProvider");
  }
  return context;
};
