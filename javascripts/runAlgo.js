import Poisson from './poissonDisc'
import UniformRandom from './uniformRandom'
import BestCandidate from './bestCandidate'


export default (actionObject) => {
  console.log(actionObject)

  let imgFile;
  switch (actionObject.painting) {
    case "selfie":
      imgFile = new Image()
      imgFile.src ='images/scaled_selfie.png'
      break;
    case "vase":
      imgFile = new Image()
      imgFile.src ='images/scaled_vase.png'
      break;
    case "road":
      imgFile = new Image()
      imgFile.src ='images/scaled_road.png'
      break;
    default:

  }

  let original = document.getElementById("myCanvas")
  let drawn = document.getElementById("myCanvas2")

  imgFile.onload = () => {
    original.height = imgFile.height
    original.width = imgFile.width
    drawn.height = imgFile.height
    drawn.width = imgFile.width
    let ctx = original.getContext("2d")
    let drawnCtx = drawn.getContext("2d")
    ctx.drawImage(imgFile, 0, 0, imgFile.width, imgFile.height, 0, 0, original.width, original.height)
    original.style.border = "2px solid black"
    drawn.style.border = "2px solid black"



    switch (actionObject.algo) {
      case "poisson":
        const p = new Poisson(imgFile.width, imgFile.height, 7, 30, ctx, drawnCtx)
        p.initialize()
        p.fireLoop()
        break;
      case "uniformRandom":
        const u = new UniformRandom(imgFile.width, imgFile.height, ctx, drawnCtx, 4000)
        u.fireLoop()
        break;

      case "bestCandidate":
        const b = new BestCandidate(imgFile.width, imgFile.height, ctx, drawnCtx, 20, 4500)
        b.fireLoop()
        break;

    }
  }
}
