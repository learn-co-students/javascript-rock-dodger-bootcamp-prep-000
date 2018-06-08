const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('game');
const SCORE = document.getElementById('score');
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const ROCKS = [];
const START = document.getElementById('start');

var gameInterval = null;

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top);

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = rockLeftEdge + 20;

    /**
     * There's been a collision if one of three things is true:
     * 1. The rock's left edge is < the DODGER's left edge,
     *    and the rock's right edge is > the DODGER's left edge;
     * 2. The rock's left edge is > the DODGER's left edge,
     *    and the rock's right edge is < the DODGER's right edge;
     * 3. The rock's left edge is < the DODGER's right edge,
     *    and the rock's right edge is > the DODGER's right edge
   */
    if (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) {
      return true;
    } else if (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) {
      return true;
    } else if (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge) {
      return true;
    } else {
      return false;
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = `${x}px`;

  var top = 0;
  rock.style.top = `${top}px`;

  // I'm prepending instead of appending so that the SCORE element sits
  // on top of it.
  GAME.prepend(rock);

  function moveRock() {
    if (checkCollision(rock)) {
      endGame();
    } else if (top < GAME_HEIGHT) {
      top += 2;
      rock.style.top = `${top}px`;
      window.requestAnimationFrame(moveRock);
    } else {
      rock.remove();
      SCORE.innerHTML = parseInt(SCORE.innerHTML) + 1;
    }
  }

  window.requestAnimationFrame(moveRock);
  ROCKS.push(rock);

  return rock;
}

function endGame() {
  clearInterval(gameInterval);

  for (var i = 0; i < ROCKS.length; i++) {
    ROCKS[i].remove();
  }

  window.removeEventListener('keydown', moveDodger);
  alert(`You lose. Your score was ${SCORE.innerHTML}.`);

  location.reload();
}

function moveDodger(e) {
  if (e.which === LEFT_ARROW) {
     moveDodgerLeft();
     e.preventDefault();
     e.stopPropagation();
   } else if (e.which === RIGHT_ARROW) {
     moveDodgerRight();
     e.preventDefault();
     e.stopPropagation();
   }
}

function moveDodgerLeft() {
  function step() {
    const newPosition = positionToInteger(DODGER.style.left) - 4;
    if (newPosition < 0) {
      return;
    }
    DODGER.style.left = `${newPosition}px`;
  }

   window.requestAnimationFrame(step);
}

function moveDodgerRight() {
  function step() {
    const newPosition = positionToInteger(DODGER.style.left) + 4;
    if (newPosition > GAME_WIDTH - 40) {
      return;
    }
    DODGER.style.left = `${newPosition}px`;
  }

   window.requestAnimationFrame(step);
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
  SCORE.style.display = 'block';

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)));
  }, 1000);
}
