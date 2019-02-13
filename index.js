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
  const top = positionToInteger(rock.style.top);//gives rock's distance from top as an integer (without 'px')
  //the following 'if' statement says 'if the rock's distance from the top is greater than 360 (i.e. it is now at same level or below where the dodger is)...
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);//gives dodger's left edge distance from left as an integer (without 'px')
    const dodgerRightEdge = dodgerLeftEdge+40;//gives dodger's right edge distance from left as an integer (without 'px')
    const rockLeftEdge = positionToInteger(rock.style.left);//gives rock's left edge distance from left as an integer (without 'px')
    const rockRightEdge = rockLeftEdge+20;
    if  ((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
        (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
        (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)) {
          return true;
        }
}
}
       /** explaining above logic:
               * Think about it -- what's happening here?
               * There's been a collision if one of three things is true:
               * 1. The rock's left edge is < the DODGER's left edge,
               *    and the rock's right edge is > the DODGER's left edge;
               * 2. The rock's left edge is > the DODGER's left edge,
               *    and the rock's right edge is < the DODGER's right edge;
               * 3. The rock's left edge is < the DODGER's right edge,
               *    and the rock's right edge is > the DODGER's right edge
               */


function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = `${x}px`;
  var top2 = rock.style.top = 0;
  GAME.appendChild(rock);
  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
     /* If a rock collides with the DODGER,
     * we should call endGame()
     */
     rock.style.top = `${top2+=2}px`;
     if (checkCollision(rock)){
       return endGame();
     } if (top2 < GAME_HEIGHT){
       window.requestAnimationFrame(moveRock);
     } else {
       rock.remove();
     }}



    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */

    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */


  // We should kick of the animation of the rock around here
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
 */
function endGame() {
  clearInterval(gameInterval);
  ROCKS.forEach(function(rock)
      {rock.remove()
      });
  document.removeEventListener('keydown',moveDodger);
  return alert('YOU LOSE!');
}

function moveDodger(e) {
  if([LEFT_ARROW, RIGHT_ARROW].indexOf(e.which) > -1){
    e.preventDefault();
    e.stopPropagation();
  }
  if (e.which === LEFT_ARROW){
    moveDodgerLeft()
  }if (e.which === RIGHT_ARROW){
    moveDodgerRight()
  }{

  }// implement me!
  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */
}

function moveDodgerLeft() {
  window.requestAnimationFrame(function() {
    const left = positionToInteger(DODGER.style.left)
    if (left>0) {
      DODGER.style.left = `${left - 6}px`
    }
  });
}

function moveDodgerRight() {
   window.requestAnimationFrame(function() {
     const left = positionToInteger(DODGER.style.left)
     if (left<360) {
       DODGER.style.left = `${left + 6}px`
     }
   });
   }

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
