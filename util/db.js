import prisma from '../lib/prisma'

function parseDb(data) {
  if (data) {
    return {
      tokenId: data["token_id"],
      identity: {
        name: data["ens_name"],
        pfp: {
          contract: data["pfp_contract"],
          id: data["pfp_id"],
          guild: data["pfp_guild"],
          image: data["pfp_image"],
          race: data["pfp_race"],
          role: data["pfp_role"],
          element: data["pfp_element"]
        },
        character: {
          id: data["char_id"],
          race: data["char_race"],
          role: data["char_role"],
          element: data["char_element"]
        },
      },
      equipment: {
        contract: {
          address: data["equip_contract"],
          id: data["equip_id"],
        },
        items: {
          weapon: data.weapon,
          chestArmor: data["chest_armor"],
          headArmor: data["head_armor"],
          waistArmor: data["waist_armor"],
          footArmor: data["foot_armor"],
          handAmor: data["hand_armor"],
          necklace: data.necklace,
          ring: data.ring
        },
      },
      stats: {
        level: data.level,
        nftLevel: data["nft_level"],
        defiLevel: data["defi_level"],
        luck: data["luck_level"],
      },
    }
  }
  
  return {
    tokenId: null,
    identity: {
      name: null,
      pfp: {
        contract: null,
        id: '???',
        guild: '???',
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
      contract: null,
      items: {
        weapon: '???',
        chestArmor: '???',
        headArmor: '???',
        waistArmor: '???',
        footArmor: '???',
        handAmor: '???',
        necklace: '???',
        ring: '???'
      }
    },
    stats: {
      level: '???',
      nftLevel: '???',
      defiLevel: '???',
      luck: '???',
    },
  }
}

function getRank(address) {
  return {
    overall: {
      rank: 1,
      percentile: '99%'
    },
    nft: {
      rank: 1,
      percentile: '99%'
    },
    defi: {
      rank: 1,
      percentile: '99%'
    },
    luck: {
      rank: 1,
      percentile: '99%'
    },
  }
}

const getMiniLeaderboard = async () => {
  // This returns the top 5 individual and community for just all level
  return {
    individual: [
      {
        name: 'michaelcjoseph.eth',
        address: '0x66782E5a061B5A63536f912380A6dcf9481900C7',
        level: 78,
      },
      {
        name: null,
        address: '0xA282AB51650B3cBc84acA92E5f328a1B12658700',
        level: 28,
      },
      {
        name: 'cantino.eth',
        address: '0x79dd8Fab0661Da2Cd4131BB454bAb060576ce2ee',
        level: 113,
      },
      {
        name: 'xuannu.eth',
        address: '0xa3e90da6c1d5ea0b1b4e881d1eaaaaaaf3c25cc2',
        level: 54,
      },
      {
        name: 'tomwhite.eth',
        address: '0xc32ba9452cb2bcfa2462686f7a2b62811e3a4058',
        level: 101,
      },
    ],
    guild: [
      {
        name: 'BAYC',
        level: 480,
      },
      {
        name: 'Crypto Punks',
        level: 376,
      },
      {
        name: 'CoolCats',
        level: 345,
      },
      {
        name: 'The Idols',
        level: 297,
      },
      {
        name: 'Crypto Coven',
        level: 265,
      },
    ],
  }
}

const getFullLeaderboard = async () => {
  // This needs to return top 100 individuals and communities by all, nft, and defi level.
  return {
    all: {
      individual: [
        {
          name: 'michaelcjoseph.eth',
          address: '0x66782E5a061B5A63536f912380A6dcf9481900C7',
          level: 78,
        },
        {
          name: '',
          address: '0xA282AB51650B3cBc84acA92E5f328a1B12658700',
          level: 28,
        },
        {
          name: 'cantino.eth',
          address: '0x79dd8Fab0661Da2Cd4131BB454bAb060576ce2ee',
          level: 113,
        },
        {
          name: 'xuannu.eth',
          address: '0xa3e90da6c1d5ea0b1b4e881d1eaaaaaaf3c25cc2',
          level: 54,
        },
        {
          name: 'tomwhite.eth',
          address: '0xc32ba9452cb2bcfa2462686f7a2b62811e3a4058',
          level: 101,
        },
      ],
      guild: [
        {
          name: 'BAYC',
          level: 480,
        },
        {
          name: 'Crypto Punks',
          level: 376,
        },
        {
          name: 'CoolCats',
          level: 345,
        },
        {
          name: 'The Idols',
          level: 297,
        },
        {
          name: 'Crypto Coven',
          level: 265,
        },
      ],
    },
    nft: {
      individual: [
        {
          name: 'michaelcjoseph.eth',
          address: '0x66782E5a061B5A63536f912380A6dcf9481900C7',
          level: 70,
        },
        {
          name: '',
          address: '0xA282AB51650B3cBc84acA92E5f328a1B12658700',
          level: 27,
        },
        {
          name: 'cantino.eth',
          address: '0x79dd8Fab0661Da2Cd4131BB454bAb060576ce2ee',
          level: 108,
        },
        {
          name: 'xuannu.eth',
          address: '0xa3e90da6c1d5ea0b1b4e881d1eaaaaaaf3c25cc2',
          level: 43,
        },
        {
          name: 'tomwhite.eth',
          address: '0xc32ba9452cb2bcfa2462686f7a2b62811e3a4058',
          level: 78,
        },
      ],
      guild: [
        {
          name: 'BAYC',
          level: 480,
        },
        {
          name: 'Crypto Punks',
          level: 376,
        },
        {
          name: 'CoolCats',
          level: 345,
        },
        {
          name: 'The Idols',
          level: 297,
        },
        {
          name: 'Crypto Coven',
          level: 265,
        },
      ],
    },
    defi: {
      individual: [
        {
          name: 'michaelcjoseph.eth',
          address: '0x66782E5a061B5A63536f912380A6dcf9481900C7',
          level: 47,
        },
        {
          name: '',
          address: '0xA282AB51650B3cBc84acA92E5f328a1B12658700',
          level: 22,
        },
        {
          name: 'cantino.eth',
          address: '0x79dd8Fab0661Da2Cd4131BB454bAb060576ce2ee',
          level: 81,
        },
        {
          name: 'xuannu.eth',
          address: '0xa3e90da6c1d5ea0b1b4e881d1eaaaaaaf3c25cc2',
          level: 28,
        },
        {
          name: 'tomwhite.eth',
          address: '0xc32ba9452cb2bcfa2462686f7a2b62811e3a4058',
          level: 95,
        },
      ],
      guild: [
        {
          name: 'BAYC',
          level: 480,
        },
        {
          name: 'Crypto Punks',
          level: 376,
        },
        {
          name: 'CoolCats',
          level: 345,
        },
        {
          name: 'The Idols',
          level: 297,
        },
        {
          name: 'Crypto Coven',
          level: 265,
        },
      ],
    },
  }
}

async function getTokenByAddress(address) {
  try {
    const token = await prisma.token.findUnique({
      where: {
        owner_address: address,
      },
    })

    return token
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function getTokenByTokenId(tokenId) {
  try {
    const token = await prisma.token.findUnique({
      where: {
        token_id: tokenId,
      },
    })

    return token
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function putTokenByAddress(address, data) {
  const { tokenId, identity, equipment, stats } = data
  const { pfp, character } = identity
  const { contract, items } = equipment
  const newData = {
    token_id: tokenId,
    owner_address: address,
    ens_name: identity.name ? identity.name : undefined,
    pfp_contract: pfp.contract ? pfp.contract : undefined,
    pfp_guild: pfp.guild ? pfp.guild : undefined,
    pfp_id: pfp.id ? pfp.id : undefined,
    pfp_image: pfp.image? pfp.image : undefined,
    pfp_race: pfp.race ? pfp.race : undefined,
    pfp_role: pfp.role ? pfp.role : undefined,
    pfp_element: pfp.element ? pfp.element : undefined,
    char_id: character.id ? character.id : undefined,
    char_race: character.race ? character.race : undefined,
    char_role: character.role ? character.race : undefined,
    char_element: character.element ? character.race : undefined,
    equip_contract: contract ? contract.address : undefined,
    equip_id: contract ? contract.id : undefined,
    weapon: items ? items.weapon : undefined,
    chest_armor: items ? items.chestArmor : undefined,
    head_armor: items ? items.headArmor : undefined,
    waist_armor: items ? items.waistArmor : undefined,
    foot_armor: items ? items.footArmor : undefined,
    hand_armor: items ? items.handArmor : undefined,
    necklace: items ? items.necklace : undefined,
    ring: items ? items.ring : undefined,
    level: stats.level,
    nft_level: stats.nftLevel,  
    defi_level: stats.defiLevel,
    luck_level: stats.luck,
  }

  try {
    const token = await prisma.token.upsert({
      where: { owner_address: address },
      update: newData,
      create: newData,
    })

    return token
  } catch (error) {
    console.error(error)
    throw error
  }
}

export {
  parseDb,
  getRank,
  getMiniLeaderboard,
  getFullLeaderboard,
  getTokenByAddress,
  getTokenByTokenId,
  putTokenByAddress,
}