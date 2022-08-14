import { FC } from 'react'
import { APP_NAME } from '@/lib/consts'
import Header from '@/components/Header'
import Main from '@/components/Home'

const Home: FC = () => {
	return (
		<div>
			<Header />
			<Main />
		</div>
	)
}

export default Home
