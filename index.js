/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('game');
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start');

var gameInterval = null;


function checkCollision(rock){
  const top = positionToInteger(rock.style.top);
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20;
    if  ((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
        (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
        (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)) {
          return true;
        }else{
          return false;
        }
        }
}

function createRock(x) {
  const rock = document.createElement('div');
  rock.className = 'rock';
  rock.style.left = `${x}px`;
  var top = rock.style.top = 0
  GAME.appendChild(rock);
  rock.style.top = `${top += 2}px`;
  if (checkCollision(rock)) {
    endGame();
}
  function moveRock() {
    // implement me!
    // (use the comments below to guide you!)
    /**

     * If a rock collides with the DODGER,
     * we should call endGame()
     */
rock.style.top = `${top += 2}px`
if (checkCollision(rock) === true) {
  return endGame()
}
    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     *
    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */

   if (top < GAME_HEIGHT) {
     window.requestAnimationFrame(moveRock)
   }else {

   }
   rock.remove();
   }


  // We should kick of the animation of the rock around here

  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
  window.requestAnimationFrame(moveRock)
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
  clearInterval(gameInterval);
  ROCKS.forEach(function(element, index, array) {
    ROCKS[index].remove();
  })
  window.removeEventListener('keydown',moveDodger);
  alert ('YOU LOSE!');
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

 if (e.which === LEFT_ARROW) {
   e.preventDefault();
   e.stopPropagation();
   moveDodgerLeft();

 } if (e.which === RIGHT_ARROW) {
   e.preventDefault();
   e.stopPropagation();
   moveDodgerRight();

 }
}

function moveDodgerLeft() {
window.requestAnimationFrame(function() {
  var left = positionToInteger(DODGER.style.left);
  if (left > 0) {
  DODGER.style.left = `${left - 4}px`;
}
})
}

function moveDodgerRight() {
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   window.requestAnimationFrame(function() {
     var left = positionToInteger(DODGER.style.left);
     if (left < 360) {
       DODGER.style.left = `${left + 4}px`
     }
   })
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
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000);
}
