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
    
    return ((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) || (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) || (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge))
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`
  rock.style.top = 0
  
  GAME.appendChild(rock)
  
  function moveRock() {
    
    if (checkCollision(rock)) {
      return endGame()
    } else if (positionToInteger(rock.style.top) > GAME_HEIGHT) {
      rock.remove()
    } else {
      rock.style.top = `${positionToInteger(rock.style.top) + 2}px`
      window.requestAnimationFrame(moveRock)
    }
  }
  
  window.requestAnimationFrame(moveRock)
  ROCKS.push(rock)
  return rock
}

function endGame() {
  clearInterval(gameInterval)
  
  ROCKS.forEach((rock) => {
    rock.remove()
  })
  
  window.removeEventListener('keydown', moveDodger)
  alert("YOU LOSE!")
  location.reload()
  
}

function moveDodger(e) {
  if (e.which === LEFT_ARROW || e.which === RIGHT_ARROW) {
    e.preventDefault()
    e.stopPropagation()
  }
  if (e.which === LEFT_ARROW) {moveDodgerLeft()}
  if (e.which === RIGHT_ARROW) {moveDodgerRight()}
}

function moveDodgerLeft() {
  let position = positionToInteger(DODGER.style.left)
  if (position > 0) {
    window.requestAnimationFrame(() => {
      DODGER.style.left = `${position - 4}px`})
   }
}

function moveDodgerRight() {
  let position = positionToInteger(DODGER.style.left)
  if (position < GAME_WIDTH - 40) {
     window.requestAnimationFrame(() => {
       DODGER.style.left = `${position + 4}px`
     })
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
