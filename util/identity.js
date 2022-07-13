// Helper functions to populate Identity fields in Meta ID
import {
  contractNameMap
} from "./mapping"

import {
  getEnsName
} from "./ens"

function getGuild(identity) {
  return contractNameMap[identity.pfp.contract]
}

function getId(identity) {
  return `${getGuild(identity)} #${identity.pfp.id}`
}

function getRace(identity) {
  if (identity.character.race) {
    if (identity.pfp.race) {
      return `${identity.pfp.race} + ${identity.character.race}`
    }

    return identity.character.race
  }
  
  return identity.pfp.race ? identity.pfp.race : 'None'
}

function getRole(identity) {
  if (identity.character.role) {
    if (identity.pfp.role) {
      return `${identity.pfp.role} + ${identity.character.role}`
    }

    return identity.character.role
  }
  
  return identity.pfp.role ? identity.pfp.role : 'None'
}

function getElement(identity) {
  if (identity.character.element) {
    if (identity.pfp.element) {
      return `${identity.pfp.element} + ${identity.character.element}`
    }

    return identity.character.element
  }
  
  return identity.pfp.element ? identity.pfp.element : 'None'
}

async function getIdentity(address, pfp, charId) {
  const ensName = await getEnsName(address)
  return {
    ensName,
    pfpContract: null,
    pfpId: null,
    pfpImg: null,
    pfpRace: null,
    pfpRole: null,
    pfpElement: null,
    charId,
    charRace: null,
    charRole: null,
    charElement: null
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