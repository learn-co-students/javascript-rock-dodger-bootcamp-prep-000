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

console.log('DODGER: ', DODGER.style.right);

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {

  const top = positionToInteger(rock.style.top)

  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left) // 180

    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    const rockRightEdge = rockLeftEdge + 20;

    if (
      (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
      (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
      (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)
    ) {
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
    rock.style.top = `${top += 2}px`;
    if(checkCollision(rock) === true){
      endGame();
    } else if(top < 400){
      window.requestAnimationFrame(moveRock);
    } else {
      rock.remove()
    }
  }
  window.requestAnimationFrame(moveRock);
  console.log('createRock', createRock);
  ROCKS.push(rock);
  return rock;

}

function endGame() {
  clearInterval(gameInterval);
  for(i = 0; i < ROCKS.length; i++){
    ROCKS[i].remove()
  }
  document.removeEventListener('keydown', moveDodger);
  alert("YOU LOSE!");
}

function moveDodger(e) {
  if(e.which === 37){
    e.stopPropagation();
    e.preventDefault();
    moveDodgerLeft();

  } else if (e.which === 39) {
    e.stopPropagation();
    e.preventDefault();
    moveDodgerRight();

  }
}

function moveDodgerLeft() {
    let leftnumbers = DODGER.style.left.replace('px', '');
    let left = parseInt(leftnumbers, 10);
    if(left > 0){
      DODGER.style.left = `${left - 4}px`;
      // window.requestAnimationFrame(moveDodger);
    }
  }

function moveDodgerRight() {
    let rightnumbers = DODGER.style.left.replace('px', '');
    let right = parseInt(rightnumbers, 10);
    if(right < 360){
      DODGER.style.left = `${right + 4}px`;
      //window.requestAnimationFrame(moveDodger);
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

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
