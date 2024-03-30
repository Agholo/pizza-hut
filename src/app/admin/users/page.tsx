"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import styles from "../admin.module.css"
import { LoaderCircle } from "lucide-react"

interface user {
	_id: string,
	email: string,
	role: string;
}

export default function PageProduct() {
	const [ users, setUsers] = useState<user[]>([])
	const [ loading, setLoading ] = useState<boolean>(true)
	useEffect(() => {
		const fetchData = async () => {
			const data = await axios.get("/api/allUsers")
			setUsers(data.data)
			setLoading(false)
		}
		fetchData()
	},[])

	async function changeHandler(e: React.ChangeEvent<HTMLInputElement>, id: string) {
		try {
      const updatedRole = e.target.checked ? 'ADMIN' : 'USER';
			setLoading(true)
      await axios.put(`/api/user/${id}`, { role: updatedRole });
      setUsers(users.map(user => {
        if (user._id === id) {
          return { ...user, role: updatedRole };
        } else {
          return user;
        }
      }));
			setLoading(false)
    } catch (error) {
      console.error('Error updating role:', error);
    }
	}

	return <div>
		{ !loading ? <table>
			<thead>
				<tr>
					<th style={{paddingInline: "15px"}}>
						email
					</th>
					<th style={{paddingInline: "15px"}}>role</th>
				</tr>
			</thead>
			<tbody>
				{users.map(user => (
					<tr key={user._id}>
						<td style={{paddingInline: "15px"}}>{user.email}</td>
						<td style={{paddingInline: "15px", display: "flex"}}>
							<label className={styles.switch}><input type="checkbox" value={"ADMIN"} checked={user.role === "ADMIN"} onChange={(e) => changeHandler(e, user._id)} style={{marginInline: "10px"}} className={styles.inputS}/>
							<span className={`${styles.slider} ${styles.round}`}></span>
							</label>
						</td>
					</tr>
				)) }
			</tbody>
		</table> : <LoaderCircle className={styles.loader}/>}
	</div>
}