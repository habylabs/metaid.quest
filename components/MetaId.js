import { useAccount, useEnsName } from 'wagmi'

import {
  getGuild,
  getId,
  getRace,
  getRole,
  getElement
} from "../util/identity"

import styles from '../styles/components/MetaId.module.css';

const exampleData = {
  identity: {
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
  stats: {
    level: 24,
    nftLevel: 24,
    defiLevel: 24,
    bonusLevel: 24
  }
}

const emptyData = {
  identity: {
    pfp: {
      contract: null,
      id: null,
      image: null,
      race: '???',
      role: '???',
      element: '???'
    },
    character: {
      id: null,
      race: null,
      role: null,
      element: null
    },
  },
  equipment: {
    weapon: '???',
    chestArmor: '???',
    headArmor: '???',
    waistArmor: '???',
    footArmor: '???',
    handAmor: '???',
    necklace: '???',
    ring: '???'
  },
  stats: {
    level: '??',
    nftLevel: '???',
    defiLevel: '???',
    bonusLevel: '???',
  },
}

function MetaId({ data, example = false, empty = false }) {
  const idData = example ? exampleData : empty ? emptyData : data
  const { identity, equipment, stats } = idData
  const { address } = useAccount()
  const { data: ensName } = useEnsName({ address })

  const name = example ? 'michaelcjoseph.eth' : (ensName ?? 'None')

  return (
    <svg width="100%" viewBox="0 0 1500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="1500" height="500" fill="#002B36"/>
      <image href={identity.pfp.image} height="428" width="428" x="41" y="36"/>
      <rect x="41" y="36" width="428" height="428" stroke="#002B36" strokeWidth="30"/>
      <rect x="41" y="36" width="428" height="428" className={styles.rectBorder}/>
      <rect x="46" y="41" width="418" height="418" className={styles.rectBorder}/>
      <path d="M433.077 305.292L401.155 250L433.077 194.708H496.923L528.845 250L496.923 305.292H433.077Z" fill="#002B36" className={styles.rectBorder}/>
      <text x="450" y="225" className={styles.levelTitle}>LVL</text>
      <text x="430" y="280" className={styles.levelNum}>{stats.level}</text>
      <rect x="581" y="36" width="258" height="428" className={styles.rectBorder}/>
      <rect x="586" y="41" width="248" height="418" className={styles.rectBorder}/>
      <text x="652" y="80" className={styles.headText}>IDENTITY</text>
      <text x="600" y="110" className={styles.titleText}>NAME</text>
      <text x="600" y="125" className={styles.baseText}>{name}</text>
      <text x="600" y="150" className={styles.titleText}>GUILD</text>
      <text x="600" y="165" className={styles.baseText}>{getGuild(identity)}</text>
      <text x="600" y="190" className={styles.titleText}>ID</text>
      <text x="600" y="205" className={styles.baseText}>{getId(identity)}</text>
      <text x="600" y="230" className={styles.titleText}>RACE</text>
      <text x="600" y="245" className={styles.baseText}>{getRace(identity)}</text>
      <text x="600" y="270" className={styles.titleText}>ROLE</text>
      <text x="600" y="285" className={styles.baseText}>{getRole(identity)}</text>
      <text x="600" y="310" className={styles.titleText}>ELEMENT</text>
      <text x="600" y="325" className={styles.baseText}>{getElement(identity)}</text>
      <rect x="865" y="36" width="408" height="428" className={styles.rectBorder}/>
      <rect x="870" y="41" width="398" height="418" className={styles.rectBorder}/>
      <text x="1004" y="80" className={styles.headText}>EQUIPMENT</text>
      <text x="884" y="110" className={styles.titleText}>WEAPON</text>
      <text x="884" y="125" className={styles.baseText}>{equipment.weapon}</text>
      <text x="884" y="150" className={styles.titleText}>CHEST ARMOR</text>
      <text x="884" y="165" className={styles.baseText}>{equipment.chestArmor}</text>
      <text x="884" y="190" className={styles.titleText}>HEAD ARMOR</text>
      <text x="884" y="205" className={styles.baseText}>{equipment.headArmor}</text>
      <text x="884" y="230" className={styles.titleText}>WAIST ARMOR</text>
      <text x="884" y="245" className={styles.baseText}>{equipment.waistArmor}</text>
      <text x="884" y="270" className={styles.titleText}>HAND ARMOR</text>
      <text x="884" y="285" className={styles.baseText}>{equipment.handAmor}</text>
      <text x="884" y="310" className={styles.titleText}>FOOT ARMOR</text>
      <text x="884" y="325" className={styles.baseText}>{equipment.footArmor}</text>
      <text x="884" y="350" className={styles.titleText}>NECKLACE</text>
      <text x="884" y="365" className={styles.baseText}>{equipment.necklace}</text>
      <text x="884" y="390" className={styles.titleText}>RING</text>
      <text x="884" y="405" className={styles.baseText}>{equipment.ring}</text>
      <rect x="1299" y="36" width="158" height="428" className={styles.rectBorder}/>
      <rect x="1304" y="41" width="148" height="418" className={styles.rectBorder}/>
      <text x="1342" y="80" className={styles.headText}>STATS</text>
      <text x="1318" y="110" className={styles.titleText}>LEVEL</text>
      <text x="1318" y="125" className={styles.baseText}>{stats.level}</text>
      <text x="1318" y="150" className={styles.titleText}>NFT LEVEL</text>
      <text x="1318" y="165" className={styles.baseText}>{stats.nftLevel}</text>
      <text x="1318" y="190" className={styles.titleText}>DEFI LEVEL</text>
      <text x="1318" y="205" className={styles.baseText}>{stats.defiLevel}</text>
      <text x="1318" y="230" className={styles.titleText}>BONUS LEVEL</text>
      <text x="1318" y="245" className={styles.baseText}>{stats.bonusLevel}</text>
    </svg>
  )
}

export default MetaId