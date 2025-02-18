import { getPhone } from "../getPhone";
import { vi, describe, beforeEach, expect, test, Mock } from "vitest";

global.fetch = vi.fn();

describe("getPhone API function", () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  const mockProductData = {
    id: "test-id",
    brand: "TestBrand",
    name: "TestPhone",
    description: "Descripción de prueba",
    basePrice: 999,
    rating: 4.5,
    specs: {
      screen: "6.5 pulgadas",
      resolution: "1080x2400",
      processor: "Snapdragon 888",
      mainCamera: "64MP",
      selfieCamera: "32MP",
      battery: "4500mAh",
      os: "Android 12",
      screenRefreshRate: "120Hz",
    },
    colorOptions: [
      { name: "Negro", hexCode: "#000000", imageUrl: "https://test.com/black.jpg" },
      { name: "Blanco", hexCode: "#FFFFFF", imageUrl: "https://test.com/white.jpg" },
    ],
    storageOptions: [
      { capacity: "128GB", price: 999 },
      { capacity: "256GB", price: 1099 },
    ],
    similarProducts: [
      { id: "similar-1", brand: "BrandX", name: "SimilarPhone1", basePrice: 899, imageUrl: "https://test.com/similar1.jpg" },
      { id: "similar-2", brand: "BrandY", name: "SimilarPhone2", basePrice: 799, imageUrl: "https://test.com/similar2.jpg" },
    ],
    imageUrl: "https://test.com/image.jpg",
  };

  beforeEach(() => {
    global.fetch = vi.fn();
    vi.clearAllMocks();
  });
  
  test("Debe obtener los datos de un teléfono correctamente", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockProductData),
    });

    const product = await getPhone("test-id");

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/products/test-id`, {
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
      },
    });

    expect(product).toEqual(mockProductData);
    expect(product.specs.screen).toBe("6.5 pulgadas");
    expect(product.colorOptions.length).toBe(2);
    expect(product.storageOptions[0].capacity).toBe("128GB");
  });

  test("Debe lanzar un error si la API responde con estado incorrecto", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: false,
      status: 404,
    });

    await expect(getPhone("test-id")).rejects.toThrow("Error HTTP: 404");

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/products/test-id`, {
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
      },
    });
  });

  test("Debe manejar errores de red correctamente", async () => {
    (fetch as Mock).mockRejectedValue(new Error("Network error"));

    await expect(getPhone("test-id")).rejects.toThrow("Network error");

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/products/test-id`, {
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
      },
    });
  });

  test("Debe manejar una API caída correctamente", async () => {
    (fetch as Mock).mockRejectedValue(new Error("API Timeout"));
  
    await expect(getPhone("test-id")).rejects.toThrow("API Timeout");
  
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  
  
});
