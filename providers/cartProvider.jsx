"use client";

import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const cartContext = createContext();

export default function CartProvider({ children }) {
	const [productsInCart, setProductsInCart] = useState([]);
	useEffect(() => {
		const fetcher = async () => {
			const response = await axios.get("/api/cart");
			const products = response.data.cart;
			setProductsInCart(products);
		};
		fetcher();
	}, []);
	return (
		<cartContext.Provider value={{ productsInCart, setProductsInCart }}>
			{children}
		</cartContext.Provider>
	);
}
