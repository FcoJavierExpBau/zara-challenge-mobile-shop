import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPhone } from "../api/getPhone";
import { usePhoneContext } from "../context/PhoneContext";
import "../styles/pages/Product.css";
import PhoneCard from "../components/PhoneCard";
import { useTranslation } from "react-i18next";
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
  const navigate = useNavigate();
  const { addToCart } = usePhoneContext();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!id) return;
  
    // Resetear el estado antes de cargar el nuevo producto
    setProduct(null);
    setSelectedColor(null);
    setSelectedStorage(null);
  
    const loadProduct = async () => {
      try {
        const data = await getPhone(id);
        console.log("data", data);
        setProduct(data);
        setSelectedColor(data.colorOptions[0]?.name || null);
        setSelectedStorage(data.storageOptions[0]?.capacity || null);
      } catch (err) {
        console.error("Error cargando el teléfono");
      }
    };
  
    loadProduct();
  }, [id]); // Se ejecuta cuando cambia el ID
  

  if (!product) return (<div className="product-container">
    <button className="back-button" onClick={() => navigate(-1)}><span>&lt;</span> BACK</button>
  </div>);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedStorage) return;
    const colorData = product.colorOptions.find((c) => c.name === selectedColor);
    const storageData = product.storageOptions.find((s) => s.capacity === selectedStorage);
    if (!colorData || !storageData) return;

    addToCart({
      phoneId: product.id,
      phoneName: product.name,
      brand: product.brand,
      imageUrl: colorData.imageUrl,
      selectedColor: colorData,
      selectedStorage: storageData,
    });
  };

  return (
    <div className="product-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <span>&lt;</span> {t("back")}
      </button>
      
      {/* Parte del producto */}
      <div className="product-content">
        <div className="product-image">
          <img
            src={product.colorOptions.find((c) => c.name === selectedColor)?.imageUrl}
            alt={product.name}
          />
        </div>
        <div className="product-info">
          <h1>{product.brand} {product.name}</h1>
          <p className="price">{t("price")}: {product.basePrice} EUR</p>

          <div className="options">
            <h3>{t("howMuchSpace")}</h3>
            <div className="storage-options">
              {product.storageOptions.map((storage) => (
                <button
                  key={storage.capacity}
                  className={selectedStorage === storage.capacity ? "selected" : ""}
                  onClick={() => setSelectedStorage(storage.capacity)}
                >
                  {storage.capacity} GB
                </button>
              ))}
            </div>

            <h3>{t("pickYourFavourite")}</h3>
            <div className="color-options">
              {product.colorOptions.map((color) => (
                <div
                  key={color.name}
                  className={selectedColor === color.name ? "selected" : ""}
                  onClick={() => setSelectedColor(color.name)}
                >
                  <div
                    style={{ backgroundColor: color.hexCode }}
                    className="color-box"
                  ></div>
                </div>
              ))}
            </div>
            <p>{selectedColor}</p>
          </div>

          <button
            className="add-to-cart"
            onClick={handleAddToCart}
            disabled={!selectedColor || !selectedStorage}
          >
            {t("addToCart")}
          </button>
        </div>
      </div>

      {/* Parte de especificaciones */}
      <div className="specifications">
        <h2>{t("specifications")}</h2>

        <div>
          <p>{t("brand")}</p>
          <p>{product.brand}</p>
        </div>

        <div>
          <p>{t("name")}</p>
          <p>{product.name}</p>
        </div>

        <div>
          <p>{t("description")}</p>
          <p>{product.description}</p>
        </div>

        <div>
          <p>{t("screen")}</p>
          <p>{product.specs.screen}</p>
        </div>

        <div>
          <p>{t("resolution")}</p>
          <p>{product.specs.resolution}</p>
        </div>

        <div>
          <p>{t("processor")}</p>
          <p>{product.specs.processor}</p>
        </div>
        
        <div>
          <p>{t("mainCamera")}</p>
          <p>{product.specs.mainCamera}</p>
        </div>
        
        <div>
          <p>{t("selfieCamera")}</p>
          <p>{product.specs.selfieCamera}</p>
        </div>
        
        <div>
          <p>{t("battery")}</p>
          <p>{product.specs.battery}</p>
        </div>

        <div>
          <p>{t("os")}</p>
          <p>{product.specs.os}</p>
        </div>

        <div>
          <p>{t("screenRefreshRate")}</p>
          <p>{product.specs.screenRefreshRate}</p>
        </div>
      </div>

      {/* Parte de productos recomendados */}
      <div className="similar-items">
        <h2>{t("similarItems")}</h2>
        <div>
          {product.similarProducts.map(phone => (
            <PhoneCard key={phone.id} {...phone}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
