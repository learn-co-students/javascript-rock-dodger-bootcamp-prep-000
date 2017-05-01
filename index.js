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


function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)

  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20;

    if (
      (rockLeftEdge <= dodgerLeftEdge) && (rockRightEdge >= dodgerLeftEdge) ||
			(rockLeftEdge >= dodgerLeftEdge) && (rockRightEdge <= dodgerRightEdge) ||
			(rockLeftEdge <= dodgerRightEdge) && (rockRightEdge >= dodgerRightEdge)
    ) {
      return true;
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div');
  rock.className = 'rock'
  rock.style.left = `${x}px`
  var top = 0;
  rock.style.top = top;
  if (gameInterval != null) {
  GAME.appendChild(rock);

  function moveRock() {
    if (checkCollision(rock)) {
      return endGame();
    }
    rock.style.top = `${top += 2}px`;
    if (top < 380) {
      window.requestAnimationFrame(moveRock);
    }
    if (top === 380) {
      GAME.removeChild(rock)
    }
  }
  window.requestAnimationFrame(moveRock);
  ROCKS.push(rock);
  return rock;
  }
}

function endGame() {
  gameInterval = null;
  var allRocks = document.getElementsByClassName('rock');
  while (allRocks[0]) {
    allRocks[0].parentNode.removeChild(allRocks[0])
  }
  window.removeEventListener('keydown', moveDodger);
  window.alert("YOU LOSE!");
}

function moveDodger(e) {
  var key = e.which;
  if (key === LEFT_ARROW) {
    moveDodgerLeft();
  } else if (key === RIGHT_ARROW) {
    moveDodgerRight();
  }
}

function moveDodgerLeft() {
  var leftEdge = positionToInteger(DODGER.style.left);
  var moveBy = 4;
  var endPosition = leftEdge - moveBy;
  if (endPosition >= 0) {
    moveDodgerTo(endPosition)
  }
}

function moveDodgerRight() {
  var leftEdge = positionToInteger(DODGER.style.left);
  var moveBy = 4;
  var endPosition = leftEdge + moveBy;
  var dodgerWidth = 40;
  var endPositionRight = endPosition + dodgerWidth;
  if (endPositionRight <= GAME_WIDTH) {
    moveDodgerTo(endPosition)
  }
}

function moveDodgerTo(endPosition) {
  window.requestAnimationFrame(function() {
    DODGER.style.left = endPosition + 'px'
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
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
