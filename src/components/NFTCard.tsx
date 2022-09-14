import styles from '../styles/nftcard.module.css'
import { BrowserRouter as Router, Link } from 'react-router-dom'
// nftCard - nfttile on marketplace ex

const NFTCard = ({ image, id, title, address, description, attributes }) => {
	return (
		<div className={styles.container}>
			<img className={styles.image} key={id} src={image ? image : 'NO IMAGE'}></img>
			<div className="p-3">
				<div className="flex mb-3">
					<div className="flex-grow">
						<h3 className={styles.title}>{title ? title.slice(0, 30) : 'NO TITLE'}</h3>
						<div>
							<a
								target="_blank"
								className={styles.address}
								href={`https://etherscan.io/token/${address}`}
							>{`${address.slice(0, 4)}...${address.slice(address.length - 4)}`}</a>
						</div>
					</div>
				</div>
				<div className={styles.id}>
					<span className={styles.grey}>TOKEN ID: </span> {id.slice(0, 4)}...${id.slice(id.length - 4)}
				</div>
				<p className={styles.description}>
					<span className={styles.grey}>DESCRIPTION: </span>
					{description ? description.slice(0, 25) : 'No Description'}
				</p>
			</div>
		</div>
	)
}

export default NFTCard
