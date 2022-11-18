import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import ProductContext, {
  IProductContextProps,
} from "../../@contexts/product.context";
import { IProduct } from "../../@types/product";
import { demoProducts } from "../../data.sample";
import ProductRow from "./product.row";
import ProductTable from "./product.table";

const testContextValue: IProductContextProps = {
  addProduct: jest.fn(),
  editProduct: jest.fn(),
  deleteProduct: jest.fn(),
  getProduct: jest.fn(),
  products: demoProducts,
};
const ProductRowTestComponent = (props: {
  contextValue: IProductContextProps;
  product: IProduct;
}) => {
  const { contextValue, product } = props;
  return (
    <ProductContext.Provider value={contextValue}>
      <BrowserRouter>
        <ProductRow product={product} />
      </BrowserRouter>
    </ProductContext.Provider>
  );
};

describe("Testing on Product Row & Edit & Delete Button", () => {
  it("should go to edit page when edit button clicked", async () => {
    const product: IProduct = {
      active: true,
      name: "Demo",
      price: 99,
      type: "Furniture",
      id: 1,
    };
    const { container, getByTestId } = render(
      <ProductRowTestComponent
        contextValue={testContextValue}
        product={product}
      />
    );

    const editBtn = getByTestId("edit-button");
    fireEvent.click(editBtn);
    expect(location.pathname).toBe(`/${product.id}`);
  });

  it("should call delete method when confirm delete", async () => {
    const product: IProduct = {
      active: true,
      name: "Demo",
      price: 99,
      type: "Furniture",
      id: 1,
    };
    const { container, getByTestId } = render(
      <ProductRowTestComponent
        contextValue={testContextValue}
        product={product}
      />
    );

    const deleteBtn = getByTestId("delete-button");
    window.confirm = jest.fn(() => false);
    fireEvent.click(deleteBtn);
    expect(testContextValue.deleteProduct).toHaveBeenCalledTimes(0);
    window.confirm = jest.fn(() => true);
    fireEvent.click(deleteBtn);
    expect(testContextValue.deleteProduct).toHaveBeenCalledTimes(1);
  });
});
