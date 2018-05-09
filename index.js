/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('game');
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37; // use e.which!
const RIGHT_ARROW = 39; // use e.which!
const ROCKS = [];
const START = document.getElementById('start');
var points = 0;

var gameInterval = null;

var scorecounter = document.createElement('div');
scorecounter.innerText = `Rocks Dodged: ${points}`;
document.querySelector('body').appendChild(scorecounter);

function checkCollision() {
  var rockLeftEdge = parseInt(document.querySelector('.rock').style.left);
  var DODGERLeftEdge = parseInt(document.querySelector('#dodger').style.left);
  var rockRightEdge = rockLeftEdge + 20;
  var DODGERRightEdge = DODGERLeftEdge + 40;

  if (rockLeftEdge < DODGERLeftEdge && rockRightEdge > DODGERLeftEdge) {
    return true;
  }
  if (rockLeftEdge > DODGERLeftEdge && rockRightEdge < DODGERRightEdge) {
    return true;
  }
  if (rockLeftEdge < DODGERRightEdge && rockRightEdge > DODGERLeftEdge) {
    return true;
  }
}

function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = `${x}px`;
  var top = 0;
  rock.style.top = top;

  document.querySelector('#game').appendChild(rock);

  function moveRock() {
    topc = parseInt(document.querySelector('.rock').style.top);
    
    if (topc > 360 && checkCollision() === true) {
      endGame();
    }
    
    if (topc < 380) {
      rock.style.top = `${top += 2}px`;
      window.requestAnimationFrame(moveRock);
    }

    if (topc === 380) {
      document.querySelector('.rock').remove();
      window.requestAnimationFrame(moveRock);
      points++
      scorecounter.innerText = `Rocks Dodged: ${points}`
      if (points === 50) {
        gameInterval = setInterval(function() {
        createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)));}, 500);
        alert("WARP SPEED!");
      }
    }
  }
  
  window.requestAnimationFrame(moveRock);
 
  ROCKS.push(rock);

  return rock;
}


function endGame() {
  clearInterval(gameInterval);
  
  for (let i=0; i < ROCKS.length; i++) {
    ROCKS.shift();
    document.querySelector('.rock').remove();
  }
  
  document.querySelector('.rock').remove();
  
  window.removeEventListener('keydown', moveDodger);
  
  alert("YOU LOSE!");
}

function moveDodger(e) {
  if (e.which === 37) {
    moveDodgerLeft();
    e.preventDefault();
    e.stopPropagation();
  }
  if (e.which === 39) {
    moveDodgerRight();
    e.preventDefault();
    e.stopPropagation();
  }
}

function moveDodgerLeft() {
  x = parseInt(DODGER.style.left);
  function step() {
    if (x > 0) {
    DODGER.style.left = `${x -= 2}px`;
    window.requestAnimationFrame(step);
    }
  }
  if (x > 0) {
    window.requestAnimationFrame(step);
  }
}

function moveDodgerRight() {
  x = parseInt(DODGER.style.left);
  function step() {
    DODGER.style.left = `${x += 2}px`;
    if (x < 360) {
    window.requestAnimationFrame(step);
    }
  }
  if (x < 360) {
    window.requestAnimationFrame(step);
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
