import runAlgo from './runAlgo'
import BestCandidate from './bestCandidate'


document.addEventListener('DOMContentLoaded', () => {

  const original = document.getElementById('banner1')
  const drawn = document.getElementById('banner2')
  const bannerImg = new Image()
  bannerImg.src ='images/starry-night-banner.png'

  bannerImg.onload = () => {
    original.height = bannerImg.height
    original.width = bannerImg.width
    drawn.height = bannerImg.height
    drawn.width = bannerImg.width
    let ctx = original.getContext("2d")
    let drawnCtx = drawn.getContext("2d")
    ctx.drawImage(bannerImg, 0, 0, bannerImg.width, bannerImg.height, 0, 0, original.width, original.height)
    const b = new BestCandidate(bannerImg.width, bannerImg.height, ctx, drawnCtx, 20, 4500)
    b.fireLoop()
  }

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
    " image.",
    bestCandidate: "After the first point is chosen completely randomly on the canvas, Mitchell's Best Candidate creates 20 " +
    "candidate points at a time and selects the one with" +
    " the furthest distance from all other points. It will do this until the desired sample size " +
    "is reached. This algorithm is sped up considerably by use of a quad tree to find the closest existing point to each candidate and " +
    "comparing those distances and taking the furthest from it's closest existing point"
  }

  const runButton = document.getElementById("run")
  const clearButton = document.getElementById("clear")

  const poissonButton = document.getElementById("poisson")
  const uniformRandomButton = document.getElementById("uniformRandom")
  const bestCandidateButton = document.getElementById("bestCandidate")
  const blurb = document.getElementById("algoBlurb")
  blurb.innerHTML = blurbObject.uniformRandom

  const selfieButton = document.getElementById("selfie")
  const vaseButton = document.getElementById("vase")
  const roadButton = document.getElementById("road")


  poissonButton.addEventListener('click', () => {
    actionObject.algo = "poisson"
    blurb.innerHTML = blurbObject.poisson
    poissonButton.classList.add('selected')
    poissonButton.classList.remove('unselected')
    uniformRandomButton.classList.add('unselected')
    uniformRandomButton.classList.remove('selected')
    bestCandidateButton.classList.add('unselected')
    bestCandidateButton.classList.remove('selected')
  })

  uniformRandomButton.addEventListener('click', () => {
    actionObject.algo = "uniformRandom"
    blurb.innerHTML = blurbObject.uniformRandom
    poissonButton.classList.add('unselected')
    poissonButton.classList.remove('selected')
    uniformRandomButton.classList.add('selected')
    uniformRandomButton.classList.remove('unselected')
    bestCandidateButton.classList.add('unselected')
    bestCandidateButton.classList.remove('selected')
  })

  bestCandidateButton.addEventListener('click', () => {
    actionObject.algo = "bestCandidate"
    blurb.innerHTML = blurbObject.bestCandidate
    poissonButton.classList.add('unselected')
    poissonButton.classList.remove('selected')
    uniformRandomButton.classList.add('unselected')
    uniformRandomButton.classList.remove('selected')
    bestCandidateButton.classList.add('selected')
    bestCandidateButton.classList.remove('unselected')
  })

  selfieButton.addEventListener('click', () => {
    actionObject.painting = "selfie"
    selfieButton.classList.add('selected')
    selfieButton.classList.remove('unselected')
    vaseButton.classList.add('unselected')
    vaseButton.classList.remove('selected')
    roadButton.classList.add('unselected')
    roadButton.classList.remove('selected')
  })

  vaseButton.addEventListener('click', () => {
    actionObject.painting = "vase"
    selfieButton.classList.add('unselected')
    selfieButton.classList.remove('selected')
    vaseButton.classList.add('selected')
    vaseButton.classList.remove('unselected')
    roadButton.classList.add('unselected')
    roadButton.classList.remove('selected')
  })

  roadButton.addEventListener('click', () => {
    actionObject.painting = "road"
    selfieButton.classList.add('unselected')
    selfieButton.classList.remove('selected')
    vaseButton.classList.add('unselected')
    vaseButton.classList.remove('selected')
    roadButton.classList.add('selected')
    roadButton.classList.remove('unselected')
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


})
