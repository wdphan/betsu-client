import { useTheme } from 'next-themes'
import { createClient, WagmiConfig } from 'wagmi'
import { ConnectKitProvider, getDefaultClient } from 'connectkit'

const client = createClient(
	getDefaultClient({
		appName: process.env.APP_NAME,
		autoConnect: true,
		infuraId: process.env.ALCHEMY_API_KEY,
	})
)

const Web3Provider = ({ children }) => {
	const { resolvedTheme } = useTheme()

	return (
		<WagmiConfig client={client}>
			<ConnectKitProvider
				theme="minimal"
				customTheme={{
					'--ck-font-family': '"Train One", cursive',
				}}
			>
				{children}
			</ConnectKitProvider>
		</WagmiConfig>
	)
}

export default Web3Provider
