import React from 'react'
import Header from '@/components/Header'
import styles from '../styles/rent.module.css'
import { useAccount, useEnsName } from 'wagmi'
import UserNFTList from '@/components/UserNFTList'
import NFTCard from '@/components/NFTCard'
import RentButton from '@/components/RentButton'

// Rent page of all listed NFTs for rent - marketplace page

const rent = () => {
	const { address, isConnecting, isDisconnected } = useAccount()

	if (isConnecting) return <div>Connecting…</div>
	if (isDisconnected) return <div>Disconnected</div>

	// fix ENS
	const { data, error, isLoading, refetch } = useEnsName({
		// address: address,
		// enabled: true,
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
					<RentButton />
					<UserNFTList />
					<div className="pb-32"></div>
				</div>
			</div>
		</div>
	)
}

export default rent
