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
    var dodgerLeftEdge = positionToInteger(DODGER.style.left)

    // fixme: The DODGER is 40 pixels wide -- how do we get the right edge?
    var dodgerRightEdge = positionToInteger(DODGER.style.left) + 40

    var rockLeftEdge = positionToInteger(rock.style.left)

    // fixme: The rock is 20 pixel's wide -- how do we get the right edge?
    var rockRightEdge = positionToInteger(rock.style.left) + 20;

    if (((rockLeftEdge <= dodgerLeftEdge) && (rockRightEdge >= dodgerLeftEdge)) || ((rockLeftEdge >= dodgerLeftEdge) && (rockRightEdge <= dodgerRightEdge)) || ((rockLeftEdge <= dodgerRightEdge) && (rockRightEdge >= dodgerRightEdge)))
      {
        return true
      }

    }
}

/// FINISHED HERE END JAN 22ND 10 TEST PASSING, 13 FAILING ///

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

  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
    // implement me!
    // (use the comments below to guide you!)
    // function step(){
      rock.style.top = `${top += 2}px`
// }
    /**
     * If a rock collides with the DODGER,
     * we should call endGame()
     */
     if (checkCollision(rock) == true){
       endGame()
     } else if (top <= 360){
       /**
        * Otherwise, if the rock hasn't reached the bottom of
        * the GAME, we want to move it again.
        */
        window.requestAnimationFrame(moveRock)
     } else {
       /**
        * But if the rock *has* reached the bottom of the GAME,
        * we should remove the rock from the DOM
        */
        GAME.remove(rock)
      }
     }





  // We should kick of the animation of the rock around here

  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
  ROCKS.push(rock)
  window.requestAnimationFrame(moveRock);
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
  // ROCKS.length = 0;
  for (let i = 0; i < ROCKS.length; i++) {
    ROCKS[i].remove();
}
  window.removeEventListener('keydown', moveDodger);
  alert("YOU LOSE!");
}


// DODGER.addEventListener("keydown", function(e));

// implement me!
/**
 * This function should call `moveDodgerLeft()`
 * if the left arrow is pressed and `moveDodgerRight()`
 * if the right arrow is pressed. (Check the constants
 * we've declared for you above.)
 * And be sure to use the functions declared below!
 */
  // window.addEventListener('keydown', function(e){
function moveDodger(e) {


       if (e.which === LEFT_ARROW) {
         e.preventDefault();
         e.stopPropagation();
         moveDodgerLeft()
       } else if (e.which === RIGHT_ARROW) {
         e.preventDefault();
         e.stopPropagation();
         moveDodgerRight()
       }

     }

     //  else {
     //    alert("No cigar...")
     //  }


     // implement me!
     /**
      * This function should move DODGER to the left
      * (mabye 4 pixels?). Use window.requestAnimationFrame()!
      */
     //  DODGER.style.left = `${dodgerLeftEdge -= 4}px`;
function moveDodgerLeft() {

  dodgerLeftEdge = positionToInteger(DODGER.style.left);
   if (dodgerLeftEdge > 0){
     DODGER.style.left = `${dodgerLeftEdge -= 4}px`;
     window.requestAnimationFrame(moveDodgerLeft);
   }
}

// implement me!
/**
 * This function should move DODGER to the right
 * (mabye 4 pixels?). Use window.requestAnimationFrame()!
 */
function moveDodgerRight() {

   dodgerLeftEdge = positionToInteger(DODGER.style.left);
   dodgerRightEdge = positionToInteger(DODGER.style.left) + 40
    if (dodgerRightEdge < 400){
      DODGER.style.left = `${dodgerLeftEdge += 4}px`;
      window.requestAnimationFrame(moveDodgerRight);
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
