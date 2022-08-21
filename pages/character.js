import { useMediaQuery } from 'react-responsive';
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Head from 'next/head';
import Link from 'next/link'
import {
  Card,
  Mint,
} from '../components';
import styles from '../styles/pages/character.module.css';


export default function Character() {
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
        <title>Adventure: Enter the Lootverse</title>
      </Head>
      <div>
        <div className={styles.aboveTheFold}>
          <div className={`${styles.title} ${isMobile ? "side-padding-mobile" : "side-padding"}`}>
            <div className={styles.titleHeader}>
              <h1 className={`no-margin serif-font ${styles.titleHeaderText}`}>
                Welcome Player One!
              </h1>
            </div>
            <div className={titleDescription}>
              <p className={`monospace-font ${styles.titleDescriptionText}`}>
                Mint your own NFT avatar. Your base character is randomly
                generated and stored on chain. And then you{'\''}ll be able to customize
                your character to be unique to you.
              </p>
              <p className={`monospace-font ${styles.titleDescriptionText}`}>
                <strong>Be who you choose to be.</strong>
              </p>
            </div>
          </div>
          <div className="row justify-center">
            {
              isConnected ?
              <Mint isCharacter /> :
              <ConnectButton label='Connect Wallet to Mint' />
            }
          </div>
        </div>
        <Card darkBackground>
          <h2 className={`serif-font ${styles.cardHeaderText}`}>
            What is Character?
          </h2>
          <ul className={`no-margin ${isMobile ? 'column' : 'row'} ${styles.cardList}`}>
            <li className={styles.cardListItem}>
              <div>
                <h3 className='monospace-font'>
                  &#128100; Avatar
                </h3>
                <p className={`monospace-font ${styles.cardListText}`}>
                  Use it as your PFP avatar anywhere online and in the
                  metaverse.
                </p>
                <p className={`monospace-font ${styles.cardListText}`}>
                  Every Character has a race, role, and element affinity as
                  its foundation. You can learn more about them{' '}
                  <a
                    href='https://docs.metaid.quest/overview/identity/character'
                    target='_blank'
                    rel='noreferrer'
                    className='link-bright'
                  >
                    here
                  </a>
                </p>
              </div>
            </li>
            <li className={styles.cardListItem}>
              <div>
                <h3 className='monospace-font'>
                  &#127912; Customizable
                </h3>
                <p className={`monospace-font ${styles.cardListText}`}>
                  There may only be so many race, role, and element combinations,
                  but you customize your avatar to be unique to you. Buy clothes,
                  equipment, and accessories to craft <strong>Your</strong>
                  avatar.
                </p>
              </div>
            </li>
            <li className={styles.cardListItem}>
              <div>
                <h3 className='monospace-font'>
                  &#127793; Infinite
                </h3>
                <p className={`monospace-font ${styles.cardListText}`}>
                  Anyone and everyone will be able to mint a Character.
                  We want to build a metaverse that everyone can participate in.
                </p>
                <p className={`monospace-font ${styles.cardListText}`}>
                  The value of your Character is not in exclusivity, but
                  uniqueness.
                </p>
              </div>
            </li>
          </ul>
        </Card>
      </div>
    </>
  );
}