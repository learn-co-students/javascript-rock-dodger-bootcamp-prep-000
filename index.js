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
    const dodgerRightEdge = dodgerLeftEdge + 40;    // The DODGER is 40 pixels wide

    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = rockLeftEdge + 20;    // The rock is 20 pixel's wide

    var collided = (
      ((rockLeftEdge <= dodgerLeftEdge) && 
      (rockRightEdge >= dodgerLeftEdge))
      ||
      ((rockLeftEdge >= dodgerLeftEdge) &&
      (rockRightEdge <= dodgerRightEdge))
      ||
      ((rockLeftEdge <= dodgerRightEdge) &&
      (rockRightEdge >= dodgerRightEdge))
      );
      
    return collided;
  }
  
  return;
}

function createRock(x) {
  var top = 0;
  
  const rock = document.createElement('div');
  rock.className = 'rock';
  rock.style.left = `${x}px`;
  rock.style.top = `${top}px`;

  function moveRock() {
    
    if (checkCollision(rock)) { endGame() }
    if (top === 380) { rock.remove(); return; }
    
    rock.style.top = `${top += 2}px`;
    
    window.requestAnimationFrame(moveRock);
  }

  window.requestAnimationFrame(moveRock);

  ROCKS.push(rock);
  
  return rock;
}

function endGame() {
  clearInterval(gameInterval);
  for (var i = 0; i < ROCKS.length; i++){
    ROCKS[i].remove();
  }
  window.removeEventListener('keydown', moveDodger);
  alert('YOU LOSE!');
}

function moveDodger(e) {
   if (e.which === LEFT_ARROW) { e.preventDefault(); e.stopPropagation(); moveDodgerLeft() }
   if (e.which === RIGHT_ARROW) {e.preventDefault(); e.stopPropagation(); moveDodgerRight() }
}

function moveDodgerLeft() {
  
   var left = positionToInteger(DODGER.style.left);
   
   function step() { DODGER.style.left = `${left -= 4}px`; }
   
   if (left > 0) {window.requestAnimationFrame(step);}
}

function moveDodgerRight() {
  var left = positionToInteger(DODGER.style.left);
   
   function step() { DODGER.style.left = `${left += 4}px`; }
   
   if (left < GAME_WIDTH - 40) {window.requestAnimationFrame(step);}
}

function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0;
}

function start() {
  window.addEventListener('keydown', moveDodger);

  START.style.display = 'none';

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
