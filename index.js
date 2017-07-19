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

  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = positionToInteger(DODGER.style.left)+40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = positionToInteger(rock.style.left)+20;

    if (rockRightEdge > dodgerLeftEdge && rockLeftEdge < dodgerRightEdge) {
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
    var topRock = parseInt(rock.style.top.replace('px', ''), 10)

    if(checkCollision(rock)) {
      return endGame()
    }
    else if (topRock > GAME_HEIGHT) {
      rock.remove()
    }
    else {
      rock.style.top = `${topRock += 2}px`
      window.requestAnimationFrame(moveRock)
    }
  }

  window.requestAnimationFrame(moveRock)
  ROCKS.push(rock)

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
    ROCKS[i].remove()
  }
  clearInterval(gameInterval)
  document.removeEventListener('keydown', moveDodger)
  alert("YOU LOSE!")
}

function moveDodger(e) {
    if (e.which === LEFT_ARROW) {
      moveDodgerLeft()
    }
    if (e.which === RIGHT_ARROW) {
      moveDodgerRight()
    }
}

function moveDodgerLeft() {
  var leftNumbers = dodger.style.left.replace('px', '')
  var left = parseInt(leftNumbers, 10)
  if (left >= 4) {
    function step() {
      dodger.style.left = `${left -= 4}px`
      if (left >= 4) {
        window.requestAnimationFrame(step)
      }
    }
    window.requestAnimationFrame(step)
  }
}

function moveDodgerRight() {
  var leftNumbers = dodger.style.left.replace('px', '')
  var left = parseInt(leftNumbers, 10)
  if (left < 360) {
    function step() {
      dodger.style.left = `${left += 4}px`
      if (left < 360) {
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
