import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/components/PhoneCard.css"; // 📌 IMPORTAMOS EL CSS

interface PhoneProps {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
}

const PhoneCard = ({ id, brand, name, basePrice, imageUrl }: PhoneProps) => {
  return (
    <motion.article
      className="phone-card"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }} // 📌 Activa el fade-out correctamente
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <Link to={`/product/${id}`} className="card-link">
        <div className="image-container">
          <img src={imageUrl} alt={name} />
        </div>
        <div className="card-content">
          <h3>{brand}</h3>
          <p>{name}</p>
          <span className="price">{basePrice} EUR</span>
        </div>
      </Link>
    </motion.article>
  );
};

export default PhoneCard;
