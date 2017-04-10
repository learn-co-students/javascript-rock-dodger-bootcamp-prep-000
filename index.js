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
const MOVE_DODGER_BY = 4;
const MOVE_ROCKS_BY = 2;

var gameInterval = null;
var rocksCreated = 0;

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {

  const top = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;

  // rock can only collide if its bottom is at or below the dodger's top
  if (top <= 360) { // i.e. rock hasn't reached the dodger yet
    return false;
  }

  const dodgerLeftEdge = positionToInteger(DODGER.style.left)
  const dodgerRightEdge = dodgerLeftEdge + 40; // width defined in index.css
  const rockLeftEdge = positionToInteger(rock.style.left)
  const rockRightEdge = rockLeftEdge + 20; // width defined in index.css

  const isInsideDodger = (edge) => edge >= dodgerLeftEdge && edge <= dodgerRightEdge;

  // collision when either rock edge is inside the dodger
  return isInsideDodger(rockLeftEdge) || isInsideDodger(rockRightEdge);
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = rock.style.top = 0;

  function moveRock() {
    if (checkCollision(rock)) {
      return endGame();
    }
    // remove rock when its bottom edge touches game bottom edge
    const rockBottom = top + 20;
    if (rockBottom >= GAME_HEIGHT) {
      return removeRock(rock);
    }
    // all is good to move rock downwards and repeat
    rock.style.top = `${top += MOVE_ROCKS_BY}px`;
    window.requestAnimationFrame(moveRock);
  }

  ROCKS.push(rock)
  GAME.appendChild(rock);

  // We should kick of the animation of the rock around here
  window.requestAnimationFrame(moveRock);

  // Finally, return the rock element you've created
  return rock
}

function removeRock(rock) {
  var indexOfRock = ROCKS.indexOf(rock);
  if (indexOfRock > -1) {
    ROCKS.splice(indexOfRock, 1);
    rock.remove();
  }
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  clearInterval(gameInterval);
  gameInterval = null;

  // http://stackoverflow.com/questions/9882284/looping-through-array-and-removing-items-without-breaking-for-loop
  var i = ROCKS.length;
  while (i--) {
    removeRock(ROCKS[i]);
  }

  window.removeEventListener('keydown', moveDodger);
  
  // HACK: for tests - https://github.com/learn-co-students/javascript-rock-dodger-bootcamp-prep-000/issues/192
  document.removeEventListener('keydown', moveDodger);

  alert('YOU LOSE!');
}

function moveDodger(e) {
  var handled = false;

  let key = e.detail || e.which;
  switch (key) {
    case LEFT_ARROW: moveDodgerLeft(); handled = true; break;
    case RIGHT_ARROW: moveDodgerRight(); handled = true; break;
  }

  if (handled) {
    e.preventDefault();
    e.stopPropagation();
  }
}

// HACK: tests look for these by name, but shove impl into single method
function moveDodgerLeft() { moveDodgerImpl(-MOVE_DODGER_BY); }
function moveDodgerRight() { moveDodgerImpl(MOVE_DODGER_BY); }

function moveDodgerImpl(moveByPx) {

  var dodgerLeftEdge = positionToInteger(DODGER.style.left)
  var dodgerRightEdge = dodgerLeftEdge + 40; // width defined in index.css

  // apply move only to current position and check bounds before actually moving
  dodgerLeftEdge += moveByPx;
  dodgerRightEdge += moveByPx;

  if (dodgerLeftEdge > 0 && dodgerRightEdge < GAME_WIDTH) {
    DODGER.style.left = `${dodgerLeftEdge}px`;
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
  rocksCreated = 0;
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
