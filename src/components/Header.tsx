
import { Link } from 'react-router-dom';
import { usePhoneContext } from '../context/PhoneContext';
import './../styles/components/Header.css';

const Header = () => {
    const { cart } = usePhoneContext();
    return (
        <header>
            <Link to="/">
                <img src="/Logo.png" alt="logo.png" />
            </Link>
            <Link to="/cart">
                <img src={cart.length > 0 ? '/StateActive.png' : "/StateInactive.png"} alt='carrito.png' />
                <p>{cart.length}</p>
            </Link>
        </header>
    );
};

export default Header;