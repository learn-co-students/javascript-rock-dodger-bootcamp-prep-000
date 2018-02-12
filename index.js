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
var over = false
/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px
  if (top > 360 && top < 400) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20

    if ((rockRightEdge > dodgerLeftEdge &&
        rockLeftEdge < dodgerRightEdge)
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
    /**
     * If a rock collides with the DODGER,
     * we should call endGame()
     */
    if (positionToInteger(rock.style.top) >= 400) {
      rock.remove()
      console.log('removed')
      ROCKS.shift()
      return
    }
    if (checkCollision(rock)) {
      endGame()
      /**
       * Otherwise, if the rock hasn't reached the bottom of
       * the GAME, we want to move it again.
       */
    } else {
      rock.style.top = (positionToInteger(rock.style.top) + 2) + 'px'
      if(!over){
        window.requestAnimationFrame(moveRock)
      }
      /**
       * But if the rock *has* reached the bottom of the GAME,
       * we should remove the rock from the DOM
       */
       //console.log(positionToInteger(rock.style.top))
      // if (positionToInteger(rock.style.top) >= 400) { // passes tests but doesnt work !!
      //   console.log(rock)
      //   rock.remove()
      //   console.log(rock)
      //   ROCKS.shift()
      //   console.log(ROCKS)
      // }
    }
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
  over = true
  clearInterval(gameInterval)
  while (ROCKS[0]) {
    ROCKS[0].remove()
    ROCKS.shift()
  }
  window.removeEventListener('keydown', moveDodger)
  alert("YOU LOSE!")
  return true
}

function moveDodger(e) {
  if (e.which === LEFT_ARROW) {
    moveDodgerLeft()
    e.preventDefault()
    e.stopPropagation()
  } else if (e.which === RIGHT_ARROW) {
    moveDodgerRight()
    e.preventDefault()
    e.stopPropagation()
  }
}

function moveDodgerLeft() {
  if (positionToInteger(DODGER.style.left) > 0) {
    DODGER.style.left = (positionToInteger(DODGER.style.left) - 4) + 'px'
  }
}

function moveDodgerRight() {
  if (positionToInteger(DODGER.style.left) < GAME_WIDTH - 40) {
    DODGER.style.left = (positionToInteger(DODGER.style.left) + 4) + 'px'
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
  keydownListener = window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() * (GAME_WIDTH - 20)))
  }, 1000)
}
