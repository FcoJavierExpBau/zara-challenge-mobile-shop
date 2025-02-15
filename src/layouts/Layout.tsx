import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <header>
        <h1>Mi Tienda de Teléfonos</h1>
        <nav>
          <a href="/">Home</a> | <a href="/cart">Carrito</a>
        </nav>
      </header>

      <main>
        <Outlet /> {/* Aquí se renderiza la página actual */}
      </main>
    </div>
  );
};

export default Layout;
