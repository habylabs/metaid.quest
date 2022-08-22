import { Table } from '@mantine/core';
import styles from '../styles/components/Rank.module.css'

const RankItem = ({ title, rank }) => (
  <div className='column'>
    <div>{title} Rank</div>
    <div>{rank}</div>
  </div>
)

const Rank = ({ rank }) => {
  const { overall, nft, defi, luck } = rank

  return (
    <div>
      <h2 className='serif-font'>
        Your Rank
      </h2>
      <Table
        horizontalSpacing="sm"
        verticalSpacing="md"
        className={styles.tableContainer}
      >
        <thead>
          <tr>
            <th>Type</th>
            <th>Rank</th>
            <th>Percentile</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Overall</td>
            <td>{overall.rank}</td>
            <td>{overall.percentile}</td>
          </tr>
          <tr>
            <td>DeFi</td>
            <td>{defi.rank}</td>
            <td>{defi.percentile}</td>
          </tr>
          <tr>
            <td>NFT</td>
            <td>{nft.rank}</td>
            <td>{nft.percentile}</td>
          </tr>
          <tr>
            <td>Luck</td>
            <td>{luck.rank}</td>
            <td>{luck.percentile}</td>
          </tr>
        </tbody>
      </Table>
    </div>
    
  )
  
}

export default Rank