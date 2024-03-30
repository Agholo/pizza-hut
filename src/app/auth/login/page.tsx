"use client"

import Link from "next/link"
import styles from "../auth.module.css"
import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

export default function PageLogin() {
	const [email, setEmail] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const [pending, setPending] = useState<boolean>(false)
	const router = useRouter()

	async function clickHandler(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    setPending(true);
    try {
        await axios.post("/api/login", { email, password });
        router.replace("/shop")
    } catch (error) {
        console.error("Error:", error);
        setPending(false);
    }
	}
	useEffect(() => {
		const authCookie = Cookies.get("auth")
		if(authCookie) {
			router.replace("/shop")
		}
	},[])

	return (
		<div className={styles.main}>
			<div className={styles.leftHand}>
				<div className={styles.leftHandCont}>
					<div style={{display: "flex", alignItems: "center", justifyContent: "center", color: "white", width: "600px"}}>
						<div style={{height: "50px", width: "50px", border: "10px solid white", borderRadius: "50%", marginRight: "15px"}}></div>
						<div>
							<h3>Բարի գալուստ</h3>
							<h1>pizza hut armenia menu</h1>
						</div>
					</div>
					<div style={{textAlign: "center", color: "white"}}>
						<h3>Գրանցվեք ու մուռք գործեք բոլոր խառայություններից օգտվելու համաև</h3>
					</div>
					<Link href={"/auth/register"} style={{width: "100%"}}><button className={styles.redButton}>Գրանցվել</button></Link>
				</div>

			</div>
			<div className={styles.rightHand}>
				<div className={styles.rightHandCont}>
					<h1 style={{marginBottom: "25px"}}>ՄՈՒՏՔ</h1>
					<form>
						<input type="email" placeholder="Email" disabled={pending} className={styles.input} value={email} onChange={(event) => 
							setEmail(event.target.value)}/>
						<br></br>
						<input type="password" placeholder="Password" disabled={pending} className={styles.input} value={password} onChange={(event) => setPassword(event.target.value)}/>
						<br></br>
						<button className={styles.submitButton} onClick={(e) => clickHandler(e)} disabled={pending}>{pending ? "Logining..." : "login"}</button>
					</form>
					<br></br>
						<Link href={"/auth/recover"} style={{color: "var(--color-red)"}} className={styles.decor}>Գաղտնաբառի վերականգնում</Link>
				</div>
			</div>
		</div>
	)
}