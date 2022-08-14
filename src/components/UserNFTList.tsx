import { useEffect, useState } from 'react'
import NFTCard from './NFTCard'

import { Network, Alchemy } from 'alchemy-sdk'
import { FetchNFTs } from '@/utils/FetchNFT'
import { responseSymbol } from 'next/dist/server/web/spec-compliant/fetch-event'
import { useAccount, useEnsName } from 'wagmi'

const NFTList = () => {
	const { address } = useAccount()
	const [NFTs, setNFTs] = useState([])

	const UserNFTList = async () => {
		const options = { method: 'GET', headers: { Accept: 'application/json' } }

		const apiKey = 'b9AaSkzhNb2K_LLmyZ30QrQeoPjOTyiB'

		const response = await fetch(
			`https://eth-mainnet.g.alchemy.com/nft/v2/${apiKey}/getNFTs?owner=${address}&withMetadata=true`,
			options
		)

		const data = await response.json()

		setNFTs(data.ownedNfts)
	}

	// need to setNFTs with response from JSON
	useEffect(() => {
		UserNFTList()
	}, [address])

	// NFT CARDS DISPLAYED
	return (
		<div>
			<section className="flex flex-wrap justify-center align-center">
				{NFTs ? (
					NFTs.map(NFT => {
						return (
							<NFTCard
								image={NFT.media[0].gateway}
								id={NFT.id.tokenId}
								title={NFT.title}
								address={NFT.contract.address}
								description={NFT.description}
								attributes={NFT.metadata.attributes}
							></NFTCard>
						)
					})
				) : (
					<div>No NFTs found</div>
				)}
			</section>
		</div>
	)
}
export default NFTList
// NFT Card is working since I replaced it in rent.tsx and it showed up without data.
// data is showing up in dom
// so the only thing is that the NFT Card is not working in USERNFTList.tsx. It's not able to disolay the NFT Card.

// image={NFT.media[0].gateway}
// id={NFT.id.tokenId}
// title={NFT.title}
// address={NFT.contract.address}
// description={NFT.description}
// attributes={NFT.metadata.attributes}
