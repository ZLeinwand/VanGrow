import distance from '../formulas/distance'
import gridConverter from './sample_to_grid_converter'

export default (allSamples) => (theGrid) => (r) => (currentPos, gridPos) => {
  for (let i = -2; i <= 2; i++){
    let checkX = gridPos[0] - i
    if (checkX < 0 || checkX >= theGrid.length) {
      continue
    }
    for (let j = -2; j <= 2; j++){
      let checkY = gridPos[1] - j
      if (checkY < 0 || checkY >= theGrid[0].length) {
        continue
      }
      if (theGrid[checkX][checkY] !== -1){
        let indexOfPosToCheck = theGrid[checkX][checkY]

        if (distance(currentPos, allSamples[indexOfPosToCheck]) <= r){
          return false
        }
      }
    }
  }
  return true
}
