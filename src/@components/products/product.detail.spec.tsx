import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

import ProductContext, {
  IProductContextProps,
} from "../../@contexts/product.context";
import { IProduct } from "../../@types/product";
import { demoProducts } from "../../data.sample";
import ProductDetail from "./product.detail";
import ProductRow from "./product.row";
import ProductTable from "./product.table";

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"), // use actual for all non-hook parts
  useParams: jest.fn(() => ({
    id: "1",
  })),
}));

const testContextValue: IProductContextProps = {
  addProduct: jest.fn(),
  editProduct: jest.fn(),
  deleteProduct: jest.fn(),
  getProduct: jest.fn(),
  products: demoProducts,
};
const ProductDetailTestComponent = (props: {
  contextValue: IProductContextProps;
  method: "add" | "edit";
}) => {
  const { contextValue, method } = props;
  return (
    <ProductContext.Provider value={contextValue}>
      <BrowserRouter>
        <ProductDetail method={method} />
      </BrowserRouter>
    </ProductContext.Provider>
  );
};

describe("Testing on Product Detail & Edit & Add", () => {
  beforeEach(() => {});
  afterEach(() => {
    cleanup();
  });

  it("should call add function of context when submit", async () => {
    const { container, getByTestId } = render(
      <ProductDetailTestComponent
        contextValue={{ ...testContextValue }}
        method="add"
      />
    );

    const submitBtn = getByTestId("submit");
    fireEvent.click(submitBtn);
    expect(testContextValue.addProduct).toHaveBeenCalled();
  });

  it("should call edit function of context when submit", async () => {
    const { container, getByTestId } = render(
      <ProductDetailTestComponent
        contextValue={testContextValue}
        method="edit"
      />
    );

    const submitBtn = getByTestId("submit");
    fireEvent.click(submitBtn);
    expect(testContextValue.editProduct).toHaveBeenCalled();
  });

  it("should display product from product id", async () => {
    const product: IProduct = {
      id: 1,
      name: "IPhone",
      price: 200,
      active: true,
      type: "Electronics",
    };
    const getProduct = jest.fn((id: number) => product);
    //jest.spyOn(ReactRouter, "useParams").mockReturnValue({ id: "1" });

    const { container, getByTestId, getByText, getByDisplayValue } = render(
      <ProductDetailTestComponent
        contextValue={{ ...testContextValue, getProduct }}
        method="edit"
      />
    );
    console.log(location.pathname);
    expect(getProduct).toHaveBeenLastCalledWith(1);
    expect(getByDisplayValue(/IPhone/i)).toBeInTheDocument();
    expect(getByDisplayValue(/200/i)).toBeInTheDocument();
    expect(getByDisplayValue(/Electronics/i)).toBeInTheDocument();
    expect((getByTestId("active") as HTMLInputElement).checked).toBe(true);
  });
});
