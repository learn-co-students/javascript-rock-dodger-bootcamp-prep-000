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
  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  const dodgerLeftEdge = positionToInteger(DODGER.style.left)
  const dodgerRightEdge = dodgerLeftEdge + 40;
    
  const rockLeftEdge = positionToInteger(rock.style.left)
  const rockRightEdge = rockLeftEdge + 20;
 
  if (top > 360) {

    if (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) {
      // 1. The rock's left edge is < the DODGER's left edge,
      //    and the rock's right edge is > the DODGER's left edge;
      return true
    }
    if (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) {
      // 2. The rock's left edge is > the DODGER's left edge,
      // and the rock's right edge is < the DODGER's right edge;
      return true
    }
    if (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge) {
      // 3. The rock's left edge is < the DODGER's right edge,
      //   and the rock's right edge is > the DODGER's right edge
      return true
    }
    return false

  }
  return false  
}


function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = 0

  rock.style.top = top

  GAME.appendChild(rock)

  window.requestAnimationFrame(moveRock)

  function moveRock() {

    checkCollision()
    function move() {
      rock.style.top = `${top += 2}px`
      if (top <= 358) {
        window.requestAnimationFrame(move)
      }
      else if (top >= 360 && checkCollision(rock) === true) {
        endGame()
        
      }
      else if (top >= 360) {
        window.requestAnimationFrame(move)
      }
      else if (top === 380) {
        
      }
    }
    window.requestAnimationFrame(move)

    ROCKS.push(rock)

    
  }
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
  totalRocks = document.getElementsByClassName('rock')
  for (let i = 0; i < totalRocks.length; i++) {
    totalRocks[i].remove()
    
  }
  window.removeEventListener('keydown', moveDodger)
  alert("YOU LOSE")
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

  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */
}

function moveDodgerLeft() {
  var left = positionToInteger(DODGER.style.left)
   function move() {
    DODGER.style.left = `${left -= 4}px`
    if (left > 0) {
      window.requestAnimationFrame(move)
    }
  }
  if (left >= 4) {
    window.requestAnimationFrame(move)
  }

  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
}

function moveDodgerRight() {
  var left = positionToInteger(DODGER.style.left)
  function move() {
    DODGER.style.left = `${left += 4}px`
    if (left < 360) {
      window.requestAnimationFrame(move)
    }
  }
  if (left <= 356) {
    window.requestAnimationFrame(move)
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

  gameInterval = setInterval(function () {
    createRock(Math.floor(Math.random() * (GAME_WIDTH - 20)))
  }, 1000)
}
