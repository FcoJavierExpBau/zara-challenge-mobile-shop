import { useEffect, useRef } from "react";
import { usePhoneContext } from "../context/PhoneContext";
import { Link } from "react-router-dom"; 
import { getPhones } from "../api/getPhones";

const Home = () => {
  const { phones, loadPhones } = usePhoneContext();
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return; // Evita que se ejecute dos veces

    fetched.current = true;
    const fetchPhones = async () => {
      try {
        const getPhonesResponse = await getPhones();
        console.log("getPhonesResponse", getPhonesResponse);
        loadPhones(getPhonesResponse);
      } catch (error) {
        console.error("Error cargando los teléfonos:", error);
      }
    };

    fetchPhones();
  }, []);
  return (
    <div>
      <h1>Lista de Teléfonos</h1>
      <ul>
        {phones.map((phone) => (
          <li key={phone.id}>
            <img src={phone.imageUrl} alt={phone.name} width="100" />
            <h3>{phone.brand} - {phone.name}</h3>
            <p>Precio: ${phone.basePrice}</p>
            <Link to={`/product/${phone.id}`}>Ver más</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
