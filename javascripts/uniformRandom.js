import { voronoi } from 'd3-voronoi'
import VisualAlgorithm from './visualAlgorithm'

export default class UniformRandom extends VisualAlgorithm {
  constructor(canvasWidth, canvasHeight, originalContext, drawnContext, sampleSize){
    super(canvasWidth, canvasHeight, originalContext, drawnContext)
    this.sampleSize = sampleSize
    this.allSamples = []
  }

  getNextSampleSet(n){
    for (let i = 0; i < n; i++){
      if (this.allSamples.length >= this.sampleSize) {break}
      let x = Math.floor(Math.random() * this.w)
      let y = Math.floor(Math.random() * this.h)
      this.allSamples.push([x, y])
    }
    this.clearCanvas()
    this.redraw()
  }

  fireLoop(){
    this.getNextSampleSet(30)
    window.clearInfo = window.setTimeout(() => {
      if (this.allSamples.length < this.sampleSize){
        this.fireLoop()
      }
    }, 0)
  }
}
