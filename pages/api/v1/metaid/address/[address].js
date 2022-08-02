import {
  parseDb,
  getTokenByAddress,
} from '../../../../../util/db'

import {
  getBaseStats,
} from '../../../../../util/stats'

import {
  getNFTs
} from '../../../../../util/alchemy'

async function get(address) {
  const db = await getTokenByAddress(address)
  const dbData = parseDb(db)
  dbData.baseStats = await getBaseStats(address)
  const identityNftOptions = await getNFTs(address, 'identity')
  const equipmentNftOptions = await getNFTs(address, 'equipment')

  // Need to add in the option of "Unequip" or something that will be displayed in the list

  return { dbData, identityNftOptions, equipmentNftOptions }
}

export default async function handler(req, res) {
  const { address } = req.query
  const getJson = await get(address)
  return res.status(200).json(getJson)
}