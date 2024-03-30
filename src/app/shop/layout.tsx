"use client"

import { useEffect, useState } from "react"
import Nav from "../../../components/nav_bar/nav"
import Cookies from "js-cookie"
import axios from "axios"
import CartProvider from "../../../providers/cartProvider"
import { ChakraProvider } from '@chakra-ui/react'
import styles from "./home.module.css"
import { Search } from "lucide-react"

export default function LayoutMain({children}: Readonly<{children: React.ReactNode}>) {

	const [isAuth, setIsAuth ] = useState<boolean>(false)
	const [isAdmin, setIsAdmin] = useState<boolean>(false)

	useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/users");
        const userRole = response.data?.role;

        setIsAdmin(userRole === "ADMIN");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isAdmin) {
      window.location.reload(); // hydradation problem warning/error
    }
  }, []);

	useEffect(() => {
		const authCookie = Cookies.get("auth")
		if(authCookie) {
			setIsAuth(true)
		} else {
			setIsAuth(false)
		}
	},[])

	return (
		<>
			<ChakraProvider>
				<CartProvider>
					<Nav isAuth={isAuth} isAdmin={isAdmin}/>
					<div className={styles.search}>
						<button className={styles.allRedButton}>ԲՈԼՈՐ ԱՊՐԱՆՔՆԵՐԸ</button>
						<input type="search" className={styles.searchInput} placeholder="type a name of a dish..."></input>
						<button className={styles.searchButton}><Search /></button>
					</div>
					{children}
				</CartProvider>
			</ChakraProvider>
		</>
	)
}