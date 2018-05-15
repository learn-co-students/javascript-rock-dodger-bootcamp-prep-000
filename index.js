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

var gameInterval = null

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)
  if (top >= 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20;
    if (rockRightEdge >= dodgerLeftEdge && rockLeftEdge <= dodgerRightEdge) {
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

    if (checkCollision(rock) === true) {
      return endGame()
    }
    if (top >= 380) {
      rock.remove()
    }
    window.requestAnimationFrame(moveRock)
  }
  moveRock()
  ROCKS.push(rock)
  return rock
}

function endGame() {
  clearInterval(gameInterval)
  while (ROCKS.length > 0) {
    ROCKS.pop().remove()
  }
  window.removeEventListener('keydown', moveDodger)
  alert('game over')
}

function moveDodger(e) {
  if (e.which === LEFT_ARROW) {
    e.preventDefault()
    e.stopPropagation()
    moveDodgerLeft()
  }
  if (e.which === RIGHT_ARROW) {
    e.preventDefault()
    e.stopPropagation()
    moveDodgerRight()
  }
}

function moveDodgerLeft() {
  let dodgerLeftEdge = parseInt(DODGER.style.left)
  if (dodgerLeftEdge >= 4 && dodgerLeftEdge <= 360) {
    DODGER.style.left = `${dodgerLeftEdge -= 4}px`
    window.requestAnimationFrame(moveDodgerLeft)
  }
}

function moveDodgerRight() {
  let dodgerLeftEdge = parseInt(DODGER.style.left)
  if (dodgerLeftEdge >= 0 && dodgerLeftEdge <= 356) {
    DODGER.style.left = `${dodgerLeftEdge += 4}px`
    window.requestAnimationFrame(moveDodgerRight)
  }
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
    createRock(Math.floor(Math.random() * (GAME_WIDTH - 20)))
  }, 1000)
}
