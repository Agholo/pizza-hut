'use client'

import Image from "next/image"
import styles from "./components.module.css"
import { useRouter } from "next/navigation"

export default function ComponentCategory({height, width, name, image, id}: {height: string, width: string, name: string, image: string, id: string}) {
	const router = useRouter()
	return (
		<div style={{height: `${height}px`, minWidth: `${width}px`}} className={styles.product} onClick={() => router.push(`shop/category/${id}`)}>
			<Image src={image} alt={name} height={+height} width={+width} className={styles.img}></Image>
			<div className={styles.textSide}>{name}</div>
		</div>
	)
}