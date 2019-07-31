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
  // implement me!
  // use the comments below to guide you!
  const top = positionToInteger(rock.style.top);

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = dodgerLeftEdge + 40;
    
    const rockLeftEdge = positionToInteger(rock.style.left);

   // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = rockLeftEdge + 20;
  
  if ((rockLeftEdge <= dodgerLeftEdge) && (rockRightEdge >= dodgerLeftEdge) || (rockLeftEdge <= dodgerRightEdge) && (rockRightEdge >= dodgerRightEdge) || (rockLeftEdge >= dodgerLeftEdge) && (rockRightEdge <= dodgerRightEdge))
   
    /**        * Think about it -- what's happening here?
    	         * There's been a collision if one of three things is true:
               * 1. The rock's left edge is < the DODGER's left edge,
               *    and the rock's right edge is > the DODGER's left edge;
               * 2. The rock's left edge is > the DODGER's left edge,
               *    and the rock's right edge is < the DODGER's right edge;
               * 3. The rock's left edge is < the DODGER's right edge,
               *    and the rock's right edge is > the DODGER's right edge
               */
    {
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

  var top = 0;

  rock.style.top = top;

  GAME.appendChild(rock);
  /**
   * We have a rock that we need to append
   * it to GAME and move it downwards.
   */
  /**
   *This function moves the rock.(2 pixels *time)
   */
  function moveRock() {
    rock.style.top = `${top += 2}px`;

    if (checkCollision(rock)) {
      return endGame();
    }

    if (top < GAME_HEIGHT) {
    /**if rock hasn't reached bottom of
    * GAME, we want to move it again.
    */
      window.requestAnimationFrame(moveRock);

    } else {
    /**if rock *has* reached the bottom of the GAME,
    * remove it from the DOM
    */
      rock.remove();
    }
  }

  window.requestAnimationFrame(moveRock);
 
  /** Add the rock to ROCKS so that we can remove all *rocks when there's a collision
   */
  
  ROCKS.push(rock);

  return rock;
  // Finally, return the rock element you've created
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */

function endGame() {
 clearInterval(gameInterval);
 
 for(var i = 0; i < ROCKS.length; i++){ROCKS[i].remove();}
 
 document.removeEventListener("keydown", moveDodger);
 alert("YOU LOSE!");
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

  if ([LEFT_ARROW, RIGHT_ARROW].indexOf(key) > -1) {
    e.preventDefault();
    e.stopPropagation();
  }
  if (key === LEFT_ARROW) {
    moveDodgerLeft();
  } else if (key === RIGHT_ARROW) {
    moveDodgerRight();
  }
}

function moveDodgerLeft() {
  window.requestAnimationFrame(function() {
    const left = positionToInteger(DODGER.style.left);

    if (left > 0) {
      DODGER.style.left = `${left - 4}px`;
    }
  });
}

function moveDodgerRight() {
  window.requestAnimationFrame(function() {
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
