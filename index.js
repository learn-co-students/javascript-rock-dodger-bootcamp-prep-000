const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('game');
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const DODGER_HEIGHT = 20;
const DODGER_WIDTH = 40;
const ROCK_HEIGHT = 20;
const ROCK_WIDTH = 20;
const LEFT_ARROW = 37; // use e.which!
const RIGHT_ARROW = 39; // use e.which!
const ROCKS = [];
const START = document.getElementById('start');

var gameInterval = null;
var endOfGame = false; // used to stop rocks once game ends

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top);

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > GAME_HEIGHT - ROCK_HEIGHT - DODGER_HEIGHT) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = dodgerLeftEdge + DODGER_WIDTH;
    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = rockLeftEdge + ROCK_WIDTH;
    
    /**
     * Think about it -- what's happening here?
     * There's been a collision if one of three things is true:
     * 1. The rock's left edge is < the DODGER's left edge,
     *    and the rock's right edge is > the DODGER's left edge;
     * 2. The rock's left edge is > the DODGER's left edge,
         and the rock's right edge is < the DODGER's right edge;
     * 3. The rock's left edge is < the DODGER's right edge,
     *    and the rock's right edge is > the DODGER's right edge
     */
     
    if (rockLeftEdge < dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) {
      return true;
    }
    else if (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) {
      return true;
    }
    else if (rockLeftEdge <= dodgerRightEdge && rockRightEdge > dodgerRightEdge) {
      return true;
    }
    else {
      return false;
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = `${x}px`;
  rock.style.top = `0px`;

  var top = 0;
  
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
     * and stop all the rocks on the screen
     */
    if (checkCollision(rock)) {
      endOfGame = true;
      endGame();
    }
    
    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME and not game over, we want to move it again.
     */
     
    else if (top < GAME_HEIGHT - ROCK_HEIGHT && endOfGame === false) {
      rock.style.top = `${top += 2}px`;
      window.requestAnimationFrame(moveRock);
    }
    
    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */
     
    else {
      rock.remove();
    }
  }

  // We should kick off the animation of the rock around here
  window.requestAnimationFrame(moveRock);
    
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
 * Ask the player to play again where they left off.
 */
function endGame() {
  document.removeEventListener('keydown', moveDodger);
  window.clearInterval(gameInterval);
  ROCKS.forEach(function(rock){
    rock.remove();
  });
  alert("YOU LOSE!");
  START.innerHTML = 'Play again?';
  START.style.display = 'inline';
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
    e.preventDefault();
    e.stopPropagation();
    moveDodgerLeft();
  }
  if (e.which === RIGHT_ARROW) {
    e.preventDefault();
    e.stopPropagation();
    moveDodgerRight();
  }
}

function moveDodgerLeft() {
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   window.requestAnimationFrame(function() {
     const left = positionToInteger(DODGER.style.left);
     if (left > 0) {
       DODGER.style.left = `${left - 8}px`;
     }
   });
}

function moveDodgerRight() {
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   window.requestAnimationFrame(function() {
     const right = positionToInteger(DODGER.style.left);
     if (right < GAME_WIDTH - DODGER_WIDTH) {
       DODGER.style.left = `${right + 8}px`;
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
  
  endOfGame = false;

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)));
  }, 1000);
}
