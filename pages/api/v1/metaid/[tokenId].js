// Characteristics of Token URI
// Name (Meta ID #xx)
// Description (taken from copy)
// Image (SVG created using information from below)
// Animation (SVG with animation created using information from below)

// Attributes
// * Identity
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

function parseDb(db) {
  return {
    identity: {
      race: db.race,
      role: db.role,
      element: db.element
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

function getEquipmentBonus(item) {
  if (item) {
    if (item.includes("of")) {
      if (item.startsWith("\"")) {
        if (item.includes("+1")) {
          return 10
        }
        return 8
      }
      return 6
    }
    return 4
  }
  return 0
}

function getBonusStats(identity, equipment) {
  const { 
    weapon,
    chestArmor,
    headArmor,
    waistArmor,
    footArmor,
    handAmor,
    necklace,
    ring
  } = equipment

  return {
    str: getEquipmentBonus(weapon),
    dex: getEquipmentBonus(footArmor) + getEquipmentBonus(handAmor),
    con: getEquipmentBonus(chestArmor),
    int: getEquipmentBonus(headArmor),
    wis: getEquipmentBonus(waistArmor),
    cha: getEquipmentBonus(necklace) + getEquipmentBonus(ring),
  }
}

function getLevel({ str, dex, con, int, wis, cha }) {
  return Math.round((str + dex + con + int + wis + cha) / 6) - 4
}

function getHP(baseStats, bonusStats) {
  const baseSum = baseStats.str + baseStats.dex + baseStats.con
  const bonusSum = bonusStats.str + bonusStats.dex + bonusStats.con
  return 10 * (baseSum + bonusSum) + 50
}

function getMP(baseStats, bonusStats) {
  const baseSum = baseStats.int + baseStats.wis + baseStats.cha
  const bonusSum = bonusStats.int + bonusStats.wis + bonusStats.cha
  return 10 * (baseSum + bonusSum) + 50
}

export default async function handler(req, res) {
  const { tokenId } = req.query
  const db = await getTokenByTokenId(parseInt(tokenId))
  const { identity, equipment, baseStats } = parseDb(db) 
  const bonusStats = getBonusStats(identity, equipment)

  return res.status(200).json({
    name: `Meta ID #${tokenId}`,
    description: `Meta ID #${tokenId}`,
    image: "",
    animation: "",
    attributes: [
      {
        "trait_type": "Race",
        "value": identity.race
      },
      {
        "trait_type": "Role",
        "value": identity.role
      },
      {
        "trait_type": "Element",
        "value": identity.element
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
  })
}