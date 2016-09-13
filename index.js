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
 * All of your work should happen below.
 */


function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20;

    if ((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) || (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) || (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)) {
      return true
    } else {
      return false
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')
  var top = 0;

  rock.className = 'rock'
  rock.style.left = `${x}px`
  rock.style.top = `${top}px`;
  GAME.appendChild(rock);

  function moveRock() {
    top += 2;
    rock.style.top = `${top}px`;

    if (rock.parentNode && checkCollision(rock)) {
      endGame();
      top = 400;
    }

    if (top < 400) {
      window.requestAnimationFrame(moveRock);
    } else {
      rock.remove();
    }
  }

  // We should kick of the animation of the rock around here
  window.requestAnimationFrame(moveRock);
  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
  ROCKS.push(rock)
  return rock
}

function endGame() {
  window.removeEventListener('keydown', moveDodger)
  window.clearInterval(gameInterval);
  ROCKS.forEach(function(rock){
    rock.remove();
  });
  alert("YOU LOSE!");
}

function moveDodger(e) {
   e.preventDefault();
   e.stopPropagation();
   if (e.which == 37) {
     moveDodgerLeft();
   }
   if (e.which == 39) {
     moveDodgerRight()
   }
}

function moveDodgerLeft() {
  var move = 4;

  function stepLeft() {
    if (positionToInteger(DODGER.style.left) > 0) {
      DODGER.style.left = `${positionToInteger(DODGER.style.left) - 1}px`;
    } else {
      return
    }

    move--;
    move > 0 ? window.requestAnimationFrame(stepLeft) : false;
  }

  window.requestAnimationFrame(stepLeft);
}

function moveDodgerRight() {
  var move = 4;

  function stepRight() {
    if (positionToInteger(DODGER.style.left) < 360) {
      DODGER.style.left = `${positionToInteger(DODGER.style.left) + 1}px`;
    } else {
      return
    }

    move--;
    move > 0 ? window.requestAnimationFrame(stepRight) : false;
  }

  window.requestAnimationFrame(stepRight);
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
