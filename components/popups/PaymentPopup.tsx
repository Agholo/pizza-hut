"use client"

import { Dispatch, SetStateAction } from "react"
import { CloseButton, useToast } from '@chakra-ui/react'
import styles from "./popups.module.css"
import { Banknote, CreditCard, Landmark, Wallet } from "lucide-react"

interface IProps {
	setOpenPopup: Dispatch<SetStateAction<boolean>> 
	setPeyMethod: Dispatch<SetStateAction<React.ReactElement | null>>
}

export default function PaymentPopup({ setOpenPopup, setPeyMethod } : IProps) {
	const toast = useToast()
	return (
		<div className={styles.background} onClick={() => setOpenPopup(false)}>
			<div className={styles.content} onClick={(e) => e.stopPropagation()}>
				<CloseButton onClick={() => setOpenPopup(false)} colorScheme="red"/>
				<h1>ՎՃԱՄԱՆ ՄԵԹՈԴՆԵՐ</h1>
				<div className={styles.method} onClick={() => {setPeyMethod(<div style={{display: "flex"}}><Wallet  style={{marginRight: "10px"}}/> CASH</div>); setOpenPopup(false); return toast({
          title: 'success',
          description: "Վճարման եղանակը եղանակը հաջողությամբ ընտրված է (CASH)",
					position: "bottom-right",
          status: 'success',
          duration: 3000,
        })} }><Wallet  style={{marginRight: "10px"}}/> CASH</div>
				<div className={styles.method} onClick={() =>
        toast({
          title: 'ERROR',
          description: "Վճարման եղանակը ժամանակավորապես անհասանելի է",
					position: "bottom-right",
          status: 'error',
          duration: 3000,
        })
      }><CreditCard  style={{marginRight: "10px"}}/> ONLINE</div>
				<div className={styles.method} onClick={() =>
        toast({
          title: 'ERROR',
          description: "Վճարման եղանակը ժամանակավորապես անհասանելի է",
					position: "bottom-right",
          status: 'error',
          duration: 3000,
        })
      }><Banknote style={{marginRight: "10px"}}/> IDRAM</div>
				<div className={styles.method} onClick={() =>
        toast({
          title: 'ERROR',
          description: "Վճարման եղանակը ժամանակավորապես անհասանելի է",
					position: "bottom-right",
          status: 'error',
          duration: 3000,
        })
      }><Landmark  style={{marginRight: "10px"}}/> POS TERMINAL</div>
			</div>
		</div>
	)
}