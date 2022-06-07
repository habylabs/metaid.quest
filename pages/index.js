import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useWeb3React } from "@web3-react/core"
import Head from 'next/head'
import Image from 'next/image'
import { Connect, MetaId } from '../components'
import { getContractSvg } from '../util/image'
import exampleGif from '../public/metaid-examples.gif'
import styles from '../styles/components/Stats.module.css'

function readStats({ address }) {
  const { LVL, HP, MP, STR, DEX, CON, INT, WIS, CHA } = address
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
  const { active, account } = useWeb3React()
  const isMobile = useMediaQuery({ maxWidth: 480 })
  
  const [hasId, setHasId] = useState(false)
  const [isEligible, setIsEligible] = useState(false)

  const db = {
    identity: {
      name: null,
      pfp: {
        contract: null,
        id: null,
        image: null,
        race: null,
        role: null,
        element: null
      },
      character: {
        id: null,
        race: null,
        role: null,
        element: null
      },
    },
    equipment: {
      weapon: null,
      chestArmor: null,
      headArmor: null,
      waistArmor: null,
      footArmor: null,
      handAmor: null,
      necklace: null,
      ring: null
    },
    baseStats: {
      str: null,
      dex: null,
      con: null,
      int: null,
      wis: null,
      cha: null,
    },
    bonusStats: {
      str: null,
      dex: null,
      con: null,
      int: null,
      wis: null,
      cha: null,
    }
  }

  /*
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
  */

  function getHeaderText() {
    if (active) {
      if (hasId) {
        return 'Your Meta ID'
      }
      else {
        return 'You need a Meta ID'
      }
    } else {
      return 'Join us in the Metaverse!'
    }
  }

  function getSvg() {
    if (active) {
      return <MetaId data={db} />
    } else {
      return <Image src={exampleGif} alt="meta id examples" />
    }
  }

  function getAction() {
    if (active) {
      if (hasId) {
        return `${account}`
      }
      else {
        if (isEligible) {
          return 'Mint Meta ID'
        } else {
          return 'Mint a Character first!'
        }
      }
    } else {
      return <Connect />
    }
  }

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
          {getSvg()}
        </div>
        <div>
          {getAction()}
        </div>
      </div>
    </>
  );
};

export default Home;