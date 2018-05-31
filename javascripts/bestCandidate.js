import VisualAlgorithm from './visualAlgorithm'
import { quadtree } from 'd3-quadtree'
import distance from './formulas/distance'


export default class BestCandidate extends VisualAlgorithm {
  constructor(canvasWidth, canvasHeight, originalContext, drawnContext, candidatesPerAttempt, sampleSize, initialSample){
    super(canvasWidth, canvasHeight, originalContext, drawnContext)
    this.candidatesPerAttempt = candidatesPerAttempt
    this.sampleSize = sampleSize
    this.allSamples = []
    this.initialSample = initialSample || [Math.round(Math.random() * canvasWidth), Math.round(Math.random() * canvasHeight)]
    this.allSamples.push(this.initialSample)
    this.quadtree = quadtree().extent([[0,0],[canvasWidth, canvasHeight]]).add(this.initialSample)
  }


  getNextSampleSet(n = 1){
    for (let i = 0; i < n; i++){
      if (this.allSamples.length >= this.sampleSize) { break }
      let highscore = 0;
      let winningCandidate = null
      for (let j = 0; j < this.candidatesPerAttempt; j++){
        let currentCandidate = [Math.round(Math.random() * this.w), Math.round(Math.random() * this.h)]
        let closestSample = this.quadtree.find(currentCandidate[0], currentCandidate[1])
        if (distance(currentCandidate, closestSample) > highscore){
          highscore = distance(currentCandidate, closestSample)
          winningCandidate = currentCandidate
        }
      }
      this.allSamples.push(winningCandidate)
      this.quadtree.add(winningCandidate)
    }
    this.clearCanvas()
    this.redraw()
  }

  fireLoop(){
    this.getNextSampleSet(15)
    window.clearInfo = window.setTimeout(() => {
      if (this.allSamples.length < this.sampleSize){
        this.fireLoop()
      }
    }, 0)

  }

}
