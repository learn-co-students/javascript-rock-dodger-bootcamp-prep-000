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
const DODGER_WIDTH = 40;
const OBJECT_HEIGHT = 20;
const ROCK_WIDTH = 20;


var gameInterval = null;

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {
  // implement me!
  // use the comments below to guide you!
  const top = positionToInteger(rock.style.top);
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = dodgerLeftEdge + DODGER_WIDTH ;
    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = rockLeftEdge + ROCK_WIDTH ;

    if (
              (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
              (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
              (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)
        ) {
      return true;
    } 
    return false;
  }
}

function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = `${x}px`;
  var top = 0;
  rock.style.top = top;

  GAME.appendChild(rock)

  function moveRock() {
 
    rock.style.top = `${top += 2}px`;
 
    if (checkCollision(rock)){
      return endGame();
    }
    
    if (top < GAME_HEIGHT){
      
      window.requestAnimationFrame(moveRock);
    } else {
      rock.remove();
    }
  }
  window.requestAnimationFrame(moveRock);
  ROCKS.push(rock);
  return rock;
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  window.clearInterval(gameInterval);
  for (var i = 0; i < ROCKS.length; i ++){
    ROCKS[i].remove();
  }
  window.removeEventListener('keydown', moveDodger);
  console.log("GAME OVER MAN!");
  
}

function moveDodger(e) {
  
  if (e.which == LEFT_ARROW){
    e.stopPropagation();
    e.preventDefault();
    moveDodgerLeft();
  }
  
  if (e.which == RIGHT_ARROW){
    e.preventDefault();
    e.stopPropagation();
    moveDodgerRight();
  }

}

function moveDodgerLeft() {
    left = positionToInteger(DODGER.style.left);
    if (left > 0){
      dodger.style.left = `${left - 4}px`;
      window.requestAnimationFrame(moveDodgerLeft);
    }
}

function moveDodgerRight() {
    left = positionToInteger(DODGER.style.left)
    if (left < GAME_WIDTH - DODGER_WIDTH){
      dodger.style.left = `${left + 4}px`;
      window.requestAnimationFrame(moveDodgerRight);
    }
}

function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0;
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none';

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)));
  }, 1000);
}

start();
