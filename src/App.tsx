import * as React from "react";
import {
    Router,
    Routes,
    useLocation,
    useNavigate,
    useNavigation,
} from "react-router-dom";
import { BrowserRouter, Route } from "react-router-dom";
import AppHeader from "./@components/common/header";
import ProductDetail from "./@components/products/product.detail";
import ProductTable from "./@components/products/product.table";
import ProductContext, {
    ProductContextProvider,
} from "./@contexts/product.context";
import AppRoutes from "./App.routes";

export interface IAppProps {}

export default function App(props: IAppProps) {
    return (
        <div>
            <AppHeader>Product Management System</AppHeader>
            <div className="container p-4">
                <ProductContextProvider>
                    <BrowserRouter>
                        <AppRoutes />
                    </BrowserRouter>
                </ProductContextProvider>
            </div>
        </div>
    );
}
