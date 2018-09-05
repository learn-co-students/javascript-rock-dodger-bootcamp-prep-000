const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('game');
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const ROCKS = [];
const START = document.getElementById('start');

var gameInterval = null;

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top);
  
  if (top >= 360) {
    
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    
    const dodgerRightEdge = dodgerLeftEdge + 40;
    
    const rockLeftEdge = positionToInteger(rock.style.left);

    const rockRightEdge = rockLeftEdge + 20;

    if ((rockLeftEdge < dodgerLeftEdge && rockRightEdge > dodgerLeftEdge) || (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) || (rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerRightEdge)) {
      return true;
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = `${x}px`;

  var top = 0;

  rock.style.top = `${top}px`;
  
  GAME.appendChild(rock);
  
  function moveRock() {
    if (checkCollision(rock)) {
      return endGame();
    }
    if (top < 380) {
      top += 2;
      rock.style.top = `${top}px`;
      window.requestAnimationFrame(moveRock);
    }
    if (top == 380) {
      GAME.removeChild(rock);
      ROCKS.pop();
    }
  }
  
  const moveInterval = setInterval(moveRock(), 1000);

  ROCKS.push(rock);

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
  ROCKS.forEach(function(rock){rock.remove()});
  document.removeEventListener('keydown', moveDodger);
  alert("YOU LOSE!");
}

function moveDodger(e) {
  if (e.which === LEFT_ARROW) {
    e.preventDefault();
    e.stopPropagation();
    moveDodgerLeft();
  }
  if (e.which === RIGHT_ARROW) {
    e.preventDefault();
    e.stopPropagation();
    moveDodgerRight();
  }
}

function moveDodgerLeft() {
  var left = positionToInteger(DODGER.style.left);
  function leftStep() {
    if (left >= 4) {
      DODGER.style.left = `${left -= 4}px`;
    }
  }
  window.requestAnimationFrame(leftStep);
}

function moveDodgerRight() {
  var left = positionToInteger(DODGER.style.left);
  function rightStep() {
    if (left <= 356) {
      DODGER.style.left = `${left += 4}px`;
    }
  }
  window.requestAnimationFrame(rightStep);
}

function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0;
}

function start() {
  window.addEventListener('keydown', moveDodger);

  START.style.display = 'none';

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() * (GAME_WIDTH - 20)));
  }, 1000);
}