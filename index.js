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
const dodgerWidth = 40;

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
    const dodgerRightEdge = dodgerLeftEdge + dodgerWidth;

    const rockLeftEdge = positionToInteger(rock.style.left);

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = rockLeftEdge + 20;
    if (rockRightEdge > dodgerLeftEdge && rockLeftEdge < dodgerRightEdge) {
      return true;
      }
    else {
      console.log('false: no collision');
      return false;
      }
    }
  }

function createRock(x) {
  const rock = document.createElement('div');
  rock.className = 'rock';
  rock.style.left = `${x}px`;

  var top = 0;

  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */
  game.appendChild(rock);
  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)   */
  function moveRock() {
    // implement me!
    rock.style.top = `${top += 2}px`;
    if (top < GAME_HEIGHT){
    window.requestAnimationFrame(moveRock);
        }
      }
  /**
   * If a rock collides with the DODGER,
   * we should call endGame()
   */
  if (checkCollision(rock)===true){
    endGame();
    }
  
  /**
   * Otherwise, if the rock hasn't reached the bottom of
   * the GAME, we want to move it again.
   */

  /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */
    if (top > GAME_HEIGHT) {
      document.removeChild(rock);
      }
  // We should kick of the animation of the rock around here
  window.requestAnimationFrame(moveRock);

  // Add the rock to ROCKS so that we can remove all rocks when there's a collision
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
  ROCKS.splice(0,ROCKS.length);
  console.log(ROCKS);
  document.removeEventListener('keydown', moveDodger);
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
   console.log(e.which);
   
   if (e.which !== LEFT_ARROW && e.which !== RIGHT_ARROW){
     return;
   }
   if (e.which===LEFT_ARROW){
    e.preventDefault();
    e.stopPropagation();
    moveDodgerLeft();
    
    }
   if (e.which === RIGHT_ARROW){
    e.preventDefault();
    e.stopPropagation();
    moveDodgerRight();
    }
  
   
}

function moveDodgerLeft() {
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
  position = positionToInteger(DODGER.style.left);
  console.log("Position:" + position);
  if (position > 0){
    DODGER.style.left = `${position - 4}px`;
    window.requestAnimationFrame(moveDodgerLeft);
    }
  }

function moveDodgerRight() {
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
  position = positionToInteger(DODGER.style.left);
  console.log("Position:" + position);
  if (position < GAME_WIDTH - dodgerWidth){
    DODGER.style.left = `${position + 4}px`;
    window.requestAnimationFrame(moveDodgerRight);
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
  window.addEventListener('keydown', moveDodger);

  START.style.display = 'none';

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)));
  }, 1000);
  
}
