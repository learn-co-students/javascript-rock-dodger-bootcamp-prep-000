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
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = positionToInteger(DODGER.style.left)+ 40;
    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = positionToInteger(rock.style.left)+ 20;
    if (((rockLeftEdge<=dodgerLeftEdge)&&(rockRightEdge>=dodgerLeftEdge)) || ((rockLeftEdge>=dodgerLeftEdge)&& (rockRightEdge<=dodgerRightEdge)) || ((rockLeftEdge<=dodgerRightEdge)&&(rockRightEdge>=dodgerRightEdge))
      ) {
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
  top= positionToInteger(rock.style.top,10);
  function moveRock() {
    rock.style.top = `${top += 2}px`;
    if (top < GAME_HEIGHT-20) {
      window.requestAnimationFrame(moveRock);
    } else if (top >GAME_HEIGHT-20) {
      GAME.removeChild(rock);
    }
    if (checkCollision(rock)) {
     return endGame();
    }
   }
  window.requestAnimationFrame(moveRock);
  ROCKS.push(rock);
  return rock;
}

function endGame() {
  clearInterval(gameInterval);
  for (let i=0;i<ROCKS.length;i++) {
    ROCKS[i].remove();
  }
}

function moveDodger(e) {
  // implement me!
  if (e.which===LEFT_ARROW) {
    e.preventDefault();
    e.stopPropagation();
    moveDodgerLeft();
  } else if (e.which===RIGHT_ARROW) {
    e.preventDefault();
    e.stopPropagation();
    moveDodgerRight();
  }
}

function moveDodgerLeft() {
  var left = positionToInteger(dodger.style.left, 10);
  if (left > 0) {
    dodger.style.left = `${left - 4}px`;
  }
}

function moveDodgerRight() {
  var right = positionToInteger(dodger.style.left, 10);
  if (right < GAME_WIDTH-40) {
    dodger.style.left = `${right + 4}px`;
  }
}

function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0;
}

function start() {
  window.addEventListener('keydown', moveDodger);
  START.style.display = 'none';
  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)));
  }, 1000);
}
