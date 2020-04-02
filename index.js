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

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top);

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = rockLeftEdge + 20;

    //if (false 
    if (rockLeftEdge < dodgerLeftEdge && 
        rockRightEdge > dodgerLeftEdge){
      return true;
    }
      else if(rockLeftEdge > dodgerLeftEdge &&
              rockRightEdge < dodgerRightEdge){
        return true;
      }
      else if(rockLeftEdge < dodgerRightEdge &&         
              rockRightEdge > dodgerRightEdge){
        return true;
      }
      else if(rockLeftEdge >= dodgerLeftEdge &&
              rockRightEdge <= dodgerRightEdge){
        return true;        
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
  moveRock();

  function moveRock() {
      rock.style.top = `${top += 2}px`;
 
      if (checkCollision(rock) === true){
          return endGame();
        }
      if (top < 400) {
        window.requestAnimationFrame(moveRock);
        }
      else {
        rock.remove();
      } 
    }
      
  ROCKS.push(rock);
  
  return rock;
}

function endGame() {
  clearInterval(gameInterval);
  ROCKS.forEach(function(rock) { rock.remove() })
  window.removeEventListener('keydown', moveDodger);
  alert('YOU LOSE!');
}

function moveDodger(e) {
    if (e.which === LEFT_ARROW) {
      moveDodgerLeft();
      e.preventDefault();
      e.stopPropagation();
    }
    else if (e.which === RIGHT_ARROW){
      moveDodgerRight();
      e.preventDefault();
      e.stopPropagation();
    }
   
}

function moveDodgerLeft() {
  var leftNumbers = DODGER.style.left.replace('px', '');
  var left = parseInt(leftNumbers, 10);
  
  function stepLeft(){
    DODGER.style.left = `${left -= 4}px`;
  }
   
  if (left > 0) {
    window.requestAnimationFrame(stepLeft);
  }
}

function moveDodgerRight() {
  var rightNumbers = DODGER.style.left.replace('px', '');
  var left = parseInt(rightNumbers, 10);
  
  function stepRight(){
     DODGER.style.left = `${left += 4}px`;
  }
   
  if (left < 360) {
    window.requestAnimationFrame(stepRight);
  }
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
