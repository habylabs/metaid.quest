import {
  parseDb,
  getRank,
  getTokenByAddress,
} from '../../../../../util/db'

import {
  getPfpRace,
  getPfpRole,
  getPfpElement,
} from '../../../../../util/identity'

import {
  getStats,
} from '../../../../../util/stats'

import {
  getNFTs
} from '../../../../../util/alchemy'

import {
  IDENTITY_NFT_CONTRACTS,
  CHARACTER_CONTRACT_ADDRESS,
  EQUIPMENT_NFT_CONTRACTS
} from '../../../../../util/constants'
import _ from 'lodash'

const _getIdentityNftOptions = (nftOptions) => {
  const filteredOptions = _.filter(
    nftOptions,
    (nft) => (
      !(_.indexOf(EQUIPMENT_NFT_CONTRACTS, nft.contract) > -1)
    )
  )

  return _.map(
    filteredOptions,
    (nft) => ({
      ...nft,
      race: getPfpRace(nft.contract, nft.metaData),
      role: getPfpRole(nft.contract, nft.metaData),
      element: getPfpElement(nft.contract, nft.metaData)
    })
  )
}

async function get(address) {
  const db = await getTokenByAddress(address)
  const dbData = parseDb(db)
  dbData.stats = await getStats(address, dbData.identity, dbData.equipment)
  dbData.rank = getRank(address)
  const nftOptions = await getNFTs(address)

  const identityNftOptions = _getIdentityNftOptions(nftOptions)

  const freeMintNftOptions =  _.filter(
    identityNftOptions,
    (nft) => (
      _.indexOf(IDENTITY_NFT_CONTRACTS, nft.contract) > -1
    )
  )
  
  const characterNftOptions = _.filter(
    identityNftOptions,
    (nft) => (
      nft.contract === CHARACTER_CONTRACT_ADDRESS
    )
  )

  const hasFreeMint = (freeMintNftOptions.length > 0 || characterNftOptions.length > 0)

  const equipmentNftOptions = _.filter(
    nftOptions,
    (nft) => (
      _.indexOf(EQUIPMENT_NFT_CONTRACTS, nft.contract) > -1
    )
  )

  return {
    dbData,
    hasFreeMint,
    identityNftOptions,
    characterNftOptions,
    equipmentNftOptions
  }
}

export default async function handler(req, res) {
  const { address } = req.query
  const getJson = await get(address)
  return res.status(200).json(getJson)
}