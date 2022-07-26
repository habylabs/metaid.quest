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
  NOUNS_CONTRACT_ADDRESS,
  HYPERLOOT_CONTRACT_ADDRESS,
  AZUKI_CONTRACT_ADDRESS,
  MOONBIRDS_CONTRACT_ADDRESS,
  WOW_CONTRACT_ADDRESS
} from './constants'

// Helper functions to populate Equipment fields in Meta ID
function getEquipMetadata(equip) {
  if (equip) {
    return {
      weapon: null,
      chestArmor: null,
      headArmor: null,
      waistArmor: null,
      footArmor: null,
      handArmor: null,
      necklace: null,
      ring: null,
    }
  }
  
  return null
}

function getPfpWeapon(identity) {
  let index
  switch (contractAddress) {
    case MEEBITS_CONTRACT_ADDRESS:
      return null
    case COOLCATS_CONTRACT_ADDRESS:
      return null
    case JUNGLE_FREAKS_CONTRACT_ADDRESS:
      return null
    case IDOLS_CONTRACT_ADDRESS:
      return null
    case LOOT_EXPLORERS_CONTRACT_ADDRESS:
      return null
    case CRYPTO_COVEN_CONTRACT_ADDRESS:
      return null
    case DOODLES_CONTRACT_ADDRESS:
      return null
    case NOUNS_CONTRACT_ADDRESS:
      return null
    case HYPERLOOT_CONTRACT_ADDRESS:
      return null
    case AZUKI_CONTRACT_ADDRESS:
      return null
    case MOONBIRDS_CONTRACT_ADDRESS:
      return null
    case WOW_CONTRACT_ADDRESS:
      return null
    default:
      return null
  }
}

function getPfpChestArmor(identity) {
  let index
  switch (contractAddress) {
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
      return null
    case COOLCATS_CONTRACT_ADDRESS:
      return null
    case JUNGLE_FREAKS_CONTRACT_ADDRESS:
      return null
    case IDOLS_CONTRACT_ADDRESS:
      return null
    case LOOT_EXPLORERS_CONTRACT_ADDRESS:
      return null
    case CRYPTO_COVEN_CONTRACT_ADDRESS:
      return null
    case DOODLES_CONTRACT_ADDRESS:
      return null
    case NOUNS_CONTRACT_ADDRESS:
      return null
    case HYPERLOOT_CONTRACT_ADDRESS:
      return null
    case AZUKI_CONTRACT_ADDRESS:
      return null
    case MOONBIRDS_CONTRACT_ADDRESS:
      return null
    case WOW_CONTRACT_ADDRESS:
      return null
    default:
      return null
  }
}

function getPfpHeadArmor(identity) {
  let index
  switch (contractAddress) {
    case BAYC_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Hat'])
      return attributes[index].value
    case MAYC_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Hat'])
      return attributes[index].value
    case MEEBITS_CONTRACT_ADDRESS:
      return null
    case COOLCATS_CONTRACT_ADDRESS:
      return null
    case JUNGLE_FREAKS_CONTRACT_ADDRESS:
      return null
    case IDOLS_CONTRACT_ADDRESS:
      return null
    case LOOT_EXPLORERS_CONTRACT_ADDRESS:
      return null
    case CRYPTO_COVEN_CONTRACT_ADDRESS:
      return null
    case DOODLES_CONTRACT_ADDRESS:
      return null
    case NOUNS_CONTRACT_ADDRESS:
      return null
    case HYPERLOOT_CONTRACT_ADDRESS:
      return null
    case AZUKI_CONTRACT_ADDRESS:
      return null
    case MOONBIRDS_CONTRACT_ADDRESS:
      return null
    case WOW_CONTRACT_ADDRESS:
      return null
    default:
      return null
  }
}

function getPfpWaistArmor(identity) {
  let index
  switch (contractAddress) {
    case MEEBITS_CONTRACT_ADDRESS:
      return null
    case COOLCATS_CONTRACT_ADDRESS:
      return null
    case JUNGLE_FREAKS_CONTRACT_ADDRESS:
      return null
    case IDOLS_CONTRACT_ADDRESS:
      return null
    case LOOT_EXPLORERS_CONTRACT_ADDRESS:
      return null
    case CRYPTO_COVEN_CONTRACT_ADDRESS:
      return null
    case DOODLES_CONTRACT_ADDRESS:
      return null
    case NOUNS_CONTRACT_ADDRESS:
      return null
    case HYPERLOOT_CONTRACT_ADDRESS:
      return null
    case AZUKI_CONTRACT_ADDRESS:
      return null
    case MOONBIRDS_CONTRACT_ADDRESS:
      return null
    case WOW_CONTRACT_ADDRESS:
      return null
    default:
      return null
  }
}

function getPfpFootArmor(identity) {
  let index
  switch (contractAddress) {
    case MEEBITS_CONTRACT_ADDRESS:
      return null
    case COOLCATS_CONTRACT_ADDRESS:
      return null
    case JUNGLE_FREAKS_CONTRACT_ADDRESS:
      return null
    case IDOLS_CONTRACT_ADDRESS:
      return null
    case LOOT_EXPLORERS_CONTRACT_ADDRESS:
      return null
    case CRYPTO_COVEN_CONTRACT_ADDRESS:
      return null
    case DOODLES_CONTRACT_ADDRESS:
      return null
    case NOUNS_CONTRACT_ADDRESS:
      return null
    case HYPERLOOT_CONTRACT_ADDRESS:
      return null
    case AZUKI_CONTRACT_ADDRESS:
      return null
    case MOONBIRDS_CONTRACT_ADDRESS:
      return null
    case WOW_CONTRACT_ADDRESS:
      return null
    default:
      return null
  }
}

function getPfpHandArmor(identity) {
  let index
  switch (contractAddress) {
    case MEEBITS_CONTRACT_ADDRESS:
      return null
    case COOLCATS_CONTRACT_ADDRESS:
      return null
    case JUNGLE_FREAKS_CONTRACT_ADDRESS:
      return null
    case IDOLS_CONTRACT_ADDRESS:
      return null
    case LOOT_EXPLORERS_CONTRACT_ADDRESS:
      return null
    case CRYPTO_COVEN_CONTRACT_ADDRESS:
      return null
    case DOODLES_CONTRACT_ADDRESS:
      return null
    case NOUNS_CONTRACT_ADDRESS:
      return null
    case HYPERLOOT_CONTRACT_ADDRESS:
      return null
    case AZUKI_CONTRACT_ADDRESS:
      return null
    case MOONBIRDS_CONTRACT_ADDRESS:
      return null
    case WOW_CONTRACT_ADDRESS:
      return null
    default:
      return null
  }
}

function getPfpNecklace(identity) {
  let index
  switch (contractAddress) {
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
      return null
    case COOLCATS_CONTRACT_ADDRESS:
      return null
    case JUNGLE_FREAKS_CONTRACT_ADDRESS:
      return null
    case IDOLS_CONTRACT_ADDRESS:
      return null
    case LOOT_EXPLORERS_CONTRACT_ADDRESS:
      return null
    case CRYPTO_COVEN_CONTRACT_ADDRESS:
      return null
    case DOODLES_CONTRACT_ADDRESS:
      return null
    case NOUNS_CONTRACT_ADDRESS:
      return null
    case HYPERLOOT_CONTRACT_ADDRESS:
      return null
    case AZUKI_CONTRACT_ADDRESS:
      return null
    case MOONBIRDS_CONTRACT_ADDRESS:
      return null
    case WOW_CONTRACT_ADDRESS:
      return null
    default:
      return null
  }
}

function getPfpRing(identity) {
  let index
  switch (contractAddress) {
    case MEEBITS_CONTRACT_ADDRESS:
      return null
    case COOLCATS_CONTRACT_ADDRESS:
      return null
    case JUNGLE_FREAKS_CONTRACT_ADDRESS:
      return null
    case IDOLS_CONTRACT_ADDRESS:
      return null
    case LOOT_EXPLORERS_CONTRACT_ADDRESS:
      return null
    case CRYPTO_COVEN_CONTRACT_ADDRESS:
      return null
    case DOODLES_CONTRACT_ADDRESS:
      return null
    case NOUNS_CONTRACT_ADDRESS:
      return null
    case HYPERLOOT_CONTRACT_ADDRESS:
      return null
    case AZUKI_CONTRACT_ADDRESS:
      return null
    case MOONBIRDS_CONTRACT_ADDRESS:
      return null
    case WOW_CONTRACT_ADDRESS:
      return null
    default:
      return null
  }
}

async function getEquipment(identity, equip) {
  const equipMetadata = getEquipMetadata(equip)
  return {
    equipContract: equipMetadata ? equipMetadata.contract.address : null,
    equipId: equipMetadata ? equipMetadata.id.tokenId : null,
    weapon: equipMetadata ? equipMetadata.weapon : getPfpWeapon(identity),
    chestArmor: equipMetadata ? equipMetadata.chestArmor : getPfpChestArmor(identity),
    headArmor: equipMetadata ? equipMetadata.headArmor : getPfpHeadArmor(identity),
    waistArmor: equipMetadata ? equipMetadata.waistArmor : getPfpWaistArmor(identity),
    footArmor: equipMetadata ? equipMetadata.footArmor : getPfpFootArmor(identity),
    handArmor: equipMetadata ? equipMetadata.handArmor : getPfpHandArmor(identity),
    necklace: equipMetadata ? equipMetadata.necklace : getPfpNecklace(identity),
    ring: equipMetadata ? equipMetadata.ring : getPfpRing(identity)
  }
}

export {
  getEquipment
}