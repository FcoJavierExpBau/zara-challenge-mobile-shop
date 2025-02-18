import { act, renderHook } from "@testing-library/react";
import { PhoneProvider, usePhoneContext } from "../../context/PhoneContext";

// Función de ayuda para inicializar el contexto limpio en cada test
function setup() {
  return renderHook(() => usePhoneContext(), { wrapper: PhoneProvider });
}

describe("PhoneContext", () => {
  beforeEach(() => {
    sessionStorage.clear(); // 🧼 Limpieza del sessionStorage antes de cada test
  });

  test("Debe agregar un producto al carrito", () => {
    const { result } = setup();

    act(() => {
      result.current.addToCart({
        phoneId: "123",
        phoneName: "iPhone 14",
        brand: "Apple",
        imageUrl: "/iphone.png",
        selectedColor: { name: "Negro", hexCode: "#000" },
        selectedStorage: { capacity: "128GB", price: 999 },
      });
    });

    expect(result.current.cart).toHaveLength(1);
  });

  test("Debe eliminar un producto del carrito", () => {
    const { result } = setup();

    act(() => {
      result.current.addToCart({
        phoneId: "123",
        phoneName: "iPhone 14",
        brand: "Apple",
        imageUrl: "/iphone.png",
        selectedColor: { name: "Negro", hexCode: "#000" },
        selectedStorage: { capacity: "128GB", price: 999 },
      });

      result.current.addToCart({
        phoneId: "456",
        phoneName: "Samsung S23",
        brand: "Samsung",
        imageUrl: "/samsung.png",
        selectedColor: { name: "Azul", hexCode: "#00F" },
        selectedStorage: { capacity: "256GB", price: 1099 },
      });
    });

    expect(result.current.cart).toHaveLength(2); // 🔥 Verifica que hay 2 productos

    act(() => {
      result.current.removeFromCart("123", "Negro", "128GB");
    });

    expect(result.current.cart).toHaveLength(1); // 🔥 Verifica que ahora solo queda 1
    expect(result.current.cart[0].phoneId).toBe("456"); // Asegura que el Samsung sigue en el carrito
  });

  test("Debe vaciar el carrito", () => {
    const { result } = setup();

    act(() => {
      result.current.addToCart({
        phoneId: "123",
        phoneName: "iPhone 14",
        brand: "Apple",
        imageUrl: "/iphone.png",
        selectedColor: { name: "Negro", hexCode: "#000" },
        selectedStorage: { capacity: "128GB", price: 999 },
      });

      result.current.addToCart({
        phoneId: "456",
        phoneName: "Samsung S23",
        brand: "Samsung",
        imageUrl: "/samsung.png",
        selectedColor: { name: "Azul", hexCode: "#00F" },
        selectedStorage: { capacity: "256GB", price: 1099 },
      });
    });

    expect(result.current.cart).toHaveLength(2); // 🔥 Verifica que hay 2 productos antes de vaciar

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.cart).toHaveLength(0); // ✅ Debe quedar vacío
  });
});
