
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
  const top = positionToInteger(rock.style.top);
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = rockLeftEdge + 20;
    if ((rockLeftEdge <= dodgerLeftEdge && rockRightEdge > dodgerLeftEdge) || (rockLeftEdge >= dodgerLeftEdge && rockRightEdge < dodgerRightEdge) || (rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerRightEdge)) {
      return true;
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')
  rock.className = 'rock';
  rock.style.left = `${x}px`;
  var top = 0;
  rock.style.top = top;
  GAME.appendChild(rock);

  function moveRock() {
    rock.style.top = `${top += 2}px`;
    if (checkCollision(rock)) {
      return endGame();
    }
    if (top < 400) {
        window.requestAnimationFrame(moveRock);
      } else {
        rock.remove();
        ROCKS.shift();
      }
  }
  window.requestAnimationFrame(moveRock);
  ROCKS.push(rock);
  return rock;
}


function endGame() {
  clearInterval(gameInterval);
  ROCKS.forEach(function(rock) {
    rock.remove()
  })
  window.removeEventListener('keydown', moveDodger)
  START.style.display = ""
  DODGER.style.left = '180px'
  return alert("YOU LOSE!");
}


function moveDodger(e) {
    if (e.which === LEFT_ARROW) {
      e.stopPropagation();
      moveDodgerLeft();
      e.preventDefault();
  }
    if (e.which === RIGHT_ARROW) {
      e.stopPropagation();
      moveDodgerRight();
      e.preventDefault();
    }
  }

function moveDodgerLeft() {
  var left = positionToInteger(DODGER.style.left);
  if (left < 4) {
    DODGER.style.left = '0px';
    return;
  } else {
  function step() {
    DODGER.style.left = `${left -= 4}px`;
    if (left > 0) {
      window.requestAnimationFrame(step);
    }
  }
}
  window.requestAnimationFrame(step);
}

function moveDodgerRight() {
  var right = positionToInteger(DODGER.style.left);
  if (right > 356) {
    DODGER.style.left = '360px';
    return;
  } else {
  function step() {
    DODGER.style.left = `${right += 4}px`;
    if (right < 360) {
      window.requestAnimationFrame(step);
    }
  }
}
  window.requestAnimationFrame(step);
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
