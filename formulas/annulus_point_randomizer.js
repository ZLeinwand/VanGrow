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

export default newAnnulusPoint

// const randomizer = (r) => {
//   if (Math.round(Math.random())) {
//     return Math.round(Math.random() * r + r * -1)
//   }else{
//     return Math.round(Math.random() * r + r)
//   }
// }
