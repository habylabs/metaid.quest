import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useWeb3React } from "@web3-react/core";
import Head from 'next/head';
import Link from 'next/link'
import {
  Connect,
  Mint,
} from '../components';
import styles from '../styles/pages/character.module.css';


export default function Character() {
  const [windowReady, setWindowReady] = useState(false);

  useEffect(() => {
    setWindowReady(true);
  }, []);

  const { active } = useWeb3React();

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
      <div className={styles.aboveTheFold}>
        <div className={`${styles.title} ${isMobile ? "side-padding-mobile" : "side-padding"}`}>
          <div className={styles.titleHeader}>
            <h1 className={`no-margin serif-font ${styles.titleHeaderText}`}>
              Welcome Adventurer!
            </h1>
          </div>
          <div className={titleDescription}>
            <p className={`monospace-font ${styles.titleDescriptionText}`}>
              Mint your{' '}
              <a
                href="https://docs.metaid.quest/overview/identity/character"
                target="_blank"
                rel="noopener noreferrer"
                className="link-bright monospace-font"
              >
                Character
              </a>
              , get a{' '}
              <Link href='/'>
                <a className="link-bright monospace-font">Meta ID</a>
              </Link>{' '}
              and join us in the metaverse. Your character is randomly generated 
              and stored on chain. Be the adventurer you were always born to be.
            </p>
          </div>
        </div>
        <div className="row justify-center">
          {active ? <Mint /> : <Connect />}
        </div>
      </div>
    </>
  );
}
