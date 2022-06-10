import { useMediaQuery } from 'react-responsive'
import Head from 'next/head'
import Image from 'next/image'
import exampleGif from '../public/metaid-examples.gif'
import styles from '../styles/pages/index.module.css'

function Home() {
  const isMobile = useMediaQuery({ maxWidth: 480 })

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
            {getHeaderText()}
          </h1>
        </div>
        <div>
          <Image src={exampleGif} alt="meta id examples" />
        </div>
        <div>
          {getAction()}
        </div>
      </div>
    </>
  );
};

export default Home;