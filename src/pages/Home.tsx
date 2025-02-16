import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Phone } from "../context/PhoneContext";
import { getPhones } from "../api/getPhones";
import PhoneCard from "../components/PhoneCard";
import { AnimatePresence } from "framer-motion";
import "../styles/pages/Home.css"; // 📌 IMPORTAMOS EL CSS

const Home = () => {
  const { t } = useTranslation(); // 📌 Hook de traducción
  const [filteredPhones, setFilteredPhones] = useState<Phone[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // 📌 Estado para almacenar la búsqueda efectiva
  const inputRef = useRef<HTMLInputElement | null>(null);
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const getPhonesResponse: Phone[] = await getPhones(searchTerm);
        console.log("📞 Teléfonos obtenidos:", getPhonesResponse);

        // 📌 🔥 Eliminamos duplicados basándonos en `id` y tomamos solo los primeros 20
        const uniquePhones = Array.from(
          new Map(getPhonesResponse.map((phone) => [phone.id, phone])).values()
        ).slice(0, 20);

        setFilteredPhones(uniquePhones);
      } catch (error) {
        console.error("❌ Error obteniendo los teléfonos:", error);
      }
    };

    fetchPhones();
  }, [searchTerm]); // 📌 Solo se ejecuta cuando `searchTerm` cambia después del debounce

  const handleInputChange = () => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    
    debounceTimeout.current = setTimeout(() => {
      if (inputRef.current) {
        setSearchTerm(inputRef.current.value); // 📌 Actualiza `searchTerm` solo después de 250ms sin escribir
      }
    }, 250);
  };

  return (
    <div className="home-container">
      <input
        type="text"
        placeholder={t("searchPlaceholder")}
        ref={inputRef} // 📌 Enlazamos el input al `useRef`
        onChange={handleInputChange} // 📌 Usa el debounce antes de actualizar `searchTerm`
      />
      <p>{filteredPhones.length} {t("results")}</p>
      <div className="phone-grid">
        <AnimatePresence>
          {filteredPhones.map((phone) => (
            <PhoneCard key={phone.id} {...phone} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Home;
