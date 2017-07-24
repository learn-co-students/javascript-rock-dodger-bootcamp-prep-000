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
var GAME_OVER = false;

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

    if (       //dodgerLeftEdge is between rock's edges
               (dodgerLeftEdge >= rockLeftEdge && dodgerLeftEdge <= rockRightEdge) ||
               //dodgerRightEdge is between rock's edges
               (dodgerRightEdge >= rockLeftEdge && dodgerRightEdge <= rockRightEdge) ||
               //rock is inside dodger's edges
               (dodgerLeftEdge <= rockLeftEdge && dodgerRightEdge >= rockRightEdge)
              ) {
      return true
    }
  }
  return false //by default, there is no collision
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
   // Add the rock to ROCKS so that we can remove all rocks
   // when there's a collision
   ROCKS.push(rock)

  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
    // implement me!
    rock.style.top = `${top += 2}px`;
    // (use the comments below to guide you!)
    /**
     * If a rock collides with the DODGER,
     * we should call endGame()
     */
     if (checkCollision(rock)){
       endGame();
       return;
     }
    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */
     else if (top < 400 && !GAME_OVER){
       window.requestAnimationFrame(moveRock);
     }
    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */
     else {
       rock.remove();
     }
  } //end moveRock

  // We should kick off the animation of the rock around here
  window.requestAnimationFrame(moveRock)

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
  window.removeEventListener('keydown', moveDodger);
  GAME_OVER = true;
  for(var i = 0;i<ROCKS.length;i++){
    console.log(ROCKS,`Remove ${ROCKS[i]} at index ${i}`)
    ROCKS[i].remove();  //delete ROCKS[i];
  }
  alert('YOU LOSE!');
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
   if (e.which === LEFT_ARROW){
     moveDodgerLeft();
     e.stopPropagation();
     e.preventDefault();
   }
   else if (e.which === RIGHT_ARROW){
     moveDodgerRight();
     e.stopPropagation();
     e.preventDefault();
   }
}

function moveDodgerLeft() {
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   var left = positionToInteger(DODGER.style.left)
   function step(){
     if (left > 0){
       DODGER.style.left = `${left -= 4}px`;
     }
   }
   step();
}

function moveDodgerRight() {
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   var left = positionToInteger(DODGER.style.left)
   var right = left + 40;
   function step(){
     if (right < GAME_WIDTH - 40){
       DODGER.style.left = `${left += 4}px`;
     }
   }
   step();
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
