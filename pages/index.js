import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useWeb3React } from "@web3-react/core";
import Head from 'next/head';
import { Connect } from '.';
import styles from '../styles/components/Stats.module.css';

function readStats({ address }) {
  const { LVL, HP, MP, STR, DEX, CON, INT, WIS, CHA } = address;
  return (
    <>
      <p>Level: {LVL}</p>
      <p>HP: {HP}</p>
      <p>MP: {MP}</p>
      <p>STR: {STR}</p>
      <p>DEX: {DEX}</p>
      <p>CON: {CON}</p>
      <p>INT: {INT}</p>
      <p>WIS: {WIS}</p>
      <p>CHA: {CHA}</p>
    </>
  )
}

function Home() {
  const { active, account } = useWeb3React();
  const isMobile = useMediaQuery({ maxWidth: 480 });

  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`api/v1/stats/${account}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [account])

  if (isLoading) return <p>Loading...</p>

  const dataComponent = (
    <>
      {isLoading ? <p>Loading...</p> : readStats(data)}
    </>
  );

  return (
    <>
      <Head>
        <title>
          Meta ID | Your NFT id for the metaverse!
        </title>
      </Head>
      <div className={`${styles.title} ${isMobile ? "side-padding-mobile" : "side-padding"}`}>
        <div className={styles.titleHeader}>
          <h1 className={`no-margin serif-font ${styles.titleHeaderText}`}>
            {active ? 'Here are your Stats!' : 'Check your Stats!'}
          </h1>
        </div>
        <div>
          {active ? dataComponent : <Connect />}
        </div>
      </div>
    </>
  );
};

export default Home;