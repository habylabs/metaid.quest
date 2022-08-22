import {
  parseDb,
  getRank,
  getTokenByAddress,
  putTokenByAddress
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
  FREE_MINT_CONTRACTS,
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
      race: getPfpRace(nft.contract, nft.attributes),
      role: getPfpRole(nft.contract, nft.attributes),
      element: getPfpElement(nft.contract, nft.attributes)
    })
  )
}

const get = async (address) => {
  const db = await getTokenByAddress(address)
  const dbData = parseDb(db)
  dbData.stats = await getStats(address, dbData.identity, dbData.equipment)
  dbData.rank = await getRank(address)
  const nftOptions = await getNFTs(address)

  const identityNftOptions = _getIdentityNftOptions(nftOptions)

  const freeMintNftOptions =  _.filter(
    identityNftOptions,
    (nft) => (
      _.indexOf(FREE_MINT_CONTRACTS, nft.contract) > -1
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

const put = async (address, reqBody) => {
  console.log(reqBody)
  const token = await putTokenByAddress(address, reqBody)
  return token
}

export default async function handler(req, res) {
  const { address } = req.query
  if (req.method === "PUT") {
    const putJson = await put(address, req.body)
    return res.status(200).json(putJson)
  } else {
    const getJson = await get(address)
    return res.status(200).json(getJson)
  }
}