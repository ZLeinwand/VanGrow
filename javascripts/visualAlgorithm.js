import { voronoi } from 'd3-voronoi'

export default class VisualAlgorithm {
  constructor(canvasWidth, canvasHeight, originalContext, drawnContext){
    this.w = canvasWidth
    this.h = canvasHeight
    this.originalContext = originalContext
    this.drawnContext = drawnContext
    this.voronoi = voronoi().extent([[0,0],[canvasWidth, canvasHeight]])
  }
  clearCanvas(){
    this.drawnContext.clearRect(0, 0, this.w, this.h)
  }

  redraw(){
    let polys = this.voronoi(this.allSamples).polygons()
    for (let i = 0; i < polys.length; i++){
      if (typeof this.allSamples[i] === 'undefined') {debugger}
      let currentSample = this.allSamples[i]
      let imgData = this.originalContext.getImageData(currentSample[0], currentSample[1], 1, 1).data
      if (typeof imgData[0] === 'undefined') {debugger}
      this.drawnContext.fillStyle = `rgb(${imgData[0]}, ${imgData[1]}, ${imgData[2]})`

      // if (typeof polys[i] === 'undefined' || typeof polys[i][0] === 'undefined' || typeof polys[i][0][0] === 'undefined') {debugger}
      if (typeof polys[i] !== 'undefined'){
        this.drawnContext.beginPath();
        this.drawnContext.moveTo(polys[i][0][0], polys[i][0][1])
        for (let j = 1; j < polys[i].length; j++){
          this.drawnContext.lineTo(polys[i][j][0], polys[i][j][1])
        }

        this.drawnContext.closePath()
        this.drawnContext.fill()
      }
    }
  }
}
