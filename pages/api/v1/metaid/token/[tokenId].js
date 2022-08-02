import {
  parseDb,
  getTokenByTokenId,
  putTokenByTokenId
} from '../../../../../util/db'

import {
  getContractImage
} from '../../../../../util/image'

import {
  getGuild,
  getId,
  getRace,
  getRole,
  getElement,
  getIdentity
} from '../../../../../util/identity'

import {
  getEquipment
} from '../../../../../util/equipment'

import {
  getStats,
} from '../../../../../util/stats'

function formatRes(tokenId, identity, equipment, stats) {
  return {
    name: `Meta ID #${tokenId}`,
    description: `Meta ID #${tokenId}`,
    image: getContractImage(identity, stats),
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
        "value": stats.level
      },
      {
        "trait_type": "NFT Level",
        "value": stats.nftLevel
      },
      {
        "trait_type": "DeFi Level",
        "value": stats.defiLevel
      },
      {
        "trait_type": "Bonus Level",
        "value": stats.bonusLevel
      },
    ]
  }
}

async function get(tokenId) {
  const db = await getTokenByTokenId(parseInt(tokenId))
  const { identity, equipment, stats } = parseDb(db)
  return formatRes(tokenId, identity, equipment.items, stats)
}

async function put(tokenId, reqBody) {
  const { ownerAddress, ensName, pfp, charId, equip } = reqBody
  const identity = await getIdentity(ensName, pfp, charId)
  const equipment = getEquipment(identity, equip)
  const stats = getStats(ownerAddress)
  
  await putTokenByTokenId(tokenId, ownerAddress, identity, equipment, stats)
  return formatRes(tokenId, identity, equipment, stats)
}

export default async function handler(req, res) {
  const { tokenId } = req.query
  if (req.method === "PUT") {
    const putJson = await put(tokenId, reqBody)
    return res.status(200).json(putJson)
  } else {
    const getJson = await get(tokenId)
    return res.status(200).json(getJson)
  }
}