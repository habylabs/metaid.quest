function getImage(identity, equipment, baseStats, bonusStats) {
  const startSvg = `<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 1200 650">`
  const closeSvg = "</svg>"
  const backgroundRect = `<rect width="100%" height="100%" fill="#002B36" />`
  return startSvg + backgroundRect + closeSvg
}

export {
  getImage
}