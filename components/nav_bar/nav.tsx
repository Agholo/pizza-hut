"use client"

import styles from "./nav.module.css"
import { useRouter } from "next/navigation"
import {CircleUserRound, ShoppingCart, User} from "lucide-react"
import { useContext, useState } from "react"
import { cartContext } from "../../providers/cartProvider"
import ComponentCart from "../cart/ComponentCart"


export default function ComponentNav({isAuth, isAdmin}: {isAuth: boolean, isAdmin: boolean}) {
	const router = useRouter()
	const { productsInCart } = useContext(cartContext)
	const [isOpen, setIsOpen ] = useState<boolean>(false)

	function registerBehavier(isAuth: boolean) {
		if(isAuth) {
			return (
				<User style={{fill: "red", color: "red", marginInline: "10px"}} onClick={() => router.push("/settings/")}/>
			)
		}
		return (
			<User onClick={() => router.push("/auth/login")} style={{marginInline: "10px"}}/>
		)
	}

	return <nav className={styles.cont}>
		<div style={{display: "flex", alignItems: "center"}}>
			<img src={"https://bonee.blob.core.windows.net/images/b2167a89-02a4-2b85-b68b-efbdc4238980_1.png"} height={40} width={40} alt="logo" onClick={() => router.push("/shop")} style={{cursor: "pointer", borderRadius: "20px", marginRight: "15px"}}/>
			<div>
			<p style={{color: "var(--color-grey)"}}>WELCOME TO</p>
			<h4 style={{color: "var(--color-red)"}}>PIZZA-HUT ARMENIA</h4>
			</div>
		</div>
		{isAdmin && <button className={styles.redButton} onClick={() => router.replace("/admin/dashboard")}><CircleUserRound  style={{marginRight: "5px"}}/>ԱԴՄԻՆ</button>}
		<div className={styles.buttonCont}>
			{registerBehavier(isAuth)}
			<ShoppingCart onClick={() => setIsOpen(true)}/>
			<span style={{height: "15px", width: "15px", borderRadius: "50%", backgroundColor: "var(--color-red)", textAlign: "center", color: "white", position: "relative", top: "-10px", left: "-10px", fontSize: "12px"}}>{productsInCart.length}</span>
		</div>
		{isOpen && <ComponentCart setIsOpen={setIsOpen} />}
	</nav>	
}