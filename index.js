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

    if ((rockLeftEdge >= dodgerLeftEdge) &&  (rockRightEdge <= dodgerRightEdge)
    /**
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
    else if ((rockLeftEdge <= dodgerLeftEdge) &&  (rockRightEdge >= dodgerLeftEdge)) {
      return true }
    else if ((rockLeftEdge <= dodgerRightEdge) &&  (rockRightEdge >= dodgerRightEdge)) {
        return true }
  }
}

function createRock(x) {
  const rock = document.createElement('div')
  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Hmmm, why would we have used `var` here?
  var top = 0

  rock.style.top = `${top}px`;

  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */
GAME.appendChild(rock)
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


         var top = 0

         function step() {
           rock.style.top = `${top += 2}px`


           var check = checkCollision(rock)

           if (check === true) {
             return endGame();
           }
           if (top < GAME_HEIGHT) {
             window.requestAnimationFrame(step)
           } else
           {
             rock.remove();
           }
         }

         window.requestAnimationFrame(step)

    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */

  }

  // We should kick of the animation of the rock around here

  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision

  ROCKS.push(rock)

moveRock();
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
  clearInterval(gameInterval);
  ROCKS.forEach(function(rock) { rock.remove() })
window.removeEventListener('keydown', moveDodger)
return alert('YOU LOSE!');

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
   var key = e.which;
var pos = positionToInteger(dodger.style.left);
if ([LEFT_ARROW, RIGHT_ARROW].indexOf(key) > -1) {
   e.preventDefault()
   e.stopPropagation()
 }

   if (key === RIGHT_ARROW) {
     if (pos < 360){
       moveDodgerRight()
     }
     else if (pos >= 360)
     e.stopPropagation()
     e.preventDefault();
   }
  else if (e.which === LEFT_ARROW) {
        if (pos > 0) {
          moveDodgerLeft()

        }
        else if (pos <= 0) {
          e.preventDefault()
          e.stopPropagation();
    }
 }
}
  function moveDodgerRight() {
    // implement me!
    /**
     * This function should move DODGER to the left
     * (mabye 4 pixels?). Use window.requestAnimationFrame()!
     */


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
  }, 5 * 1000)
}
