/**
 * not my code, need to read through this to figure out why mine isnt working**
 * 
 *
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37
const RIGHT_ARROW = 39
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)

  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge+40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge+20;

    return (
      (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
      (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
      (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge))
  }
}

function createRock(x) {
  const rock = document.createElement('div')
  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = 0
  rock.style.top = `${top}px`

  GAME.appendChild(rock);

  function moveRock() {
    if(checkCollision(rock)===true){
      endGame();
    }
    else if (top < GAME_HEIGHT-20) {
      top+=4;
      rock.style.top = `${top}px`
      window.requestAnimationFrame(moveRock);
    }
    else if (top >= GAME_HEIGHT-20) {
      GAME.removeChild(rock);
      ROCKS.shift();
    }
  }

  moveRock();

  ROCKS.push(rock);
  return rock;
}

function endGame() {
  while(ROCKS.length > 0){
    GAME.removeChild(ROCKS[0]);
    ROCKS.shift();
  }

  clearInterval(gameInterval);
  window.removeEventListener('keydown', moveDodger);
  alert("YOU LOSE!");
  START.innerHTML = 'Play again?'
  START.style.display = 'inline'
}

function moveDodger(e) {
    if (e.which === LEFT_ARROW) {
      e.stopPropagation();
      e.preventDefault();
      moveDodgerLeft();
    }
    else if(e.which === RIGHT_ARROW){
      e.stopPropagation();
      e.preventDefault();
      moveDodgerRight();
    }
  }

function moveDodgerLeft() {
  const left = positionToInteger(dodger.style.left);
  if (left > 0) {
    dodger.style.left = `${left - 2}px`
    window.requestAnimationFrame(moveDodgerLeft);
  }
}

function moveDodgerRight() {
  const left = positionToInteger(dodger.style.left);
  if (left < GAME_WIDTH - 40){
    dodger.style.left = `${left + 2}px`;
    window.requestAnimationFrame(moveDodgerRight);
  }
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
