import styles from '../styles/components/Rank.module.css'

const RankItem = ({ title, rank }) => (
  <div className='column'>
    <div>{title} Rank</div>
    <div>{rank}</div>
  </div>
)

const Rank = ({ rank }) => {
  const { overall, nft, defi, bonus } = rank

  return (
    <div className='row'>
      <RankItem title='Overall' rank={overall} />
      <RankItem title='NFT' rank={nft} />
      <RankItem title='DeFi' rank={defi} />
      <RankItem title='Bonus' rank={bonus} />
    </div>
  )
  
}

export default Rank