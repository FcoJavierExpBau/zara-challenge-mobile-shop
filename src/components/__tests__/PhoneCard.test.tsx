import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom"; // ✅ Usa BrowserRouter en vez de MemoryRouter
import PhoneCard from "../PhoneCard"; 
import { describe, test, expect } from "vitest";
import "@testing-library/jest-dom"; // ✅ Importar matchers de jest-dom

const mockPhone = {
  id: "test-id",
  brand: "TestBrand",
  name: "TestPhone",
  basePrice: 999,
  imageUrl: "https://test.com/image.jpg",
};

describe("PhoneCard Component", () => {
  test("Debe renderizar correctamente con los datos del teléfono", () => {
    render(
      <BrowserRouter  future={{ 
        v7_relativeSplatPath: true, 
        v7_startTransition: true 
      }}>
        <PhoneCard {...mockPhone} />
      </BrowserRouter>
    );

    expect(screen.getByText(mockPhone.brand)).toBeInTheDocument();
    expect(screen.getByText(mockPhone.name)).toBeInTheDocument();
    expect(screen.getByText(`${mockPhone.basePrice} EUR`)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: mockPhone.name })).toHaveAttribute("src", mockPhone.imageUrl);
  });

  test("Debe contener un enlace con la URL correcta", () => {
    render(
      <BrowserRouter  future={{ 
        v7_relativeSplatPath: true, 
        v7_startTransition: true 
      }}>
        <PhoneCard {...mockPhone} />
      </BrowserRouter>
    );

    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", `/product/${mockPhone.id}`);
  });
});
