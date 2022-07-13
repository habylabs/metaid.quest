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

import {
  get6mBlock,
  getFirstTx,
  getFromTx,
  getToTx,
  getTokens,
  getNFTCount,
} from "./alchemy"

function logCalc(t, multiple = 1) {
  const logx = Math.log2(t + 1)
  return Math.round(multiple * Math.pow(logx, 2)) + 5
}

function getSTR(fromTx) {
  return logCalc(fromTx.length)
}

function getDEX(tokens) {
  const ownedTokens = tokens.filter(({ tokenBalance }) => parseInt(tokenBalance, 16) > 0)
  return logCalc(ownedTokens.length, 2)
}

function getCON(toTx) {
  return logCalc(toTx.length)
}

function getINT(nftCount) {
  return logCalc(nftCount)
}

function getWIS(firstTx, fromTx, toTx) {
  if (firstTx) {
    const latestFromTx = fromTx.length > 0 ? fromTx[fromTx.length - 1].blockNum : 0
    const latestToTx = toTx.length > 0 ? toTx[toTx.length - 1].blockNum : 0

    const latestFromTxInt = parseInt(latestFromTx, 16)
    const latestToTxInt = parseInt(latestToTx, 16)

    const latestTx = (latestFromTxInt > latestToTxInt) ? latestFromTxInt : latestToTxInt

    const blockDiff = latestTx - parseInt(firstTx.blockNum, 16)
    return logCalc(blockDiff / 10000)
  }
  
  return logCalc(0)
}

function getCHA(fromTx, toTx) {
  const toAddresses = fromTx.map(tx => tx.to);
  const fromAddresses = toTx.map(tx => tx.from);

  const dedupAddresses = [...new Set([...toAddresses, ...fromAddresses])];
  return logCalc(dedupAddresses.length)
}

async function getBaseStats(address) {
  const firstTx = await getFirstTx(address)
  const fromBlock = await get6mBlock()
  const fromTx = await getFromTx(fromBlock, address)
  const toTx = await getToTx(fromBlock, address)
  const tokens = await getTokens(address)
  const nftCount = await getNFTCount(address)

  const str = getSTR(fromTx)
  const dex = getDEX(tokens)
  const con = getCON(toTx)
  const int = getINT(nftCount)
  const wis = getWIS(firstTx, fromTx, toTx)
  const cha = getCHA(fromTx, toTx)

  return {
    str,
    dex,
    con,
    int,
    wis,
    cha
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

function getLevel(baseStats) {
  const { str, dex, con, int, wis, cha } = baseStats
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
  getBaseStats,
  getBonusStats,
  getLevel,
  getHP,
  getMP
}