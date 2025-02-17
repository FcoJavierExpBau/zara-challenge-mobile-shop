import { useLocation, Link } from "react-router-dom";
import { usePhoneContext } from "../context/PhoneContext";
import "./../styles/components/Header.css";

const Header = () => {
  const { cart } = usePhoneContext();
  const location = useLocation();
  return (
    <header>
      <Link to="/">
        <img src="/Logo.png" alt="logo.png" />
      </Link>
      {location.pathname !== "/cart" && (
        <Link to="/cart">
          <img
            src={cart.length > 0 ? "/StateActive.png" : "/StateInactive.png"}
            alt="carrito.png"
          />
          <p>{cart.length}</p>
        </Link>
      )}
    </header>
  );
};

export default Header;
