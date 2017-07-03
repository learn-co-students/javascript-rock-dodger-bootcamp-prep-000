/**
 * Don't change these constants!
 */
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

    if ((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
    (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
    (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)) {
      return true
    } else {
      return false
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = 0
  rock.style.top = top
  GAME.appendChild(rock)

    function moveRock() {
      rock.style.top = `${top += 2}px`

      if (checkCollision(rock)) {
          return endGame()
      }

      if (top < GAME_HEIGHT) {
          window.requestAnimationFrame(moveRock)
      } else {
          rock.remove()
      }

    }

  window.requestAnimationFrame(moveRock)
  ROCKS.push(rock)
  return rock
}

function endGame() {
  clearInterval(gameInterval);
  document.removeEventListener('keydown',moveDodger)
  for (let i = 0;i <ROCKS.length; i++){
    ROCKS[i].remove()
  };
  // START.innerHTML = 'Play again? Cmd R'
  // START.style.display = 'inline'
  // start();
  return alert('You lose!');
}

function moveDodger(e) {
  if (e.which === LEFT_ARROW){
    e.preventDefault()
    e.stopPropagation()
    moveDodgerLeft(e)
  } else if (e.which === RIGHT_ARROW){
    e.preventDefault()
    e.stopPropagation()
    moveDodgerRight(e)
  }
}

function moveDodgerLeft() {
  var leftNumbers = DODGER.style.left.replace('px', '')
  var left = parseInt(leftNumbers, 10)

  function moveLeft() {

    if (left > 0) {
      DODGER.style.left = `${left - 4}px`
    }
  }
  window.requestAnimationFrame(moveLeft)
}

function moveDodgerRight() {
  var leftNumbers = DODGER.style.left.replace('px', '')
  var left = parseInt(leftNumbers, 10)

  function moveRight() {

    if (left < 360) {
      DODGER.style.left = `${left + 4}px`
    }
  }
  window.requestAnimationFrame(moveRight)
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
