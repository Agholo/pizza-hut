import { usePathname } from "next/navigation"
import styles from "./adminPanel.module.css"
import Link from "next/link"
import { Gift, Home, LayoutDashboard, PackageSearch, Plus, Users } from "lucide-react"

export default function ComponentAdminPanel({children}: Readonly<{children: React.ReactNode}>) {
	const pathName = usePathname()
	const currentPathname = pathName?.split("/").pop()
	return (
		<div className={styles.nav}>
			<div>
				<Link href={"/admin/dashboard"}><div className={`${styles.link} ${currentPathname === "dashboard" ? styles.active : ""}`}><LayoutDashboard style={{marginInline: "10px"}}/>Dashboard</div></Link>
				<Link href={"/admin/products"}><div className={`${styles.link} ${currentPathname === "products" ? styles.active : ""}`}><Plus style={{marginInline: "10px"}}/>Products</div></Link>
				<Link href={"/admin/categories"}><div className={`${styles.link} ${currentPathname === "categories" ? styles.active : ""}`}><Plus style={{marginInline: "10px"}}/>Categories</div></Link>
				<Link href={"/admin/orders"}><div className={`${styles.link} ${currentPathname === "orders" ? styles.active : ""}`}><PackageSearch style={{marginInline: "10px"}}/>Orders</div></Link>
				<Link href={"/admin/users"}><div className={`${styles.link} ${currentPathname === "users" ? styles.active : ""}`}><Users style={{marginInline: "10px"}}/>Users</div></Link>
				<Link href={"/admin/promocodes"}><div className={`${styles.link} ${currentPathname === "promocodes" ? styles.active : ""}`}><Gift style={{marginInline: "10px"}}/>Promocodes</div></Link>
				<Link href={"/shop"}><div className={`${styles.link} ${styles.hover}`}><Home style={{marginInline: "10px"}}/>Home</div></Link>
			</div>
			<div className={styles.content}>
				{children}
			</div>
		</div>
	)
}