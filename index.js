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

  const top = positionToInteger(rock.style.top)

  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    const dodgerRightEdge = positionToInteger(DODGER.style.left) + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    const rockRightEdge = positionToInteger(rock.style.left) + 20;

    if  (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerRightEdge)
         {
      return true
    } else if (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) {
      return true
    } else if (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge) {
      return true
    } else if (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) {
   return true
 }
  }
}


function createRock(x) {
  const rock = document.createElement('div')
  ROCKS.push(rock);
  rock.className = 'rock'
  rock.style.left = `${x}px`
  var top = 0
  rock.style.top = top
  game.appendChild(rock);


function moveRock() {
     function step() {
     rock.style.top = `${top += 2}px`;
     if (checkCollision(rock)){
         endGame()
        }
     else if (top < 380) {
        window.requestAnimationFrame(step);
      }
     else {
     rock.remove()
     ROCKS.pop() 
     }
  } window.requestAnimationFrame(step);
}

  window.requestAnimationFrame(moveRock);
  return rock;
}

function endGame() {
  clearInterval(gameInterval);

 for (let i = 0, l = ROCKS.length; i < l; i++) {
    document.getElementsByClassName("rock")[0].remove()
  }
  alert("YOU LOSE!");
  removeEventListener('keydown', moveDodger);
}

function moveDodger(e) {
  if (e.which === LEFT_ARROW) {
    moveDodgerLeft();
  }
  else if (e.which === RIGHT_ARROW) {
    moveDodgerRight();
  }
}

function moveDodgerLeft() {
  var leftNumbers = DODGER.style.left.replace("px", "");
  var left = parseInt(leftNumbers, 10);
  if (left > 0) {
    DODGER.style.left = `${left - 4}px`;
  }
}

function moveDodgerRight() {
  var leftNumbers = DODGER.style.left.replace("px", "");
  var left = parseInt(leftNumbers, 10);
  if (left < 360) {
    DODGER.style.left = `${left + 4}px`;
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
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
