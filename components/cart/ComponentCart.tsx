"use client"

import { Dispatch, SetStateAction, useContext, useState } from "react"
import styles from "./cart.module.css"
import { CloseButton, IconButton } from '@chakra-ui/react'
import { Minus, Plus, Trash2 } from "lucide-react"
import { cartContext } from "../../providers/cartProvider"
import Image from 'next/image'
import axios from "axios"
import { IProduct } from "../../utils/interfaces"
import { useRouter } from "next/navigation"

interface extendedIProduct extends IProduct {
	count: number
}

export default function ComponentCart({setIsOpen} : {setIsOpen: Dispatch<SetStateAction<boolean>>}) {
	const { productsInCart, setProductsInCart } = useContext<{productsInCart: extendedIProduct[], setProductsInCart: Dispatch<SetStateAction<IProduct[]>>}>(cartContext)
	const router = useRouter()

	async function updateCount(method: string, product: extendedIProduct) {
		const updatedProductsInCart = [...productsInCart];
		const index = updatedProductsInCart.findIndex((item) => item._id === product._id);
		if(method === "increment") {
			updatedProductsInCart[index].count++;
		} else {
			updatedProductsInCart[index].count--;
		}
		setProductsInCart(updatedProductsInCart);
		await axios.patch("/api/users", {product: updatedProductsInCart[index], method})
	}

	async function deleteCart() {
		await axios.delete("/api/cart")
	}

	async function deleteProduct(id: string | undefined) {
		await axios.delete("/api/cart", { data: {id} })
	}

	return (
		<div className={styles.cart}>
			<div className={styles.exit}>
				<CloseButton size='md' onClick={() => setIsOpen(false)}/>
			</div>
			<div className={styles.deleteAll}>
				<h1>ԶԱՄԲՅՈՒՂ</h1>
				<IconButton aria-label='delete all' icon={<Trash2 />} size="sm" variant='outline' colorScheme='red' onClick={() => {setProductsInCart([]); deleteCart()}}/>
			</div>
			<div className={styles.content}>
				{productsInCart.map(product => (
					<div className={styles.product} key={product._id}>
						<Image height={60} width={60} src={product.image} alt={product.name} />
						<h1 style={{marginInline: "15px"}}>{product.name}</h1>
						<IconButton aria-label='decrement' icon={<Minus />} size="sm" colorScheme='#e2e2e2' onClick={() => {updateCount("decrement", product)}} isDisabled={product.count === 1}/>
						<h1>{product.count}</h1>
						<IconButton aria-label='increment' icon={<Plus />} size="sm" colorScheme='#e2e2e2' onClick={() => {updateCount("increment", product)}}/>
						<h1 style={{marginInline: "15px"}}>{+product.price * product.count} USD</h1>
						<IconButton  style={{marginInline: "15px", position: "absolute", right: "0"}} aria-label='delete' icon={<Trash2 />} size="sm" variant='outline' colorScheme='#A3A3A3' onClick={() => {setProductsInCart(productsInCart.filter(prod => prod._id !== product._id)); deleteProduct(product._id)}}/>
					</div>
				))}
			</div>
			<button className={styles.buttonSubmit} onClick={() => router.push("/shop/basket")}>ԱՎԱՐՏԵԼ</button>
		</div>
	)
}