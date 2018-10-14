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
    
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    const rockRightEdge = rockLeftEdge +20;

   return (
     rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerLeftEdge ||
     rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge ||
     rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerRightEdge )
  }                
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = 0;

  rock.style.top = top

  GAME.appendChild(rock);


function moveRock() {
  if (checkCollision(rock) === true){
    endGame();
  }
  else if (top < GAME_HEIGHT - 20){
 top+=4;
 rock.style.top = `${top}px`
 window.requestAnimationFrame(moveRock);
  }
  else if (top >= GAME_HEIGHT -20) {
    GAME.removeChild(rock)
    ROCKS.shift()
   /* for (i = 0; i < ROCKS.length; i++) {
    ROCKS[i].remove();
  } */
  }
}

moveRock();

  ROCKS.push(rock);
  return rock;
}


function endGame() {
  for (i = 0; i < ROCKS.length; i++) {
    ROCKS[i].remove();
  }
  clearInterval(gameInterval);
  window.removeEventListener('keydown', moveDodger);
  alert("YOU LOSE!");
  START.innerHTML = 'Play again?'
  START.style.display = 'inline'
}


function moveDodger(e) { 
   if (e.which === LEFT_ARROW) {
    e.stopPropagation();
    e.preventDefault()
    moveDodgerLeft();
  }
  
  else if (e.which === RIGHT_ARROW) {
    e.stopPropagation();
    e.preventDefault();
    moveDodgerRight();
  }
}

  
function moveDodgerLeft() {
  var leftNumbers = DODGER.style.left.replace('px', ' ') 
  var left = parseInt(leftNumbers, 10)
  
  if (left >= 2) {
      DODGER.style.left = `${left - 2}px`
      window.requestAnimationFrame(moveDodgerLeft)
  }
}

function moveDodgerRight() {
  var rightNumbers = DODGER.style.left.replace('px', ' ') 
  var right = parseInt(rightNumbers, 10)
  
  if (right >= -500 && right < GAME_WIDTH - 40) {
    DODGER.style.left = `${right + 2}px`
    window.requestAnimationFrame(moveDodgerRight)
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
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))} ,  1000) 
}



