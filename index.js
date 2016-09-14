
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

    if ((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) || (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) || (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)) {
      return true
    } else {
      return false
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock';
  rock.style.left = `${x}px`;
  rock.style.top = '0px';
  GAME.appendChild(rock);

  var top = 0;

  function moveRock() {
    if (top >= 400) {
      rock.remove();
    } else if (checkCollision(rock)) {
      endGame();
    } else {
      rock.style.top = `${top += 2}px`;
      window.requestAnimationFrame(moveRock);
    }
  }

  window.requestAnimationFrame(moveRock);

  ROCKS.push(rock)
  return rock
}

function endGame() {
  document.removeEventListener('keydown', moveDodger);
  window.clearInterval(gameInterval);
  ROCKS.forEach(function(rock){
    rock.remove();
  });
  alert("YOU LOSE!");
}

function moveDodger(e) {
//  var act = {37: moveDodgerLeft, 38: moveDodgerRight};

   if (e.which == 37 || e.which == 39) {
      e.preventDefault();
      e.stopPropagation();
      e.which == 37 ? moveDodgerLeft() : false;
      e.which == 39 ? moveDodgerRight() : false;
   }
}

function moveDodgerLeft() {
  var move = 5;

  function stepLeft() {
    if (positionToInteger(DODGER.style.left) > 0) {
      DODGER.style.left = `${positionToInteger(DODGER.style.left) - 1}px`;
    } else {
      return
    }

    move-- > 0 ? window.requestAnimationFrame(stepLeft) : false;
  }

  window.requestAnimationFrame(stepLeft);
}

function moveDodgerRight() {
  var move = 5;

  function stepRight() {
    if (positionToInteger(DODGER.style.left) < 360) {
      DODGER.style.left = `${positionToInteger(DODGER.style.left) + 1}px`;
    } else {
      return
    }

    move-- > 0 ? window.requestAnimationFrame(stepRight) : false;
  }

  window.requestAnimationFrame(stepRight);
}

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
