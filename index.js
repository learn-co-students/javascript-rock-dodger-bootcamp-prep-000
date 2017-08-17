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
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = rockLeftEdge + 20;
    if (
      (rockLeftEdge < dodgerLeftEdge && rockRightEdge > dodgerLeftEdge)
      || (rockLeftEdge > dodgerLeftEdge && rockRightEdge < dodgerRightEdge)
      || (rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerRightEdge)
    ) {
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
  GAME.append(rock)

  function moveRock() {
      var rockPos = positionToInteger(rock.style.top)
      rockPos += 2
      rock.style.top = `${rockPos}px`
      if (rockPos < 400) {
        if (checkCollision(rock) === false) {
          window.requestAnimationFrame(moveRock)
        } else {
          endGame()
        }
     } else {
       rock.remove()
     }
   }
  moveRock()
  ROCKS.push(rock)
  // Finally, return the rock element you've created
  return rock
}

function endGame() {
  clearInterval(gameInterval);
  for (let i = 0; i < ROCKS.length; i++) {
    ROCKS[i].remove()
    ROCKS.pop()
  };
  window.removeEventListener('keydown', moveDodger)
  alert('YOU LOSE!');
}

function moveDodger(e) {
     if (e.which === LEFT_ARROW) {
       e.stopPropagation()
       e.preventDefault()
       moveDodgerLeft()
     } else if (e.which === RIGHT_ARROW) {
       e.stopPropagation()
       e.preventDefault()
       moveDodgerRight()
     }
 }

function moveDodgerLeft() {
    var edgePos = positionToInteger(DODGER.style.left)
    if (edgePos > 0) {
     edgePos -= 4
     DODGER.style.left = `${edgePos}px`
     window.requestAnimationFrame(moveDodgerLeft)
    }
}

function moveDodgerRight() {
  var edgePos = positionToInteger(DODGER.style.left)
  if (edgePos < 360) {
    edgePos += 4
    DODGER.style.left = `${edgePos}px`
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
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
