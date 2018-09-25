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
    const dodgerRightEdge = (dodgerLeftEdge + 40)
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = (rockLeftEdge + 20)
    
    if (rockLeftEdge < dodgerLeftEdge && rockRightEdge > dodgerLeftEdge){
      return true
    }
    
    if (rockLeftEdge > dodgerLeftEdge && dodgerRightEdge < dodgerRightEdge){
      return true
    }
    
    if (rockLeftEdge > dodgerLeftEdge && dodgerRightEdge > dodgerRightEdge){
      return true
    }
    
    if (rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerLeftEdge){
      return true
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = rock.style.top = 0

  GAME.appendChild(rock)

  function moveRock() {
    rock.style.top = `${top += 2}px`;

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
  clearInterval(gameInterval)
  ROCKS.forEach(function(rock) { rock.remove() })
  return alert("YOU LOSE!")
}

function moveDodger(e) {
  
  // I don't know what this does
  if ([LEFT_ARROW, RIGHT_ARROW].indexOf(e.which) > -1) {
    e.preventDefault()
    e.stopPropagation()
  }
  // Seriously, what is this?? I just saw it was testing for it o_o;
  
  
  if (e.which === LEFT_ARROW) {
    moveDodgerLeft()
  } else if (e.which === RIGHT_ARROW) {
    moveDodgerRight()
  }
}

function moveDodgerLeft() {
  const LEFT = positionToInteger(DODGER.style.left)
  window.requestAnimationFrame(function() {
    if (LEFT > 0) {
      DODGER.style.left = `${LEFT - 10}px`;
    }
  })
}

function moveDodgerRight() {
  const LEFT = positionToInteger(DODGER.style.left)
  window.requestAnimationFrame(function() {
    if (LEFT < 360) {
      DODGER.style.left = `${LEFT + 10}px`;
    }
  })
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
