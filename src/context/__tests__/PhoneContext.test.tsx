import { renderHook, act } from "@testing-library/react";
import { PhoneProvider, usePhoneContext } from "../PhoneContext";

describe("PhoneContext", () => {
  function setup() {
    return renderHook(() => usePhoneContext(), { wrapper: PhoneProvider });
  }

  beforeEach(() => {
    // Asegura que cada test empieza con un contexto limpio
    sessionStorage.clear();
  });

  test("Debe agregar un producto al carrito", () => {
    const { result } = setup();

    act(() => {
      result.current.addToCart({
        phoneId: "123",
        phoneName: "Phone XYZ",
        brand: "BrandX",
        imageUrl: "image.jpg",
        selectedColor: { name: "Red", hexCode: "#FF0000" },
        selectedStorage: { capacity: "128GB", price: 100 },
      });
    });

    expect(result.current.cart).toHaveLength(1);
  });

  test("Debe eliminar un producto del carrito", async () => {
    const { result } = setup();

    act(() => {
      result.current.addToCart({
        phoneId: "123",
        phoneName: "Phone XYZ",
        brand: "BrandX",
        imageUrl: "image.jpg",
        selectedColor: { name: "Red", hexCode: "#FF0000" },
        selectedStorage: { capacity: "128GB", price: 100 },
      });

      result.current.addToCart({
        phoneId: "456",
        phoneName: "Phone ABC",
        brand: "BrandY",
        imageUrl: "image2.jpg",
        selectedColor: { name: "Blue", hexCode: "#0000FF" },
        selectedStorage: { capacity: "256GB", price: 150 },
      });
    });

    expect(result.current.cart).toHaveLength(2);

    act(() => {
      result.current.removeFromCart("123", "Red", "128GB");
    });

    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].phoneId).toBe("456");
  });

  test("Debe vaciar el carrito", async () => {
    const { result } = setup();

    act(() => {
      result.current.addToCart({
        phoneId: "123",
        phoneName: "Phone XYZ",
        brand: "BrandX",
        imageUrl: "image.jpg",
        selectedColor: { name: "Red", hexCode: "#FF0000" },
        selectedStorage: { capacity: "128GB", price: 100 },
      });

      result.current.addToCart({
        phoneId: "456",
        phoneName: "Phone ABC",
        brand: "BrandY",
        imageUrl: "image2.jpg",
        selectedColor: { name: "Blue", hexCode: "#0000FF" },
        selectedStorage: { capacity: "256GB", price: 150 },
      });
    });

    expect(result.current.cart).toHaveLength(2);

    act(() => {
      result.current.clearCart();
    });

    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(result.current.cart).toHaveLength(0);
  });
});
