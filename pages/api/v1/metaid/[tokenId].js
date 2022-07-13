import {
  getTokenByTokenId,
  putTokenByTokenId
} from "../../../../util/db"

import {
  getContractImage
} from "../../../../util/image"

import {
  getGuild,
  getId,
  getRace,
  getRole,
  getElement,
  getIdentity
} from "../../../../util/identity"

import {
  getEquipment
} from "../../../../util/equipment"

import {
  getBaseStats,
  getBonusStats,
  getLevel,
  getHP,
  getMP
} from "../../../../util/stats"

function parseDb(db) {
  return {
    identity: {
      name: db["ens_name"],
      pfp: {
        contract: db["pfp_contract"],
        id: db["pfp_id"],
        image: db["pfp_img"],
        race: db["pfp_race"],
        role: db["pfp_role"],
        element: db["pfp_element"]
      },
      character: {
        id: db["char_id"],
        race: db["char_race"],
        role: db["char_role"],
        element: db["char_element"]
      },
    },
    equipment: {
      weapon: db.weapon,
      chestArmor: db["chest_armor"],
      headArmor: db["head_armor"],
      waistArmor: db["waist_armor"],
      footArmor: db["foot_armor"],
      handAmor: db["hand_armor"],
      necklace: db.necklace,
      ring: db.ring
    },
    baseStats: {
      str: db["base_str"],
      dex: db["base_dex"],
      con: db["base_con"],
      int: db["base_int"],
      wis: db["base_wis"],
      cha: db["base_cha"],
    },
    bonusStats: {
      str: db["bonus_str"],
      dex: db["bonus_dex"],
      con: db["bonus_con"],
      int: db["bonus_int"],
      wis: db["bonus_wis"],
      cha: db["bonus_cha"],
    }
  }
}

function formatRes(tokenId, identity, equipment, baseStats, bonusStats) {
  return {
    name: `Meta ID #${tokenId}`,
    description: `Meta ID #${tokenId}`,
    image: getContractImage(identity, baseStats),
    attributes: [
      {
        "trait_type": "Name",
        "value": identity.name
      },
      {
        "trait_type": "Guild",
        "value": getGuild(identity)
      },
      {
        "trait_type": "ID",
        "value": getId(identity)
      },
      {
        "trait_type": "Race",
        "value": getRace(identity)
      },
      {
        "trait_type": "Role",
        "value": getRole(identity)
      },
      {
        "trait_type": "Element",
        "value": getElement(identity)
      },
      {
        "trait_type": "Weapon",
        "value": equipment.weapon
      },
      {
        "trait_type": "Chest Armor",
        "value": equipment.chestArmor
      },
      {
        "trait_type": "Head Armor",
        "value": equipment.headArmor
      },
      {
        "trait_type": "Waist Armor",
        "value": equipment.waistArmor
      },
      {
        "trait_type": "Foot Armor",
        "value": equipment.footArmor
      },
      {
        "trait_type": "Hand Armor",
        "value": equipment.handAmor
      },
      {
        "trait_type": "Necklace",
        "value": equipment.necklace
      },
      {
        "trait_type": "Ring",
        "value": equipment.ring
      },
      {
        "trait_type": "Level",
        "value": getLevel(baseStats)
      },
      {
        "trait_type": "HP",
        "value": getHP(baseStats, bonusStats)
      },
      {
        "trait_type": "MP",
        "value": getMP(baseStats, bonusStats)
      },
      {
        "trait_type": "Base STR",
        "value": baseStats.str
      },
      {
        "trait_type": "Bonus STR",
        "value": bonusStats.str
      },
      {
        "trait_type": "Base DEX",
        "value": baseStats.dex
      },
      {
        "trait_type": "Bonus DEX",
        "value": bonusStats.dex
      },
      {
        "trait_type": "Base CON",
        "value": baseStats.con
      },
      {
        "trait_type": "Bonus CON",
        "value": bonusStats.con
      },
      {
        "trait_type": "Base INT",
        "value": baseStats.int
      },
      {
        "trait_type": "Bonus INT",
        "value": bonusStats.int
      },
      {
        "trait_type": "Base WIS",
        "value": baseStats.wis
      },
      {
        "trait_type": "Bonus WIS",
        "value": bonusStats.wis
      },
      {
        "trait_type": "Base CHA",
        "value": baseStats.cha
      },
      {
        "trait_type": "Bonus CHA",
        "value": bonusStats.cha
      },
    ]
  }
}

async function get(tokenId) {
  const db = await getTokenByTokenId(parseInt(tokenId))
  const { identity, equipment, baseStats, bonusStats } = parseDb(db)
  return formatRes(tokenId, identity, equipment, baseStats, bonusStats)
}

async function put(tokenId, reqBody) {
  const { ownerAddress, pfp, charId, equip } = reqBody
  const identity = await getIdentity(ownerAddress, pfp, charId)
  const equipment = getEquipment(identity, equip)
  const baseStats = getBaseStats(ownerAddress)
  const bonusStats = getBonusStats (identity, equipment)
  
  await putTokenByTokenId(tokenId, ownerAddress, identity, equipment, baseStats, bonusStats)
  return formatRes(tokenId, identity, equipment, baseStats, bonusStats)
}

export default async function handler(req, res) {
  const { tokenId } = req.query
  if (req.method === "PUT") {
    const putJson = await put(tokenId, reqBody)
    return res.status(200).json(putJson)
  } else {
    const getJson = await get(tokenId)
    return res.status(200).json(getJson)
  }
}