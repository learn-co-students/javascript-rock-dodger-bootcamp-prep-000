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
  const top = positionToInteger(rock.style.top)

  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = positionToInteger(DODGER.style.left)+40;

    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = positionToInteger(rock.style.left)+20;

    if (rockLeftEdge<=dodgerLeftEdge && rockRightEdge>=dodgerLeftEdge) {
      return true
    }else if (rockLeftEdge>=dodgerLeftEdge && rockRightEdge<=dodgerRightEdge) {
      return true
    }else if (rockLeftEdge<=dodgerRightEdge && rockRightEdge>=dodgerLeftEdge) {
      return true
    }else {
      return false
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = 0

  rock.style.top = `${top}px`

  GAME.appendChild(rock)

  function moveRock() {
    if(checkCollision(rock)){
      endGame();
    } else {
      top = top + 2;
      rock.style.top = `${top}px`;
      if(top<380){
        window.requestAnimationFrame(moveRock);
      } else {
        GAME.removeChild(rock);
      }
    }
  }
  window.requestAnimationFrame(moveRock)
  ROCKS.push(rock)
  return rock
}

function endGame() {
  clearInterval(gameInterval);

  for(let i=0; i<ROCKS.length; i++){
    ROCKS[i].remove();
  }

  window.removeEventListener('keydown', moveDodger);
  alert('YOU LOSE! \nPress "OK" to try again!');
  location.reload();
}

function moveDodger(e) {

   if(e.which == LEFT_ARROW){
     e.preventDefault();
     e.stopPropagation();
     moveDodgerLeft();
   } else if(e.which == RIGHT_ARROW){
     e.preventDefault();
     e.stopPropagation();
     moveDodgerRight();
   }
}

function moveDodgerLeft() {
   var dodgerLeftEdge = positionToInteger(DODGER.style.left);
   function step(){
     DODGER.style.left = `${dodgerLeftEdge-=4}px`
   }
   if(dodgerLeftEdge >= 4){
     window.requestAnimationFrame(step);
   }
}

function moveDodgerRight() {
   var dodgerLeftEdge = positionToInteger(DODGER.style.left);
   var dodgerRightEdge = positionToInteger(DODGER.style.left)+40;
   function step(){
     DODGER.style.left = `${dodgerLeftEdge +=4}px`
   }
   if(dodgerRightEdge <= 400){
     window.requestAnimationFrame(step);
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
  window.addEventListener('keydown', moveDodger);

  START.style.display = 'none';

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000);
}
