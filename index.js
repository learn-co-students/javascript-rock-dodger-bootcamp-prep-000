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

  if (top + 40 > GAME_HEIGHT) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = positionToInteger(DODGER.style.left) + 40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = positionToInteger(rock.style.left) + 20;
    
    let colLeft = rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge
    let colMid = rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge
    let colRight = rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge

    return colLeft || colMid || colRight
  }
}


function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  
  var top = 0
  rock.style.top = top
  rock.style.left = `${x}px`

  GAME.appendChild(rock)
  
  function moveRock() {
    rock.style.top = `${top += 1}px`
    
    if (checkCollision(rock)) return endGame()
    
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
  window.removeEventListener('keydown', moveDodger)
  alert("YOU LOSE!")
}


function moveDodger(e) {
  if (e.which === LEFT_ARROW) {
    e.preventDefault()
    e.stopPropagation()
    moveDodgerLeft()
  } else if (e.which === RIGHT_ARROW) {
    e.preventDefault()
    e.stopPropagation()
    moveDodgerRight()
  }
}


function moveDodgerLeft() {
  window.requestAnimationFrame(function() {
    let left = positionToInteger(DODGER.style.left)
    
    if (left > 0) DODGER.style.left = `${left - 4}px`
  })
}


function moveDodgerRight() {
  window.requestAnimationFrame(function() {
    let left = positionToInteger(DODGER.style.left)
    
    if (left + 40 < GAME_WIDTH) DODGER.style.left = `${left + 4}px`
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
    createRock(Math.floor(Math.random() * (GAME_WIDTH - 20)))
  }, 1000)
}
