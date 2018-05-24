/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./algos.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./algos.js":
/*!******************!*\
  !*** ./algos.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _poissonDiscAlgo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./poissonDiscAlgo */ "./poissonDiscAlgo.js");



document.addEventListener('DOMContentLoaded', () => {
  window.poisson = _poissonDiscAlgo__WEBPACK_IMPORTED_MODULE_0__["default"]

  let original = document.getElementById("myCanvas")
  let drawn = document.getElementById("myCanvas2")
  let ctx = original.getContext("2d")
  let drawnCtx = drawn.getContext("2d")
  const vase = new Image()
  vase.src = 'images/vase.jpg'
  vase.onload = () => {
    ctx.drawImage(vase,0,0)
    let results = Object(_poissonDiscAlgo__WEBPACK_IMPORTED_MODULE_0__["default"])(833, 1000, 5, 30, 2, ctx, drawnCtx)
    // results.forEach((point) => {
    //   let imgData = ctx.getImageData(point[0], point[1], 1, 1).data
    //   drawnCtx.beginPath();
    //   drawnCtx.fillStyle = `rgb(${imgData[0]}, ${imgData[1]}, ${imgData[2]})`
    //   drawnCtx.arc(point[0], point[1], 4, 0, 2*Math.PI);
    //   drawnCtx.fill()
    //   drawnCtx.stroke()
    // })
  }

})


/***/ }),

/***/ "./formulas/annulus_point_randomizer.js":
/*!**********************************************!*\
  !*** ./formulas/annulus_point_randomizer.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const newAnnulusPoint = (currentPos, r, canvasWidth, canvasHeight) => {
  const angle = Math.round(Math.random() * 360)
  const distance = Math.round(Math.random() * r + r)

  const x = Math.round(distance * Math.cos(angle))
  const y = Math.round(distance * Math.sin(angle))
  const newPoint = [(currentPos[0] + x), currentPos[1] + y]

  if (newPoint[0] >= 0 && newPoint[0] < canvasWidth && newPoint[1] >= 0 && newPoint[1] < canvasHeight){
    return newPoint;
  }else{
    return newAnnulusPoint(currentPos, r, canvasWidth, canvasHeight)
  }
}

/* harmony default export */ __webpack_exports__["default"] = (newAnnulusPoint);

// const randomizer = (r) => {
//   if (Math.round(Math.random())) {
//     return Math.round(Math.random() * r + r * -1)
//   }else{
//     return Math.round(Math.random() * r + r)
//   }
// }


/***/ }),

/***/ "./formulas/distance.js":
/*!******************************!*\
  !*** ./formulas/distance.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


/* harmony default export */ __webpack_exports__["default"] = ((posA, posB) => {

  const dx = Math.max(posA[0], posB[0]) - Math.min(posA[0], posB[0])
  const dy = Math.max(posA[1], posB[1]) - Math.min(posA[1], posB[1])

  const dab = Math.sqrt((dx * dx) + (dy * dy))
  return dab
});


/***/ }),

/***/ "./lib/check_candidate.js":
/*!********************************!*\
  !*** ./lib/check_candidate.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _formulas_distance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../formulas/distance */ "./formulas/distance.js");
/* harmony import */ var _sample_to_grid_converter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sample_to_grid_converter */ "./lib/sample_to_grid_converter.js");



/* harmony default export */ __webpack_exports__["default"] = ((allSamples) => (theGrid) => (currentPos, gridPos, r) => {
  for (let i = -2; i <= 2; i++){
    let checkX = gridPos[0] - i
    if (checkX < 0 || checkX >= theGrid.length) { continue }
    for (let j = -2; j <= 2; j++){
      let checkY = gridPos[1] - j
      if (checkY < 0 || checkY >= theGrid[checkX].length) { continue }
      if (theGrid[checkX][checkY] !== -1){
        let indexOfPosToCheck = theGrid[checkX][checkY]
        if (Object(_formulas_distance__WEBPACK_IMPORTED_MODULE_0__["default"])(currentPos, allSamples[indexOfPosToCheck]) <= r){
          return false
        }
      }
    }
  }

  return true
});


/***/ }),

/***/ "./lib/grid.js":
/*!*********************!*\
  !*** ./lib/grid.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


/* harmony default export */ __webpack_exports__["default"] = ((dimensions, r, gridWidth, gridHeight) => {
  const n = dimensions

  let theGrid = []

  for (let i = 0; i < gridWidth; i++){
    theGrid.push(Array(gridHeight).fill(-1))
  }

  return theGrid
});


/***/ }),

/***/ "./lib/sample_to_grid_converter.js":
/*!*****************************************!*\
  !*** ./lib/sample_to_grid_converter.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/* harmony default export */ __webpack_exports__["default"] = ((cellSize) => (samplePos) => {
  let modX = Math.floor(samplePos[0] / cellSize)
  let modY = Math.floor(samplePos[1] / cellSize)

  return [modX, modY]
});


/***/ }),

/***/ "./poissonDiscAlgo.js":
/*!****************************!*\
  !*** ./poissonDiscAlgo.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_grid_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/grid.js */ "./lib/grid.js");
/* harmony import */ var _formulas_annulus_point_randomizer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./formulas/annulus_point_randomizer */ "./formulas/annulus_point_randomizer.js");
/* harmony import */ var _formulas_distance__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./formulas/distance */ "./formulas/distance.js");
/* harmony import */ var _lib_sample_to_grid_converter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/sample_to_grid_converter */ "./lib/sample_to_grid_converter.js");
/* harmony import */ var _lib_check_candidate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/check_candidate */ "./lib/check_candidate.js");







/* harmony default export */ __webpack_exports__["default"] = ((canvasWidth, canvasHeight, r, k, dimensions, ctx, drawnCtx) => {
  // step 0 initilaize n-dimentionsal background grid for storing samples and accelerating spatial searches
  const cellSize = Math.floor(r / Math.sqrt(dimensions))
  const gridHeight = Math.ceil(canvasHeight / cellSize)
  const gridWidth = Math.ceil(canvasWidth / cellSize)

  //curried function - takes cellSize, returns function that takes position
  const converter = Object(_lib_sample_to_grid_converter__WEBPACK_IMPORTED_MODULE_3__["default"])(cellSize)

  const theGrid = Object(_lib_grid_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2, r, gridWidth, gridHeight)
  const allSamples = []
  let activeSamples = []

  // step 1 select initial sample

  const initialSample = [Math.round(Math.random() * canvasWidth), Math.round(Math.random() * canvasHeight)]
  const initialGridSample = converter(initialSample)

  allSamples.push(initialSample)
  activeSamples.push(0)

  theGrid[initialGridSample[0]][initialGridSample[1]] = 0
  const checkCandidate = Object(_lib_check_candidate__WEBPACK_IMPORTED_MODULE_4__["default"])(allSamples)(theGrid)

  const getNextSample = (samples) => {
      let tries = 0
      let randomIndex = Math.floor(activeSamples.length * Math.random())
      let currentActivePos = allSamples[activeSamples[randomIndex]]
      while(tries < k){
        let currentCandidate = Object(_formulas_annulus_point_randomizer__WEBPACK_IMPORTED_MODULE_1__["default"])(currentActivePos, r, canvasWidth, canvasHeight)


        if (checkCandidate(currentCandidate, converter(currentCandidate), r)){
          allSamples.push(currentCandidate)
          activeSamples.push(allSamples.length - 1)
          let currentGridCandidate = converter(currentCandidate)
          // console.log(`gridCand= ${currentGridCandidate}`)
          // console.log(`currentCand= ${currentCandidate}`)
          // console.log(`currentGrid= ${theGrid[currentGridCandidate[0]][currentGridCandidate[1]]}`)
          theGrid[currentGridCandidate[0]][currentGridCandidate[1]] = allSamples.length - 1
          let imgData = ctx.getImageData(currentCandidate[0], currentCandidate[1], 1, 1).data
          drawnCtx.beginPath();
          drawnCtx.fillStyle = `rgb(${imgData[0]}, ${imgData[1]}, ${imgData[2]})`
          drawnCtx.arc(currentCandidate[0], currentCandidate[1], 3, 0, 2*Math.PI);
          drawnCtx.fill()
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

  //run algo until activeSamples is empty
  // while (activeSamples.length > 0) {
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
  //
  // }

  // window.setInterval(getNextSample, 0)

  return allSamples
});


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map