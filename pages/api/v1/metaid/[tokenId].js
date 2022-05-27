// Characteristics of Token URI:

// Name (Meta ID #xx)
// Description (taken from copy)
// Image (SVG created using information from below)
// Animation (SVG with animation created using information from below)

// Attributes
// * Identity
// - Name (ENS)
// - Guild
// - PFP ID
// - Race
// - Role
// - Element Affinity

// * Equipment (should use same attributes style as Loot)
// - Weapon
// - Chest Armor
// - Head Armor
// - Waist Armor
// - Foot Armor
// - Hand Armor
// - Necklace
// - Ring

// * Stats (Pull base stats using Alchemy API and then add based on Identity and Equipment)
// - Level
// - HP
// - MP
// - baseSTR
// - bonusSTR
// - baseDEX
// - bonusDEX
// - baseCON
// - bonusCON
// - baseINT
// - bonusINT
// - baseWIS
// - bonusWIS
// - baseCHA
// - bonusCHA

import {
  getTokenByTokenId
} from "../../../../util/db"

import {
  getContractImage
} from "../../../../util/image"

import {
  getGuild,
  getId,
  getRace,
  getRole,
  getElement
} from "../../../../util/identity"

import {
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
    }
  }
}

async function get(tokenId) {
  const db = await getTokenByTokenId(parseInt(tokenId))
  const { identity, equipment, baseStats } = parseDb(db)
  const bonusStats = getBonusStats(identity, equipment)

  return {
    name: `Meta ID #${tokenId}`,
    description: `Meta ID #${tokenId}`,
    image: getContractImage(identity, equipment, baseStats, bonusStats),
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

async function post(tokenId) {
  return {}
}

export default async function handler(req, res) {
  const { tokenId } = req.query
  if (req.method === 'POST') {
    const postJson = await post(tokenId)
    return res.status(200).json(postJson)
  } else {
    const getJson = await get(tokenId)
    return res.status(200).json(getJson)
  }
}