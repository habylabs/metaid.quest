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
  Collapsed,
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
        <div className={`column ${styles.primaryContainer} ${isMobile ? 'side-padding-mobile' : 'side-padding'}`}>
          <div className={`row ${styles.primaryContainerContent}`}>
            <div className={`column ${isMobile ? 'align-center' : 'align-start'}`}>
              <h1 className={`no-margin serif-font ${isMobile ? 'text-center' : ''} ${styles.primaryContainerContentHeaderText}`}>
                What{'\''}s your crypto level?
              </h1>
              <h2 className={`no-margin monospace-font ${isMobile ? 'text-center' : ''} ${styles.primaryContainerContentSubText}`}>
                Mint your Meta ID and find out!
              </h2>
            </div>
            {getAnimation()}
          </div>
          <div className={styles.primaryContainerButton}>
            {getCta()}
          </div>        
        </div>
        <Card darkBackground>
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
          <div className='row align-center justify-center'>
            {getCta()}
          </div>
        </Card>
        <Card darkBackground noHeightPadding noWidthPadding>
          <Collapsed titleText='Built for Users' darkBackground>
            <ul className={`${isMobile ? 'column' : 'row'} ${styles.homepageList}`}>
              <li className={styles.homepageListItem}>
                <div>
                  <h3 className='monospace-font'>
                    &#128153; Inclusive
                  </h3>
                  <p className={`monospace-font ${styles.homepageListText}`}>
                    Anyone can mint a Meta ID NFT and there{'\''}s an infinite supply.
                  </p>
                </div>
              </li>
              <li className={styles.homepageListItem}>
                <div>
                  <h3 className='monospace-font'>
                    &#128274; Secure
                  </h3>
                  <p className={`monospace-font ${styles.homepageListText}`}>
                    Meta ID does not interact with anything in your wallet. We
                    only need to verify you own your address. Your assets are
                    safe and it will always be that way!
                  </p>
                </div>
              </li>
              <li className={styles.homepageListItem}>
                <div>
                  <h3 className='monospace-font'>
                    &#128241; Your New App Store
                  </h3>
                  <p className={`monospace-font ${styles.homepageListText}`}>
                    With your Meta ID, you{'\''}ll be able to safely access tons of
                    new apps and games.
                  </p>
                </div>
              </li>
            </ul>
          </Collapsed>
          <Collapsed titleText='Convenient for Developers' darkBackground>
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
                    &#128101; Large User Base
                  </h3>
                  <p className={`monospace-font ${styles.homepageListText}`}>
                    Meta ID brings together numerous active NFT communities together, each with
                    tens of thousands of members. When you build on Meta ID, you{'\''}re building for
                    all of them.
                  </p>
                </div>
              </li>
              <li className={styles.homepageListItem}>
                <div>
                  <h3 className='monospace-font'>
                    &#128227; Free Promotion
                  </h3>
                  <p className={`monospace-font ${styles.homepageListText}`}>
                    We promote all projects built for Meta ID users on our
                    app store front. Let users discover what you{'\''}re building
                    for free.
                  </p>
                </div>
              </li>
            </ul>
          </Collapsed>
        </Card>
        <Card>
          <h2 className={`serif-font ${styles.homepageCardHeader}`}>
            Join the Adventure
          </h2>
          <p className={`monospace-font ${styles.homepageListText}`}>
            Mint your Meta ID and experience a brand new world!
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