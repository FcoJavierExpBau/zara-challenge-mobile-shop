import { usePhoneContext } from "../context/PhoneContext";
import { Link } from "react-router-dom";
import { useMemo } from "react";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = usePhoneContext();
  console.log("cart", cart);
  // 📌 Calcular el total solo cuando el carrito cambia
  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.selectedStorage.price, 0);
  }, [cart]);

  return (
    <div>
      <h1>Carrito de Compras</h1>

      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={`${item.phoneId}-${item.selectedColor.name}-${item.selectedStorage.capacity}-${index}`}>
              <h3>{item.brand} - {item.phoneName}</h3>
              <img src={item.imageUrl} alt={item.phoneName} width="100" />

              <p><strong>Color:</strong> {item.selectedColor.name}</p>
              <p><strong>Almacenamiento:</strong> {item.selectedStorage.capacity}</p>
              <p><strong>Precio:</strong> ${item.selectedStorage.price}</p>

              <button onClick={() => removeFromCart(item.phoneId, item.selectedColor.name, item.selectedStorage.capacity)}>
                Quitar este producto
              </button>
            </li>
          ))}
        </ul>
      )}

      {cart.length > 0 && (
        <div>
          <h2>Total: ${totalPrice}</h2>
          <button onClick={clearCart}>Vaciar Carrito</button>
        </div>
      )}

      <div>
        <Link to="/">
          <button>← Continuar Comprando</button>
        </Link>
        {cart.length > 0 && <button>Pagar</button>}
      </div>
    </div>
  );
};

export default Cart;
