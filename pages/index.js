import { useMediaQuery } from 'react-responsive'
import Head from 'next/head'
import Image from 'next/image'
import { Button, Card } from '../components'
import exampleGif from '../public/metaid-examples-light.gif'
import styles from '../styles/pages/index.module.css'

function Home() {
  const isMobile = useMediaQuery({ maxWidth: 480 })

  return (
    <>
      <Head>
        <title>
          Meta ID | Your NFT profile for the metaverse!
        </title>
      </Head>
      <div className={styles.homepageContainer}>
        <div className={`${styles.primaryContainer} ${isMobile ? "side-padding-mobile" : "side-padding"}`}>
          <div className={styles.primaryContainerContent}>
            <h1 className={`no-margin serif-font ${styles.primaryContainerContentHeaderText}`}>
              Play in the Metaverse!
            </h1>
            <h2 className={`no-margin monospace-font ${styles.primaryContainerContentSubText}`}>
              Build your profile with Meta ID
            </h2>
            <div className={styles.primaryContainerContentButton}>
              <Button>
                <a 
                  href='https://discord.gg/TXgaBwYZep'
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.primaryContainerContentButtonLink}
                >
                  Join the Discord! 
                </a>
              </Button>
            </div>
          </div>
          <div className={styles.primaryContainerAnimation}>
            <Image src={exampleGif} alt="meta id examples" />
          </div>
        </div>
        <Card>
          Test Card 1
        </Card>
        <Card tanBackground>
          Test Card 2
        </Card>
        <Card>
          Test Card 3
        </Card>
      </div>
    </>
  );
};

export default Home;