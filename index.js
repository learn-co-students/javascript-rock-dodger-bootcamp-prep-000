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
const IS_PRESSED = {
  right: false,
  left: false
}
DODGER_MOVED = false

var gameInterval = null

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {
  // implement me!
  // use the comments below to guide you!
  const top = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = 0

    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = 0

    if (false
      /**
       * Think about it -- what's happening here?
       * There's been a collision if one of three things is true:
       * 1. The rock's left edge is < the DODGER's left edge,
       *    and the rock's right edge is > the DODGER's left edge
       * 2. The rock's left edge is > the DODGER's left edge,
       *    and the rock's right edge is < the DODGER's right edge
       * 3. The rock's left edge is < the DODGER's right edge,
       *    and the rock's right edge is > the DODGER's right edge
       */
    ) {
      return true
    }
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
  game.appendChild(rock)

  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
    // implement me!
    // (use the comments below to guide you!)
    /**
     * If a rock collides with the DODGER,
     * we should call endGame()
     */

    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */
    rock.style.top = (positionToInteger(rock.style.top) + 4) + 'px'
    window.requestAnimationFrame(moveRock)
    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */
  }

  // We should kick of the animation of the rock around here

  window.requestAnimationFrame(moveRock)
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
    for (var i = 0; i < rocks.length; i++) {
      game.removeChild(rocks[i])
    }
    window.removeEventListener(keyup)
    window.removeEventListener(keydown)
}

function moveDodger(e) {
  /* this block keeks track of which keys are
   * pressed and which aren't,
   * in order to avoid the stutter between the first and
   * second keydown events when hoding down the arrow keys
   *
   * idealy this should be used instead of e.which
   * (e.key === 'ArrowLeft' || e.key === 'Left')
   * (e.key === 'ArrowRight' || e.key === 'Right')
   */
  if (e.type === 'keydown') {
    if (e.which === LEFT_ARROW) {
      IS_PRESSED.left = true
    } else if (e.which === RIGHT_ARROW) {
      IS_PRESSED.right = true
    }
  } else { // if (e.type === 'keyup'){ is this necessary?
    if (e.which === LEFT_ARROW) {
      IS_PRESSED.left = false
    } else if (e.which === RIGHT_ARROW) {
      IS_PRESSED.right = false
    }
  }
  if(!DODGER_MOVED){
    window.requestAnimationFrame(moveDodgerLeft)
    window.requestAnimationFrame(moveDodgerRight)
    DODGER_MOVED = true
  }
}

function moveDodgerLeft() {
  if (IS_PRESSED.left) {
    DODGER.style.left = (positionToInteger(DODGER.style.left) - 4) + 'px'
  }
  window.requestAnimationFrame(moveDodgerLeft)
}

function moveDodgerRight() {
  if (IS_PRESSED.right) {
    DODGER.style.left = (positionToInteger(DODGER.style.left) + 4) + 'px'
  }
  window.requestAnimationFrame(moveDodgerRight)
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
  window.addEventListener('keyup', moveDodger)
  /* moveDodgerRight and moveDodgerLeft are called here
   * (as aposed to in moveDodger) so it is only called
   * once per frame even after multiple keyboard events
   */

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() * (GAME_WIDTH - 20)))
  }, 1000)
}
