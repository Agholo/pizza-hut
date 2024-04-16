"use client"

import { ShoppingBasket } from "lucide-react"
import styles from "../src/app/shop/home.module.css"
import Image from "next/image"
import { IProduct } from "../src/app/shop/page"
import { Dispatch, SetStateAction, useContext } from "react"
import { cartContext } from "../providers/cartProvider"
import axios from "axios"

interface extendedIProduct extends IProduct {
	count: number;
}

export default function ComponentProduct({ product, setMessage }: { product: extendedIProduct, setMessage: Dispatch<SetStateAction<string | null>> } ) {
	const { productsInCart, setProductsInCart } = useContext(cartContext)

	async function addToCart(product: extendedIProduct) {
		setTimeout(() => {
			setMessage(null)
		},5000)
		const response = await axios.patch("/api/users", { product })
		setMessage(response.data.result)
		if(response.data.result === "good") {
			if(productsInCart.some((prod: extendedIProduct) => prod._id === product._id)) {
				const updatedProductsInCart = [...productsInCart];
				const index = updatedProductsInCart.findIndex((item) => item._id === product._id);
				updatedProductsInCart[index].count++;
				setProductsInCart(updatedProductsInCart);
			} else {
				product.count = 1
				setProductsInCart((prev: extendedIProduct[]) => (
					[...prev, product]
				))
			}
		}
	}

	return <div style={{height: "362.5px"}}>
		<div className={styles.product}>
			<Image src={product.image} alt={product.name} height={272} width={272} style={{borderRadius: "var(--border-radius)"}}></Image>
			<h2 style={{marginBlock: "11px"}}>{product.name}</h2>
			<div style={{display: "flex", alignItems: "center", marginTop: "auto"}}>	
				<span className={styles.price}>{product.price + " USD"}</span>
				<button className={styles.button} onClick={() => addToCart(product)}><ShoppingBasket style={{marginRight: "8px"}} />Cart</button>
			</div>
		</div>
	</div>
}
