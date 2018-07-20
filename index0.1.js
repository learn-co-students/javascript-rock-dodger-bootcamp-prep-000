/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')
const DODGER_WIDTH = 40
var gameInterval = null

function checkCollision(rock) {

  // implement me!
  // use the comments below to guide you!
  const top = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20;

    if (dodgerLeftEdge <= rockRightEdge && dodgerRightEdge >= rockLeftEdge) { 
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
    // implement me!
    // (use the comments below to guide you!)

    if (top < 400) {
      rock.style.top = `${top += 2}px`;
      window.requestAnimationFrame(moveRock)
    }
    else {
      rock.remove()
      ROCKS.shift()
    }
    
    if (checkCollision(rock)) {
      endGame();
    }
  }

  // We should kick of the animation of the rock around here
  window.requestAnimationFrame(moveRock)

      // Add the rock to ROCKS so that we can remove all rocks
      // when there's a collision
  ROCKS.push(rock)

          // Finally, return the rock element you've created
  return rock
}

function endGame() {
  clearInterval(gameInterval)  
  while (ROCKS.length > 0) {
    ROCKS[0].remove()
    ROCKS.shift()
  }
  window.removeEventListener('keydown', moveDodger)
  alert('You Lose!')
}

var leftUp = false
var rightUp = false
var leftDown = false
var leftUp = false

function moveDodger(e) {
  if (e.which === LEFT_ARROW && !leftDown) {
    leftUp = false
    leftDown = true
    e.preventDefault()
    e.stopPropagation()
    moveDodgerLeft()
  }
  
  if (e.which === RIGHT_ARROW && !rightDown) {
    rightUp = false
    rightDown = true
    e.preventDefault()
    e.stopPropagation()
    moveDodgerRight()
  }
}

function moveDodgerLeft() {
  const left = positionToInteger(DODGER.style.left)
  if (left > 0) {
    DODGER.style.left = `${left - 4}px`;
  }
  if (!leftUp) {
    window.requestAnimationFrame(moveDodgerLeft)
  }
}
  
function moveDodgerRight() {
  const left = positionToInteger(DODGER.style.left)
  if (left < 360) {
    DODGER.style.left = `${left + 4}px`;
  }
  if (!rightUp) {
    window.requestAnimationFrame(moveDodgerRight)
  }
}

function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function keyReleased(e) {
  if (e.which === LEFT_ARROW) {
    leftUp = true
    leftDown = false
  }
  
  if (e.which === RIGHT_ARROW) {
    rightUp = true
    rightDown = false
  }
}

function start() {
  
  window.addEventListener('keydown', moveDodger)
  window.addEventListener('keyup', keyReleased)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 500)
}
