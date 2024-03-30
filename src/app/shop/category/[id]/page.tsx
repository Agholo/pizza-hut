'use client'

import axios from "axios";
import ComponentProduct from "../../../../../components/ComponentProducts";
import { useParams } from "next/navigation";
import styles from "../../home.module.css"
import { useEffect, useState } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react'

interface IProduct {
	name: string;
	image: string;
	price: string;
	category: string;
	_id: string
}


export default function CategoryPage() {
	const [ products, setProducts ] = useState<IProduct[]>([])
	const [ message, setMessage ] = useState<string | null>(null)
	const params = useParams()
	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(`/api/products/${params?.id}`)
			setProducts(response.data)
		}
		fetchData()
	}, [])
	return <div style={{marginInline: "auto", width: "94%"}}>
		<h1 style={{fontSize: "25px", marginTop: "60px"}}>{products?.[0]?.category}</h1>
		<div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", marginTop: "15px", gap: "15px"}}>
			{
				products.map(product => (
					<ComponentProduct key={product._id} product={product} setMessage={setMessage} />
				))
			}
		</div>
		{message && <Alert status={message === "good" ? "success" : "warning"} style={{position: "fixed", bottom: "15px", right: "15px", width: "25%"}} variant='top-accent' className={styles.active}>
			<AlertIcon />
			<AlertTitle>{message === "good" ? "Ապրանքը հաջողությամբ ավելացվել է զամբյուղում" : "Զամբյուղում ապրանք ավելացնելու համար անհրաժեշտ է մուտք գործել"}</AlertTitle>
		</Alert>}
	</div>
}