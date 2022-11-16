import React from "react";
import ProductContext, {
    ProductContextProvider,
} from "../../@contexts/product.context";
import ProductTable from "./product.table";
import { render, screen, renderHook } from "@testing-library/react";
