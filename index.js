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

// used to prevent re-collision after game restarts
var ended = false

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)

  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20;

    if ((rockLeftEdge < dodgerLeftEdge && rockRightEdge > dodgerLeftEdge) ||
        (rockLeftEdge > dodgerLeftEdge && rockRightEdge < dodgerRightEdge) ||
        (rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerRightEdge)) {
      return true
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = `${x}px`;

  var top = 0;
  rock.style.top = top;
  GAME.append(rock);

  function moveRock() {
     if (checkCollision(rock)) {
       endGame();
       ended = true;
     }

     if (ended) {
       top = 1000
     }

     top += 2;
     rock.style.top = `${top}px`;

     if (top < 380) {
       window.requestAnimationFrame(moveRock);
     } else {
       if (GAME.contains(rock)) {
         GAME.removeChild(rock);
       }
     }
  }

  window.requestAnimationFrame(moveRock);
  ROCKS.push(rock);

  return rock;
}

function endGame() {
  clearInterval(gameInterval);
  let rocks = document.querySelectorAll('.rock');

  for (let i = 0; i < rocks.length; i++) {
    GAME.removeChild(rocks[i]);
  }

  ROCKS.length = 0;
  window.removeEventListener('keydown', moveDodger);
  alert('YOU LOSE!');
  START.style.display = 'inline'
}

function moveDodger(e) {
   if (e.which === LEFT_ARROW) {
     window.requestAnimationFrame(moveDodgerLeft);
   } else if (e.which === RIGHT_ARROW) {
     window.requestAnimationFrame(moveDodgerRight);
   }
 }

function returnLeftPosition() {
  return positionToInteger(DODGER.style.left)
}

function moveDodgerLeft() {
  var left = returnLeftPosition();

   left -= 4;

   if (left - 4 < 0) {
     left = 0;
   }

   DODGER.style.left = `${left}px`;
}

function moveDodgerRight() {
  var left = returnLeftPosition();

   left += 4;

   // 44 includes dodger's width of 40
   if (left + 44 > GAME_WIDTH) {
     left = GAME_WIDTH - 40;
   }

   DODGER.style.left = `${left}px`;
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

  ended = false;
  DODGER.style.left = '180px'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
