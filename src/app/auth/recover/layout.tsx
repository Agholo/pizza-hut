"use client"

import styles from "../auth.module.css"
import Link from "next/link"


export default function LayoutRecover({children}: Readonly<{children: React.ReactNode}>) {
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
				{children}
			</div>
		</div>
	)
}