import {
  parseDb,
  getRank,
  getTokenByAddress,
} from '../../../../../util/db'

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

async function get(address) {
  const db = await getTokenByAddress(address)
  const dbData = parseDb(db)
  dbData.stats = await getStats(address)
  dbData.rank = getRank(address)
  const nftOptions = await getNFTs(address)

  const freeMintNftOptions =  _.filter(
    nftOptions,
    (nft) => (
      _.indexOf(IDENTITY_NFT_CONTRACTS, nft.contract) > -1
    )
  )

  const identityNftOptions = _.filter(
    nftOptions,
    (nft) => (
      !(_.indexOf(EQUIPMENT_NFT_CONTRACTS, nft.contract) > -1)
    )
  )
  
  const characterNftOptions = _.filter(
    nftOptions,
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