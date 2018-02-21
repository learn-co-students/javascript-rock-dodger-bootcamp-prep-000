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

var gameInterval = null;

function checkCollision(rock) {
  
  const top = positionToInteger(rock.style.top);

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);

    // DODGER is 40px 
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left);

    // rock is 20px
    const rockRightEdge = rockLeftEdge + 20;

    /**
      * There's been a collision if one of three things is true:
      * 1. rockLeftEdge < dodgerLeftEdge,
      *    and rockRightEdge > dodgerLeftEdge
      * 2. rockLeftEdge > dodgerLeftEdge,
      *    and rockRightEdge < dodgerRightEdge
      * 3. The rockLeftEdge < dodgerRightEdge,
      *    and rockRightEdge > dodgerRightEdge
      */
    if ( (rockLeftEdge < dodgerLeftEdge &&
          rockRightEdge > dodgerLeftEdge) ||
         (rockLeftEdge >= dodgerLeftEdge && 
          rockRightEdge <= dodgerRightEdge) ||
         (rockLeftEdge < dodgerRightEdge &&
          rockRightEdge > dodgerRightEdge)
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

  /**
   * This function moves the rock 2px
   */
  function moveRock(rock) {
    
    function step() {
      rock.style.top = `${top -= 2}px`;
      
      if(checkCollision(rock)) {
         endGame();
      } else if (top >= GAME_HEIGHT) {
        GAME.removeChild(rock);
        ROCKS.shift();
      } else {
        window.requestAnimationFrame(step);
      }
    }
    window.requestAnimationFrame(step);  
  }

  moveRock(rock);

  ROCKS.push(rock);

  return rock;
}

function endGame() {
  clearInterval(gameInterval);
  var rocks = document.getElementsByClassName('rock');
  while(rocks[0]) {
    GAME.removeChild(rocks[0]);
    ROCKS.shift();
  }
  window.removeEventListener("keydown", moveDodger);
  alert("YOU LOSE!");
}

var paras = document.getElementsByClassName('hi');

function moveDodger(e) {
  if (e.which === LEFT_ARROW) {
    moveDodgerLeft();
    e.preventDefault();
    e.stopPropagation();
  }
  
  if (e.which === RIGHT_ARROW) {
    moveDodgerRight();
    e.preventDefault();
    e.stopPropagation();
  }
}

function moveDodgerLeft() {
  var left = positionToInteger(dodger.style.left);
 
  function step() {
    if (left > 0) {
      dodger.style.left = `${left - 4}px`;
    }
  }
  window.requestAnimationFrame(step);
}

function moveDodgerRight() {
  var left = positionToInteger(dodger.style.left);
 
  function step() {
    if (left < (GAME_WIDTH - 40)) {
      dodger.style.left = `${left + 4}px`;
    }
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

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)));
  }, 1000);
}
