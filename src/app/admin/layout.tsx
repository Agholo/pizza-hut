"use client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import PanelComponent from "../../../components/admin_panel/ComponentAdminPanel"


export default function PageAdmin({children}: Readonly<{children: React.ReactNode}>) {
	const [isAdmin, setIsAdmin] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(true)
	const router = useRouter()


	useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/users");
        const userRole = response.data.role;

        setIsAdmin(userRole === "ADMIN");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.replace("/shop");
    }
  }, [isAdmin, loading]);

  if (loading) {
    return null;
  }

	return <div>
    <PanelComponent>
      {children}
    </PanelComponent>



  </div>
}
