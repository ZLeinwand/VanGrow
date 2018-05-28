

export default (dimensions, r, gridWidth, gridHeight) => {
  const n = dimensions

  let theGrid = []

  for (let i = 0; i < gridWidth; i++){
    theGrid.push(Array(gridHeight).fill(-1))
  }

  return theGrid
}
