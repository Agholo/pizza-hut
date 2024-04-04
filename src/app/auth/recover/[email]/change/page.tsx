"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import styles from "../../../auth.module.css"
import axios from "axios"

export default function PageChange() {
	const [ password, setPassword ] = useState<string>("")
	const [ repeat, setRepeat ] = useState<string>("")
	const [ error, setError ] = useState<boolean>(false)

	const router = useRouter()

	async function change() {
		if(password !== repeat ) {
			setError(true)
		} else {
			await axios.put("/api/users", { password })
			router.replace("/auth/login")
		}
	}

	return (
		<div className={styles.rightHandCont}>
			<h1 style={{marginBottom: "25px"}}>ՎԵՐԱԿԱՆԳՆԵԼ ԳԱՂՏՆԱԲԱՌԸ</h1>
			<input type="password" placeholder="Password" className={styles.input} value={password} onChange={(event) => setPassword(event.target.value)}/>
			<input type="password" placeholder="Repeat Password" className={styles.input} value={repeat} onChange={(event) => setRepeat(event.target.value)}/>
			{error && <h1 style={{}}>ԳԱՂՏՆԱԲԱՌԵՐԸ ՉԵՆ ՀԱՄԱՊԱՏԱՍխԱՆՈՒՄ</h1>}
			<button className={styles.redButton} style={{width: "100%", marginTop: "5px"}} onClick={change}>ՊԱՀՊԱՆԵԼ ԳԱՂՏՆԱԲԱՌԸ</button>
		</div>
	)
}