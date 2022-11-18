import React, {
    createContext,
    PropsWithChildren,
    useContext,
    useState,
} from "react";
import { reduce } from "underscore";
import { IProduct } from "../@types/product";
import { demoProducts as initialProducts } from "../data.sample";

export interface IProductContextProps {
    products: IProduct[];
    addProduct: (product: IProduct) => void;
    editProduct: (product: IProduct) => void;
    deleteProduct: (productid: number) => void;
    getProduct: (productid: number) => IProduct | null;
}
const ProductContext = createContext<IProductContextProps>(
    {} as IProductContextProps
);

export const ProductContextProvider: React.FC<PropsWithChildren> = ({
    children,
}) => {
    const [products, setProducts] = useState<IProduct[]>(initialProducts);
    const addProduct = (product: IProduct) => {
        product.id =
            products.reduce<number>(
                (maxId, p) => Math.max(maxId, p.id ?? 0),
                0
            ) + 1;
        setProducts([...products, product]);
    };
    const deleteProduct = (productid: number) => {
        const index = products.findIndex((p) => p.id === productid);
        if (index >= 0) {
            products.splice(index, 1);
        }
        setProducts([...products]);
    };
    const editProduct = (product: IProduct) => {
        deleteProduct(product.id ?? 0);
        setProducts([...products, product]);
    };
    const getProduct = (productid: number) => {
        return products.find((p) => p.id === productid) ?? null;
    };
    return (
        <ProductContext.Provider
            value={{
                editProduct,
                addProduct,
                deleteProduct,
                getProduct,
                products,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export default ProductContext;
