

export default (posA, posB) => {

  const dx = Math.max(posA[0], posB[0]) - Math.min(posA[0], posB[0])
  const dy = Math.max(posA[1], posB[1]) - Math.min(posA[1], posB[1])

  const dab = Math.sqrt((dx * dx) + (dy * dy))
  return dab
}
