
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

    if ((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) || (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) || (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)) {
      return true;
    }
  }

  if (top < 360){
    return false;
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
      if (top < 400){
        if (checkCollision(rock) === true){
          endGame();
      }
            else {
              window.requestAnimationFrame(moveRock);
            } 
  }
      else {
       rock.remove();
     }
  }
  
window.requestAnimationFrame(moveRock);
 
  ROCKS.push(rock);
  return rock;
}

function endGame() {
  clearInterval(gameInterval);
  for (i = 0; i <ROCKS.length; i++){
  ROCKS[i].remove();
  window.removeEventListener('keydown', moveDodger);
  }
  alert("YOU LOSE!");
}

function moveDodger(e) {
  const code = e.which;
  if ([LEFT_ARROW, RIGHT_ARROW].indexOf(code) > -1) {
    e.preventDefault();
    e.stopPropagation();
  }
  if (code === 37){
    moveDodgerLeft();
  }
  if (code === 39){
    moveDodgerRight();
  }
}

function moveDodgerLeft() {
  window.requestAnimationFrame(function (){
  var left = positionToInteger(DODGER.style.left);
    if (left > 0) {
    DODGER.style.left = `${left - 4}px`;
  }
});
}

function moveDodgerRight() {
  window.requestAnimationFrame(function (){
  var left = positionToInteger(DODGER.style.left);
   if (left < 360) {
    DODGER.style.left = `${left + 4}px`;
  }
});
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