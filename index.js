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

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top);

  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20;

  if ((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
      (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
      (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)
    ){
      return true;
    }
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

     top += 2;
     rock.style.top = `${top}px`
     
     if(checkCollision(rock)){
        endGame();
     }
     if (top < GAME_HEIGHT){
       window.requestAnimationFrame(moveRock);
     }
     if (top >= GAME_HEIGHT) {
       GAME.removeChild(rock);
     }

  }

  window.requestAnimationFrame(moveRock);

  ROCKS.push(rock)

  return rock
}

function endGame() {
  alert("YOU LOSE!");
  clearInterval(gameInterval);
  game.remove(ROCKS);
  ROCKS.forEach(function(rock){
    rock.remove();
    
  })
}

function moveDodger(e) {
l
     if(e.which == LEFT_ARROW){
       e.preventDefault();
       e.stopPropagation();
       moveDodgerLeft();
     } else if (e.which == RIGHT_ARROW) {
       e.preventDefault();
       e.stopPropagation();
       moveDodgerRight();
   }
}

function moveDodgerLeft() {
  // implement me!
  if(positionToInteger(DODGER.style.left) > 0){
    window.requestAnimationFrame(function(){
    DODGER.style.left = (positionToInteger(DODGER.style.left) - 4) + 'px';
    });
  }
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
}

function moveDodgerRight() {
  // implement me!
  if(positionToInteger(DODGER.style.left) + 40 < GAME_WIDTH){
    window.requestAnimationFrame(function(){
    DODGER.style.left = (positionToInteger(DODGER.style.left) + 4) + 'px';
    });
  }
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
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
