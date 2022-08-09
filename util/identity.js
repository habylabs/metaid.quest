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
  AZUKI_CONTRACT_ADDRESS,
  MOONBIRDS_CONTRACT_ADDRESS,
  WOW_CONTRACT_ADDRESS,
  CHAR_PFP_IMG_URL
} from './constants'

// Helper functions to populate Identity fields in Meta ID
// The functions below take information stored in the DB and format them to be
// provided in the contract attributes response

const getGuild = (contract, title) => {
  if (title) {
    return title
  }

  if (contractNameMap[contract]) {
    return contractNameMap[contract]
  }

  return '???'
}

const getRace = (identity) => {
  if (identity) {
    if (identity.pfp.race) {
      if (identity.character.race) {
        return `${identity.pfp.race} + ${identity.character.race}`
      }
  
      return identity.pfp.race
    }

    if (identity.character.race) {
      return identity.character.race
    }
  }

  return 'Unknown'
}

const getRole = (identity) => {
  if (identity) {
    if (identity.pfp.role) {
      if (identity.character.role) {
        return `${identity.pfp.role} + ${identity.character.role}`
      }
  
      return identity.pfp.role
    }

    if (identity.character.role) {
      return identity.character.role
    }
  }

  return 'None'
}

const getElement = (identity) => {
  if (identity) {
    if (identity.pfp.element) {
      if (identity.character.element) {
        return `${identity.pfp.element} + ${identity.character.element}`
      }
  
      return identity.pfp.element
    }

    if (identity.character.element) {
      return identity.character.element
    }
  }

  return 'None'
}

// The functions below take the users PFP and Character selections to determine
// values regarding identity to be stored in the DB

const getPfpRace = (contractAddress, { attributes }) => {
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
        return 'Ape Folk + Undead'
      } else if (baycFurTrait === 'Robot' || baycFurTrait === 'Death Bot' || baycFurTrait === 'Solid Gold') {
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
        return 'Ape Folk + Undead'
      } else if (maycFurTrait === 'Robot' || maycFurTrait === 'Death Bot' || maycFurTrait === 'Solid Gold') {
        return 'Ape Folk + Robot'
      } else {
        return 'Ape Folk'
      }
    case MEEBITS_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Type'])
      const meebitType = attributes[index].value
      if (meebitType === 'Skeleton') {
        return 'Undead'
      } else if (meebitType === 'Visitor') {
        return 'Alien'
      } else if (meebitType === 'Dissected') {
        return 'Demon'
      } else {
        return meebitType
      }
    case COOLCATS_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'face'])
      const coolCatFace = attributes[index].value
      if (coolCatFace === 'Alien' || coolCatFace === 'Angel' || coolCatFace === 'Demon' || coolCatFace === 'Robot') {
        return `Cat Folk + ${coolCatFace}`
      } else if (coolCatFace === 'Celestial') {
        return 'Cat Folk + Djinn'
      } else if (coolCatFace === 'Skeleton' || coolCatFace === 'Special zombie') {
        return 'Cat Folk + Undead'
      } else {
        return 'Cat Folk'
      }
    case JUNGLE_FREAKS_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Species'])
      const jfSpecies = attributes[index].value
      return jfSpecies === 'ZOMBIE' ? 'Undead' : 'Ape Folk'
    case IDOLS_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Skin'])
      const idolsSkin = attributes[index].value
      if (idolsSkin === 'Ape') {
        return 'Ape Folk'
      } else if (idolsSkin === 'Zombie') {
        return 'Undead'
      } else if (idolsSkin === 'Ethereal') {
        return 'Djinn'
      } else if (idolsSkin === 'Silver' || idolsSkin === 'Gold') {
        return 'Robot'
      } else {
        return 'Human'
      }
    case LOOT_EXPLORERS_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Race'])
      if (index > -1) {
        const lootExplorerRace = attributes[index].value
        if (lootExplorerRace === 'Beasts') {
          return 'Cat Folk'
        } else if (lootExplorerRace === 'Naturals') {
          return 'Fairy'
        } else if (lootExplorerRace === 'Noctii') {
          return 'Undead'
        } else if (lootExplorerRace === 'DeepTides') {
          return 'Lizard Folk'
        }
      }
      return null
    case CRYPTO_COVEN_CONTRACT_ADDRESS:
      return 'Human'
    case DOODLES_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Face'])
      const doodlesFace = attributes[index].value
      if (doodlesFace === 'Ape' || doodlesFace.includes('ape')) {
        return 'Ape Folk'
      } else if (doodlesFace === 'Alien' || doodlesFace.includes('alien') ) {
        return 'Alien'
      } else if (doodlesFace === 'Cat' || doodlesFace === 'Cat note' || doodlesFace === 'Catnip') {
        return 'Cat Folk'
      } else if (doodlesFace === 'Devil cat') {
        return 'Cat Folk + Demon'
      } else {
        return 'Human'
      }
    case AZUKI_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Type'])
      if (attributes[index].value === 'Spirit') {
        return 'Fairy'
      } else {
        return 'Human'
      }
    case MOONBIRDS_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Type'])
      const moonbirdType = attributes[index].value

      if (moonbirdType === 'Robot') {
        return 'Bird Folk + Robot'
      } else if (moonbirdType.includes('Skeleton')) {
        return 'Bird Folk + Undead'
      }

      return 'Bird Folk'
    case WOW_CONTRACT_ADDRESS:
      return 'Human'
    default:
      return null
  }
}

const getPfpRole = (contractAddress, { attributes }) => {
  let index
  switch (contractAddress) {
    case CHARACTER_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Role'])
      return attributes[index].value
    case CRYPTO_COVEN_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Archetype of Power'])
      return attributes[index].value
    default:
      return null
  }
}

const _getAzukiTypeElement = (value) => {
  if (value === 'Blue') {
    return 'Water'
  } else if (value === 'Red') {
    return 'Fire'
  } else {
    return null
  }
}

const _getAzukiSpecialElement = (value) => {
  if (value === 'Smoke') {
    return 'Poison'
  } else if (value === 'Fox Fire') {
    return 'Fire'
  } else if (value === 'Sakura') {
    return 'Wind'
  } else if (value === 'Fire') {
    return 'Fire'
  } else if (value === 'Earth') {
    return 'Earth'
  } else if (value === 'Water') {
    return 'Water'
  } else if (value === 'Lightning') {
    return 'Lightning'
  }

  return null
}

const _getAzukiEyeElement = (value) => {
  if (value === 'Fire') {
    return 'Fire'
  } else if (value === 'Lightning') {
    return 'Lightning'
  } else if (value === 'Glowing') {
    return 'Light'
  } else if (value === 'Red') {
    return 'Dark'
  }

  return null
}

const getPfpElement = (contractAddress, { attributes }) => {
  let index
  switch (contractAddress) {
    case CHARACTER_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Element'])
      return attributes[index].value
    case IDOLS_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Eyes'])
      const idolsEyes = attributes[index].value
      if (idolsEyes === 'Fire Eyes') {
        return 'Fire'
      } else if (idolsEyes === 'Ice Eyes') {
        return 'Water'
      } else if (idolsEyes === 'Lightning Eyes') {
        return 'Lightning'
      } else {
        return null
      }
    case AZUKI_CONTRACT_ADDRESS:
      const typeIndex = _.findIndex(attributes, ['trait_type', 'Type'])
      const specialIndex = _.findIndex(attributes, ['trait_type', 'Special'])
      const eyeIndex = _.findIndex(attributes, ['trait_type', 'Eyes'])

      const azukiTypeElement = _getAzukiTypeElement(attributes[typeIndex].value)
      const azukiSpecialElement = _getAzukiSpecialElement(attributes[specialIndex].value)
      const azukiEyeElement = _getAzukiEyeElement(attributes[eyeIndex].value)
      const elements = _.remove(_.uniq([azukiTypeElement, azukiSpecialElement, azukiEyeElement]), (n) => (n != null))

      return _.replace(_.toString(elements), ',', ' + ')
    case MOONBIRDS_CONTRACT_ADDRESS:
      index = _.findIndex(attributes, ['trait_type', 'Eyes'])
      return attributes[index].value === 'Fire' ? 'Fire' : null
    default:
      return null
  }
}

// This function

async function getIdentity(pfp, charId) {
  const pfpMetadata = await getNftMetadata(pfp.contract, pfp.id)
  const pfpImg = pfp.contract === CHARACTER_CONTRACT_ADDRESS ? CHAR_PFP_IMG_URL : pfpMetadata.image
  const charMetadata = charId ? await getNftMetadata(CHARACTER_CONTRACT_ADDRESS, charId) : null
  return {
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
  getRace,
  getRole,
  getElement,
  getPfpRace,
  getPfpRole,
  getPfpElement,
  getIdentity,
}