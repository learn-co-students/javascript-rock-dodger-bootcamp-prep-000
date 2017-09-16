/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('game');
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37; // use e.which!
const RIGHT_ARROW = 39; // use e.which!
const ROCKS = [];
const START = document.getElementById('start');

var gameInterval = null;

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {

  const top = positionToInteger(rock.style.top);

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);

    //The DODGER is 40 pixels wide;
    const dodgerRightEdge = positionToInteger(DODGER.style.left) + 40;

    const rockLeftEdge = positionToInteger(rock.style.left);

    //The rock is 20 pixel's wide;
    const rockRightEdge = positionToInteger(rock.style.left) + 20;

    if ((rockLeftEdge <= dodgerRightEdge) && (rockRightEdge >= dodgerLeftEdge)) {
      return true;
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = `${x}px`;

  //Reinitialise for every rock;
  var top = 0;

  rock.style.top = top;

  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */
  document.querySelector('#game').appendChild(rock);

  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */

  function moveRock() {
    /**
     * If a rock collides with the DODGER,
     * we should call endGame()
     */
     if (checkCollision(rock)) {
       return endGame();
     }

     var top = 0;
     rock.style.top = `${top += 2}px`;

     if (top < 360) {
       window.requestAnimationFrame(moveRock);
     }
     //moveRock();

    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */

    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */
     if (top === 380) {
       rock.remove();
     }

  }

  // We should kick of the animation of the rock around here
  window.requestAnimationFrame(moveRock);
  //moveRock();--------------
  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
  ROCKS.push(rock);

  // Finally, return the rock element you've created
  return rock;
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  gameInterval = null;
  ROCKS = [];
  return 'YOU LOSE!';
}

function moveDodger(e) {
  console.log("126//e:   ", e);
  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */
   if (e.which === RIGHT_ARROW) {
     e.preventDefault();
     e.stopPropagation();
     moveDodgerRight();
   } else if (e.which === LEFT_ARROW) {
     e.preventDefault();
     e.stopPropagation();
     moveDodgerLeft();
   } else  if ((e.which !== RIGHT_ARROW) && (e.which !== LEFT_ARROW)){
     return;
   }
}

function moveDodgerLeft() {
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!---?????????
   */
   var leftNumber = DODGER.style.left.replace('px', '');
   var left = parseInt(leftNumber, 10);
   if (left > 0) {
     DODGER.style.left = `${left - 4}px`;
   }
}

function moveDodgerRight() {
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!---?????????
   */
   var rightNumber = DODGER.style.left.replace('px', '');
   var right = parseInt(rightNumber, 10);

   if (right < 360) {
     DODGER.style.left = `${right + 4}px`;
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
  window.addEventListener('keydown', moveDodger);

  START.style.display = 'none';

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
