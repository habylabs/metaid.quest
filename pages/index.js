import { useMediaQuery } from 'react-responsive'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Router from 'next/router'

import {
  Button,
  Card,
  Leaderboard,
  MetaId
} from '../components'
import { getMiniLeaderboard } from '../util/db'
import exampleGif from '../public/metaid-examples-light.gif'
import styles from '../styles/pages/index.module.css'

export async function getServerSideProps(context) {
  const leaderboard = await getMiniLeaderboard()

  return {
    props: {
      leaderboard
    },
  }
}

const Home = ({ leaderboard }) => {
  console.log(leaderboard)
  const isMobile = useMediaQuery({ maxWidth: 480 })
  const { address, isConnected } = useAccount()
  if (isConnected) {
    Router.push(`/profile/${address}`)
  }

  function getAnimation() {
    const animationContainer = (
      <div className={styles.primaryContainerAnimation}>
        <Image src={exampleGif} alt="meta id examples" />
      </div>
    )

    if (isMobile) {
      return (
        <div className='row align-center justify-center'>
          {animationContainer}
        </div>
      )
    }

    return animationContainer
  }

  function getCta() {
    return (
      isConnected ? 
      (
        <Button>
          <Link href='/profile'>
            <a>Mint</a>
          </Link>
        </Button>
      ) : 
      <ConnectButton label='Connect Wallet to Mint' />
    )
  }

  return (
    <>
      <Head>
        <title>
          Meta ID | Your NFT profile for the metaverse!
        </title>
      </Head>
      <div className={styles.homepageContainer}>
        <div className={`${styles.primaryContainer} ${isMobile ? 'side-padding-mobile' : 'side-padding'}`}>
          <div className={`column ${isMobile ? 'align-center' : 'align-start'}`}>
            <h1 className={`no-margin serif-font ${isMobile ? 'text-center' : ''} ${styles.primaryContainerContentHeaderText}`}>
              What{'\''}s your crypto level?
            </h1>
            <h2 className={`no-margin monospace-font ${isMobile ? 'text-center' : ''} ${styles.primaryContainerContentSubText}`}>
              Mint your Meta ID and find out!
            </h2>
            <div className={styles.primaryContainerContentButton}>
              {getCta()}
            </div>
          </div>
          {getAnimation()}          
        </div>
        <Card noTopPadding>
          <Leaderboard list={leaderboard} />
        </Card>
        <Card>
          <div>
            <MetaId example/>
          </div>
          <h2 className={`serif-font ${styles.homepageCardHeader}`}>
            What is Meta ID?
          </h2>
          <ul className={`no-margin ${isMobile ? 'column' : 'row'} ${styles.homepageList}`}>
            <li className={styles.homepageListItem}>
              <div>
                <h3 className='monospace-font'>
                  Identity
                </h3>
                <p className={`monospace-font ${styles.homepageListText}`}>
                  Bring your favorite PFP NFT with you across the metaverse.
                </p>
                <p className={`monospace-font ${styles.homepageListText}`}>
                There are many vibrant NFT communities. But they{'\''}re all 
                in their own bubble. Meta ID brings them together in{' '}
                <strong>one large, diverse metaverse.</strong>
                </p>
              </div>
            </li>
            <li className={styles.homepageListItem}>
              <div>
                <h3 className='monospace-font'>
                  Equipment
                </h3>
                <p className={`monospace-font ${styles.homepageListText}`}>
                Use the traits of your PFP. Or customize with your favorite 
                Loot bag and increase your luck.
                </p>
              </div>
            </li>
            <li className={styles.homepageListItem}>
              <div>
                <h3 className='monospace-font'>
                  Stats
                </h3>
                <p className={`monospace-font ${styles.homepageListText}`}>
                  Your stats are a{' '}
                  <a
                    href='https://docs.metaid.quest/overview/stats'
                    target='_blank'
                    rel='noreferrer'
                    className='link-bright'
                  >
                    reflection
                  </a>
                  {' '}of everything you do on-chain.
                </p>
                <p className={`monospace-font ${styles.homepageListText}`}>
                  As you engage in the metaverse, your stats naturally change and grow
                  with you. There is no artifical rarity to your stats. <strong>It is truly
                  unique to you.</strong>
                </p>
              </div>
            </li>
          </ul>
        </Card>
        <Card tanBackground>
          <h2 className={`serif-font ${styles.homepageCardHeader}`}>
            Developer Friendly
          </h2>
          <ul className={`${isMobile ? 'column' : 'row'} ${styles.homepageList}`}>
            <li className={styles.homepageListItem}>
              <div>
                <h3 className='monospace-font'>
                  &#127760; CC0
                </h3>
                <p className={`monospace-font ${styles.homepageListText}`}>
                  With the CC0 license, Meta ID allows you to build anything on top of Meta ID. 
                  No limitation. Maximum creativity.
                </p>
              </div>
            </li>
            <li className={styles.homepageListItem}>
              <div>
                <h3 className='monospace-font'>
                  &#128214; Open Source
                </h3>
                <p className={`monospace-font ${styles.homepageListText}`}>
                  Everything we do is open source from our codebase to the roadmap. We want
                  to make it as easy as possible for developers and artists to build on top
                  of Meta ID and will.
                </p>
              </div>
            </li>
            <li className={styles.homepageListItem}>
              <div>
                <h3 className='monospace-font'>
                  &#128101; Large User Base
                </h3>
                <p className={`monospace-font ${styles.homepageListText}`}>
                  Meta ID brings together numerous active NFT communities together, each with
                  tens of thousands of members. When you build on Meta ID, you&#x27;re building for
                  all of them.
                </p>
              </div>
            </li>
          </ul>
        </Card>
        <Card>
          <h2 className={`serif-font ${styles.homepageCardHeader}`}>
            Join the Adventure
          </h2>
          <p className='monospace-font'>
            Meta ID will be launch on August 22! The initial prototype won the{' '}
            <a
              href='https://www.ethdenver.com/virtual-winners/#top30'
              target='_blank'
              rel='noreferrer'
              className='link-bright'
            >
              2022 ETH Denver Virtual Hackathon
            </a>{' '}
            for the Gaming and Metaverse track.
          </p>
          <p className='monospace-font'>
            Join the community to learn more!
          </p>
          <div className='row align-center justify-center'>
            {getCta()}
          </div>
        </Card>
      </div>
    </>
  );
};

export default Home;