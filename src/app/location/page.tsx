'use client'

import styles from "./location.module.css"
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function PageLocation() {
	const [ but, setBut ] = useState<boolean>(true)
	const [ location, setLocation ] = useState<string>("")
	const [ description, setDescription ] = useState<string>("")
	const [ error, setError ] = useState<string>("")

	const router = useRouter()

	async function addLocation() {
		router.push("/shop/basket")
		if(location.trim()) {
			await axios.post("api/location", { location, description })
		} else {
			setError("required filesd")
		}
	} 

	return (
		<div style={{display: "flex"}}>
			<div style={{height: "100vh", width: "50%", padding: "25px"}}>
				<h1>ԱՎԵԼԱՑՆԵԼ ԵՒՍ ՄԵԿ ՀԱՍՑԵ</h1>
				<div style={{display: "flex", marginBlock: "10px", alignItems: "center", justifyContent: "space-between"}}>
					<button className={`${styles.method} ${but ? styles.active : ""}`} onClick={() => setBut(true)}>Մուտքագրեք հասցեն</button>
					<h3>ԿԱՄ</h3>
					<button className={`${styles.method} ${!but ? styles.active : ""}`} onClick={() => setBut(false)}>Նշեք քարտեզի վրա</button>
				</div>
				<input type="text" onChange={(e) => setLocation(e.target.value)} placeholder="make this better after taking google maps api (required field*)" className={styles.input} value={location}></input>
				<h4 style={{color: "var(--color-red)"}}>{error}</h4>
				<h3>Կուրի համար լրացուցիչ ցուցումներ</h3>
				<textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Մուտք / հարկ / բնակարան/ այլ" className={styles.input} style={{padding: "10px", resize: "vertical", height: "110px"}}></textarea>
				<div style={{display: "flex", width: "100%", justifyContent: "space-between"}}>
					<button className={styles.action} style={{color: "var(--color-red)"}} onClick={() => router.push("/shop/basket")}>Փակել</button>
					<button className={styles.action} style={{color: "white", backgroundColor: "var(--color-red)"}} onClick={addLocation}>Պահպանել</button>
				</div>
			</div>
			<div style={{height: "100vh", width: "50%"}}>
				<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21624.362185044964!2d44.50867413089779!3d40.192328074146836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abce217b8839d%3A0x80bc65ebce1f70f!2sArmenian%20National%20Opera%20and%20Ballet%20Theatre!5e0!3m2!1sen!2sam!4v1712775301281!5m2!1sen!2sam" loading="lazy" style={{height: "100%", width: "100%"}}></iframe>
			</div>
		</div>
	)
}