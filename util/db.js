import prisma from '../lib/prisma'

function parseDb(data) {
  if (data) {
    return {
      identity: {
        name: data["ens_name"],
        pfp: {
          contract: data["pfp_contract"],
          id: data["pfp_id"],
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
      baseStats: {
        str: data["base_str"],
        dex: data["base_dex"],
        con: data["base_con"],
        int: data["base_int"],
        wis: data["base_wis"],
        cha: data["base_cha"],
      },
      bonusStats: {
        str: data["bonus_str"],
        dex: data["bonus_dex"],
        con: data["bonus_con"],
        int: data["bonus_int"],
        wis: data["bonus_wis"],
        cha: data["bonus_cha"],
      }
    }
  }
  
  return {
    identity: {
      name: null,
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
    baseStats: {
      str: '???',
      dex: '???',
      con: '???',
      int: '???',
      wis: '???',
      cha: '???',
    },
    bonusStats: {
      str: '???',
      dex: '???',
      con: '???',
      int: '???',
      wis: '???',
      cha: '???',
    }
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
    base_str: baseStats.str,
    base_dex: baseStats.dex,  
    base_con: baseStats.con,
    base_int: baseStats.int,
    base_wis: baseStats.wis,
    base_cha: baseStats.cha,
    bonus_str: bonusStats.str,
    bonus_dex: bonusStats.dex,
    bonus_con: bonusStats.con,
    bonus_int: bonusStats.int,
    bonus_wis: bonusStats.wis,
    bonus_cha: bonusStats.cha,
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
  getTokenByAddress,
  getTokenByTokenId,
  putTokenByTokenId,
}