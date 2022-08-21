import _ from 'lodash'
import { useMediaQuery } from 'react-responsive'

import { formatAddress } from '../util/identity';
import styles from '../styles/components/Leaderboard.module.css';

const LeaderboardItem = ({ listItem, index }) => {
  return (
    <div className={styles.leaderboardItemContainer}>
      <p className={`monospace-font no-margin ${styles.leaderboardItemText}`}>
        {index + 1}.{' '}
        <strong>{listItem.name ? listItem.name : formatAddress(listItem.address)}</strong>
        {' '}{listItem.level}
      </p>
    </div>
  )
}

const Leaderboard = ({ list }) => {
  const isMobile = useMediaQuery({ maxWidth: 480 })
  const sortedIndividuals = _.orderBy(list.individual, ['level'], ['desc'])
  const sortedGuilds = _.orderBy(list.guild, ['level'], ['desc'])

  return (
    <div className={`${isMobile ? 'column': 'row align-center'} ${styles.leaderboardContainer}`}>
      <div className={`column ${styles.leaderboardSection}`}>
        <h2 className={`monospace-font ${styles.leaderboardSectionTitle}`}>
          LEADING INDIVIDUALS
        </h2>
        {sortedIndividuals.map((listItem, i) => (
          <LeaderboardItem listItem={listItem} index={i} key={i}/>
        ))}
      </div>
      <div className={`column ${styles.leaderboardSection}`}>
        <h2 className={`monospace-font ${styles.leaderboardSectionTitle}`}>
          LEADING GUILDS
        </h2>
        {sortedGuilds.map((listItem, i) => (
          <LeaderboardItem listItem={listItem} index={i} key={i}/>
        ))}
      </div>
    </div>
  )
}

export default Leaderboard