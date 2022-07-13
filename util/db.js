import prisma from '../lib/prisma';

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
  getTokenByTokenId,
  putTokenByTokenId,
}