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
  const top = positionToInteger(rock.style.top);

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);

    // The DODGER is 40 pixels wide -- get the right edge
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left);

    // The rock is 20 pixel's wide -- get the right edge
    const rockRightEdge = rockLeftEdge + 20;

    /**
      * There's been a collision if one of three things is true:
      * 1. The rock's left edge is < the DODGER's left edge,
      *    and the rock's right edge is > the DODGER's left edge;
      * 2. The rock's left edge is > the DODGER's left edge,
      *    and the rock's right edge is < the DODGER's right edge;
      * 3. The rock's left edge is < the DODGER's right edge,
      *    and the rock's right edge is > the DODGER's right edge
    **/
    if ( rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge ||
         rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge ||
         rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge ) {
      return true;
    } else {
      return false;
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = `${x}px`;

  // Hmmm, why would we have used `var` here?
  var top = 0;
  rock.style.top = top;
  
  // append rock to GAME 
  GAME.appendChild(rock);

  // This function moves the rock 2 pixels at a time
  function moveRock() {
    rock.style.top = `${top += 2}px`;
    
    // If a rock collides with the DODGER, we should call endGame()
    if ( checkCollision(rock) ) {
        endGame();
    }
    //Otherwise, if the rock hasn't reached the bottom of the GAME, move it again.
    if (top < GAME_HEIGHT) {
      window.requestAnimationFrame(moveRock);
    } else {
    //If the rock has reached bottom of the GAME, remove the rock from the DOM.
      rock.remove();
    }
  }

  // Kick of the animation of the rock around here
  window.requestAnimationFrame(moveRock);
  
  // Add the rock to ROCKS so that we can remove all rocks when there's a collision
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
  clearInterval(gameInterval);
  for (let i = 0; i < ROCKS.length; i++) {
    ROCKS[i].remove();
  }
  window.removeEventListener('keydown', moveDodger);
  alert('YOU LOSE!');
}

function moveDodger(e) {
  
  // use preventDefault??
  const code = e.which

  if ([LEFT_ARROW, RIGHT_ARROW].indexOf(code) > -1) {
    e.preventDefault()
    e.stopPropagation()
  }
  
  // call `moveDodgerLeft()` if the left arrow is pressed 
  // and `moveDodgerRight()` if the right arrow is pressed.
  if (e.which === LEFT_ARROW) {
    moveDodgerLeft();
  }
  if (e.which === RIGHT_ARROW) {
    moveDodgerRight();
  }
}

function moveDodgerLeft() {
  /**
   * This function should move DODGER to the left 4 pixels.
   * Use window.requestAnimationFrame()!
   */
  window.requestAnimationFrame(function() {
    const left = positionToInteger(DODGER.style.left);
    
    if (left > 0) {
      DODGER.style.left = `${left - 4}px`;
    }
  });
}

function moveDodgerRight() {
  /**
   * This function should move DODGER to the right 4 pixels.
   * Use window.requestAnimationFrame()!
   */
  
  window.requestAnimationFrame(function () {
    const left = positionToInteger(DODGER.style.left);
    
    if (left < 360) {
      DODGER.style.left = `${left + 4}px`;
    }
  });
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0;
}

function start() {
  window.addEventListener('keydown', moveDodger);

  START.style.display = 'none';

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)));
  }, 1000);
}
