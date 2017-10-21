/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const DODGER_WIDTH = 40
const DODGER_HEIGHT = 20
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const ROCK_WIDTH = 20
const ROCK_HEIGHT = 20
const START = document.getElementById('start')
const SPEED = 4

var gameInterval = null

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)

  if (top > GAME_HEIGHT - ROCK_HEIGHT - DODGER_HEIGHT) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge+DODGER_WIDTH
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge+ROCK_WIDTH

    if ((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
      (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
      (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)) {
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
    } else if (top < GAME_HEIGHT) {
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
  ROCKS.forEach(function(rock) {rock.remove()})
  window.removeEventListener('keydown',moveDodger)
  alert('YOU LOSE!')
}

function moveDodger(e) {
  if (e.which === LEFT_ARROW){
    e.preventDefault()
    moveDodgerLeft()
    e.stopPropagation()
  }

  if (e.which === RIGHT_ARROW){
    e.preventDefault()
    moveDodgerRight()
    e.stopPropagation()
  }
}

function moveDodgerLeft() {
  window.requestAnimationFrame(function() {
    var left = parseInt(positionToInteger(DODGER.style.left),10)

    if (left > 0) {
      DODGER.style.left = `${left - SPEED}px`
    }
  })
}

function moveDodgerRight() {
  window.requestAnimationFrame(function() {
    var left = parseInt(positionToInteger(DODGER.style.left),10)

    if (left+DODGER_WIDTH < GAME_WIDTH) {
      DODGER.style.left = `${left + SPEED}px`
    }
  })
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
