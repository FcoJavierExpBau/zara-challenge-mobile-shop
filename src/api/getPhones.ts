const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const getPhones = async (search?: string) => {
  try {
    // 📌 Construimos la URL con los parámetros
    const url = new URL(`${API_URL}/products`);

    if (search) {
      url.searchParams.append("search", search); // Filtrado por búsqueda si existe
    }

    const response = await fetch(url.toString(), {
      headers: {
        "x-api-key": API_KEY, // Aquí usamos la clave de la variable de entorno
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error obteniendo la lista de teléfonos:", error);
    throw error;
  }
};
