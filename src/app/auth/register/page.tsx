"use client"

import Link from "next/link"
import styles from "../auth.module.css"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"


export default function PageLogin() {
	const router = useRouter()
	const [email, setEmail] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const [repeat, setRepeat] = useState<string>("")
	const [errors, setErrors] = useState<string[]>([])
	const [pending, setPending] = useState<boolean>(false)

	async function clickHandler(event: React.FormEvent<HTMLFormElement>) {
		setPending(!pending)
		event.preventDefault();
		await axios.post("/api/register", {email, password })
		router.replace("/auth/login")
	}

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
					<Link href={"/auth/login"} style={{width: "100%"}}><button className={styles.redButton}>Մուտք գործել</button></Link>
				</div>
			</div>
			<div className={styles.rightHand}>
				<div className={styles.rightHandCont}>
				<h1 style={{marginBottom: "25px"}}>ԳՐԱՆՑՈՒՄ</h1>
				<form onSubmit={clickHandler}>
					<div style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
						<input type="text" placeholder="ԱՆՈՒՆ" className={styles.input} style={{width: "48%"}}></input>
						<input type="text" placeholder="ԱԶԳԱՆՈՒՆ" className={styles.input} style={{width: "48%"}}></input>
					</div>
					<input type="email" placeholder="Email" disabled={pending} className={styles.input} value={email} onChange={(event) => 
						setEmail(event.target.value)}/>
					<br></br>
					<input type="password" placeholder="Password" disabled={pending} className={styles.input} value={password} onChange={(event) => setPassword(event.target.value)}/>
					<input type="password" placeholder="Repeat Password" disabled={pending} className={styles.input} value={repeat} onChange={(event) => setRepeat(event.target.value)}/>
					<br></br>
					<button className={styles.submitButton} type="submit" disabled={pending}>{pending ? "Signing" : "Sign up"}</button>
				</form>
				</div>
			</div>
		</div>
	)
}