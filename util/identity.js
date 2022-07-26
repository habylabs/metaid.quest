import _ from 'lodash'

import {
  contractNameMap
} from './mapping'

import {
  getNftMetadata
} from './alchemy'

import {
  CHARACTER_CONTRACT_ADDRESS,
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
  WOW_CONTRACT_ADDRESS,
  CHAR_PFP_IMG_URL
} from './constants'

// Helper functions to populate Identity fields in Meta ID
// The functions below take information stored in the DB and format them to be
// provided in the contract attributes response

function getGuild(identity) {
  return contractNameMap[identity.pfp.contract]
}

function getId(identity) {
  return `${getGuild(identity)} #${identity.pfp.id}`
}

function getRace(identity) {
  if (identity.pfp.race) {
    if (identity.character.race) {
      return `${identity.pfp.race} + ${identity.character.race}`
    }

    return identity.pfp.race
  }

  return 'None'
}

function getRole(identity) {
  if (identity.pfp.role) {
    if (identity.character.role) {
      return `${identity.pfp.role} + ${identity.character.role}`
    }

    return identity.pfp.role
  }

  return 'None'
}

function getElement(identity) {
  if (identity.pfp.element) {
    if (identity.character.element) {
      return `${identity.pfp.element} + ${identity.character.element}`
    }

    return identity.pfp.element
  }

  return 'None'
}

// The functions below take the users PFP and Character selections to determine
// values regarding identity to be stored in the DB

function getPfpRace(contractAddress, { attributes }) {
  let index
  switch (contractAddress) {
    case CHARACTER_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Race'])
      return attributes[index].value
    case BAYC_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Fur'])
      const baycFurTrait = attributes[index].value
      if (baycFurTrait === 'Cheetah') {
        return 'Ape Folk + Cat Folk'
      } else if (baycFurTrait === 'Zombie') {
        return 'Ape Folk + Zombie'
      } else if (baycFurTrait === 'Robot') {
        return 'Ape Folk + Robot'
      } else if (baycFurTrait === 'Death Bot') {
        return 'Ape Folk + Robot'
      } else {
        return 'Ape Folk'
      }
    case MAYC_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Fur'])
      const maycFurTrait = attributes[index].value
      if (maycFurTrait === 'Cheetah') {
        return 'Ape Folk + Cat Folk'
      } else if (maycFurTrait === 'Zombie') {
        return 'Ape Folk + Zombie'
      } else if (maycFurTrait === 'Robot') {
        return 'Ape Folk + Robot'
      } else if (maycFurTrait === 'Death Bot') {
        return 'Ape Folk + Robot'
      } else {
        return 'Ape Folk'
      }
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

function getPfpRole(contractAddress, { attributes }) {
  let index
  switch (contractAddress) {
    case CHARACTER_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Role'])
      return attributes[index].value
    case MAYC_CONTRACT_ADDRESS:
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

function getPfpElement(contractAddress, { attributes }) {
  let index
  switch (contractAddress) {
    case CHARACTER_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Element'])
      return attributes[index].value
    case BAYC_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Fur'])
      if (attributes[index.value === 'Solid Gold']) {
        return 'Metal'
      } else {
        return null
      }
    case MAYC_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Fur'])
      if (attributes[index.value === 'Solid Gold']) {
        return 'Metal'
      } else {
        return null
      }
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

// This function

async function getIdentity(ensName, pfp, charId) {
  const pfpMetadata = await getNftMetadata(pfp.contract, pfp.id)
  const pfpImg = pfp.contract === CHARACTER_CONTRACT_ADDRESS ? CHAR_PFP_IMG_URL : pfpMetadata.image
  const charMetadata = charId ? await getNftMetadata(CHARACTER_CONTRACT_ADDRESS, charId) : null
  return {
    ensName,
    pfpContract: pfp.contract,
    pfpId: pfp.id,
    pfpImg,
    pfpRace: getPfpRace(pfp.contract, pfpMetadata),
    pfpRole: getPfpRole(pfp.contract, pfpMetadata),
    pfpElement: getPfpElement(pfp.contract, pfpMetadata),
    charId,
    charRace: getPfpRace(CHARACTER_CONTRACT_ADDRESS, charMetadata),
    charRole: getPfpRole(CHARACTER_CONTRACT_ADDRESS, charMetadata),
    charElement: getPfpElement(CHARACTER_CONTRACT_ADDRESS, charMetadata)
  }
}

export {
  getGuild,
  getId,
  getRace,
  getRole,
  getElement,
  getIdentity
}