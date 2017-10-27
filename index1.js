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
  const top = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = rockLeftEdge + 20;

    if (false /**
               * Think about it -- what's happening here?
               * There's been a collision if one of three things is true:
               * 1. The rock's left edge is < the DODGER's left edge,
               *    and the rock's right edge is > the DODGER's left edge;
               * 2. The rock's left edge is > the DODGER's left edge,
               *    and the rock's right edge is < the DODGER's right edge;
               * 3. The rock's left edge is < the DODGER's right edge,
               *    and the rock's right edge is > the DODGER's right edge
               */) {
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

  function moveRock() {
     var topTemp = positionToInteger(rock.style.top);
     var temp = topTempp;

         function step() {
           rock.style.top = `${left -= 1}px`
           if (left < (temp - 2)) {
             window.requestAnimationFrame(step)
           }
         }

         window.requestAnimationFrame(step)

     else if (rock.style.top = -100) {
       alert('boom');
     }
  }


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
var pos = positionToInteger(dodger.style.left);
//console.log(pos)
   if (e.which === RIGHT_ARROW) {

       moveDodgerRight()

   }
  else if (e.which === LEFT_ARROW) {
    moveDodgerLeft()
  }
}

  function moveDodgerRight() {
    // implement me!
    /**
     * This function should move DODGER to the left
     * (mabye 4 pixels?). Use window.requestAnimationFrame()!
     */

/*var leftNumbers = dodger.style.left.replace('px', '')
var left = parseInt(leftNumbers, 10)*/
var left = positionToInteger(dodger.style.left);
var temp = left;
if (left < 360) {
    function stepR() {
      dodger.style.left = `${left += 1}px`
      if (left < (temp + 4)) {
        window.requestAnimationFrame(stepR)
      }
    }

    window.requestAnimationFrame(stepR)
  }
}
function moveDodgerLeft() {
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
//# alert('moveDodgerLeft() function called');
/*var leftNumbers = dodger.style.left.replace('px', '')
var left = parseInt(leftNumbers, 10)*/
var left = positionToInteger(dodger.style.left);
var temp = left;
if (left > 0) {
  function stepL() {
    dodger.style.left = `${left -= 1}px`
    if (left > (temp - 4)) {
      window.requestAnimationFrame(stepL)
    }
  }

  window.requestAnimationFrame(stepL)
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
