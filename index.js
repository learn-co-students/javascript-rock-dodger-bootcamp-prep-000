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
  // implement me!
  // use the comments below to guide you!
}


function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Hmmm, why would we have used `var` here?
  var top = 0
  rock.style.top = top

}
  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */
   /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */


/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  gameInterval = null
  ROCKS = null
  alert('YOU LOSE!')
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
   if (e.which == LEFT_ARROW){
     moveDodgerLeft()
   } else if (e.which == RIGHT_ARROW){
     moveDodgerRight()
   }
}

function moveDodgerLeft() {
  if (positionToInteger(DODGER.style.left)-4 >= 0){
    positionToInteger(DODGER.style.left)-4
  }
}

   //window.requestAnimationFrame(DODGER)
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */


function moveDodgerRight() {
  if (positionToInteger(DODGER.style.right)+4 <= GAME_WIDTH){
    positionToInteger(DODGER.style.right)+4

  }
}

  //window.requestAnimationFrame(moveDodgerRight)
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */


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

start()
