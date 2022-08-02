// Helper functions to populate Stats fields in Meta ID

import _ from "lodash"

import {
  getRace,
  getRole,
  getElement
} from "./identity"

import {
  raceBonusMap,
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

// # of transactions over last 6m
// count of ownership
// count of uniques
// first transaction
// most recent transaction
// # of addresses interacted with over last 6m

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
  const toAddresses = fromTx ? fromTx.map(tx => tx.to) : [];
  const fromAddresses = toTx ? toTx.map(tx => tx.from) : [];

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
          return 8
        }
        return 5
      }
      return 3
    }
    return 2
  }
  return 0
}

function getRaceBonus(race) {
  if (race === 'None') {
    return 0
  }

  // Split the race text up by ' + ' because there might be more than 1 race
  // If there is only 1 race, it creates an array of 1
  const races = race.split(' + ')
  return _.sum(races.map((race) => (raceBonusMap[race])))
}

function getRoleBonus(role) {
  if (role === 'None') {
    return 0
  } 
  
  // Split the role text up by ' + ' because there might be more than 1 role
  // If there is only 1 role, it creates an array of 1
  const roles = role.split(' + ')
  return 2 * roles.length
}

function getElementBonus(element) {
  if (element === 'None') {
    return 0
  } 
  
  // Split the element text up by ' + ' because there might be more than 1 element
  // If there is only 1 element, it creates an array of 1
  const elements = element.split(' + ')
  return _.sum(elements.map((element) => (elementBonusMap[element])))
}

function getIdentityBonus(identity) {
  const race = getRace(identity)
  const role = getRole(identity)
  const element = getElement(identity)

  return getRaceBonus(race) + getRoleBonus(role) + getElementBonus(element)
}

function getBonusStats(identity, equipment) {
  const equipmentBonus = _.sum(_.map(equipment, (item) => (getEquipmentBonus(item))))
  const identityBonus = getIdentityBonus(identity)

  return equipmentBonus + identityBonus
}

const getStats = (address, identity, equipment) => {
  return {
    level: 0,
    nftLevel: 0,
    defiLevel: 0,
    bonusLevel: getBonusStats(identity, equipment)
  }
} 

export {
  getStats,
}