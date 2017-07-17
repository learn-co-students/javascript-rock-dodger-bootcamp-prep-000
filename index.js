
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null


function checkCollision(rock){
  const top = positionToInteger(rock.style.top)

  if (top > 360){
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20

    if(rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerLeftEdge){
      return true
    }
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

    if (checkCollision(rock)){
       endGame()
     }
     if (top < (GAME_HEIGHT - 20)) {
          window.requestAnimationFrame(moveRock)
     }
     else {
       rock.remove()
     }
  }
  // We should kick of the animation of the rock around here
  window.requestAnimationFrame(moveRock)
  ROCKS.push(rock)
  return rock
}

function endGame() {
  for (var i = 0; i < ROCKS.length; i++){
    ROCKS[i].remove()
  }
  document.removeEventListener('keydown', moveDodger)
  clearInterval(gameInterval)
  alert("YOU LOSE! BETTER LUCK NEXT TIME!")
}

function moveDodger(e) {
   if (e.which === LEFT_ARROW){
     moveDodgerLeft()
     e.preventDefault()
     e.stopPropagation()
   }
   else if (e.which === RIGHT_ARROW){
     moveDodgerRight()
     e.preventDefault()
     //e.stopPropagation()
   }
}

function moveDodgerLeft() {
  window.requestAnimationFrame(function(){
  const left = positionToInteger(DODGER.style.left)
  if (left > 0){
    DODGER.style.left = `${left - 4}px`
  }
 })
}

function moveDodgerRight() {
  window.requestAnimationFrame(function(){
  const right = positionToInteger(DODGER.style.left)
  if (right < (GAME_WIDTH - 40)){
    DODGER.style.left = `${right + 4}px`
  }
 })
}

function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  START.style.display = 'none'
  window.addEventListener('keydown', moveDodger)
  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
