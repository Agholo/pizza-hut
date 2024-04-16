'use client'

import axios from "axios"
import { useState, useRef } from "react"
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure, 
	Button
} from '@chakra-ui/react'


export default function PagePromo() {
	const [ promocode, setPromocode ] = useState<string>("")
	const [ sall, setSall ] = useState<string>("0")
	const [ dateFrom, setDateFrom ] = useState<string>(new Date().toISOString().slice(0, 16))
	const [ dateTo, setDateTo ] = useState<string>(new Date().toISOString().slice(0, 16))
	const { isOpen, onOpen, onClose } = useDisclosure()
	const ref = useRef(null)

	async function postRequest() {
		const response = await axios.post("/api/promocode", { promocode, sall, dateFrom, dateTo })
		if(response.data.has) {
			onOpen()
		} else {
			setSall("0")
			setPromocode("")
			setDateFrom(new Date().toISOString().slice(0, 16))
			setDateTo(new Date().toISOString().slice(0, 16))
		}
	}

	async function updateRequest() {
		onClose()
		await axios.put("/api/promocode", { promocode, sall, dateFrom, dateTo })
		setSall("0")
		setPromocode("")
		setDateFrom(new Date().toISOString().slice(0, 16))
		setDateTo(new Date().toISOString().slice(0, 16))
	}

	return <div>
		<input type="text" placeholder="Promocode" value={promocode} onChange={(e) => setPromocode(e.target.value)}/>
		<div style={{display: "flex"}}><input type="number" value={sall} min={0} max={100} onChange={(e) => setSall(e.target.value)}/><p>%</p></div>
		<input
			type="datetime-local"
			value={dateFrom}
			min={dateFrom}
			max={dateTo} 
			onChange={(e) => setDateFrom(e.target.value)}/>
		<input
			type="datetime-local"
			value={dateTo}
			min={dateFrom} 
			onChange={(e) => setDateTo(e.target.value)}/>
			<Button colorScheme='red' onClick={postRequest}>
        create
      </Button>

      <AlertDialog
        isOpen={isOpen}
				leastDestructiveRef={ref}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Promocode already valid
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure to change promocode? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose} ref={ref}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={updateRequest} ml={3}>
                Change
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
	</div>
}