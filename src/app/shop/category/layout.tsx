'use client'

import axios from "axios";
import ComponentCategory from "../../../../components/ComponentCategory"
import { useEffect, useState } from "react"

interface ICategory {
	name: string;
	image: string;
	_id: string
}

export default function LayoutCategory({children}: Readonly<{children: React.ReactNode}>) {
	const [ categories, setCategories ] = useState<ICategory[]>([])
			useEffect(() => {
				const fetchData = async () => {
					const response = await axios.get("/api/category")
					setCategories(response.data)
				}
				fetchData()
			},[])
	return <>
			<div style={{marginInline: "auto", width: "60%", display: "flex", gap: "10px"}}>
					{
						categories.map(category => (
							<ComponentCategory height="75" width="110" name={category.name} image={category.image} id={category._id}/>
						))
					}
				</div>
			{children}
	</>
}
