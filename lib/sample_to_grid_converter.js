
export default (cellSize) => (samplePos) => {
  let modX = Math.floor(samplePos[0] / cellSize)
  let modY = Math.floor(samplePos[1] / cellSize)

  return [modX, modY]
}
