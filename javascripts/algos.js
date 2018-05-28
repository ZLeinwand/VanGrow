import runAlgo from './runAlgo'


document.addEventListener('DOMContentLoaded', () => {

  const actionObject = {
    algo: "uniformRandom",
    painting: "selfie"
  }

  window.actionObject = actionObject

  const blurbObject = {
    poisson: "Bridson's algorithm for Poisson-disc sampling starts " +
    "with a sample taken completely randomly from the canvas and builds incrementally " +
    "from there. It takes a random sample from it's list of active samples and will attempt to find a suitible" +
    " candidate within it's annulus. It has a minimum radius samples can be from one another and searches " +
    "for the next candidate in an ring two radius's wide. It will make a predetermined " +
    "amount of attempts (usually 30) until it either finds a suitible candidate, or marking " +
    "this sample as no longer active. The result is incrediblely even, yet still random, sampling.",
    uniformRandom: "Uniform random selects points at completely random X and Y axises until the sample size has been" +
    "reached. While it truly random, it is an ineffective algorithm for sampling as it leads to a lot of clustering" +
    "which in turn leads to undersampled spots. You can see the over and undersampled points represented by larger and smaller" +
    "voronoi polygons. This means we are not getting the most accurate representation of the color distribution of the original" +
    "image."
  }

  const runButton = document.getElementById("run")
  const clearButton = document.getElementById("clear")

  const poissonButton = document.getElementById("poisson")
  const uniformRandomButton = document.getElementById("uniformRandom")
  const blurb = document.getElementById("algoBlurb")
  blurb.innerHTML = blurbObject.uniformRandom

  const selfieButton = document.getElementById("selfie")
  const vaseButton = document.getElementById("vase")
  const roadButton = document.getElementById("road")


  poissonButton.addEventListener('click', () => {
    actionObject.algo = "poisson"
    blurb.innerHTML = blurbObject.poisson
  })

  uniformRandomButton.addEventListener('click', () => {
    actionObject.algo = "uniformRandom"
    blurb.innerHTML = blurbObject.uniformRandom
  })

  selfieButton.addEventListener('click', () => {
    actionObject.painting = "selfie"
  })

  vaseButton.addEventListener('click', () => {
    actionObject.painting = "vase"
  })

  roadButton.addEventListener('click', () => {
    actionObject.painting = "road"
  })

  clearButton.addEventListener('click', () => {
    clearTimeout(window.clearInfo)
    const canvas = document.getElementById('myCanvas2')
    const newCanvas = document.createElement('div')
    newCanvas.innerHTML = '<canvas id="myCanvas2" width="0" height="0"></canvas>'
    canvas.parentNode.replaceChild(newCanvas, canvas)
  })

  runButton.addEventListener('click', () => {
    if (window.clearInfo) { clearTimeout(window.clearInfo) }
    runAlgo(actionObject)
    window.scrollTo(0, document.body.scrollHeight)
  })





  // const vase = new Image()
  // vase.src = 'images/scaled_selfie.png'
  // let original = document.getElementById("myCanvas")
  // let drawn = document.getElementById("myCanvas2")
  // vase.onload = () => {
  //   original.height = vase.height
  //   original.width = vase.width
  //   drawn.height = vase.height
  //   drawn.width = vase.width
  //   let ctx = original.getContext("2d")
  //   let drawnCtx = drawn.getContext("2d")
  //   ctx.drawImage(vase,0,0, vase.width, vase.height, 0, 0, original.width, original.height)
  //   const p = new Poisson(vase.width, vase.height, 8, 30, ctx, drawnCtx)
  //   p.initialize()
  //   p.fireLoop()
  //
  // }

})
