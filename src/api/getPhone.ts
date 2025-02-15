const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const getPhone = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error obteniendo el teléfono con ID ${id}:`, error);
    throw error;
  }
};
