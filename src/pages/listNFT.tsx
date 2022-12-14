import Header from '@/components/Header'
import { useState } from 'react'
import { uploadFileToIPFS, uploadJSONToIPFS } from '@/components/Pinata'
import List from 'src/json/list.json'
import { useLocation } from 'react-router'

const address = '0x29B8bdec7dB3e65898CE43aeE21838342b06F96B'

// page to list NFT Card

export default function ListNFT() {
	const [formParams, updateFormParams] = useState({ name: '', description: '', price: '' })
	const [fileURL, setFileURL] = useState(null)
	const ethers = require('ethers')
	const [message, updateMessage] = useState('')
	// const location = useLocation() -- enable later

	//This function uploads the NFT image to IPFS
	async function OnChangeFile(e) {
		var file = e.target.files[0]
		//check for file extension
		try {
			//upload the file to IPFS
			const response = await uploadFileToIPFS(file)
			if (response.success === true) {
				console.log('Uploaded image to Pinata: ', response.pinataURL)
				setFileURL(response.pinataURL)
			}
		} catch (e) {
			console.log('Error during file upload', e)
		}
	}

	//This function uploads the metadata to IPFS
	async function uploadMetadataToIPFS() {
		const { name, description, price } = formParams
		//Make sure that none of the fields are empty
		if (!name || !description || !price || !fileURL) return

		const nftJSON = {
			name,
			description,
			price,
			image: fileURL,
		}

		try {
			//upload the metadata JSON to IPFS
			const response = await uploadJSONToIPFS(nftJSON)
			if (response.success === true) {
				console.log('Uploaded JSON to Pinata: ', response)
				return response.pinataURL
			}
		} catch (e) {
			console.log('error uploading JSON metadata:', e)
		}
	}

	async function listNFT(e) {
		e.preventDefault()

		//Upload data to IPFS
		try {
			const metadataURL = await uploadMetadataToIPFS()
			//After adding your Hardhat network to your metamask, this code will get providers and signers
			const provider = new ethers.providers.Web3Provider(window.ethereum)
			const signer = provider.getSigner()
			updateMessage('Please wait.. uploading (upto 5 mins)')

			//Pull the deployed contract instance
			let contract = new ethers.Contract(address, List.abi, signer)

			//message the params to be sent to the create NFT request
			const price = ethers.utils.parseUnits(formParams.price, 'ether')
			let listingPrice = await contract.getListPrice()
			listingPrice = listingPrice.toString()

			//actually create the NFT
			let transaction = await contract.createToken(metadataURL, price, { value: listingPrice })
			await transaction.wait()

			alert('Successfully listed your NFT!')
			updateMessage('')
			updateFormParams({ name: '', description: '', price: '' })
			window.location.replace('/')
		} catch (e) {
			alert('Upload error' + e)
		}
	}

	console.log('Working', process.env)
	return (
		<div className="">
			<Header></Header>
			<div className="flex flex-col place-items-center mt-10" id="nftForm">
				<form className="bg-black shadow-md px-8 pt-4 pb-8 mb-4">
					<h3 className="text-center font-bold bg-black mb-8">Upload your NFT to the marketplace</h3>
					<div className="mb-4">
						<label className="block text-[#2FD0DB] text-sm font-bold mb-2" htmlFor="name">
							NFT NAME
						</label>
						<input
							className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="name"
							type="text"
							placeholder="Axie#4563"
							onChange={e => updateFormParams({ ...formParams, name: e.target.value })}
							value={formParams.name}
						></input>
					</div>
					<div className="mb-6">
						<label className="block text-[#2FD0DB] text-sm font-bold mb-2" htmlFor="description">
							NFT DESCRIPTION
						</label>
						<textarea
							className="shadow appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							cols="40"
							rows="5"
							id="description"
							type="text"
							placeholder="Axie Infinity Collection"
							value={formParams.description}
							onChange={e => updateFormParams({ ...formParams, description: e.target.value })}
						></textarea>
					</div>
					<div className="mb-6">
						<label className="block text-[#2FD0DB] text-sm font-bold mb-2" htmlFor="price">
							PRICE (ETH)
						</label>
						<input
							className="shadow appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="number"
							placeholder="Min 0.01 ETH"
							step="0.01"
							value={formParams.price}
							onChange={e => updateFormParams({ ...formParams, price: e.target.value })}
						></input>
					</div>
					<div>
						<label className="block text-[#2FD0DB] text-sm font-bold mb-2" htmlFor="image">
							UPLOAD IMAGE
						</label>
						<input type={'file'} onChange={OnChangeFile}></input>
					</div>
					<br></br>
					<div className="text-green text-center">{message}</div>
					<button onClick={listNFT} className="font-bold mt-5 w-full bg-[#2FD0DB] text-white  p-2 shadow-lg">
						LIST
					</button>
				</form>
			</div>
		</div>
	)
}
