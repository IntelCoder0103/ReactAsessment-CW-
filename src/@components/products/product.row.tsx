import * as React from "react";
import { Link } from "react-router-dom";
import ProductContext from "../../@contexts/product.context";
import { IProduct } from "../../@types/product";

export interface IProductRowProps {
  product: IProduct;
}

export default function ProductRow(props: IProductRowProps) {
  const {
    product: { active, name, price, type, id },
  } = props;
  const { deleteProduct } = React.useContext(ProductContext);

  const onDelete = (id: number) => () => {
    if (confirm("Are you sure to delete this product?")) {
      deleteProduct(id);
    }
  };
  return (
    <tr className="align-middle">
      <td data-testid="name">{name}</td>
      <td>${price}</td>
      <td>{type}</td>
      <td>
        <span className={`badge ${active ? "bg-success" : "bg-secondary"}`}>
          {active ? "active" : "inactive"}
        </span>
      </td>
      <td>
        <Link
          to={`/${id}`}
          className="btn btn-default"
          data-testid="edit-button"
        >
          <i className="fa fa-edit"></i>
        </Link>
        <button
          className="btn btn-default"
          onClick={onDelete(id!)}
          data-testid="delete-button"
        >
          <i className="fa fa-trash"></i>
        </button>
      </td>
    </tr>
  );
}
