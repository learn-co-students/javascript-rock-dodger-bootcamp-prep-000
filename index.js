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
  if (top > GAME_HEIGHT - 40) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = rockLeftEdge + 20;
    if ((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
        (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
        (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge))
      return true;
    }
}

function createRock(x) {
  const rock = document.createElement('div');
  rock.className = 'rock';
  rock.style.left = `${x}px`;
  var top = 0;
  rock.style.top = top;
  GAME.appendChild(rock);

  function moveRock() {
    rock.style.top = `${top += 2}px`;
    if (checkCollision(rock)) {
      endGame();
    } if (top < GAME_HEIGHT - 20) {
      window.requestAnimationFrame(moveRock);
    } else {
      rock.remove();
    }
  }
    window.requestAnimationFrame(moveRock);
    ROCKS.push(rock);
    return rock;
}


function endGame() {
  clearInterval(gameInterval);
  window.removeEventListener('keydown', moveDodger);
  for (let i = 0; i < ROCKS.length; i++) {
    ROCKS[i].remove();
  }
  alert("YOU LOSE!");
}

function moveDodger(e) {
    if (e.which === LEFT_ARROW) {
    moveDodgerLeft();
    e.stopPropagation();
    e.preventDefault();
    } else if (e.which === RIGHT_ARROW) {
    moveDodgerRight();
    e.stopPropagation();
    e.preventDefault();
    } else {
      return false
    }
}

function moveDodgerLeft() {
  var dodgerLeftEdge = positionToInteger(DODGER.style.left);
    if (dodgerLeftEdge > 0) {
      DODGER.style.left = `${dodgerLeftEdge - 4}px`;
      window.requestAnimationFrame(moveDodgerLeft);
    }
}

function moveDodgerRight() {
  var dodgerLeftEdge = positionToInteger(DODGER.style.left);
    if (dodgerLeftEdge < GAME_WIDTH - 40) {
      DODGER.style.left = `${dodgerLeftEdge + 4}px`;
      window.requestAnimationFrame(moveDodgerRight);
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
