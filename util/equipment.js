// Helper functions to populate Equipment fields in Meta ID

function getEquipment(identity, equip) {
  return {
    equipContract: null,
    equipId: null,
    weapon: null,
    chestArmor: null,
    headArmor: null,
    waistArmor: null,
    footArmor: null,
    handArmor: null,
    necklace: null,
    ring: null
  }
}

export {
  getEquipment
}