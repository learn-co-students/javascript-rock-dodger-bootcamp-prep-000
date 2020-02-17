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


// checkCollision
function checkCollision(rock) {

  const top = positionToInteger(rock.style.top); //rock top
  
  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    // The DODGER is 40 pixels wide
    const dodgerRightEdge = 40 + dodgerLeftEdge;
    const rockLeftEdge = positionToInteger(rock.style.left);
    // The rock is 20 pixel's wide
    const rockRightEdge = 20 + rockLeftEdge;

    /**
     * Think about it -- what's happening here?
     * There's been a collision if one of three things is true:
     * 1. The rock's left edge is < the DODGER's left edge,
     *    and the rock's right edge is > the DODGER's left edge;
     * 2. The rock's left edge is > the DODGER's left edge,
     *    and the rock's right edge is < the DODGER's right edge;
     * 3. The rock's left edge is < the DODGER's right edge,
     *    and the rock's right edge is > the DODGER's right edge.
     */
    if ((rockLeftEdge<dodgerLeftEdge) && (rockRightEdge>=dodgerLeftEdge)){
      return true;
    }
    if ((rockLeftEdge>=dodgerLeftEdge) && (rockRightEdge<=dodgerRightEdge)){
      return true;
    }
    if ((rockLeftEdge<=dodgerRightEdge) && (rockRightEdge>dodgerRightEdge)){
      return true;
    }
    return false;
  }
  else{
    return false;
  }
}


// createRock
function createRock(x) {
  // Create rock
  const rock = document.createElement('div');
  rock.className = 'rock';
  rock.style.left = `${x}px`;
  // use var
  var top = 0;
  rock.style.top = top;

  // Append rock to GAME
  GAME.appendChild(rock);
  
  // Move rock downwards (2 pixels at a time)
  function moveRock() {
    /**
     * If a rock collides with the DODGER,
     * we should call endGame().
     */
    if (checkCollision(rock)){
      endGame();
    }
    
    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM.
     * rock still exists.
     */
    // rocks are 20px high
    else {
      let rockTopEdge = positionToInteger(rock.style.top);
      if (rockTopEdge < 380){
        rock.style.top = `${rockTopEdge+2}px`;
        window.requestAnimationFrame(moveRock);
      }
      else {
        GAME.removeChild(rock);
      }
    }
  }

  // Kick off the animation of the rock around here.
  window.requestAnimationFrame(moveRock);

  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision.
  ROCKS.push(rock);

  // Finally, return the rock element you've created.
  return rock;
}


// endGame
/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  clearInterval(gameInterval);
  for(let i = 0; i < ROCKS.length; i++){
    ROCKS[i].remove();
  }
  window.removeEventListener('keydown', moveDodger);
  alert('YOU LOSE!');
}


// moveDodger
function moveDodger(e) {
  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */
  if (e.which === LEFT_ARROW){
    moveDodgerLeft();
    e.preventDefault();
    e.stopPropagation();
  }
  else if (e.which === RIGHT_ARROW){
    moveDodgerRight();
    e.preventDefault();
    e.stopPropagation();
  }
}


// moveDodgerLeft
function moveDodgerLeft() {
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
  let stepsize = 5;
  function step(){
    left = positionToInteger(DODGER.style.left);
    if (left >= stepsize){
      DODGER.style.left = `${left-stepsize}px`;
    }
  }
  window.requestAnimationFrame(step);
}


//moveDodgerRight
function moveDodgerRight() {
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
  let stepsize = 5;
  function step(){
    right = positionToInteger(DODGER.style.left)+40;
    if (right <= GAME_WIDTH-stepsize){
      DODGER.style.left = `${right-40+stepsize}px`;
    }
  }
  window.requestAnimationFrame(step);
}


// positionToInteger
/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0;
}


// start
function start() {
  window.addEventListener('keydown', moveDodger);

  START.style.display = 'none';

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() * (GAME_WIDTH - 20)))
  }, 1000);
}
