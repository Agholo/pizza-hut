"use client"

import { useContext, useEffect, useState, ChangeEvent } from "react"
import axios from "axios"
import { cartContext } from "../../../../providers/cartProvider"
import Image from "next/image"
import { IProduct } from "../../../../utils/interfaces"
import { Plus, Minus, Trash2, Gift, ChevronRight } from "lucide-react"
import { IconButton } from "@chakra-ui/react"
import styles from "./basket.module.css"
import NumberDB from "../../../../lib/phoneCode.json"
import Footer from "../../../../components/Footer"


interface extendedIProduct extends IProduct {
	count: number
}

interface IPhone {
	name: string;
	code: string
}


export default function BasketPage() {
	const { productsInCart, setProductsInCart } = useContext(cartContext)
	const [ location, setLocation ] = useState<string>("my address") // change this to ""
	const [ locationPrice, setLocationPrice ] = useState<number>(0)
	const [ name, setName ] = useState<string>("")
	const [ mail, setMail ] = useState<string>("")
	const [ description, setDescription ] = useState<string>("")
	const [ numbers, setNumbers ] = useState<IPhone[]>([])
	const [ code, setCode ] = useState<string>("+374")
	const [ number, setNumber ] = useState<string>("")
	const [ error, setError ] = useState<string>("")
	const [ promocode, setPromocode ] = useState<string>("")
	const [ sell, setSell ] = useState<number | null | undefined>(null)
	const [ peyMethod, setPeyMethod] = useState<string | null>(null)

	async function updateCount(method: string, product: extendedIProduct) {
		const updatedProductsInCart = [...productsInCart];
		const index = updatedProductsInCart.findIndex((item) => item._id === product._id);
		if(method === "increment") {
			updatedProductsInCart[index].count++;
		} else {
			updatedProductsInCart[index].count--;
		}
		setProductsInCart(updatedProductsInCart);
		await axios.put("/api/users", {product: updatedProductsInCart[index], method})
	}

	async function deleteProduct(id: string | undefined) {
		await axios.delete("/api/cart", { data: {id} })
	}

	async function orderReq() {
		const price = priceCalculator() * (sell ? (100 - sell) / 100 : 1) + locationPrice
		const response = await axios.post("/api/orders", {location, price, name, description, mail, products: productsInCart.map((prod: extendedIProduct) => prod._id), phone: code + number})
		setProductsInCart([])
		// setLocation("")
		setName("")
		setMail("")
		setNumber("")
		setDescription("")
		await axios.delete("/api/cart")
	}

	async function fetchPromo() {
		const response = await axios.get(`/api/promo/${promocode}`)
		const data = response.data
		setSell(data.sell)
	}

	function priceCalculator() {
		return productsInCart.reduce((acc: number, product: extendedIProduct) => acc + (product.count * +product.price), 0)
	}

	function validation(e: ChangeEvent<HTMLInputElement>) {
		setNumber(e.target.value);
		if(Number.isNaN(+e.target.value)) {
			setError("error")
		} else {
			setError("")
		}
	}

	useEffect(() => {
		setNumbers(NumberDB)
	}, [])

	return (
		<>
			<div style={{width: "94%", marginInline: "auto", display: "flex", justifyContent: "space-between"}}>
				<div>
					<table> 
						<thead>
							<tr>
								<th className={styles.td}>Արտադրություն</th>
								<th className={styles.td}>Քանակ</th>
								<th className={styles.td}>Գին</th>
								<th className={styles.td}>Հեռացրեք</th>
							</tr>
						</thead>
						<tbody>
							{
								productsInCart.map((product: extendedIProduct) => (
									<tr key={product._id}>
										<td className={styles.td}>
											<div style={{display: "flex", alignItems: "center"}}>
												<Image src={product.image} alt="" height={100} width={100} style={{marginInline: "15px", borderRadius: "var(--border-radius)"}}/>
												<h1 style={{fontSize: "20px"}}>{product.name}</h1>
											</div>
										</td>
										<td className={styles.td}>
											<div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
												<IconButton aria-label='decrement' icon={<Minus />} style={{color: "black"}} size="sm" colorScheme='black' onClick={() => {updateCount("decrement", product)}} isDisabled={product.count === 1}/>
												<h1>{product.count}</h1>
												<IconButton aria-label='increment' icon={<Plus />} style={{color: "black"}} size="sm" colorScheme='black' onClick={() => {updateCount("increment", product)}}/>
											</div>
										</td>
										<td className={styles.td}>
											<h1>{product.count * +product.price} AMD</h1>
										</td>
										<td className={styles.td}>
											<IconButton  style={{marginInline: "15px"}} aria-label='delete' icon={<Trash2 />} size="sm" variant='outline' colorScheme='#A3A3A3' onClick={() => {setProductsInCart(productsInCart.filter((prod: extendedIProduct) => prod._id !== product._id)); deleteProduct(product._id)}}/>
										</td>
									</tr>
								))
							}
						</tbody>
					</table>
					<div style={{display: "flex", width: "100%", justifyContent: "space-between"}}>
						<h1>Առաքման վճար</h1>
						<h1>{location ? locationPrice : "Ընտրեք Հասցե"}</h1>
					</div>
					<div style={{display: "flex", width: "100%", justifyContent: "space-between"}} >
						<h1>Ընդամենը</h1>
						<div>
							<h1 className={sell ? styles.decor : ""}>{priceCalculator() + locationPrice} AMD</h1>
							{sell && <h1>{(priceCalculator() * (100 - sell) / 100 + locationPrice).toFixed(2)} AMD</h1>}
						</div>
					</div>
				</div>
				<div style={{display: "flex", flexDirection: "column"}}>
					<div>
						<h1>ԱՆՁՆԱԿԱՆ ՏՎՅԱԼՆԵՐ</h1>
						<h3>Խնդրում ենք լրացնել տեղեկատվությունը</h3>
					</div>
					<div style={{display: "flex", marginTop: "15px"}}>
						<select value={code} onChange={(e) => setCode(e.target.value)} className={styles.select}>
							{
								numbers.map((num: IPhone) => (
									<option value={num.code} key={num.name}>
										{code === num.code ? `${num.code}` : `${num.name} (${num.code})`}
									</option>
								))
							}
						</select>
						<input className={styles.input} value={number} onChange={(e) => validation(e)}></input>
					</div>
					<h2 style={{color: "red"}}>{error}</h2>
					<input placeholder="Name Surname" style={{marginTop: "15px"}} className={styles.bigInput} value={name} onChange={(e) => setName(e.target.value)}></input>
					<input placeholder="mail@example.com" style={{marginTop: "15px"}} className={styles.bigInput} value={mail} onChange={(e) => setMail(e.target.value)}></input>
					<div style={{backgroundColor: "rgba(227, 59, 65, 0.1)", display: "flex", justifyContent: "space-between", alignItems: "center", marginBlock: "15px", height: "45px", paddingInline: "10px", borderRadius: "var(--border-radius)", color: "var(--color-red-bold)", cursor: "pointer"}}><h1>Ընտրեք Հասցե</h1> <ChevronRight /></div>
					<textarea placeholder="Մեկնաբանություն" className={styles.textarea} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
					<div style={{display: "flex", marginTop: "15px", height: "60px", paddingInline: "10px", borderRadius: "var(--border-radius)", alignItems: "center", justifyContent: "space-between", color: "var(--color-red-bold)", border: "1px solid var(--main-color)"}} >
						<Gift />
						<input className={styles.promo} value={promocode} onChange={(e) => setPromocode(e.target.value)}></input>
						<button onClick={fetchPromo} className={styles.promoButton}>Կիրառել</button>
					</div>
					{sell === undefined ? <h1>պրոմոկոդը չի գործում</h1> : sell === null ? "" : <h1>ձեր ապրանքը զեղչվել է {sell} %-ով</h1>}
					<div style={{backgroundColor: "rgba(227, 59, 65, 0.1)", display: "flex", justifyContent: "space-between", alignItems: "center", marginBlock: "15px", height: "45px", paddingInline: "10px", borderRadius: "var(--border-radius)", color: "var(--color-red-bold)", cursor: "pointer"}}><h1>Ընտրեք վճարման եղանակը:
</h1> <ChevronRight /></div>
					<h1>Ես կարդում և համաձայն եմ դրանց <a href="https://bonee.net/terms-and-conditions-en.html" target="_blank" style={{color: "var(--color-red-bold)"}}>Պայմանների</a> և <a href="https://bonee.net/privacy-policy-am.html" target="_blank" style={{color: "var(--color-red-bold)", marginTop: "15px"}}>Գաղտնիության Քաղաքականության</a></h1>
					<button className={styles.submit} onClick={orderReq} disabled={!productsInCart.length}>ՀԱՍՏԱՏԵԼ</button>
				</div>
			</div>
			<Footer />
		</>
	)
}