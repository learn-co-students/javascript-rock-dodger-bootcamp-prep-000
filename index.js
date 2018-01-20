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

    const dodgerRightEdge = positionToInteger(DODGER.style.left) + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    const rockRightEdge = positionToInteger(rock.style.left) + 20;

    if (
      (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
      (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) || 
      (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)) {
      return true
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Hmmm, why would we have used `var` here?
  var top = 0

  rock.style.top = top

  GAME.appendChild(rock)

  function moveRock(el) {
    function step() {
      el.style.top = `${top += 2}px`
      
      if (checkCollision(el)) {
        endGame()
      } else if (top < 380) {
        window.requestAnimationFrame(step)
      } else if (top === 380) {
        GAME.removeChild(rock)
      }
    }
    window.requestAnimationFrame(step)
    
  }

  moveRock(rock)

  ROCKS.push(rock)

  return rock
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  clearInterval(gameInterval)
  window.removeEventListener('keydown', moveDodger)
  for (let i = 0; i < ROCKS.length; i++) {
    if (ROCKS[i].className === 'rock') {
      ROCKS[i].remove()
    }
  }
  return alert('YOU LOSE!')
}

function moveDodger(e) {
  if(e.which === LEFT_ARROW) {
    moveDodgerLeft()
    e.preventDefault()
    e.stopPropagation()
  } else if (e.which === RIGHT_ARROW) {
    moveDodgerRight()
    e.preventDefault()
  }
}

function moveDodgerLeft() {
  var dodgerLeftEdge = dodger.style.left.replace('px', '')
  var left = parseInt(dodgerLeftEdge, 10)
  
  function step() {
    dodger.style.left = `${left - 4}px`
  }
  
  if (left > 0) {
    window.requestAnimationFrame(step)
  }
}

function moveDodgerRight() {
  var dodgerLeftEdge = dodger.style.left.replace('px', '')
  var left = parseInt(dodgerLeftEdge, 10)
  
  function step() {
    dodger.style.left = `${left + 4}px`
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
