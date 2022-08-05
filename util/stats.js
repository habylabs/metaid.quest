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
  getLatestBlockNum,
  getFromTx,
  getToTx,
  getDeFiTokenCount,
  getNFTCount,
} from "./alchemy"

function _logCalc(t, multiple = 1) {
  const logx = Math.log2(t + 1)
  return Math.round(multiple * Math.pow(logx, 2)) + 1
}

const _getEquipmentBonus = (item) => {
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

const _getRaceBonus = (race) => {
  if (race === 'None') {
    return 0
  }

  // Split the race text up by ' + ' because there might be more than 1 race
  // If there is only 1 race, it creates an array of 1
  const races = race.split(' + ')
  return _.sum(races.map((race) => (raceBonusMap[race])))
}

const _getRoleBonus = (role) => {
  if (role === 'None') {
    return 0
  } 
  
  // Split the role text up by ' + ' because there might be more than 1 role
  // If there is only 1 role, it creates an array of 1
  const roles = role.split(' + ')
  return 2 * roles.length
}

const _getElementBonus = (element) => {
  if (element === 'None') {
    return 0
  } 
  
  // Split the element text up by ' + ' because there might be more than 1 element
  // If there is only 1 element, it creates an array of 1
  const elements = element.split(' + ')
  return _.sum(elements.map((element) => (elementBonusMap[element])))
}

const _getIdentityBonus = (identity) => {
  const race = getRace(identity)
  const role = getRole(identity)
  const element = getElement(identity)

  return _getRaceBonus(race) + _getRoleBonus(role) + _getElementBonus(element)
}

const getBonusStats = (identity, equipment) => {
  const equipmentBonus = _.sum(_.map(equipment, (item) => (_getEquipmentBonus(item))))
  const identityBonus = _getIdentityBonus(identity)

  return equipmentBonus + identityBonus
}

const _getFirstTx = (firstFromTx, firstToTx) => {
  if (firstFromTx && firstToTx) {
    if (parseInt(firstFromTx.blockNum, 16) > parseInt(firstToTx.blockNum, 16)) {
      return firstToTx
    }
  
    return firstFromTx
  }

  if (firstFromTx) return firstFromTx
  if (firstToTx) return firstToTx
  return null
}

const _getLatestTx = (latestFromTx, latestToTx) => {
  if (latestFromTx && latestToTx) {
    if (parseInt(latestFromTx.blockNum, 16) > parseInt(latestToTx.blockNum, 16)) {
      return latestFromTx
    }
  
    return latestToTx
  }
  
  if (latestFromTx) return latestFromTx
  if (latestToTx) return latestToTx
  return null
}

const _getBlockNumDiff = (firstTx, latestTx) => {
  if (firstTx && latestTx) {
    return parseInt(latestTx.blockNum, 16) - parseInt(firstTx.blockNum, 16)
  }
  
  return 0
}

const _getLevel = (fromTx, toTx, tokenCount) => {
  const firstTx = _getFirstTx(fromTx[0], toTx[0])
  const latestTx = _getLatestTx(fromTx[fromTx.length - 1], toTx[toTx.length - 1])

  const activity = _logCalc(fromTx.length + toTx.length)
  const experience = _logCalc(_getBlockNumDiff(firstTx, latestTx) / 10000)
  const smartContracts = _logCalc(tokenCount.allTime, 2)
  const tokens = _logCalc(tokenCount.current, 2)

  return _.floor((activity + experience + smartContracts + tokens) / 4)
}

const getStats = async (address, identity, equipment) => {
  const latestBlockNum = await getLatestBlockNum()
  const allFromTx = await getFromTx(address, '0x1', latestBlockNum)
  const allToTx = await getToTx(address, '0x1', latestBlockNum)
  const defiTokenCount = await getDeFiTokenCount(address, allFromTx.defi, allToTx.defi)
  const nftCount = await getNFTCount(address, allFromTx.nft, allToTx.nft)
  const tokenCount = {
    all: {
      allTime: defiTokenCount.allTime + nftCount.allTime,
      current: defiTokenCount.current + nftCount.current,
    },
    defi: defiTokenCount,
    nft: nftCount
  }

  return {
    level: _getLevel(allFromTx.all, allToTx.all, tokenCount.all),
    nftLevel: _getLevel(allFromTx.nft, allToTx.nft, tokenCount.nft),
    defiLevel: _getLevel(allFromTx.defi, allToTx.defi, tokenCount.defi),
    bonusLevel: getBonusStats(identity, equipment)
  }
} 

export {
  getBonusStats,
  getStats,
}