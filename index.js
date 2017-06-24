/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = [];
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

      const dodgerRightEdge = dodgerLeftEdge + 40

      const rockLeftEdge = positionToInteger(rock.style.left)

      const rockRightEdge = rockLeftEdge + 20

      if (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge ||
        rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge ||
        rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge ) {
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
  return moveRock(rock)
}

function moveRock(rock) {
  var top = 0
  function step() {
    rock.style.top = `${top += 2}px`
      if (checkCollision(rock) === true) {
        return endGame()
      }

      else if (top < 360) {
        window.requestAnimationFrame(step)
      }

      else if (top = 360) {
        rock.remove()
      }
   }
   window.requestAnimationFrame(step)
   ROCKS.push(rock)
   return rock
}

function endGame() {

    ROCKS.forEach(function(rock) {
      rock.remove()
    })
  clearInterval(gameInterval)
  document.removeEventListener('keydown', moveDodger)
  alert("YOU LOSE!")
}

function moveDodger(e) {
  if (e.which === LEFT_ARROW) {
   moveDodgerLeft()
   e.preventDefault()
   e.stopPropagation()
  }
  if (e.which === RIGHT_ARROW) {
   moveDodgerRight()
   e.preventDefault()
   e.stopPropagation()
  }
}

function moveDodgerLeft() {
  var dodgerLeft = positionToInteger(DODGER.style.left)
      window.requestAnimationFrame(function () {
          if (dodgerLeft > 0) {
            DODGER.style.left = `${dodgerLeft - 4}px`
          }
      })
}



function moveDodgerRight() {
  var dodgerRight = positionToInteger(DODGER.style.left) + 40
      window.requestAnimationFrame(function () {
          if (dodgerRight < 400) {
            DODGER.style.left = `${dodgerRight + 4}px`
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
