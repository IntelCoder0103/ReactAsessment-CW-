export type ProductType =
    | "Books"
    | "Electronics"
    | "Food"
    | "Furniture"
    | "Toys";

export interface IProduct {
    id?: number;
    name: string;
    price: number;
    type: ProductType;
    active: boolean;
}
