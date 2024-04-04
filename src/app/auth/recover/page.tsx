"use client"

import styles from "../auth.module.css"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"


export default function PageRecover() {
	const [ email, setEmail ] = useState<string>("")
	const [ pending, setPending ] = useState<boolean>(false)
	const [ hasError, setHasError ] = useState<boolean>(false)
	const router = useRouter()

	async function mailer() {
		const response = await axios.post('/api/recover', { email });
		if(response.data.message === "not found") {
			setHasError(true)
		} else {
			setHasError(false)
		}
		router.push(`/auth/recover/${email}`)
	}

	return (
		<div className={styles.rightHandCont}>
			<h1 style={{marginBottom: "25px"}}>ՎԵՐԱԿԱՆԳՆԵԼ ԳԱՂՏՆԱԲԱՌԸ</h1>
			<h2>Խնդրում ենք մուտքագրել ձեր հաշվի էլփոստի հասցեն</h2>
			<input type="email" placeholder="Email" disabled={pending} className={styles.input} value={email} onChange={(event) => setEmail(event.target.value)}/>
			{hasError && <h1 style={{color: "var(--color-red-bold)"}}>something went wrong</h1>}
			<button className={styles.submitButton} type="submit" disabled={pending || !email.length || hasError} onClick={mailer}>ՎԵՐԱԿԱՆԳՆԵԼ</button>
		</div>
	)
}