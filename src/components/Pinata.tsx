//require('dotenv').config();
const key = process.env.PINATA_API_KEY
const secret = process.env.PINATA_SECRET_KEY

import { useState } from 'react'

const axios = require('axios')
const FormData = require('form-data')

// upload JSON to IPFS
export const uploadJSONToIPFS = async JSONBody => {
	const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
	//making axios POST request to Pinata ⬇️
	return axios
		.post(url, JSONBody, {
			headers: {
				Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2MDYzMWM3OC00NDU0LTRjODktYmQwOS1iN2I0ODIyZWIxNWYiLCJlbWFpbCI6IndpbGxkcGhhbkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNDM0Y2RkZjE2NmZkNDI3Mzk0MDciLCJzY29wZWRLZXlTZWNyZXQiOiIyOWEzOWMxOGU3MDRkMDA3OWZjMWE2MmRiMWRlMDk5ZjcwZTFjZDVmOWIzOWY2ZjdmNzk2NTgxYWNiNWIwNDc5IiwiaWF0IjoxNjYyOTQxNjA3fQ.rucGCoYRQv07ZP6RrOjkNe2XeF1RKQtX-2qvoF5DYoo`,
			},
		})
		.then(function (response) {
			return {
				success: true,
				pinataURL: 'https://gateway.pinata.cloud/ipfs/' + response.data.IpfsHash,
			}
		})
		.catch(function (error) {
			console.log(error)
			return {
				success: false,
				message: error.message,
			}
		})
}

//upload image to IPFS
export const uploadFileToIPFS = async file => {
	const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`
	//making axios POST request to Pinata ⬇️

	let data = new FormData()
	data.append('file', file)

	const metadata = JSON.stringify({
		name: 'testname',
		keyvalues: {
			exampleKey: 'exampleValue',
		},
	})
	data.append('pinataMetadata', metadata)

	//pinataOptions are optional
	const pinataOptions = JSON.stringify({
		cidVersion: 0,
		customPinPolicy: {
			regions: [
				{
					id: 'FRA1',
					desiredReplicationCount: 1,
				},
				{
					id: 'NYC1',
					desiredReplicationCount: 2,
				},
			],
		},
	})
	data.append('pinataOptions', pinataOptions)

	return axios
		.post(url, data, {
			maxBodyLength: 'Infinity',
			headers: {
				'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
				Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2MDYzMWM3OC00NDU0LTRjODktYmQwOS1iN2I0ODIyZWIxNWYiLCJlbWFpbCI6IndpbGxkcGhhbkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNDM0Y2RkZjE2NmZkNDI3Mzk0MDciLCJzY29wZWRLZXlTZWNyZXQiOiIyOWEzOWMxOGU3MDRkMDA3OWZjMWE2MmRiMWRlMDk5ZjcwZTFjZDVmOWIzOWY2ZjdmNzk2NTgxYWNiNWIwNDc5IiwiaWF0IjoxNjYyOTQxNjA3fQ.rucGCoYRQv07ZP6RrOjkNe2XeF1RKQtX-2qvoF5DYoo`,
			},
		})
		.then(function (response) {
			console.log('image uploaded', response.data.IpfsHash)
			return {
				success: true,
				pinataURL: 'https://gateway.pinata.cloud/ipfs/' + response.data.IpfsHash,
			}
		})
		.catch(function (error) {
			console.log(error)
			return {
				success: false,
				message: error.message,
			}
		})
}
