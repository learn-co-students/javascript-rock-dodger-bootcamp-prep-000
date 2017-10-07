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

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge? - Check
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge? - Check
    const rockRightEdge = rockLeftEdge + 20;

    if ( (rockLeftEdge < dodgerLeftEdge) && (rockRightEdge >= dodgerLeftEdge) ||
         (rockLeftEdge >= dodgerLeftEdge) && (rockRightEdge <= dodgerRightEdge) ||
         (rockLeftEdge <= dodgerRightEdge) && (rockRightEdge > dodgerRightEdge)
       ) {
      return true
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = 0

  rock.style.top = top;

  GAME.appendChild(rock);

  (function moveRock() {

     if (checkCollision(rock) == true) {
       return endGame();
     }
     else if (positionToInteger(rock.style.top) == 380) {
       GAME.removeChild(rock);
     }
     else if (positionToInteger(rock.style.top) < 380) {
      rock.style.top = `${top += 2}px`;
      return window.requestAnimationFrame(moveRock);
     }
  })();

  ROCKS.push(rock)

  return rock
}

function endGame() {
  clearInterval(gameInterval);
  for (let rock of ROCKS) {
    rock.remove();
  }
  window.removeEventListener("keydown", moveDodger);
  alert("YOU LOSE!");
}

function moveDodger(e) {
    let key = parseInt(e.which || e.detail);

    if (key === LEFT_ARROW) {
       e.preventDefault();
       e.stopPropagation();
       moveDodgerLeft();
     }
     if (key === RIGHT_ARROW) {
       e.preventDefault();
       e.stopPropagation();
       moveDodgerRight();
     }
}

function moveDodgerLeft() {
   window.requestAnimationFrame(function goLeft() {
     if (positionToInteger(DODGER.style.left) > 0) {
       let left = positionToInteger(DODGER.style.left);
       DODGER.style.left = `${left - 4}px`;
     }
   });
}

function moveDodgerRight() {
   window.requestAnimationFrame(function goRight() {
     let left = positionToInteger(DODGER.style.left);
     if (left <= 356) {
       DODGER.style.left = `${left + 4}px`;
     }
   });
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
