import prisma from '../lib/prisma'

function parseDb(data) {
  if (data) {
    return {
      identity: {
        name: data["ens_name"],
        pfp: {
          contract: data["pfp_contract"],
          id: data["pfp_id"],
          guild: data["pfp_guild"],
          image: data["pfp_img"],
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

async function putTokenByTokenId(tokenId, ownerAddress, identity, equipment, baseStats, bonusStats) {
  const newData = {
    owner_address: ownerAddress,
    ens_name: identity.ensName,
    pfp_contract: identity.pfpContract,
    pfp_id: identity.pfpId,
    pfp_img: identity.pfpImg,
    pfp_race: identity.pfpRace,
    pfp_role: identity.pfpRole,
    pfp_element: identity.pfpElement,
    char_id: identity.charId,
    char_race: identity.charRace,
    char_role: identity.charRole,
    char_element: identity.charElement,
    equip_contract: equipment.equipContract,
    equip_id: equipment.equipId,
    weapon: equipment.weapon,
    chest_armor: equipment.chestArmor,
    head_armor: equipment.headArmor,
    waist_armor: equipment.waistArmor,
    foot_armor: equipment.footArmor,
    hand_armor: equipment.handArmor,
    necklace: equipment.necklace,
    ring: equipment.ring,
    level: baseStats.level,
    nft_level: baseStats.nftLevel,  
    defi_level: baseStats.defiLevel,
    luck_level: baseStats.luck,
  }

  try {
    const token = await prisma.token.upsert({
      where: { token_id: tokenId },
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
  putTokenByTokenId,
}