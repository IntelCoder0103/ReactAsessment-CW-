import * as React from "react";
import { Route, Routes } from "react-router-dom";
import ProductDetail from "./@components/products/product.detail";
import ProductTable from "./@components/products/product.table";

export interface IAppRoutesProps {}

export default function AppRoutes(props: IAppRoutesProps) {
    return (
        <Routes>
            <Route path="/" element={<ProductTable />} />
            <Route path="/add" element={<ProductDetail method="add" />} />
            <Route path="/:id" element={<ProductDetail method="edit" />} />
        </Routes>
    );
}
