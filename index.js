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

    return (
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
      ((rockLeftEdge <= dodgerLeftEdge) && (rockRightEdge >= dodgerLeftEdge)) ||
      ((rockLeftEdge >= dodgerLeftEdge) && (rockRightEdge <= dodgerRightEdge)) ||
      ((rockLeftEdge <= dodgerRightEdge) && (rockRightEdge >= dodgerRightEdge))
    )
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock';
  rock.style.left = `${x}px`;

  // Hmmm, why would we have used `var` here?
  var top = 0;

  rock.style.top = top;

  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */
  GAME.appendChild(rock);

  function moveRock() {
    rock.style.top = `${top + 2}px`;
    if (checkCollision(rock) === true) {
      return endGame();
    } else {
      rock.remove();
    }
  }
  window.requestAnimationFrame(moveRock);
  ROCKS.push(rock);
  return rock
}




function endGame() {
  clearInterval(gameInterval);
  for (var i = 0; i < ROCKS.length; i++) {
    ROCKS[i].remove();
  }
  document.removeEventListener('keydown', moveDodger);
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

  if (e.which === LEFT_ARROW) {
    e.stopPropagation();
    e.preventDefault();
    moveDodgerLeft();
  } else if (e.which === RIGHT_ARROW) {
    e.stopPropagation();
    e.preventDefault();
    moveDodgerRight();
  }
}


function moveDodgerLeft() {
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
  window.requestAnimationFrame(function() {
    const left = positionToInteger(DODGER.style.left)

    if (left > 0) {
      DODGER.style.left = `${left - 4}px`;
    }
  })
}

function moveDodgerRight() {
  window.requestAnimationFrame(function() {
    const left = positionToInteger(DODGER.style.left)

    if (left < 360) {
      DODGER.style.left = `${left + 4}px`;
    }
  })
}
/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() * (GAME_WIDTH - 20)))
  }, 1000)
}
