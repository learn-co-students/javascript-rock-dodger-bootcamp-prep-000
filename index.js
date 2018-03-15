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
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = positionToInteger(DODGER.style.left) + 40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = positionToInteger(rock.style.left) + 20;

    if (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) {
      return true
    }
    else if (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) {
      return true
    }
    else if (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge) {
      return true
    }
    else {
      return false
    }
  }
  else {
    return false
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
    if (top < 400) {
      if (checkCollision(rock) === false) {
      window.requestAnimationFrame(moveRock)
      }
      else {
        endGame()
      }
    }
  }
  
  window.requestAnimationFrame(moveRock)



    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */
  

  // We should kick of the animation of the rock around here

  ROCKS.push(rock)

  return rock
}

function endGame() {
  clearInterval(gameInterval)
  for (i = 0; i < ROCKS.length; i++) {
    ROCKS[i].remove()
  }
  window.removeEventListener('keydown', (moveDodger))
  alert("YOU LOSE!")
}

function moveDodger(e) {
    if (e.which === LEFT_ARROW) {
      e.preventDefault()
    e.stopPropagation()
      moveDodgerLeft()
    }
    else if (e.which === RIGHT_ARROW) {
      e.preventDefault()
    e.stopPropagation()
      moveDodgerRight()
    }
}

function moveDodgerLeft() {
  var dodgerLeftEdge = positionToInteger(DODGER.style.left)
  if (dodgerLeftEdge > 0) {
    DODGER.style.left = `${dodgerLeftEdge -= 4}px`
    window.requestAnimationFrame(moveDodgerLeft)
  }
}

function moveDodgerRight() {
  var dodgerLeftEdge = positionToInteger(DODGER.style.left)
  if (dodgerLeftEdge < 360) {
    DODGER.style.left = `${dodgerLeftEdge += 4}px`
    window.requestAnimationFrame(moveDodgerRight)
  }
}

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


