import { useMediaQuery } from 'react-responsive';
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Head from 'next/head';
import Link from 'next/link';
import {
  Card,
} from '../components';

import styles from '../styles/pages/apps.module.css'

const Apps = () => {
  const { isConnected } = useAccount()

  const isMobile = useMediaQuery({ maxWidth: 480 });
  const need75WidthDescription = useMediaQuery({ minWidth: 800 });
  const need50WidthDescription = useMediaQuery({ minWidth: 1200 });

  let titleDescription = styles.titleDescription100;
  if (need50WidthDescription) {
    titleDescription = styles.titleDescription50;
  } else if (need75WidthDescription) {
    titleDescription = styles.titleDescription75;
  } 

  return (
    <>
      <Head>
        <title>Meta ID App Store | Access games and apps in the metaverse</title>
      </Head>
      <div>
        <div className={styles.aboveTheFold}>
          <div className={`${styles.title} ${isMobile ? "side-padding-mobile" : "side-padding"}`}>
            <div className={styles.titleHeader}>
              <h1 className={`no-margin serif-font ${styles.titleHeaderText}`}>
                The New App Store
              </h1>
            </div>
            <div className={titleDescription}>
              <p className={`monospace-font ${styles.titleDescriptionText}`}>
                Discover apps and games with your Meta ID.{' '}
                <strong>Explore a whole new world.</strong>
              </p>
            </div>
          </div>
          <div className="row justify-center">
            <p className={`monospace-font ${styles.titleDescriptionText}`}>
              Coming Soon!
            </p>
          </div>
        </div>
        <Card darkBackground>
          <h2 className={`serif-font ${styles.cardHeaderText}`}>
            Kingdoms
          </h2>
          <p className={`monospace-font ${styles.cardListText}`}>
            This is first game you can play with your{' '}
            <Link href='/'>
              <a className='link-bright'>
                Meta ID
              </a>
            </Link>. It{'\''}s a tournament style game where you compete with
            others to win a Kingdom NFT and more.
          </p>
          <ul className={`no-margin ${isMobile ? 'column' : 'row'} ${styles.cardList}`}>
            <li className={styles.cardListItem}>
              <div>
                <h3 className='monospace-font'>
                  &#128197; Daily
                </h3>
                <p className={`monospace-font ${styles.cardListText}`}>
                  Every 24 hours, a Kingdom will be won and a new one will become
                  available.
                </p>
                <p className={`monospace-font ${styles.cardListText}`}>
                  Anyone can compete on any day for a given Kingdom.
                </p>
              </div>
            </li>
            <li className={styles.cardListItem}>
              <div>
                <h3 className='monospace-font'>
                  &#10052; Unique
                </h3>
                <p className={`monospace-font ${styles.cardListText}`}>
                  Each Kingdom is unique based the day it{'\''}s available, and
                  how many people compete for it. The design of each Kingdom
                  reflects that uniqueness. All of it will be stored on chain.
                </p>
              </div>
            </li>
            <li className={styles.cardListItem}>
              <div>
                <h3 className='monospace-font'>
                  &#11088; Prizes
                </h3>
                <p className={`monospace-font ${styles.cardListText}`}>
                  If you decide to participate in the tournament to win a
                  Kingdom, you may lose. But you can still win other prizes
                  like ETH and Loot.
                </p>
              </div>
            </li>
          </ul>
        </Card>
      </div>
    </>
  )
}

export default Apps