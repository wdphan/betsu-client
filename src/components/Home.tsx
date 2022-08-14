import React from 'react'
import styles from '../styles/home.module.css'
import Image from 'next/image'
import Image1 from '/public/images/01.png'
import Image2 from '/public/images/02.png'
import Image3 from '/public/images/03.png'
import Link from 'next/link'

const Home = () => {
	return (
		<div className={styles.left_box}>
			<div className={styles.left_text}>
				<h3 className={styles.h3}>RENT NFTS WITH</h3>
				<h1 className={styles.h1}>BETSU</h1>
				<div className={styles.japanese}>別 - ANOTHER</div>
				<div>
					<Link href="/rent">
						<button className={styles.button1}>ENTER APP</button>
					</Link>

					<button className={styles.button2}>JOIN DISCORD</button>
				</div>
				<div className={styles.description}>
					The NFT rental market is largely born out of the fact that NFTs have utility. Rent out the NFT and
					you rent out whatever utility it comes with. This has potential benefits for NFT lenders &
					borrowers. For borrowers, it opens an opportunity to join the NFT community or take advantage of an
					NFT’s utility they otherwise wouldn’t be able to afford, even if only for a brief period. There is a
					financial incentive for lenders to take advantage of their assets & earn passive income.
				</div>
			</div>

			<div className={styles.image1}>
				<Image src={Image1} alt="image1" />
			</div>
			<div className={styles.image2}>
				<Image src={Image2} alt="image2" />
			</div>
			<div className={styles.image3}>
				<Image src={Image3} alt="image3" />
			</div>
		</div>
	)
}

export default Home
