import {
  BAYC_CONTRACT_ADDRESS,
  MAYC_CONTRACT_ADDRESS,
  MEEBITS_CONTRACT_ADDRESS,
  COOLCATS_CONTRACT_ADDRESS,
  JUNGLE_FREAKS_CONTRACT_ADDRESS,
  IDOLS_CONTRACT_ADDRESS,
  LOOT_EXPLORERS_CONTRACT_ADDRESS,
  CRYPTO_COVEN_CONTRACT_ADDRESS,
  DOODLES_CONTRACT_ADDRESS,
  HYPERLOOT_CONTRACT_ADDRESS,
  AZUKI_CONTRACT_ADDRESS,
  MOONBIRDS_CONTRACT_ADDRESS,
  WOW_CONTRACT_ADDRESS
} from './constants'

const _getPfpWeapon = ({ contract, attributes }) => {
  let index
  switch (contract) {
    case JUNGLE_FREAKS_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Weapon'])
      return index > -1 ? attributes[index].value : null
    case IDOLS_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Accessory'])
      if (index > -1 && attributes[index].value != 'None') {
        return attributes[index].value
      } else {
        return null
      }
    case LOOT_EXPLORERS_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Weapon'])
      return index > -1 ? attributes[index].value : null
    case HYPERLOOT_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Weapon'])
      return index > -1 ? attributes[index].value : null
    case AZUKI_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Offhand'])
      return index > -1 ? attributes[index].value : null
    default:
      return null
  }
}

const _getPfpChestArmor = ({ contract, attributes }) => {
  let index
  switch (contract) {
    case BAYC_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Clothes'])
      if (attributes[index].value === 'Bone Necklace') {
        return null
      }
      return attributes[index].value
    case MAYC_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Clothes'])
      if (attributes[index].value === 'Bone Necklace') {
        return null
      }
      return attributes[index].value
    case MEEBITS_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Shirt'])
      return index > -1 ? attributes[index].value : null
    case COOLCATS_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'shirt'])
      return index > -1 ? attributes[index].value : null
    case JUNGLE_FREAKS_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Clothing'])
      return index > -1 ? attributes[index].value : null
    case IDOLS_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Clothing'])
      if (index > -1 && attributes[index].value != 'None') {
        return attributes[index].value
      } else {
        return null
      }
    case LOOT_EXPLORERS_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Chest Armor'])
      return index > -1 ? attributes[index].value : null
    case CRYPTO_COVEN_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Top'])
      return index > -1 ? attributes[index].value : null
    case DOODLES_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Body'])
      return index > -1 ? attributes[index].value : null
    case HYPERLOOT_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Chest'])
      return index > -1 ? attributes[index].value : null
    case AZUKI_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Clothing'])
      return index > -1 ? attributes[index].value : null
    case MOONBIRDS_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Outerwear'])
      return index > -1 ? attributes[index].value : null
    case WOW_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Clothes'])
      return index > -1 ? attributes[index].value : null
    default:
      return null
  }
}

const _getPfpHeadArmor = ({ contract, attributes }) => {
  let index
  switch (contract) {
    case BAYC_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Hat'])
      return attributes[index].value
    case MAYC_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Hat'])
      return attributes[index].value
    case MEEBITS_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Hat'])
      return index > -1 ? attributes[index].value : null
    case COOLCATS_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'hats'])
      return index > -1 ? attributes[index].value : null
    case JUNGLE_FREAKS_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Head'])
      if (index > -1) {
        if (attributes[index].value.includes('HAIR')) {
          return null
        } else {
          return attributes[index].value
        }
      } else {
        return null
      }
    case IDOLS_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Headwear'])
      if (index > -1 && attributes[index].value != 'None') {
        return attributes[index].value
      } else {
        return null
      }
    case LOOT_EXPLORERS_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Head Armor'])
      return index > -1 ? attributes[index].value : null
    case CRYPTO_COVEN_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Hat'])
      return index > -1 ? attributes[index].value : null
    case HYPERLOOT_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Head'])
      return index > -1 ? attributes[index].value : null
    case AZUKI_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Headgear'])
      return index > -1 ? attributes[index].value : null
    case MOONBIRDS_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Headwear'])
      return index > -1 ? attributes[index].value : null
    case WOW_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Face Accessories'])
      return index > -1 ? attributes[index].value : null
    default:
      return null
  }
}

const _getPfpWaistArmor = ({ contract, attributes }) => {
  let index
  switch (contract) {
    case LOOT_EXPLORERS_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Waist Armor'])
      return index > -1 ? attributes[index].value : null
    case HYPERLOOT_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Waist'])
      return index > -1 ? attributes[index].value : null
    default:
      return null
  }
}

const _getPfpFootArmor = ({ contract, attributes }) => {
  let index
  switch (contract) {
    case MEEBITS_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Shoes'])
      return index > -1 ? attributes[index].value : null
    case LOOT_EXPLORERS_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Foot Armor'])
      return index > -1 ? attributes[index].value : null
    case HYPERLOOT_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Foot'])
      return index > -1 ? attributes[index].value : null
    default:
      return null
  }
}

const _getPfpHandArmor = ({ contract, attributes }) => {
  let index
  switch (contract) {
    case LOOT_EXPLORERS_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Hand Armor'])
      return index > -1 ? attributes[index].value : null
    case HYPERLOOT_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Hand'])
      return index > -1 ? attributes[index].value : null
    default:
      return null
  }
}

const _getPfpNecklace = ({ contract, attributes }) => {
  let index
  switch (contract) {
    case BAYC_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Clothes'])
      if (attributes[index].value === 'Bone Necklace') {
        return attributes[index].value
      }
      return null
    case MAYC_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Clothes'])
      if (attributes[index].value === 'Bone Necklace') {
        return attributes[index].value
      }
      return null
    case MEEBITS_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Neck'])
      return index > -1 ? attributes[index].value : null
    case LOOT_EXPLORERS_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Necklace'])
      return index > -1 ? attributes[index].value : null
    case CRYPTO_COVEN_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Necklace'])
      return index > -1 ? attributes[index].value : null
    case HYPERLOOT_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Neck'])
      return index > -1 ? attributes[index].value : null
    case AZUKI_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Neck'])
      return index > -1 ? attributes[index].value : null
    case WOW_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Necklace'])
      return index > -1 ? attributes[index].value : null
    default:
      return null
  }
}

const _getPfpRing = ({ contract, attributes }) => {
  let index
  switch (contract) {
    case LOOT_EXPLORERS_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Ring'])
      return index > -1 ? attributes[index].value : null
    case HYPERLOOT_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Ring'])
      return index > -1 ? attributes[index].value : null
    default:
      return null
  }
}

const getPfpEquipment = (pfp) => {
  const weapon = _getPfpWeapon(pfp)
  const chestArmor = _getPfpChestArmor(pfp)
  const headArmor = _getPfpHeadArmor(pfp)
  const waistArmor = _getPfpWaistArmor(pfp)
  const footArmor = _getPfpFootArmor(pfp)
  const handArmor = _getPfpHandArmor(pfp)
  const necklace = _getPfpNecklace(pfp)
  const ring = _getPfpRing(pfp)

  return {
    weapon: weapon ? weapon : 'None',
    chestArmor: chestArmor ? chestArmor : 'None',
    headArmor: headArmor ? headArmor : 'None',
    waistArmor: waistArmor ? waistArmor : 'None',
    footArmor: footArmor ? footArmor : 'None',
    handArmor: handArmor ? handArmor : 'None',
    necklace: necklace ? necklace : 'None',
    ring: ring ? ring : 'None',
  }
}

export {
  getPfpEquipment
}