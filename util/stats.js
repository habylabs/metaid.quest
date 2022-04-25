// Helper functions to populate Stats fields in Meta ID

import {
  getRace,
  getRole,
  getElement
} from "./identity"

import {
  raceBonusMap,
  roleCategoryMap,
  roleBonusMap,
  elementBonusMap
} from "./mapping"

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

function getRaceBonus(race) {
  if (race.includes(" + ")) {
    const races = race.split(" + ")
    const bonuses = [
      raceBonusMap[races[0]],
      raceBonusMap[races[1]]
    ]

    return {
      str: bonuses[0].str + bonuses[1].str,
      dex: bonuses[0].dex + bonuses[1].dex,
      con: bonuses[0].con + bonuses[1].con,
      int: bonuses[0].int + bonuses[1].int,
      wis: bonuses[0].wis + bonuses[1].wis,
      cha: bonuses[0].cha + bonuses[1].cha
    }
  }

  return raceBonusMap[race]
}

function getRoleBonus(role) {
  if (role.includes(" + ")) {
    const roles = role.split(" + ")
    const bonuses = [
      roleBonusMap[roleCategoryMap[roles[0]]],
      roleBonusMap[roleCategoryMap[roles[1]]]
    ]

    return {
      str: bonuses[0].str + bonuses[1].str,
      dex: bonuses[0].dex + bonuses[1].dex,
      con: bonuses[0].con + bonuses[1].con,
      int: bonuses[0].int + bonuses[1].int,
      wis: bonuses[0].wis + bonuses[1].wis,
      cha: bonuses[0].cha + bonuses[1].cha
    }
  }

  return roleBonusMap[roleCategoryMap[role]]
}

function getElementBonus(element) {
  if (element.includes(" + ")) {
    const elements = element.split(" + ")
    const bonuses = [
      elementBonusMap[elements[0]],
      elementBonusMap[elements[1]]
    ]

    return {
      str: bonuses[0].str + bonuses[1].str,
      dex: bonuses[0].dex + bonuses[1].dex,
      con: bonuses[0].con + bonuses[1].con,
      int: bonuses[0].int + bonuses[1].int,
      wis: bonuses[0].wis + bonuses[1].wis,
      cha: bonuses[0].cha + bonuses[1].cha
    }
  }

  return elementBonusMap[element]
}

function getIdentityBonus(identity) {
  const race = getRace(identity)
  const role = getRole(identity)
  const element = getElement(identity)

  const raceBonus = getRaceBonus(race)
  const roleBonus = getRoleBonus(role)
  const elementBonus = getElementBonus(element)

  return {
    str: raceBonus.str + roleBonus.str + elementBonus.str,
    dex: raceBonus.dex + roleBonus.dex + elementBonus.dex,
    con: raceBonus.con + roleBonus.con + elementBonus.con,
    int: raceBonus.int + roleBonus.int + elementBonus.int,
    wis: raceBonus.wis + roleBonus.wis + elementBonus.wis,
    cha: raceBonus.cha + roleBonus.cha + elementBonus.cha
  }
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

  const idBonus = getIdentityBonus(identity)

  return {
    str: getEquipmentBonus(weapon) + idBonus.str,
    dex: getEquipmentBonus(footArmor) + getEquipmentBonus(handAmor) + idBonus.dex,
    con: getEquipmentBonus(chestArmor) + idBonus.con,
    int: getEquipmentBonus(headArmor) + idBonus.int,
    wis: getEquipmentBonus(waistArmor) + idBonus.wis,
    cha: getEquipmentBonus(necklace) + getEquipmentBonus(ring) + idBonus.cha,
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

export {
  getBonusStats,
  getLevel,
  getHP,
  getMP
}