/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const START = document.getElementById('start')

const ROCKS = []

var gameInterval = null

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20;

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

    if (checkCollision(rock)) {
      return endGame()
    }

    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */

    if (top < GAME_HEIGHT) {
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
  var gameInterval = null

  ROCKS.forEach(function(rock) { rock.remove() })

  document.removeEventListener('keydown', moveDodger)

  return alert('YOU LOSE!')
}

function moveDodger(e) {
  if (parseInt(e.which) === LEFT_ARROW) {
     return moveDodgerLeft()
   }
   if (parseInt(e.which) === RIGHT_ARROW) {
     return moveDodgerRight()
   }

}

function moveDodgerLeft() {
  window.requestAnimationFrame(function() {
  var leftNumbers = dodger.style.left.replace('px', '')
  var left = parseInt(leftNumbers, 10)

  if (left > 0) {
  dodger.style.left = `${left - 4}px`
}
})
}

function moveDodgerRight() {
  window.requestAnimationFrame(function() {
  var leftNumbers = dodger.style.left.replace('px', '')
  var left = parseInt(leftNumbers, 10)

  if (left < 360) {
  dodger.style.left = `${left + 4}px`
}
})
}

function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  document.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
