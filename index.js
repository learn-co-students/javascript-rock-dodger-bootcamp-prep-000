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

  const rockTop = positionToInteger(rock.style.top)

  if (rockTop >= 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20;
    const rockWidth = rockRightEdge - rockLeftEdge ;

    if (rockLeftEdge >= (dodgerLeftEdge - rockWidth) && (rockLeftEdge <= dodgerRightEdge)) {
      return true
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')
  //track rocks
  ROCKS.push(rock)

  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Hmmm, why would we have used `var` here?
  var top = 0

  rock.style.top = top

  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */

   // LINE BELOW IS MINE - EI
   document.getElementById("game").appendChild(rock)
  //  $("#game").append(rock)

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
     if (checkCollision(rock)== true) {
       endGame()
     }
    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */
      if (positionToInteger(rock.style.top)-20 > 0) {
        rock.style.top = `${top+=2}px`
        window.requestAnimationFrame(moveRock)
     }

    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */

     if (positionToInteger(rock.style.top)-20 <= 0) {
       var removeRock = document.getElementById('game').querySelector('div.rock');
       while(removeRock[0]){
         removeRock[0].parentNode.removeChild(removeRock[0])
       }
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

  // stop timer
  clearInterval(gameInterval)

 // clear all rocks from the board
  for (let i=0; i < ROCKS.length; i++) {
  ROCKS[i].remove()
  }

 // stop interactivity
  window.removeEventListener('keydown', moveDodger)
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

   const key = e.which;
   if ([LEFT_ARROW,RIGHT_ARROW].indexOf(key) != -1) {
     e.preventDefault();
     e.stopPropagation();
   }
   if (e.which === LEFT_ARROW) {
     moveDodgerLeft()
   }
   if (e.which === RIGHT_ARROW) {
     moveDodgerRight()
   }
 }

function moveDodgerLeft() {
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
  var dodgerLeftEdge = positionToInteger(DODGER.style.left)
   function step(){
     if (dodgerLeftEdge-4 > 0) {
     DODGER.style.left = `${dodgerLeftEdge-4}px` }
   }
   window.requestAnimationFrame(step)
}

function moveDodgerRight() {
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */

   var dodgerLeftEdge = positionToInteger(DODGER.style.left);
    function step(){
      if (dodgerLeftEdge + 4 < 360) {
      DODGER.style.left = `${dodgerLeftEdge+4}px` }
    }
    window.requestAnimationFrame(step)
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
