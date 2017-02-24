const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const LEFT_A=65
const RIGHT_ARROW = 39 // use e.which!
const RIGHT_D=68
const ROCKS = []
const START = document.getElementById('start')
const TITLE = document.getElementById('title')
var gameInterval = null

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)

  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(dodger.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20

    return (
      //Dodger<= overlaps rock<= and dodger<= overlaps with rock=>
      (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
      //OR--Dodger<= overlaps rock=> and dodger=> overlaps with rock=>
      (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
      //OR--Dodger=> overlaps rock<= and dodger=> overlaps with rock=>
      (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)
    )
  }
}
function createRock(x) {
  const rock = document.createElement('div')
  rock.className = 'rock'
  rock.style.left = `${x}px`
  var top = 0
  rock.style.top = top
  GAME.appendChild(rock)
  function moveRock() {
    rock.style.top = `${top += 2}px`
    if(checkCollision(rock)) {
      return endGame()
    }
    if(top < GAME_HEIGHT) {
      window.requestAnimationFrame(moveRock)
    } else {
      rock.remove()
    }
  }
  window.requestAnimationFrame(moveRock)
  ROCKS.push(rock)
  return rock
}
function endGame() {
    clearInterval(gameInterval)
    for(let i = 0; i < ROCKS.length; i++) {
      ROCKS[i].remove()
    }
    document.removeEventListener('keydown', moveDodger)
    START.innerHTML='&iquest;Play Again?'
    START.style.display='inline'
    TITLE.style.display='block'
    return alert("YOU LOSE!")
    done()
}
function moveDodger(e) {
  var left = positionToInteger(DODGER.style.left)
  if(e.which === LEFT_ARROW) {
      e.stopPropagation()
      e.preventDefault()
      moveDodgerLeft()
  }
  //A key also moves Dodger left
  if(e.which === LEFT_A) {
      e.stopPropagation()
      e.preventDefault()
      moveDodgerLeft()
  }
  if(e.which === RIGHT_ARROW){
      e.stopPropagation()
      e.preventDefault()
      moveDodgerRight()
  }
  //D key also moves dodger right
  if(e.which === RIGHT_D){
      e.stopPropagation()
      e.preventDefault()
      moveDodgerRight()
  }
}
function moveDodgerLeft() {
  var left = positionToInteger(DODGER.style.left)
  if(left > 0){
    window.requestAnimationFrame(function() {
      DODGER.style.left = `${left - 4}px`
    })
  }
}
function moveDodgerRight() {
  var left = positionToInteger(DODGER.style.left)
  if(left < 360){
    window.requestAnimationFrame(function() {
      DODGER.style.left = `${left + 4}px`
    })
  }
}
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}
function start() {
  window.addEventListener('keydown', moveDodger)
  DODGER.style.left='180px'
  START.style.display='none'
  TITLE.style.display='none'
  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
