import { useTheme } from 'next-themes'
import { WagmiConfig, createClient, chain, configureChains } from 'wagmi'
import { ConnectKitProvider, getDefaultClient } from 'connectkit'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

const avalancheChain = {
	id: 43_114,
	name: 'Avalanche',
	nativeCurrency: {
		decimals: 18,
		name: 'Avalanche',
		symbol: 'AVAX',
	},
	rpcUrls: {
		default: 'https://api.avax.network/ext/bc/C/rpc',
	},
	blockExplorers: {
		default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
		snowtrace: { name: 'SnowTrace', url: 'https://snowtrace.io' },
	},
	testnet: false,
}

const { provider, chains } = configureChains(
	[chain.mainnet, chain.goerli, chain.polygon, chain.optimism, chain.arbitrum],
	[
		alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY }),
		jsonRpcProvider({
			rpc: chain => {
				if (chain.id !== avalancheChain.id) return null
				return { http: chain.rpcUrls.default }
			},
		}),
	]
)

const client = createClient(
	getDefaultClient({
		appName: process.env.APP_NAME,
		autoConnect: true,
		alchemyId: process.env.ALCHEMY_API_KEY,
		chains: chains,
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
