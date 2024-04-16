"use client"

import { Dispatch, SetStateAction } from "react"
import { AbsoluteCenter, CloseButton, Divider } from '@chakra-ui/react'
import { useRouter } from "next/navigation"
import styles from "./popups.module.css"
import { ILocationInfo } from "../../src/app/shop/basket/page"

interface IProps {
	setOpenPopup: Dispatch<SetStateAction<boolean>> 
	setLocation: Dispatch<SetStateAction<ILocationInfo | undefined>>
	locations: {description: string, location: string}[]
}

export default function LocationPopup({ setOpenPopup, setLocation, locations }: IProps) {

	const router = useRouter()

	return (
		<div className={styles.backgroundLocation} onClick={() => setOpenPopup(false)}>
			<div className={styles.contentLocation} onClick={(e) => e.stopPropagation()}>
				<CloseButton onClick={() => setOpenPopup(false)}/>
				{
					locations.map((location: ILocationInfo) => (
						<div onClick={() => {setLocation({location: location.location, description: location.description}); setOpenPopup(false)}} className={styles.location}>{location.location}</div>
					))
				}
				{locations.length ? <div style={{position: "relative"}}>
					<Divider />
					<AbsoluteCenter bg='white' px='4'>
						ԿԱՄ
					</AbsoluteCenter>
				</div> : ""}
				<button className={styles.addButton} onClick={() => router.push("/location")}>+ Ավելացնել հասցե</button>
			</div>
		</div>
	)
}