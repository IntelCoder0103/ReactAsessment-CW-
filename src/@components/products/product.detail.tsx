import * as React from "react";
import { useNavigate, useParams } from "react-router";
import { IProduct, ProductType } from "../../@types/product";
import { useForm } from "react-hook-form";
import ProductContext from "../../@contexts/product.context";
export interface IProductDetailProps {
  method: "edit" | "add";
}
const ProductTypes: { label: ProductType; value: string }[] = [
  { label: "Books", value: "Books" },
  { label: "Electronics", value: "Electronics" },
  { label: "Food", value: "Food" },
  { label: "Furniture", value: "Furniture" },
  { label: "Toys", value: "Toys" },
];
export default function ProductDetail(props: IProductDetailProps) {
  const params = useParams();
  const { id } = params;
  const { method } = props;
  const navigate = useNavigate();

  const { getValues, register, setValue } = useForm<IProduct>({});

  const { addProduct, editProduct, getProduct } =
    React.useContext(ProductContext);

  const onSubmit = () => {
    const product = getValues();
    if (method == "add") addProduct(product);
    else editProduct(product);
    navigate("/");
  };

  React.useEffect(() => {
    if (method == "add") return;
    const p = getProduct(Number(id));
    if (!p) {
      navigate("/");
      return;
    }
    for (let key of Object.keys(p) as (keyof IProduct)[]) {
      setValue(key, p[key]);
    }
  }, [id]);

  return (
    <div className="">
      <form className="m-auto d-flex flex-column gap-4" style={{ width: 400 }}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            {...register("name")}
            className="form-control"
            data-testid="name"
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            {...register("price")}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Type</label>
          <select {...register("type")} className="form-control">
            {ProductTypes.map((type) => {
              return (
                <option value={type.value} key={type.value}>
                  {type.label}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group d-flex gap-2">
          <label className="form-check-label">Active</label>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              data-testid="active"
              type="checkbox"
              {...register("active")}
            />
          </div>
        </div>
        <div className="form-group">
          <input
            type="button"
            data-testid="submit"
            value={method == "add" ? "Add" : "Save"}
            className="btn btn-primary"
            onClick={onSubmit}
          />
        </div>
      </form>
    </div>
  );
}
