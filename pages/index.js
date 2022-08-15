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

  return (
    <>
      <Head>
        <title>
          Meta ID | Your NFT profile for the metaverse!
        </title>
      </Head>
      <div className={styles.homepageContainer}>
        <div className={`${styles.primaryContainer} ${isMobile ? 'side-padding-mobile' : 'side-padding'}`}>
          <div className={`column ${isMobile ? 'align-center' : 'align-start'}`}>
            <h1 className={`no-margin serif-font ${isMobile ? 'text-center' : ''} ${styles.primaryContainerContentHeaderText}`}>
              What{'\''}s your crypto level?
            </h1>
            <h2 className={`no-margin monospace-font ${isMobile ? 'text-center' : ''} ${styles.primaryContainerContentSubText}`}>
              Build your profile with Meta ID and see how you rank!
            </h2>
            <div className={styles.primaryContainerContentButton}>
              <h3 className={`monospace-font ${styles.primaryContainerContentSubText}`}>
                Launching August 22!
              </h3>
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
          {getAnimation()}
        </div>
        <Card>
          <div>
            <MetaId data={exampleData} />
          </div>
          <ul className={`${isMobile ? 'column' : 'row'} ${styles.homepageList}`}>
            <li className={styles.homepageListItem}>
              <div>
                <h3 className='monospace-font'>
                  Identity
                </h3>
                <p className={`monospace-font ${styles.homepageListText}`}>
                  Bring your favorite PFP NFT with you across the metaverse.
                </p>
                <p className={`monospace-font ${styles.homepageListText}`}>
                  Mint and edit your Meta ID with your BAYC, Crypto Coven, 
                  Doodles, Nouns, and{' '}
                  <a
                    href='https://docs.metaid.quest/overview/identity/eligible-projects'
                    target='_blank'
                    rel='noreferrer'
                    className='link-bright'
                  >
                    more
                  </a>.
                </p>
                <p className={`monospace-font ${styles.homepageListText}`}>
                  Right now, all these vibrant communities exist in their own silos, 
                  but Meta ID brings them together to have one large, diverse metaverse.
                </p>
              </div>
            </li>
            <li className={styles.homepageListItem}>
              <div>
                <h3 className='monospace-font'>
                  Equipment
                </h3>
                <p className={`monospace-font ${styles.homepageListText}`}>
                  Use your favorite Loot or mLoot bag to customize 
                  and strengthen your character.
                </p>
              </div>
            </li>
            <li className={styles.homepageListItem}>
              <div>
                <h3 className='monospace-font'>
                  Stats
                </h3>
                <p className={`monospace-font ${styles.homepageListText}`}>
                  Participate on-chain to improve your stats and prove yourself.
                </p>
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
                  {' '}of everything you do on-chain. How many
                  different NFTs do you own? How many ERC-20 tokens? How old is your
                  address? How many transactions has it done?
                </p>
                <p className={`monospace-font ${styles.homepageListText}`}>
                  As you engage in the metaverse, your stats naturally change and grow
                  with you. There is no artifical rarity to your stats. <strong>It is truly
                  unique to you.</strong>
                </p>
              </div>
            </li>
          </ul>
        </Card>
        <Card tanBackground>
          <h2 className={`serif-font ${styles.homepageCardHeader}`}>
            Developer Friendly
          </h2>
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
                  &#128214; Open Source
                </h3>
                <p className={`monospace-font ${styles.homepageListText}`}>
                  Everything we do is open source from our codebase to the roadmap. We want
                  to make it as easy as possible for developers and artists to build on top
                  of Meta ID and will.
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
                  tens of thousands of members. When you build on Meta ID, you&#x27;re building for
                  all of them.
                </p>
              </div>
            </li>
          </ul>
        </Card>
        <Card>
          <h2 className={`serif-font ${styles.homepageCardHeader}`}>
            Join the Adventure
          </h2>
          <p className='monospace-font'>
            Meta ID will be launch on August 22! The initial prototype won the{' '}
            <a
              href='https://www.ethdenver.com/virtual-winners/#top30'
              target='_blank'
              rel='noreferrer'
              className='link-bright'
            >
              2022 ETH Denver Virtual Hackathon
            </a>{' '}
            for the Gaming and Metaverse track.
          </p>
          <p className='monospace-font'>
            Join the community to learn more!
          </p>
          <div className='row align-center justify-center'>
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
        </Card>
      </div>
    </>
  );
};

export default Home;