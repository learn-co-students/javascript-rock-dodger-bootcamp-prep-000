//httpsev
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
    const rockRightEdge = rockLeftEdge + 20;

    if ((rockLeftEdge<dodgerLeftEdge && rockRightEdge>dodgerLeftEdge) || 
    (rockLeftEdge>=dodgerLeftEdge && rockRightEdge<=dodgerRightEdge) || 
    (rockLeftEdge<dodgerRightEdge && rockRightEdge>dodgerRightEdge)) {
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

  // Hmmm, why would we have used `var` here?
  var top = 0

  rock.style.top = top
  GAME.appendChild(rock)

  function moveRock() {
    rock.style.top = `${top += 2}px`
    if (checkCollision(rock) === true) {
      endGame()
    } else if (top < 380) {
      window.requestAnimationFrame(moveRock)
    } else if (top >= 380) {
      GAME.removeChild(rock)
      ROCKS.shift();
    }
     
  }

moveRock();

  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
  ROCKS.push(rock)

  // Finally, return the rock element you've created
  return rock
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  clearInterval(gameInterval);

ROCKS.forEach(function(element) {
  element.remove()
});

  window.removeEventListener('keydown', moveDodger)
  alert('YOU LOSE!')
}

function moveDodger(e) {
  
  if (e.which === LEFT_ARROW) {
    e.stopPropagation()
    e.preventDefault()
    moveDodgerLeft()
  } else if (e.which === RIGHT_ARROW) {
    e.stopPropagation()
    e.preventDefault()
    moveDodgerRight()
  }
  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */
}

function moveDodgerLeft() {
  var leftNumbers = dodger.style.left.replace('px', '')
  var left = parseInt(leftNumbers, 10)
 
  function step() {
    dodger.style.left = `${left - 4}px`
  }
  
  if (left > 0) {
  window.requestAnimationFrame(step)
  }
}  

function moveDodgerRight() {
  // implement me!
  var leftNumbers = dodger.style.left.replace('px', '')
  var left = parseInt(leftNumbers, 10)
 
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
