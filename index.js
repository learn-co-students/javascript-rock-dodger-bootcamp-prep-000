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

/**
 * Returns true if the specified rock collides with dodger. A collision occurs
 * when the rocks left or right edge (or both) intersects with dodger.
 * 
 * @param rock - a div resulting from the createRock() function 
 * 
 * @returns true if a collision is detected, and false otherwise
 */
function checkCollision(rock) {
  
  const top = positionToInteger(rock.style.top);

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);

    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left);

    const rockRightEdge = rockLeftEdge + 20;

    /**
      * Think about it -- what's happening here?
      * There's been a collision if one of three things is true:
      * 1. The rock's left edge is < the DODGER's left edge,
      *    and the rock's right edge is > the DODGER's left edge;
      * 2. The rock's left edge is > the DODGER's left edge,
      *    and the rock's right edge is < the DODGER's right edge;
      * 3. The rock's left edge is < the DODGER's right edge,
      *    and the rock's right edge is > the DODGER's right edge
      */
      
      /*
         ( )   ( )    ( )          
            __________
           |  DODGER |
           ----------
      
      */
      let rightEdgeHit = rockLeftEdge < dodgerLeftEdge && rockRightEdge > dodgerLeftEdge
      
      let directHit = rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge
      
      let leftEdgeHit = rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerRightEdge
      
      return rightEdgeHit || directHit || leftEdgeHit
      
    } else {
      return false;
    }
}

function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = `${x}px`;

  // Hmmm, why would we have used `var` here?
  var top = 0;

  rock.style.top = `${top}px`;

  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */
   GAME.appendChild(rock);

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
      endGame();
    } else if (positionToInteger(rock.style.top) < 400) {
      /**
      * Otherwise, if the rock hasn't reached the bottom of
      * the GAME, we want to move it again.
      */
      rock.style.top = `${positionToInteger(rock.style.top) + 2}px`;
      
      window.requestAnimationFrame(moveRock);
    } else {
      /**
      * But if the rock *has* reached the bottom of the GAME,
      * we should remove the rock from the DOM
      */
      rock.remove();
    }
  }

  // We should kick of the animation of the rock around here
  window.requestAnimationFrame(moveRock);
  
  ROCKS.push(rock);
  
  return rock;
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  
  clearInterval(gameInterval);
  
  while (ROCKS.length > 0) {
    ROCKS.pop().remove()
  }
  
  window.removeEventListener('keydown', moveDodger);
  
  console.log("YOU LOSE!");
}

function moveDodger(e) {
  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */
  if (e.which === LEFT_ARROW) {
    e.stopPropagation()
    e.preventDefault()
    moveDodgerLeft();
  } else if  (e.which === RIGHT_ARROW) {
    e.stopPropagation()
    e.preventDefault()
    moveDodgerRight();
  }
}

function moveDodgerLeft() {
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
  var leftOffset = positionToInteger(DODGER.style.left);
 
  if (leftOffset > 0) {
    dodger.style.left = `${leftOffset - 4}px`;
  }
}

function moveDodgerRight() {
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
  var leftOffset = positionToInteger(DODGER.style.left);
 
  if (leftOffset < 360) {
      dodger.style.left = `${leftOffset + 4}px`;
  }
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0;
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'NONE';
  
  gameInterval = setInterval(function() {
      createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)));
    }, 1000);
}