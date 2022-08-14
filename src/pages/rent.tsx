import React from 'react'
import Header from '@/components/Header'
import styles from '../styles/rent.module.css'
import { useAccount, useEnsName } from 'wagmi'
import UserNFTList from '@/components/UserNFTList'
import NFTCard from '@/components/NFTCard'

const rent = () => {
	const { address, isConnecting, isDisconnected } = useAccount()

	if (isConnecting) return <div>Connecting…</div>
	if (isDisconnected) return <div>Disconnected</div>

	const { data, error, isLoading, refetch } = useEnsName({
		address: address,
		enabled: true,
	})

	if (isLoading) return <div>Connecting…</div>
	if (error) return <div>{address}</div>

	return (
		<div>
			<Header />
			<div className={styles.container}>
				<div className={styles.header}>RENT OUT YOUR NFTS</div>
				<div className={styles.ethname}>{data}</div>
				<div className={styles.address}>{address ?? 'Loading address'}</div>
				<div>
					<UserNFTList />
				</div>
				<div className={styles.border}>
					<button className={styles.button}>RENT OUT NFT</button>
				</div>
			</div>
		</div>
	)
}

export default rent
