import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { PhoneProvider, usePhoneContext } from "../../context/PhoneContext";
import Header from "../Header";
import { act, renderHook } from "@testing-library/react";
import "@testing-library/jest-dom";

// 🎭 Mock para aislar contexto en cada test
const renderWithContext = () => {
  return render(
    <MemoryRouter>
      <PhoneProvider>
        <Header />
      </PhoneProvider>
    </MemoryRouter>
  );
};

describe("Header Component", () => {
  beforeEach(() => {
    sessionStorage.clear(); // Evita contaminación entre tests
  });

  test("Debe renderizar el logo, el icono del carrito y el contador en 0", () => {
    renderWithContext();

    // ✅ Verifica que el logo se muestra correctamente
    const logo = screen.getByAltText("logo.png");
    expect(logo).toBeInTheDocument();

    // ✅ Verifica que el carrito está en estado inactivo (vacío)
    const cartIcon = screen.getByAltText("carrito.png");
    expect(cartIcon).toHaveAttribute("src", "/StateInactive.png");

    // ✅ Verifica que el contador del carrito está en 0
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  test("Debe mostrar el icono activo cuando hay productos en el carrito", () => {
    // Usamos `renderHook` para acceder al contexto y agregar productos
    const { result } = renderHook(() => usePhoneContext(), { wrapper: PhoneProvider });

    act(() => {
      result.current.addToCart({
        phoneId: "123",
        phoneName: "iPhone 14",
        brand: "Apple",
        imageUrl: "/iphone.png",
        selectedColor: { name: "Negro", hexCode: "#000" },
        selectedStorage: { capacity: "128GB", price: 999 },
      });
    });

    renderWithContext();

    // ✅ Verifica que el carrito ahora tiene 1 producto y se activa el icono
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByAltText("carrito.png")).toHaveAttribute("src", "/StateActive.png");
  });

  test("Debe contener un link al carrito", () => {
    renderWithContext();

    // ✅ Busca todos los links y filtra el que tiene `href="/cart"`
    const cartLink = screen.getAllByRole("link").find((link) => link.getAttribute("href") === "/cart");
    
    expect(cartLink).toBeInTheDocument();
  });
});
