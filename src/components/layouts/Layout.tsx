import { Outlet } from "react-router-dom";
import Header from "../Header";

const Layout = () => {
  return (
    <div>
     < Header />

      <main>
        <Outlet /> {/* Aquí se renderiza la página actual */}
      </main>
    </div>
  );
};

export default Layout;
