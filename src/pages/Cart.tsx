import { usePhoneContext } from "../context/PhoneContext";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import "../styles/pages/Cart.css";
import { useTranslation } from "react-i18next";

const Cart = () => {
  const { cart, removeFromCart } = usePhoneContext();
  const { t } = useTranslation();

  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.selectedStorage.price, 0);
  }, [cart]);

  return (
    <div className="cart-container">
      <h1 className="cart-title">
        {t("cartTitle")} ({cart.length})
      </h1>

      {cart.length >= 0 && (
        <div className="cart-content">
          {/* 📦 Lista de productos */}
          <div className="cart-items">
            {cart.map((item, index) => (
              <div
                key={`${item.phoneId}-${item.selectedColor.name}-${item.selectedStorage.capacity}-${index}`}
                className="cart-item"
              >
                <img
                  src={item.imageUrl}
                  alt={item.phoneName}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <div>
                    <p>
                      {item.brand} {item.phoneName}
                    </p>
                    <p>
                      {item.selectedStorage.capacity} |{" "}
                      {item.selectedColor.name.toUpperCase()}
                    </p>
                    <p>{item.selectedStorage.price} EUR</p>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeFromCart(
                        item.phoneId,
                        item.selectedColor.name,
                        item.selectedStorage.capacity
                      )
                    }
                  >
                    {t("remove")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="cart-footer">
        {/* 🎯 Botones de acción */}
        <div className="cart-actions">
          <Link to="/">
            <button className="continue-shopping">{t("continueShopping")}</button>
          </Link>
        </div>
        {/* 🏁 Resumen del carrito */}
        {cart.length > 0 &&
          <>
            <h2 className="summary-title">{t("total")}</h2>
            <p className="total-price">{totalPrice} EUR</p>
            <button className="checkout-btn">{t("pay")}</button>
          </>
        }
      </div>
    </div>
  );
};

export default Cart;
