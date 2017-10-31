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
const DODGER_STEP_SIZE = 4

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
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)


    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)


    const rockRightEdge = rockLeftEdge + 20;

    if ( (rockLeftEdge < dodgerLeftEdge && rockRightEdge > dodgerLeftEdge)
      || (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge)
      || (rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerRightEdge) )
      {
      //alert("OOPS")
      //rock.style.color = "red"
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

  rock.style.top = `${top}px`

  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */
   GAME.appendChild(rock)

  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock(rock) {
    function step() {
      rock.style.top = `${positionToInteger(rock.style.top) + 2}px`

    /**
     * If a rock collides with the DODGER,
     * we should call endGame()
     */
    if(checkCollision(rock)) {
      endGame()
    }



    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */
     if(positionToInteger(rock.style.top) < GAME_HEIGHT) {
       window.requestAnimationFrame(step)
      }

    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */
     if(positionToInteger(rock.style.top) >= GAME_HEIGHT) {
       rock.remove()
     }
   }
     window.requestAnimationFrame(step)
  }

  // We should kick off the animation of the rock around here
  moveRock(rock)
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
    window.removeEventListener('keydown', moveDodger)
      clearInterval(gameInterval)
      alert("GAME OVER")
  for (var i = 0; i < ROCKS.length; i++)
  {
    GAME.removeChild(ROCKS[i])
    ROCKS[i].remove()
  }


}

function moveDodger(e) {
  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */
   if(e.which === LEFT_ARROW) {
     e.preventDefault()
     e.stopPropagation()
     moveDodgerLeft()
   }
   else if (e.which == RIGHT_ARROW) {
     e.preventDefault()
     e.stopPropagation()
     moveDodgerRight()
   }
}

function moveDodgerLeft() {
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
function step() {
  DODGER.style.left = `${positionToInteger(DODGER.style.left) - DODGER_STEP_SIZE}px`
}

if(positionToInteger(DODGER.style.left) <= DODGER_STEP_SIZE) {
  DODGER.style.left = `0px`
}
else {
   window.requestAnimationFrame(step)
 }
}

function moveDodgerRight() {
  function step() {
    DODGER.style.left = `${positionToInteger(DODGER.style.left) + DODGER_STEP_SIZE}px`
  }

  if(positionToInteger(DODGER.style.left) >= (GAME_WIDTH - DODGER_STEP_SIZE - 40)) {
    DODGER.style.right = `${GAME_WIDTH}px`
  }
  else {
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
