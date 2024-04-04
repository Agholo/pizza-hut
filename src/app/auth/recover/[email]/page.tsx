"use client"

import { useState, useEffect, ChangeEvent } from "react"
import styles from "../../auth.module.css"
import { PinInput, PinInputField, HStack } from '@chakra-ui/react'
import axios from "axios"
import { useParams, useRouter } from "next/navigation"

export default function PagePinRecover() {
	const [ timer, setTimer ] = useState<number>(120)
	const [ error, setError ] = useState<boolean>(false)
	const [ pin, setPin ] = useState<string[]>([])
	const router = useRouter()
	const params = useParams<{ email?: string}>()

	async function mailer() {
		const email = params?.email?.replace("%40", "@")
		await axios.post('/api/recover', { email });
		setPin([])
		setError(false)
		setTimer(120)
	}

	useEffect(() => {
		const id = setInterval(() => {
			setTimer((prev) => prev - 1)
		}, 1000)

		return () => clearInterval(id)
	}, [])

	async function pinFetch() {
		const response = await axios.post("/api/recover", { pin: pin.join(""), email: params?.email?.replace("%40", "@") })
		if(response.data.message === "good") {
			router.replace(`/auth/recover/${params?.email?.replace("%40", "@")}/change`)
		} else {
			setError(true)
			setTimer(-1)
		}
	}

	function changeHandler(e: ChangeEvent<HTMLInputElement>, index: number) {
		const tmp = [...pin]
		tmp[index] = e.target.value
		setPin(tmp)
	}

	return (
		<div className={styles.rightHandCont}>
			<h1 style={{marginBottom: "25px"}}>ՎԵՐԱԿԱՆԳՆՈՒՄ</h1>
			<h2>Խնդրում ենք ստուգել ձեր էլ. փոստը և մուտքագրել ստացված հաստատման կոդը</h2>
			<HStack style={{marginInline: "auto", marginTop: "15px"}}>
				{/* <PinInput onComplete={pinFetch}> // has bug*/}
				<PinInput>
					<PinInputField className={styles.pinInput} value={pin[0]} onChange={(e) => changeHandler(e, 0)}/>
					<PinInputField className={styles.pinInput} value={pin[1]} onChange={(e) => changeHandler(e, 1)}/>
					<PinInputField className={styles.pinInput} value={pin[2]} onChange={(e) => changeHandler(e, 2)}/>
					<PinInputField className={styles.pinInput} value={pin[3]} onChange={(e) => changeHandler(e, 3)}/>
				</PinInput>
			</HStack>
			{error && <p style={{color: 'red'}}>Սխալ մուտքագրված պին կոդ</p>}
			{timer >= 0 ? <p style={{marginTop: "15px"}}>{timer}</p> : <p style={{color: "var(--color-red-bold)", marginTop: "15px", cursor: "pointer"}} onClick={mailer}>Կրկին ուղարկել կոդ</p>}
			<button className={styles.submitButton} type="submit" onClick={pinFetch}>ՎԵՐԱԿԱՆԳՆԵԼ</button>
		</div>
	)
}