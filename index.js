const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('game');
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37; // ASCI id,use e.which!
const RIGHT_ARROW = 39; // ASCI id,use e.which!
const ROCKS = [];
const START = document.getElementById('start');

var gameInterval = null;
//Given the above,....
function checkCollision(rock) {

  const top = positionToInteger(rock.style.top);

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT minus rock ht minus Dodge
  // ht equals 360;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    // DODGER is 40 pixels wide, so is 40 px from left edge.
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left);
    // Rock is 20 pixel's wide, so right rock edge is 20px from left.
    const rockRightEdge = rockLeftEdge + 20;

    if (
        (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
        (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
        (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)) {
      return true;
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

  return rock;// Finally, return the rock element you've created
}
/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {//To end game, do these things:
  clearInterval(gameInterval);//End game by clearing `gameInterval`

  ROCKS.forEach(function(rock) {rock.remove() });//remove all ROCKS from DOM

  window.removeEventListener('keydown', moveDodger);//remove `moveDodger` event listener

  return alert('YOU LOSE!');//alert game player with 'YOU LOSE!'
}
//The following fxn calls `moveDodgerLeft()`
//if left arrow is pressed and`moveDodgerRight()`
//if right arrow is pressed. Check constants
//and be sure to use fxns declared below!
function moveDodger(e) {
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
//Next fxns move DODGER to left or right
//using window.requestAnimationFrame(),
//a way that is efficent, easy on CPU.
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

function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0;
}

function start() {
  window.addEventListener('keydown', moveDodger);

  START.style.display = 'none';

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)));
  }, 1000)
}
