import Image from 'next/image'
import { Connect, MetaId } from '../components'

function Mint() {
  const { active, account } = useWeb3React()

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

  const [hasId, setHasId] = useState(false)
  const [isEligible, setIsEligible] = useState(false)

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
    <div></div>
  )
}

export default Mint