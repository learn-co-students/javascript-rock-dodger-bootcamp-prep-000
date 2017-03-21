const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')
const animate = window.requestAnimationFrame;

var gameInterval = null

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top);
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = positionToInteger(DODGER.style.left) + 40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = positionToInteger(rock.style.left) + 20;
    if (rockLeftEdge < dodgerLeftEdge && rockRightEdge > dodgerLeftEdge || rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge || rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerRightEdge) {
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
  GAME.appendChild(rock);

    function moveRock() {
      rock.style.top = `${top += 2}px`;
      if (checkCollision()){
        return endGame();
      }
      if (top >= GAME_HEIGHT) {
       rock.remove();
      }
      else {
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
  clearInterval(gameInterval);
  alert("YOU LOSE!");
  ROCKS.forEach(rock => rock.remove())
}
function moveDodgerLeft() {
  var left = positionToInteger(dodger.style.left);
    if (left > 0){
      dodger.style.left = `${left - 4}px`;
      }
}
function moveDodgerRight() {
  var left = positionToInteger(dodger.style.left);
    if (left < 360){
      dodger.style.left = `${left + 4}px`;
      }
}
function moveDodger(e) {
    if (e.which === LEFT_ARROW){
      e.preventDefault();
      moveDodgerLeft();
      window.requestAnimationFrame(moveDodgerLeft);
      e.stopPropagation();
    }
    else if (e.which === RIGHT_ARROW){
      e.preventDefault();
      moveDodgerRight();
      window.requestAnimationFrame(moveDodgerRight);
      e.stopPropagation();
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
