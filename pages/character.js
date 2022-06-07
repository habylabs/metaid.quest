import { useEffect, useState } from 'react';
import { useWeb3React } from "@web3-react/core";
import Head from 'next/head';
import {
  Title,
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

  return (
    <>
      <Head>
        <title>Adventure: Enter the Lootverse</title>
      </Head>
      <div className={styles.aboveTheFold}>
        {windowReady ? <Title /> : null}
        <div className="row justify-center">
          {active ? <Mint /> : <Connect />}
        </div>
      </div>
    </>
  );
}
