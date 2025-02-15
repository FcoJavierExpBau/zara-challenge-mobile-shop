import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getPhone } from "../api/getPhone";
import { usePhoneContext } from "../context/PhoneContext";

interface ProductData {
  id: string;
  brand: string;
  name: string;
  description: string;
  basePrice: number;
  rating: number;
  specs: {
    screen: string;
    resolution: string;
    processor: string;
    mainCamera: string;
    selfieCamera: string;
    battery: string;
    os: string;
    screenRefreshRate: string;
  };
  colorOptions: { name: string; hexCode: string; imageUrl: string }[];
  storageOptions: { capacity: string; price: number }[];
  similarProducts: {
    id: string;
    brand: string;
    name: string;
    basePrice: number;
    imageUrl: string;
  }[];
  imageUrl: string;
}

const Product = () => {
  const { id } = useParams();
  const { addToCart } = usePhoneContext();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<string | null>(null);
  const fetched = useRef(false);

  useEffect(() => {
    if (!id || fetched.current) return;

    fetched.current = true;
    const loadProduct = async () => {
      try {
        const data = await getPhone(id);
        console.log("getPhone", data);
        setProduct(data);
        setSelectedColor(data.colorOptions[0]?.name || null);
        setSelectedStorage(data.storageOptions[0]?.capacity || null);
      } catch (err) {
        console.error("Error cargando el teléfono");
      }
    };

    loadProduct();
  }, [id]);

  if (!product) return <p>Teléfono no encontrado</p>;

  const handleAddToCart = () => {
    if (!selectedColor || !selectedStorage) return;

    const colorData = product.colorOptions.find((c) => c.name === selectedColor);
    const storageData = product.storageOptions.find((s) => s.capacity === selectedStorage);

    if (!colorData || !storageData) return;

    addToCart({
      phoneId: product.id,
      phoneName: product.name,
      brand: product.brand,
      imageUrl: product.imageUrl,
      selectedColor: colorData,
      selectedStorage: storageData,
    });
  };

  return (
    <div>
      <h1>{product.brand} - {product.name}</h1>
      <img src={product.imageUrl} alt={product.name} width="200" />
      <p>Precio base: ${product.basePrice}</p>

      <h2>Selecciona color:</h2>
      {product.colorOptions.map((color) => (
        <button
          key={color.name}
          style={{ backgroundColor: color.hexCode, padding: "10px", margin: "5px" }}
          onClick={() => setSelectedColor(color.name)}
        >
          {color.name}
        </button>
      ))}

      <h2>Selecciona almacenamiento:</h2>
      {product.storageOptions.map((storage) => (
        <button key={storage.capacity} onClick={() => setSelectedStorage(storage.capacity)}>
          {storage.capacity} - ${storage.price}
        </button>
      ))}

      <button
        onClick={handleAddToCart}
        disabled={!selectedColor || !selectedStorage}
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default Product;
