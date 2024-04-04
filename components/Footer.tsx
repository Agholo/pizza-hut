import { Facebook, Github, Instagram, Mail, MapPin, Phone } from "lucide-react";
import styles from "./components.module.css"

export default function ComponentFooter() {
	return (
		<footer style={{marginTop: "105px", color: "white",backgroundColor: "var(--main-color)", padding: "20px"}}>
			<span style={{display: "flex", marginBlock: "7.5px"}}><MapPin /><a href="https://www.google.com/maps/place/40%C2%B011'00.9%22N+44%C2%B030'54.7%22E/@40.1835788,44.5151964,17z/data=!3m1!4b1!4m4!3m3!8m2!3d40.1835788!4d44.5151964?entry=ttu" className={styles.location}>1 Northern Ave, Երևան, Հայաստան</a></span>
			<span style={{display: "flex", marginBlock: "7.5px"}}><MapPin /><a href="https://www.google.com/maps/place/40%C2%B011'00.9%22N+44%C2%B030'54.7%22E/@40.1835788,44.5151964,17z/data=!3m1!4b1!4m4!3m3!8m2!3d40.1835788!4d44.5151964?entry=ttu" className={styles.location}>1 Northern Ave, Երևան, Հայաստան</a></span><span style={{display: "flex", marginBlock: "7.5px"}}><MapPin /><a href="https://www.google.com/maps/place/40%C2%B011'00.9%22N+44%C2%B030'54.7%22E/@40.1835788,44.5151964,17z/data=!3m1!4b1!4m4!3m3!8m2!3d40.1835788!4d44.5151964?entry=ttu" className={styles.location}>1 Northern Ave, Երևան, Հայաստան</a></span><span style={{display: "flex", marginBlock: "7.5px"}}><MapPin /><a href="https://www.google.com/maps/place/40%C2%B011'00.9%22N+44%C2%B030'54.7%22E/@40.1835788,44.5151964,17z/data=!3m1!4b1!4m4!3m3!8m2!3d40.1835788!4d44.5151964?entry=ttu" className={styles.location}>1 Northern Ave, Երևան, Հայաստան</a></span><span style={{display: "flex", marginBlock: "7.5px"}}><MapPin /><a href="https://www.google.com/maps/place/40%C2%B011'00.9%22N+44%C2%B030'54.7%22E/@40.1835788,44.5151964,17z/data=!3m1!4b1!4m4!3m3!8m2!3d40.1835788!4d44.5151964?entry=ttu" className={styles.location}>1 Northern Ave, Երևան, Հայաստան</a></span><span style={{display: "flex", marginBlock: "7.5px"}}><MapPin /><a href="https://www.google.com/maps/place/40%C2%B011'00.9%22N+44%C2%B030'54.7%22E/@40.1835788,44.5151964,17z/data=!3m1!4b1!4m4!3m3!8m2!3d40.1835788!4d44.5151964?entry=ttu" className={styles.location}>1 Northern Ave, Երևան, Հայաստան</a></span><span style={{display: "flex", marginBlock: "7.5px"}}><MapPin /><a href="https://www.google.com/maps/place/40%C2%B011'00.9%22N+44%C2%B030'54.7%22E/@40.1835788,44.5151964,17z/data=!3m1!4b1!4m4!3m3!8m2!3d40.1835788!4d44.5151964?entry=ttu" className={styles.location}>1 Northern Ave, Երևան, Հայաստան</a></span><span style={{display: "flex", marginBlock: "7.5px"}}><MapPin /><a href="https://www.google.com/maps/place/40%C2%B011'00.9%22N+44%C2%B030'54.7%22E/@40.1835788,44.5151964,17z/data=!3m1!4b1!4m4!3m3!8m2!3d40.1835788!4d44.5151964?entry=ttu" className={styles.location}>1 Northern Ave, Երևան, Հայաստան</a></span>
			<div style={{display: "flex", marginTop: "35px"}}>
				<span style={{display: "flex", marginRight: "15px"}}><Phone /><p className={styles.location}>+374 98 400 370</p></span>
				<span style={{display: 'flex', marginLeft: "15px"}}><Mail /><p className={styles.location}>asatryanpaga@gmail.com</p></span>
			</div>
			<div style={{display: "flex", marginTop: "35px"}}>
				<button className={`${styles.socialMedia} ${styles.f}`}><Facebook /></button>
				<button className={`${styles.socialMedia} ${styles.i}`}><Instagram /></button>
				<button className={`${styles.socialMedia} ${styles.g}`}><Github /></button>
			</div>
		</footer>
	)
}