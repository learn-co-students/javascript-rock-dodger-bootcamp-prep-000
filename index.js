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
  
  const top = positionToInteger(rock.style.top);
  if (top > 360) {
    
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20;

    if ( ((rockLeftEdge <= dodgerLeftEdge) && (rockRightEdge >= dodgerLeftEdge)) || ((rockLeftEdge >= dodgerLeftEdge) && (rockRightEdge <= dodgerRightEdge)) || ((rockLeftEdge <= dodgerRightEdge) && (rockRightEdge >= dodgerRightEdge)) ) return true;
    return false;
    
  }
}

function createRock(x) {
  const rock = document.createElement('div')
  
  rock.className = 'rock';
  rock.style.left = `${x}px`;

  // Hmmm, why would we have used `var` here?
  var top = 0;

  rock.style.top = top;

  GAME.appendChild(rock);

  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
   
     if (checkCollision(rock)) endGame();

    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */
     
     if (top < 380){
       rock.style.top = `${top += 2}px`;
       window.requestAnimationFrame(moveRock);
     }
     
     else rock.remove();
     
  }

  // We should kick off the animation of the rock around here.
  window.requestAnimationFrame(moveRock);

  ROCKS.push(rock);
  return rock;
}

function endGame() {
  clearInterval(gameInterval);
  for (let i=0; i<ROCKS.length; i++) ROCKS[i].remove();
  window.removeEventListener('keydown', moveDodger);
  alert("YOU LOSE!");
}

function moveDodger(e) {
  if (e.keyCode === LEFT_ARROW || e.which === LEFT_ARROW) {
    moveDodgerLeft();
    e.preventDefault();
    e.stopPropagation();
  }
  else if (e.keyCode === RIGHT_ARROW || e.which === RIGHT_ARROW) {
    moveDodgerRight();
    e.preventDefault();
    e.stopPropagation();
  }
}

function moveDodgerLeft() {
  var leftNumbers = dodger.style.left.replace('px', '')
  var left = parseInt(leftNumbers, 10)
  
  function step() {
    dodger.style.left = `${left - 4}px`
  }
 
  if (left > 0) {
    window.requestAnimationFrame(step);
  }
}

function moveDodgerRight() {
  var leftNumbers = dodger.style.left.replace('px', '')
  var left = parseInt(leftNumbers, 10)
  
  function step() {
    dodger.style.left = `${left + 4}px`
  }
 
  if (left < 360 ) {
    window.requestAnimationFrame(step);
  }
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
