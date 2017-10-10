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
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = rockLeftEdge + 20;

    if ((rockLeftEdge < dodgerLeftEdge &&
      rockRightEdge > dodgerLeftEdge) ||
      (rockLeftEdge >= dodgerLeftEdge &&
      rockRightEdge <= dodgerRightEdge) ||
      (rockLeftEdge < dodgerRightEdge &&
      rockRightEdge > dodgerRightEdge)) {
      return true;
    }
  }
  return false;
}

function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = `${x}px`;

  // Hmmm, why would we have used `var` here?
  var top = 0;

  rock.style.top = top;
  GAME.appendChild(rock);
//  GAME.append(rock);

  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */


  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
    rock.style.top = `${top += 2}px`;
    if (top < GAME_HEIGHT) {
      window.requestAnimationFrame(moveRock);
      if (checkCollision(rock)) {
        endGame();
      } else {
        window.requestAnimationFrame(moveRock);
      }
    } else {
      rock.remove();
    }
  }

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
  for (let x = 0; x < ROCKS.length; x++) {
    ROCKS[x].remove();
  }
  window.removeEventListener('keydown', moveDodger);
  alert("YOU LOSE!");
}

function moveDodger(e) {
  if (e.which === LEFT_ARROW) {
    e.preventDefault();
    e.stopPropagation();
    moveDodgerLeft();
  } else if (e.which === RIGHT_ARROW) {
    e.preventDefault();
    moveDodgerRight();
  }
}

function moveDodgerLeft() {
  var left = positionToInteger(DODGER.style.left);
  var px = 4;

  function step() {
    if (left > 0) {
      DODGER.style.left = `${left -= 1}px`;
      window.requestAnimationFrame(step);
    }
  }

  while (px--) {
    window.requestAnimationFrame(step);
  }
}

function moveDodgerRight() {
  var left = positionToInteger(DODGER.style.left);
  var px = 4;

  function step() {
    if (left < (GAME_WIDTH - 40)) {
      DODGER.style.left = `${left += 1}px`;
      window.requestAnimationFrame(step);
    }
  }

  while (px--) {
    window.requestAnimationFrame(step);
  }
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
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
