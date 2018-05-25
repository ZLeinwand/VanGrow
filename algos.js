import poisson from './poissonDiscAlgo'
import {voronoi} from 'd3-voronoi'

// window.voronoi = voronoi()


document.addEventListener('DOMContentLoaded', () => {
  window.poisson = poisson

  let original = document.getElementById("myCanvas")
  let drawn = document.getElementById("myCanvas2")
  let ctx = original.getContext("2d")
  let drawnCtx = drawn.getContext("2d")
  const vase = new Image()
  vase.src = 'images/vase.jpg'
  vase.onload = () => {
    ctx.drawImage(vase,0,0)
    let results = poisson(833, 1000, 5, 30, 2, ctx, drawnCtx)
    // results.forEach((point) => {
    //   let imgData = ctx.getImageData(point[0], point[1], 1, 1).data
    //   drawnCtx.beginPath();
    //   drawnCtx.fillStyle = `rgb(${imgData[0]}, ${imgData[1]}, ${imgData[2]})`
    //   drawnCtx.arc(point[0], point[1], 4, 0, 2*Math.PI);
    //   drawnCtx.fill()
    //   drawnCtx.stroke()
    // })
    window.results = results
  }

})
