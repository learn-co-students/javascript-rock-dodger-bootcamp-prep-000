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
const DODGER_WIDTH = 40
const ROCK_HEIGHT = 20
const DODGER_HEIGHT = 20
const DODGER_PACE = 5
const ROCK_PACE = 5
const START = document.getElementById('start')

var gameInterval = null

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {

  const top = positionToInteger(rock.style.top)
  if (top > (GAME_HEIGHT - ROCK_HEIGHT - DODGER_HEIGHT)) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + DODGER_WIDTH
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + ROCK_HEIGHT

    const rockOverlapsDodgerLeftEdge = rockLeftEdge < dodgerLeftEdge && rockRightEdge > dodgerLeftEdge
    const rockFallsInsideDodgerBounds = rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge
    const rockOverlapsDodgerRightEdge = rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerRightEdge

    return rockOverlapsDodgerLeftEdge || rockOverlapsDodgerRightEdge || rockFallsInsideDodgerBounds

  }
}

function createRock(x) {
  const rock = document.createElement('div')
  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = 0     // Hmmm, why would we have used `var` here?
  rock.style.top = `${0}px`
  GAME.appendChild(rock)
  ROCKS.push(rock)

  function rockAtBottom() {
    return (positionToInteger(rock.style.top) > GAME_HEIGHT - ROCK_HEIGHT)
  }

  function moveRock() {
    if (checkCollision) {
      // endGame()
    }

    if (!rockAtBottom()) {
      let topNum = positionToInteger(rock.style.top)
      rock.style.top = `${topNum + ROCK_PACE}px`
      window.requestAnimationFrame(moveRock)
    } else {
      rock.parentNode.removeChild(rock)
    }
  }
  window.requestAnimationFrame(moveRock)
  return rock
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  for (let i = 0; i < ROCKS.length; i++) {
    var rock = ROCKS[i]
    rock.parentNode.removeChild(rock)
  }
  while (ROCKS.length) {
    ROCKS.pop()
  }
  clearInterval(gameInterval)
}

function shouldMoveLeft() {
  return positionToInteger(DODGER.style.left) > 0
}

function shouldMoveRight() {
  return (positionToInteger(DODGER.style.left) < GAME_WIDTH - DODGER_WIDTH)
}

function moveDodger(e) {
  switch (e.which) {
    case LEFT_ARROW: moveDodgerLeft(); break
    case RIGHT_ARROW: moveDodgerRight(); break
    default: return
  }
  e.preventDefault()
  e.stopPropagation()
}

function moveDodgerLeft() {
  if (shouldMoveLeft()) {
    let left = positionToInteger(DODGER.style.left)
    DODGER.style.left = `${left - DODGER_PACE}px`
  }
  // TO-DO: Use window.requestAnimationFrame()!

}

function moveDodgerRight() {
  if (shouldMoveRight()) {
    let left = positionToInteger(DODGER.style.left)
    DODGER.style.left = `${left + DODGER_PACE}px`
  }
  // TO-DO: Use window.requestAnimationFrame()!

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

  gameInterval = setInterval(function () {
    createRock(Math.floor(Math.random() * (GAME_WIDTH - 20)))
  }, 1000)
}