import theGridMaker from './lib/grid.js'
import randomAnnulusPoint from './formulas/annulus_point_randomizer'
import distanceFrom from './formulas/distance'
import gridConverter from './lib/sample_to_grid_converter'
import checkCandidateFrame from './lib/check_candidate'
import {voronoi} from 'd3-voronoi'
window.voronoi = voronoi()

const vmoney = voronoi()


export default (canvasWidth, canvasHeight, r, k, dimensions, ctx, drawnCtx) => {
  // step 0 initilaize n-dimentionsal background grid for storing samples and accelerating spatial searches
  const cellSize = Math.floor(r / Math.sqrt(dimensions))
  const gridHeight = Math.ceil(canvasHeight / cellSize)
  const gridWidth = Math.ceil(canvasWidth / cellSize)

  //curried function - takes cellSize, returns function that takes position
  const converter = gridConverter(cellSize)

  const theGrid = theGridMaker(2, r, gridWidth, gridHeight)
  const allSamples = []
  let activeSamples = []

  // step 1 select initial sample

  const initialSample = [Math.round(Math.random() * canvasWidth), Math.round(Math.random() * canvasHeight)]
  const initialGridSample = converter(initialSample)

  allSamples.push(initialSample)
  activeSamples.push(0)

  theGrid[initialGridSample[0]][initialGridSample[1]] = 0
  const checkCandidate = checkCandidateFrame(allSamples)(theGrid)

  // const getNextSample = (activeSamples) => {
  //   let tries = 0
  //   let randomIndex = Math.floor(activeSamples.length * Math.random())
  //   let currentActivePos = allSamples[activeSamples[randomIndex]]
  //   while(tries < k){
  //     let currentCandidate = randomAnnulusPoint(currentActivePos, r, canvasWidth, canvasHeight)
  //
  //
  //     if (checkCandidate(currentCandidate, converter(currentCandidate), r)){
  //       allSamples.push(currentCandidate)
  //       activeSamples.push(allSamples.length - 1)
  //       let currentGridCandidate = converter(currentCandidate)
  //       // console.log(`gridCand= ${currentGridCandidate}`)
  //       // console.log(`currentCand= ${currentCandidate}`)
  //       // console.log(`currentGrid= ${theGrid[currentGridCandidate[0]][currentGridCandidate[1]]}`)
  //       theGrid[currentGridCandidate[0]][currentGridCandidate[1]] = allSamples.length - 1
  //       let imgData = ctx.getImageData(currentCandidate[0], currentCandidate[1], 1, 1).data
  //       drawnCtx.beginPath();
  //       drawnCtx.fillStyle = `rgb(${imgData[0]}, ${imgData[1]}, ${imgData[2]})`
  //       drawnCtx.arc(currentCandidate[0], currentCandidate[1], 4, 0, 2*Math.PI);
  //       drawnCtx.fill()
  //       drawnCtx.strokeStyle = '#FFFFFF'
  //       drawnCtx.stroke()
  //       break;
  //     }
  //     else {
  //       tries++
  //     }
  //   }
  //
  //   if (tries === k) {
  //     activeSamples.splice(randomIndex, 1)
  //   }
  //   // debugger
  //   if (activeSamples.length > 0) {
  //     // debugger
  //     window.setTimeout(() => (getNextSample(activeSamples)), 0.01)
  //     // getNextSample(activeSamples)
  //   }
  // }

  //run algo until activeSamples is empty
  while (activeSamples.length > 0) {
    let tries = 0
    let randomIndex = Math.floor(activeSamples.length * Math.random())
    let currentActivePos = allSamples[activeSamples[randomIndex]]
    while(tries < k){
      let currentCandidate = randomAnnulusPoint(currentActivePos, r, canvasWidth, canvasHeight)


      if (checkCandidate(currentCandidate, converter(currentCandidate), r)){
        allSamples.push(currentCandidate)
        activeSamples.push(allSamples.length - 1)
        let currentGridCandidate = converter(currentCandidate)
        // console.log(`gridCand= ${currentGridCandidate}`)
        // console.log(`currentCand= ${currentCandidate}`)
        // console.log(`currentGrid= ${theGrid[currentGridCandidate[0]][currentGridCandidate[1]]}`)
        theGrid[currentGridCandidate[0]][currentGridCandidate[1]] = allSamples.length - 1
        // let imgData = ctx.getImageData(currentCandidate[0], currentCandidate[1], 1, 1).data
        // drawnCtx.beginPath();
        // drawnCtx.fillStyle = `rgb(${imgData[0]}, ${imgData[1]}, ${imgData[2]})`
        // drawnCtx.arc(currentCandidate[0], currentCandidate[1], 4, 0, 2*Math.PI);
        // drawnCtx.fill()
        // drawnCtx.strokeStyle = '#000000'
        // drawnCtx.stroke()
        break;
      }
      else {
        tries++
      }
    }

    if (tries === k) {
      activeSamples.splice(randomIndex, 1)
    }

  }

  // window.setInterval(getNextSample, 0)
  // getNextSample(activeSamples)

  let v = vmoney
  let v2 = v.extent([[0,0],[canvasWidth, canvasHeight]])
  let polys = v2(allSamples).polygons()
  let imgData;
  let currentSample;

  for (let i = 0; i < polys.length; i++){
    currentSample = allSamples[i]
    imgData = ctx.getImageData(currentSample[0], currentSample[1], 1, 1).data
    drawnCtx.fillStyle = `rgb(${imgData[0]}, ${imgData[1]}, ${imgData[2]})`
    drawnCtx.beginPath();

    drawnCtx.moveTo(polys[i][0][0], polys[i][0][1])
    for (let j = 1; j < polys[i].length; j++){
      drawnCtx.lineTo(polys[i][j][0], polys[i][j][1])
    }

    drawnCtx.closePath()
    drawnCtx.fill()
  }



  return allSamples
}
