import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Tabs } from '@mantine/core'
import Head from 'next/head'

import { Leaderboard } from '../components'
import { getFullLeaderboard } from '../util/db'
import styles from '../styles/pages/leaderboard.module.css'

export async function getServerSideProps(context) {
  const leaderboard = await getFullLeaderboard()

  return {
    props: {
      leaderboard
    },
  }
}

const LeaderboardPage = ({ leaderboard }) => {
  const isMobile = useMediaQuery({ maxWidth: 480 })
  const [activeTab, setActiveTab] = useState('all');

  return (
    <>
      <Head>
        <title>
          Meta ID | Your NFT profile for the metaverse!
        </title>
      </Head>
      <div className={styles.leaderboardPageContainer}>
        <div className={`column ${isMobile ? 'side-padding-mobile' : styles.leaderboardPageSidePadding}`}>
          <h1 className='no-margin serif-font text-center'>
            Meta ID Leaderboard
          </h1>
          <div className={styles.leaderboardPageTabsContainer}>
            <Tabs value={activeTab} onTabChange={setActiveTab}>
              <Tabs.List>
                <Tabs.Tab value="all">Overall</Tabs.Tab>
                <Tabs.Tab value="nft">NFT</Tabs.Tab>
                <Tabs.Tab value="defi">DeFi</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="all">
                <Leaderboard list={leaderboard.all} />
              </Tabs.Panel>
              <Tabs.Panel value="nft">
                <Leaderboard list={leaderboard.nft} />
              </Tabs.Panel>
              <Tabs.Panel value="defi">
                <Leaderboard list={leaderboard.defi} />
              </Tabs.Panel>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  )
}

export default LeaderboardPage