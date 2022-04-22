// Helper functions to populate Stats fields in Meta ID

function getEquipmentBonus(item) {
  if (item) {
    if (item.includes("of")) {
      if (item.startsWith("\"")) {
        if (item.includes("+1")) {
          return 10
        }
        return 8
      }
      return 6
    }
    return 4
  }
  return 0
}

function getBonusStats(identity, equipment) {
  const { 
    weapon,
    chestArmor,
    headArmor,
    waistArmor,
    footArmor,
    handAmor,
    necklace,
    ring
  } = equipment

  return {
    str: getEquipmentBonus(weapon),
    dex: getEquipmentBonus(footArmor) + getEquipmentBonus(handAmor),
    con: getEquipmentBonus(chestArmor),
    int: getEquipmentBonus(headArmor),
    wis: getEquipmentBonus(waistArmor),
    cha: getEquipmentBonus(necklace) + getEquipmentBonus(ring),
  }
}

function getLevel({ str, dex, con, int, wis, cha }) {
  return Math.round((str + dex + con + int + wis + cha) / 6) - 4
}

function getHP(baseStats, bonusStats) {
  const baseSum = baseStats.str + baseStats.dex + baseStats.con
  const bonusSum = bonusStats.str + bonusStats.dex + bonusStats.con
  return 10 * (baseSum + bonusSum) + 50
}

function getMP(baseStats, bonusStats) {
  const baseSum = baseStats.int + baseStats.wis + baseStats.cha
  const bonusSum = bonusStats.int + bonusStats.wis + bonusStats.cha
  return 10 * (baseSum + bonusSum) + 50
}

export {
  getBonusStats,
  getLevel,
  getHP,
  getMP
}