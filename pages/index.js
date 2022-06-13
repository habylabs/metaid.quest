import { useMediaQuery } from 'react-responsive'
import Head from 'next/head'
import Image from 'next/image'
import { Button } from '../components'
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
      <div className={`${styles.page} ${isMobile ? "side-padding-mobile" : "side-padding"}`}>
        <div className={styles.primarySection}>
          <div className={styles.primarySectionContent}>
            <h1 className={`no-margin serif-font ${styles.primarySectionContentHeaderText}`}>
              Adventure in the Metaverse with your Meta ID
            </h1>
            <h2 className={`no-margin monospace-font ${styles.primarySectionContentSubText}`}>
              Coming Soon!
            </h2>
            <div className={styles.primarySectionContentButton}>
              <Button>
                <a 
                  href='https://discord.gg/TXgaBwYZep'
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.primarySectionContentButtonLink}
                >
                  Join the Discord! 
                </a>
              </Button>
            </div>
          </div>
          <div className={styles.primarySectionAnimation}>
            <Image src={exampleGif} alt="meta id examples" />
          </div>
        </div>
        <div>
          Rest of content
        </div>
      </div>
    </>
  );
};

export default Home;