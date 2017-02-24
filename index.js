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

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20;

    if ((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge ||
        rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge ||
        rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)) {
      return true
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = 0
  rock.style.top = `${top}px`

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
  clearInterval(gameInterval)

  ROCKS.forEach(function(rock) { rock.remove() })

  document.removeEventListener('keydown', moveDodger)

  return alert("YOU LOSE!")
}

function moveDodger(e) {
   if (e.which == LEFT_ARROW) {
     moveDodgerLeft()
     e.stopPropagation()
     e.preventDefault()
   } else if (e. which == RIGHT_ARROW) {
     moveDodgerRight()
     e.preventDefault()
     e.stopPropagation()
   }
}

function moveDodgerLeft() {
   var left = positionToInteger(dodger.style.left)
   if (left > 0) {
     function moveLeft() {
       dodger.style.left = `${left -= 4}px`
     }
     window.requestAnimationFrame(moveLeft)
 }
}

function moveDodgerRight() {
   var right = positionToInteger(dodger.style.left)
   if (right < 360) {
     function moveRight() {
       var right = positionToInteger(dodger.style.left)
       dodger.style.left= `${right += 4}px`
     }
   window.requestAnimationFrame(moveRight)
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
