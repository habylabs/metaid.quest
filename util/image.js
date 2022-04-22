function getImage(identity, equipment, baseStats, bonusStats) {
  // This should return a Base64 encoded string where the start of the string is `data:image/svg+xml;base64,`
  const startSvg = `<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 1200 650">`
  const backgroundRect = `<rect width="100%" height="100%" fill="#002B36" />`
  const closeSvg = "</svg>"
  return startSvg + backgroundRect + closeSvg
}

export {
  getImage
}