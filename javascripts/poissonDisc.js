import randomAnnulusPoint from './formulas/annulus_point_randomizer'
import gridMaker from './lib/grid.js'
import gridConverter from './lib/sample_to_grid_converter'
import checkCandidateFrame from './lib/check_candidate'
import { voronoi } from 'd3-voronoi'
import VisualAlgorithm from './visualAlgorithm'


export default class PoissonDiscAlgoGenerator extends VisualAlgorithm {
  constructor(canvasWidth, canvasHeight, radius, tries, originalContext, drawnContext, initialSample){
    super(canvasWidth, canvasHeight, originalContext, drawnContext)
    this.r = radius
    this.k = tries
    this.cellSize = Math.floor(radius / Math.sqrt(2))
    this.gridHeight = Math.ceil(canvasHeight / this.cellSize)
    this.gridWidth = Math.ceil(canvasWidth / this.cellSize)
    this.grid = gridMaker(2, radius, this.gridWidth, this.gridHeight)
    this.converter = gridConverter(this.cellSize)
    this.allSamples = []
    this.activeSamples = []
    this.initialSample = initialSample || [Math.round(Math.random() * canvasWidth), Math.round(Math.random() * canvasHeight)]
    this.checkCandidate = checkCandidateFrame(this.allSamples)(this.grid)(this.r)
  }


  initialize(){
    this.allSamples.push(this.initialSample)
    this.activeSamples.push(0)
    const gridPos = this.converter(this.initialSample)
    this.grid[gridPos[0]][gridPos[1]] = 0
  }

  getNextSampleSet(n){
    for (let i = 0; i < n; i++){
      if (this.activeSamples.length === 0) { break }
      let tries = 0
      let randomIndex = Math.floor(this.activeSamples.length * Math.random())
      let currentActivePos = this.allSamples[this.activeSamples[randomIndex]]
      while(tries < this.k){
        let currentCandidate = randomAnnulusPoint(currentActivePos, this.r, this.w, this.h)
        let gridCandidate = this.converter(currentCandidate)
        if (this.checkCandidate(currentCandidate, gridCandidate)){
          this.handleSuccess(currentCandidate, gridCandidate)

          break;
        }else {
          tries++
        }
      }
      if (tries === this.k) {
        this.activeSamples.splice(randomIndex, 1)
      }
    }
    this.clearCanvas()
    this.redraw()
  }

  fireLoop(){
    this.getNextSampleSet(380)
    window.clearInfo = window.setTimeout(() => {
      if (this.activeSamples.length > 0){
        this.fireLoop()
      }
    }, 0)
  }

  handleSuccess(currentCandidate, gridCandidate){
    this.allSamples.push(currentCandidate)
    this.activeSamples.push(this.allSamples.length - 1)
    this.grid[gridCandidate[0]][gridCandidate[1]] = this.allSamples.length - 1
  }





}
