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
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {
  // implement me!
  // use the comments below to guide you!
  const top = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);

    const dodgerRightEdge = dodgerLeftEdge+40;

    const rockLeftEdge = positionToInteger(rock.style.left);

    const rockRightEdge = rockLeftEdge+20;

    if (((rockLeftEdge<dodgerRightEdge)&&(rockRightEdge>dodgerLeftEdge)) || ((rockLeftEdge>dodgerLeftEdge)&&(rockRightEdge<dodgerRightEdge)) || ((rockLeftEdge<dodgerRightEdge)&&(rockRightEdge>dodgerRightEdge))) {
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
moveRock();

 
  function moveRock() {
    top+=2;
    rock.style.top=`${top}px`;
    
    if(checkCollision(rock)) {
      endGame();
       if(top>=400) {
       rock.remove();
      }
    } else {
      window.requestAnimationFrame(moveRock);
    }
  }

window.requestAnimationFrame(moveRock);

  ROCKS.push(rock);
  return rock;
}


function endGame() {
  clearInterval(gameInterval);
  ROCKS.forEach((r)=> {r.remove()});
  window.removeEventListener('keydown', moveDodger);
  alert('YOU LOSE!');
}

function moveDodger(e) {
  if(e.which === LEFT_ARROW) {
    e.preventDefault();
    e.stopPropagation();
    moveDodgerLeft();
  }
     else if(e.which === RIGHT_ARROW) {
      e.preventDefault();
      e.stopPropagation();
      moveDodgerRight();
    }
  else {
    
  }
}

function moveDodgerLeft() {
  var currentPos = positionToInteger(DODGER.style.left);
  function moveLeft() {
    if(currentPos>=4) {
    DODGER.style.left=`${currentPos-4}px`;
  }
}
window.requestAnimationFrame(moveLeft);
  
}

function moveDodgerRight() {
 var currentPos = positionToInteger(DODGER.style.left);
 function moveRight() {
   if(currentPos<=356) {
     DODGER.style.left=`${currentPos+4}px`;
   }
 }
 window.requestAnimationFrame(moveRight);
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
