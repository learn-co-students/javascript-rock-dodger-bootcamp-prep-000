const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('game');
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const ROCKS = [];
const START = document.getElementById('start');

var gameInterval = null;
var endGameCalled = 0;

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top);
  if (top > GAME_HEIGHT - 40) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = rockLeftEdge + 20;
    if (rockRightEdge < dodgerLeftEdge) {
      return false;
    } else if (rockLeftEdge > dodgerRightEdge) {
      return false;
    } else {
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
     if (endGameCalled === 1) {
       return;
     }
     rock.style.top = `${top + 2}px`;
     top += 2;
     if (checkCollision(rock)) {
       return endGame();
     }
     if (top < GAME_HEIGHT) {
       window.requestAnimationFrame(moveRock);
     } else {
       GAME.removeChild(rock);
     }
  }
  window.requestAnimationFrame(moveRock);
  ROCKS.push(rock);
  return rock;
}

function endGame() {
  endGameCalled = 1;
  clearInterval(gameInterval);
  ROCKS.forEach(function(rock) {
    rock.remove();
  });
  window.removeEventListener('keydown', moveDodger);
  alert(`YOU LOSE!`);
}

function moveDodger(e) {
   if (e.which === LEFT_ARROW) {
     e.preventDefault();
     e.stopPropagation();
     moveDodgerLeft();
   } else if (e.which === RIGHT_ARROW) {
     e.preventDefault();
     e.stopPropagation();
     moveDodgerRight();
   }
}

function moveDodgerLeft() {
   var left = positionToInteger(DODGER.style.left);
   function move() {
     if (left > 0) {
       DODGER.style.left = `${left - 5}px`;
     }
   }
   window.requestAnimationFrame(move);
}

function moveDodgerRight() {
   var left = positionToInteger(DODGER.style.left);
   function move() {
     if (left + 40 < GAME_WIDTH) {
       DODGER.style.left = `${left + 5}px`;
     }
   }
   window.requestAnimationFrame(move);
}

function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0;
}

function start() {
  window.addEventListener('keydown', moveDodger);
  START.style.display = 'none';
  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))}, 1000);
}
