import React from "react";
import ProductContext, {
  IProductContextProps,
  ProductContextProvider,
} from "../../@contexts/product.context";
import ProductTable from "./product.table";
import { render, screen, renderHook, fireEvent } from "@testing-library/react";
import { IProduct } from "../../@types/product";
import { demoProducts } from "../../data.sample";
import { Router } from "react-router";
import { BrowserRouter } from "react-router-dom";
const testContextValue: IProductContextProps = {
  addProduct: (product) => {},
  editProduct: (product) => {},
  deleteProduct: (product) => {},
  getProduct: (product) => {
    return {} as IProduct;
  },
  products: demoProducts,
};
const ProductTableTestComponent = (contextValue: IProductContextProps) => {
  return (
    <ProductContext.Provider value={contextValue}>
      <BrowserRouter>
        <ProductTable />
      </BrowserRouter>
    </ProductContext.Provider>
  );
};
describe("Testing on Products and Add Product Button", () => {
  it("should display products", async () => {
    const contextValue: IProductContextProps = {
      ...testContextValue,
      products: demoProducts,
    };
    const { container } = render(
      <ProductTableTestComponent {...contextValue} />
    );
    const tBody = await screen.findByTestId("product-table-body");
    expect(tBody.getElementsByTagName("tr").length).toBe(demoProducts.length);
  });

  it("should go to new page when add button clicked", async () => {
    const contextValue = { ...testContextValue };
    const { container } = render(
      <ProductTableTestComponent {...contextValue} />
    );
    const addBtn = await screen.findByTestId("add-button");
    fireEvent.click(addBtn);
    expect(location.pathname).toBe("/add");
  });
});
