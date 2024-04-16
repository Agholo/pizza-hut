"use client"

import styles from "./home.module.css"
import { useEffect, useState } from "react"
import ComponentProduct from "../../../components/ComponentProducts"
import axios from "axios"
import ComponentCategory from "../../../components/ComponentCategory"
import { ChevronLeft, ChevronRight, LoaderCircle } from "lucide-react"
import ComponentFooter from "../../../components/Footer"
import { useToast } from '@chakra-ui/react'

export interface IProduct {
	_id: string,
	name: string,
	price: string,
	image: string
}

interface extendedIProduct extends IProduct {
	count: number;
}

interface ICategory {
	_id: string,
	name: string,
	image: string
}

type TypeButton = { left: boolean, right: boolean}
type TypeTranslate = {category: number, product: number}

interface IDisabler {
	category: TypeButton,
	product: TypeButton
}

export default function PageHome() {
	const [ products, setProducts ] = useState<extendedIProduct[]>([])
	const [ loading, setLoading ] = useState<boolean>(true)
	const [ message, setMessage ] = useState<string | null>(null)
	const [ categories, setCategories ] = useState<ICategory[]>([])
	const [ translate, setTranslate ] = useState<TypeTranslate>({category: 0, product: 0})
	const [ disabler, setDisabler ] = useState<IDisabler>({category: {left: true, right: false}, product: {left: true, right: false}})

	const toast = useToast()

	useEffect(() => {
		const fetchData = async () => {
			const res = await axios.get("/api/product")
			const categoryResponse = await axios.get("/api/category")
			setCategories(categoryResponse.data)
			setProducts(res.data)
			setLoading(false)
		}
		fetchData()
	},[])

	function chevronClickHandler(type: string, direction: string) {
		if(type === "category") {
			if(direction === "left") {
				const changer = {product: translate.product, category: translate.category + 239.2}
				setTranslate(changer)
				if(translate.category >= -239.2) {
					setDisabler({...disabler, category: {left: true, right: false}})
				} else {
					setDisabler({...disabler, category: {left: false, right: false}})
				}
			} else {
				const changer = {product: translate.product, category: translate.category - 239.2}
				setTranslate(changer)
				if((categories.length - 7) * 239.2 <= -translate.category) {
					setDisabler({...disabler, category: {left: false, right: true}})
				} else {
					setDisabler({...disabler, category: {left: false, right: false}})
				}
			}
		} else {
			if(direction === "left") {
				const changer = {product: translate.product + 287, category: translate.category}
				setTranslate(changer)
				if(translate.product >= -287) {
					setDisabler({...disabler, product: {left: true, right: false}})
				} else {
					setDisabler({...disabler, product: {left: false, right: false}})
				}
			} else {
				const changer = {product: translate.product - 287, category: translate.category}
				setTranslate(changer)
				if((products.length - 6) * 287 <= -translate.product) {
					setDisabler({...disabler, product: {left: false, right: true}})
				} else {
					setDisabler({...disabler, product: {left: false, right: false}})
				}
			}
		}
	}

	return <>
		<div className={styles.contenier}>
			<div className={styles.category}>
				<div style={{display: "flex", alignItems: "center", justifyContent: "space-between", color: "var(--color-grey)", height: "20%", width: "100%"}}>
					<p style={{fontSize: "28px"}}>ԿԱՏԵԳՈՐԻԱՆԵՐ</p>
					<div style={{display: "flex"}}>
						<button className={styles.chevron} disabled={disabler.category.left} onClick={() => chevronClickHandler("category", "left")}><ChevronLeft /></button>
						<button className={styles.chevron}  disabled={disabler.category.right} onClick={() => chevronClickHandler("category", "right")}><ChevronRight /></button>
					</div>
				</div>
				<div className={styles.carousel} style={{transform: `translateX(${translate.category}px)`}}>
					{categories.map((category) => (
						<ComponentCategory name={category.name} image={category.image} height={"224.2"} width={"224.2"} id={category._id}/>
					))}
				</div>
			</div>
			<div className={styles.productSide}>
				<div style={{display: "flex", alignItems: "center", justifyContent: "space-between", color: "var(--color-grey)", height: "20%", width: "100%", marginBottom: "50px"}}>
					<p style={{fontSize: "28px"}}>ՀԱՏՈՒԿ ԱՌԱՋԱՐԿՆԵՐ</p>
					<div style={{display: "flex"}}>
						<button className={styles.chevron} disabled={disabler.product.left} onClick={() => chevronClickHandler("product", "left")}><ChevronLeft /></button>
						<button className={styles.chevron}  disabled={disabler.product.right} onClick={() => chevronClickHandler("product", "right")}><ChevronRight /></button>
					</div>
				</div>
				<div className={styles.content}>
					<div className={styles.carousel} style={{transform: `translateX(${translate.product}px)`}}>
						{!loading ? products.map((product: extendedIProduct) => (
							<ComponentProduct key={product._id} product={product} setMessage={setMessage}/>
						)) : <LoaderCircle className={styles.loader}/>}
					</div>
				</div>
			</div>
		</div>
		<ComponentFooter />
		{ message && toast({
			duration: 5000,
			status: message === "good" ? "success" : "error",
			title: message === "good" ? "Հաջողություն" : "Սխալ",
			position: "bottom-right",
			description: message === "good" ? "Ապրանքը հաջողությամբ ավելացվել է զամբյուղում" : "Ապրանքը չի ավելացվել զամբյուղում"
		}) }
	</>
}