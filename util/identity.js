// Helper functions to populate Identity fields in Meta ID

import {
  contractNameMap
} from "./mapping"

function getGuild(identity) {
  return contractNameMap[identity.pfp.contract]
}

function getId(identity) {
  return `${getGuild(identity)} #${identity.pfp.id}`
}

function getRace(identity) {
  if (identity.character.race) {
    return `${identity.pfp.race} + ${identity.character.race}`
  }
  
  return identity.pfp.race
}

function getRole(identity) {
  if (identity.character.role) {
    return `${identity.pfp.role} + ${identity.character.role}`
  }
  
  return identity.pfp.role
}

function getElement(identity) {
  if (identity.character.element) {
    return `${identity.pfp.element} + ${identity.character.element}`
  }
  
  return identity.pfp.element
}

export {
  getGuild,
  getId,
  getRace,
  getRole,
  getElement
}