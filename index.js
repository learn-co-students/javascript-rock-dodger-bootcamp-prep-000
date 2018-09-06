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

    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left);

    const rockRightEdge = rockLeftEdge + 20;

    return ( ( ( (rockLeftEdge <= dodgerLeftEdge) && (rockRightEdge >= dodgerLeftEdge) ) || ( (rockLeftEdge >= dodgerLeftEdge) && (rockRightEdge <= dodgerRightEdge) ) || ( (rockLeftEdge <= dodgerRightEdge) && (rockRightEdge >= dodgerRightEdge) ) ) );
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
    rock.style.top = `${top += 2}px`;

    if (checkCollision(rock)) {
      endGame();
      return;
    }

    else if (top < GAME_HEIGHT - 20) {
      window.requestAnimationFrame(moveRock);
    }

    else if ( top >= GAME_HEIGHT - 20) {
      rock.remove();
    }
  }

  window.requestAnimationFrame(moveRock);

  ROCKS.push(rock);

  return rock;
}


function endGame() {
  window.removeEventListener('keydown', moveDodger);
  clearInterval(gameInterval);
  ROCKS.forEach(function(rock) { 
    rock.remove();
    });
  alert('YOU LOSE!');
  location.reload();
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
  let dodgerLeftEdge = positionToInteger(DODGER.style.left);

  function move() {
    DODGER.style.left = `${dodgerLeftEdge - 4}px`;
  }

  if (dodgerLeftEdge > GAME_WIDTH) {
    window.requestAnimationFrame(move);
  }
  else if (dodgerLeftEdge <= 0) {
    return;
  }
  window.requestAnimationFrame(move);
}


function moveDodgerRight() {
  let dodgerLeftEdge = positionToInteger(DODGER.style.left);

  function move() {
    DODGER.style.left = `${dodgerLeftEdge + 4}px`;
  }

  if (dodgerLeftEdge < GAME_WIDTH - 40) {
    window.requestAnimationFrame(move);
  }
  else if (dodgerLeftEdge >= GAME_WIDTH - 40) {
    return;
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
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)));
  }, 1000);
}
