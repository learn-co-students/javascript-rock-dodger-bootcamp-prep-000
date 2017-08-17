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

/*
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = positionToInteger(DODGER.style.left) + 40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = positionToInteger(rock.style.left) + 20;
    if ((rockLeftEdge <= dodgerLeftEdge) && (rockRightEdge >= dodgerLeftEdge)) {
      return true
    } else if ((rockLeftEdge >= dodgerLeftEdge) && (rockRightEdge <= dodgerRightEdge)) {
      return true
    } else if ((rockLeftEdge <= dodgerRightEdge) && (rockRightEdge >= dodgerRightEdge)) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

function createRock(x) {
  const rock = document.createElement('div')
  rock.className = 'rock'
  rock.style.left = `${x}px`
  var top = 0
  rock.style.top = top
  GAME.appendChild(rock)
  ROCKS.push(rock)
  function moveRock() {
    function step() {
      rock.style.top = `${top += 2}px`
      top += 2
      if (checkCollision(rock) === true) {
        endGame()
        return
      } else {
        if (top < 400) {
          window.requestAnimationFrame(step)
        } else {
          rock.remove()
        }
      }
    }
    requestAnimationFrame(step)
  }
  moveRock()
  return rock
}

function endGame() {
  clearInterval(gameInterval)
  window.removeEventListener('keydown', moveDodger)
  while (ROCKS.length > 0) {
    var i = 0
    ROCKS[i].remove();
    ROCKS.shift();
    i++
  }
  alert("YOU LOSE!")
}

function moveDodger(e) {
  if (e.which === LEFT_ARROW) {
    e.preventDefault()
    e.stopPropagation()
    moveDodgerLeft()
  } else if (e.which === RIGHT_ARROW) {
    e.preventDefault()
    e.stopPropagation()
    moveDodgerRight()
  }
}

function moveDodgerLeft() {
  var numbers = DODGER.style.left.replace('px', '')
  var left = parseInt(numbers, 10)
  var goal = left - 20
  var shiftAmount = 2
  if (left > 0) {
    function step() {
      DODGER.style.left = `${left - shiftAmount}px`
      left -= shiftAmount
      if ((left > goal) && (left > 0)) {
        window.requestAnimationFrame(step)
      }
    }
    window.requestAnimationFrame(step)
  }
}

function moveDodgerRight() {
  var numbers = DODGER.style.left.replace('px', '')
  var left = parseInt(numbers, 10)
  var goal = left + 20
  var shiftAmount = 2
  if (left < 360) {
    function step() {
      DODGER.style.left = `${left + shiftAmount}px`
      left += shiftAmount
      if ((left < goal) && (left < 360)) {
        window.requestAnimationFrame(step)
      }
    }
    window.requestAnimationFrame(step)
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
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
