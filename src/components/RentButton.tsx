import React from 'react'
import styles from '../styles/rentbutton.module.css'

const RentButton = () => {
	return (
		<div className={styles.container}>
			<div className={styles.border}>
				<button className={styles.button}>RENT OUT NFT</button>
			</div>
		</div>
	)
}

export default RentButton
