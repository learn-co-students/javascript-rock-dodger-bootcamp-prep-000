
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37
const RIGHT_ARROW = 39
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

function checkCollision(rock) {

  const top = positionToInteger(rock.style.top)

  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    const rockRightEdge = rockLeftEdge + 20;

    if (((rockLeftEdge <= dodgerLeftEdge) && (rockRightEdge >= dodgerLeftEdge)) || ((rockLeftEdge >= dodgerLeftEdge) && (rockRightEdge <= dodgerRightEdge)) || ((rockLeftEdge <= dodgerRightEdge) && (rockRightEdge >= dodgerRightEdge))) {
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

     if (checkCollision(rock)) {
       endGame();
     }

     if (positionToInteger(rock.style.top) < 400) {
        top += 2;
        rock.style.top = `${top}px`;
        window.requestAnimationFrame(moveRock);

      } else {
        rock.remove();
      }
    }

    window.requestAnimationFrame(moveRock)

    ROCKS.push(rock)

    return rock
}

function endGame() {
  ROCKS.forEach(function(rock) {
    rock.remove();
  })
  window.clearInterval(gameInterval);
  window.removeEventListener('keydown', moveDodger)
  alert(`YOU LOSE!`)
}

function moveDodger(e) {
  if([LEFT_ARROW, RIGHT_ARROW].indexOf(e.which) > -1){
   e.preventDefault();
   e.stopPropagation();
 }
   if (e.which === LEFT_ARROW) {
     moveDodgerLeft()

   } else if (e.which === RIGHT_ARROW) {
     moveDodgerRight()
   }
}

function moveDodgerLeft() {

  function step() {
    var leftNumbers = DODGER.style.left.replace('px', '')
    var left = parseInt(leftNumbers, 10)

    if (left > 0) {
      DODGER.style.left = `${left - 4}px`
      window.requestAnimationFrame(step)
    }
  } window.requestAnimationFrame(step)
}

function moveDodgerRight() {

  function step() {
    var leftNumbers = DODGER.style.left.replace('px', '')
    var left = parseInt(leftNumbers, 10)

    if (left < 360) {
      DODGER.style.left = `${left + 4}px`
      window.requestAnimationFrame(step)
    }
  } window.requestAnimationFrame(step)
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
