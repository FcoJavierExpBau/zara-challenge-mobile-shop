import { getPhones } from "../getPhones";
import { vi, describe, beforeEach, expect, test, Mock } from "vitest";

global.fetch = vi.fn();

describe("getPhones API function", () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  const mockPhonesData = [
    {
      id: "phone-1",
      brand: "BrandA",
      name: "PhoneModelX",
      basePrice: 799,
      imageUrl: "https://test.com/phone1.jpg"
    },
    {
      id: "phone-2",
      brand: "BrandB",
      name: "PhoneModelY",
      basePrice: 899,
      imageUrl: "https://test.com/phone2.jpg"
    }
  ];

  beforeEach(() => {
    global.fetch = vi.fn();
    vi.clearAllMocks();
  });
  
  test("Debe obtener la lista de teléfonos correctamente", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockPhonesData),
    });

    const phones = await getPhones();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/products`, {
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
      },
    });

    expect(phones).toEqual(mockPhonesData);
    expect(phones.length).toBe(2);
    expect(phones[0].brand).toBe("BrandA");
    expect(phones[1].basePrice).toBe(899);
  });

  test("Debe filtrar los teléfonos por búsqueda si se proporciona un parámetro", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue([mockPhonesData[0]]),
    });

    const searchQuery = "PhoneModelX";
    const phones = await getPhones(searchQuery);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/products?search=${encodeURIComponent(searchQuery)}`, {
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
      },
    });

    expect(phones).toEqual([mockPhonesData[0]]);
    expect(phones.length).toBe(1);
  });

  test("Debe lanzar un error si la API responde con estado incorrecto", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: false,
      status: 500,
    });

    await expect(getPhones()).rejects.toThrow("Error HTTP: 500");

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/products`, {
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
      },
    });
  });

  test("Debe manejar errores de red correctamente", async () => {
    (fetch as Mock).mockRejectedValue(new Error("Network error"));

    await expect(getPhones()).rejects.toThrow("Network error");

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/products`, {
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
      },
    });
  });
});
