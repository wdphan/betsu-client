import Header from '@/components/Header'
import NFTTile from '@/components/NFTTile'
import List from 'src/json/list.json'
import axios from 'axios'
import { useState } from 'react'

// try redeploying

export default function Marketplace() {
	const address = '0x29B8bdec7dB3e65898CE43aeE21838342b06F96B'
	const sampleData = [
		{
			name: 'NFT#1',
			description: "Alchemy's First NFT",
			website: 'http://axieinfinity.io',
			image: 'https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5',
			price: '0.03ETH',
			currentlySelling: 'True',
			address: '0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13',
		},
		{
			name: 'NFT#2',
			description: "Alchemy's Second NFT",
			website: 'http://axieinfinity.io',
			image: 'https://gateway.pinata.cloud/ipfs/QmdhoL9K8my2vi3fej97foiqGmJ389SMs55oC5EdkrxF2M',
			price: '0.03ETH',
			currentlySelling: 'True',
			address: '0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13',
		},
		{
			name: 'NFT#3',
			description: "Alchemy's Third NFT",
			website: 'http://axieinfinity.io',
			image: 'https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5',
			price: '0.03ETH',
			currentlySelling: 'True',
			address: '0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13',
		},
	]
	const [data, updateData] = useState(sampleData)
	const [dataFetched, updateFetched] = useState(false)

	async function getAllNFTs() {
		const ethers = require('ethers')
		//this code will get providers and signers
		const provider = new ethers.providers.Web3Provider(window.ethereum)
		const signer = provider.getSigner()
		// Pull the deployed contract instance
		let contract = new ethers.Contract(address, List.abi, signer)
		// gets all NFTs
		let data = await contract.getAllNFTs()

		//Fetch all the details of every NFT from the contract and display
		const items = await Promise.all(
			data.map(async i => {
				const tokenURI = await contract.tokenURI(i.tokenId)
				let meta = await axios.get(tokenURI)
				meta = meta.data

				let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
				let item = {
					price,
					tokenId: i.tokenId.toNumber(),
					seller: i.seller,
					owner: i.owner,
					name: meta.data.name,
					description: meta.data.description,
					image: meta.data.image,
				}
				return item
			})
		)

		updateData(items)
		updateFetched(true)
	}

	if (!dataFetched) getAllNFTs()

	return (
		<div>
			<Header></Header>
			<div className="flex flex-col place-items-center mt-20">
				<div className="md:text-xl font-bold text-white">Top NFTs</div>
				<div className="flex mt-5 justify-between flex-wrap max-w-screen-xl text-center">
					{data.map((value, index) => {
						return <NFTTile data={value} key={index}></NFTTile>
						// return <NFTTile data={value} key={index}></NFTTile>
					})}
				</div>
			</div>
		</div>
	)
}
