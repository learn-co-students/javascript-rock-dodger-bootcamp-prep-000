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
  const top = positionToInteger(rock.style.top)

  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = positionToInteger(DODGER.style.left) + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = positionToInteger(rock.style.left) + 20;

    if (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) {
      return true
    } else if (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) {
      return true
    } else if (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge) {
      return true
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')
  let top = 0

  rock.className = 'rock'
  rock.style.left = `${x}px`
  rock.style.top = `${top}px`

  GAME.appendChild(rock)

  function moveRock() {

     function step() {
       return rock.style.top = `${top += 2}px`
     }

     if (checkCollision(rock)) {
       endGame()
     } else if (top < GAME_HEIGHT) {
      //  window.requestAnimationFrame(moveRock)
       window.requestAnimationFrame(step)
     } else {
       rock.remove()
     }
  }

  moveRock()
  ROCKS.push(rock)

  return rock
}

function endGame() {
  clearInterval(gameInterval)
  for (let i = 0, len = ROCKS.length; i < len; i++) {
    ROCKS[i].remove()
  }
  window.removeEventListener('keydown', moveDodger)
  alert('YOU LOSE!')
}

function moveDodger(e) {
  if (e.which === LEFT_ARROW) {
     moveDodgerLeft()
     e.stopPropagation()
     e.preventDefault()
  }
  if (e.which === RIGHT_ARROW) {
    moveDodgerRight()
    e.stopPropagation()
    e.preventDefault()
  }
}

function moveDodgerLeft() {
  let leftNumbers = DODGER.style.left.replace('px', '')
  let left = parseInt(leftNumbers, 10)

  function step() {
    DODGER.style.left = `${left -= 4}px`
  }

  if (left > 0) {
    window.requestAnimationFrame(step)
  }
}

function moveDodgerRight() {
  let leftNumbers = DODGER.style.left.replace('px', '')
  let left = parseInt(leftNumbers, 10)

  function step() {
    DODGER.style.left = `${left += 4}px`
  }

  if (left < 360) {
    window.requestAnimationFrame(step)
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
