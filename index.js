/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const DODGER_WIDTH = 40
const DODGER_HEIGHT = 20
const DODGER_SPEED = 4
const ROCK_WIDTH = 20
const ROCK_HEIGHT = 20
const ROCK_SPEED = 2
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400 - ROCK_HEIGHT - DODGER_HEIGHT
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
    const dodgerRightEdge = dodgerLeftEdge + DODGER_WIDTH
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + ROCK_WIDTH

    if (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) {
     return true
    }

    if (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) {
     return true
    }

    if (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge) {
     return true
    }

    return false
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Hmmm, why would we have used `var` here?
  var top = 0

  rock.style.top = top

  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */
   GAME.appendChild(rock)
   window.requestAnimationFrame(moveRock)

  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
     if (checkCollision(rock)) {
       endGame()
     } else {
       let distFromTop = positionToInteger(rock.style.top)
       if ((distFromTop + ROCK_HEIGHT) > GAME_HEIGHT) {
         rock.remove()
       } else {
         setTimeout(100, function() {
           rock.style.top = `${distFromTop + ROCK_SPEED}px`
           moveRock()
         })
       }
     }
  }

  moveRock()
  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
  ROCKS.push(rock)

  // Finally, return the rock element you've created
  return rock
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  clearInterval(gameInterval)
  window.removeEventListener('keydown', moveDodger)
  for (let rock of ROCKS) {
    rock.remove()
  }
}

function moveDodger(e) {
  // implement me!
  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */
   switch (e.detail || e.which) {
     case LEFT_ARROW:
       moveDodgerLeft()
       break
     case RIGHT_ARROW:
       moveDodgerRight()
       break
     default:
       return
   }
   e.preventDefault()
   e.stopPropagation()
}

function moveDodgerLeft() {
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   window.requestAnimationFrame(function() {
     var dodgerPos = positionToInteger(dodger.style.left) - DODGER_SPEED
     if (dodgerPos < 0) {
       return
     } else {
       dodger.style.left = `${dodgerPos}px`
     }
   })
}

function moveDodgerRight() {
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   window.requestAnimationFrame(function() {
     var dodgerPos = positionToInteger(dodger.style.left) + DODGER_SPEED
     if (dodgerPos > (GAME_WIDTH - DODGER_WIDTH)) {
       return
     } else {
       dodger.style.left = `${dodgerPos}px`
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
