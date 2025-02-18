import { Route, Routes } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="product/:id" element={<Product />} />
        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  );
};

export default App;
