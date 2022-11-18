import * as React from "react";
import { Link } from "react-router-dom";
import ProductContext from "../../@contexts/product.context";
import Fab from "../common/fab";
import ProductRow from "./product.row";

export interface IProductTableProps {}

export default function ProductTable(props: IProductTableProps) {
  const { products } = React.useContext(ProductContext);

  return (
    <div>
      <table className="table" data-testid="product-table">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Type</th>
            <th>State</th>
            <th></th>
          </tr>
        </thead>
        <tbody data-testid="product-table-body">
          {products.map((p, i) => (
            <ProductRow product={p} key={p.id} />
          ))}
        </tbody>
      </table>
      <Link to={"/add"}>
        <Fab className="btn btn-primary" data-testid="add-button">
          <i className="fa fa-add"></i>
        </Fab>
      </Link>
    </div>
  );
}
