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
  if (top > 360) { // set the width of our dodger and rock
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = positionToInteger(DODGER.style.left)+40;
    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = positionToInteger(rock.style.left)+20;

    if ( (rockLeftEdge <= dodgerLeftEdge) && (rockRightEdge >= dodgerLeftEdge) ){
      return true;
    }else if( (rockLeftEdge >= dodgerLeftEdge) && (rockRightEdge <= dodgerRightEdge) ){
      return true;
    }else if( (rockLeftEdge <= dodgerRightEdge) && (rockRightEdge >= dodgerRightEdge) ){
      return true;
    }else{
      return false;
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
    
  }

  // We should kick of the animation of the rock around here

  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
  ROCKS.push(rock);

  // Finally, return the rock element you've created
  return rock;
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
}

function moveDodger(e) {
  e.which === 37
    ? moveDodgerLeft()
    : e.which === 39
      ? moveDodgerRight()
      : null;
}
function moveDodgerLeft() {
   // (mabye 4 pixels?). Use window.requestAnimationFrame()!
   
}
function moveDodgerRight() {
  // (mabye 4 pixels?). Use window.requestAnimationFrame()!
}





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
