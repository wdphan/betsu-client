import React from 'react'
import styles from '../styles/header.module.css'
import ConnectWallet from './wallet/ConnectWallet'

const Header = () => {
	return (
		<nav>
			<div className={styles.header}>
				<div className={styles.logo}>
					<a className={styles.logotext} aria-current="page" href="/">
						BETSU
					</a>
				</div>
				<div>
					<div className={styles.body}>
						<div className={styles.link}>
							<a className="nav-link" href="/listNFT">
								LIST NFT
							</a>
						</div>
						<div className={styles.link}>
							<a className="nav-link" href="/rent">
								RENT
							</a>
						</div>
						<div className={styles.link}>
							<a className="nav-link active" aria-current="page" href="/yourNFTs">
								YOUR NFTs
							</a>
						</div>
						<div className={styles.wallet}>
							<ConnectWallet />
						</div>
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Header
