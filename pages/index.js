import { useMediaQuery } from 'react-responsive'
import Head from 'next/head'
import Image from 'next/image'
import { Button, Card, MetaId } from '../components'
import exampleGif from '../public/metaid-examples-light.gif'
import styles from '../styles/pages/index.module.css'

function Home() {
  const isMobile = useMediaQuery({ maxWidth: 480 })

  const exampleData = {
    identity: {
      name: 'michaelcjoseph.eth',
      pfp: {
        contract: '0x439cac149B935AE1D726569800972E1669d17094',
        id: 9392,
        image: 'https://lh3.googleusercontent.com/K3Bpl07pp03XcbkBiAGgpZbJpS1tsp6bd6OadaDJw_ZV2xM-H25W75B-N4LWv5bGsNCyjalLiPLqzjqnVefAiJI9D2zkeJf6wp7rDIA=w600',
        race: 'Human',
        role: null,
        element: null
      },
      character: {
        id: 1,
        race: 'Gnome',
        role: 'Chef',
        element: 'Wind'
      },
    },
    equipment: {
      weapon: '"Dusk Whisper" Ghost Wand of Titans',
      chestArmor: 'Plate Mail of Rage',
      headArmor: '"Skull Moon" Divine Hood of Skill +1',
      waistArmor: 'Mesh Belt of Protection',
      footArmor: 'Demonhide Boots',
      handAmor: 'Demon\'s Hands of Vitriol',
      necklace: 'Pendant',
      ring: 'Gold Ring'
    },
    baseStats: {
      str: 24,
      dex: 17,
      con: 36,
      int: 32,
      wis: 41,
      cha: 21,
    },
    bonusStats: {
      str: 8,
      dex: 6,
      con: 6,
      int: 2,
      wis: 10,
      cha: 2,
    }
  }

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
          <div>
            <MetaId data={exampleData} />
          </div>
        </Card>
        <Card tanBackground>
          Test Card 2
        </Card>
        <Card>
          Test Card 3
        </Card>
        <Card tanBackground>
          Test Card 4
        </Card>
        <Card>
          Test Card 5
        </Card>
      </div>
    </>
  );
};

export default Home;