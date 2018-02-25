const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')
const SPEED = 10
const ROCK_SPEED = 2

let gameInterval = null


function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)
  // rocks are 20px high, DODGER is 20px high, GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20;


    if (  /* 1. The rock's left edge is < the DODGER's left edge, and the rock's right edge is > the DODGER's left edge; */
          ((rockLeftEdge <= dodgerLeftEdge) && (rockRightEdge >= dodgerLeftEdge)) ||
          /* 2. The rock's left edge is > the DODGER's left edge, and the rock's right edge is < the DODGER's right edge; */
          ((rockLeftEdge >= dodgerLeftEdge) && (rockRightEdge <= dodgerRightEdge)) ||
          /* 3. The rock's left edge is < the DODGER's right edge, and the rock's right edge is > the DODGER's right edge */
          ((rockLeftEdge <= dodgerRightEdge) && (rockRightEdge >= dodgerRightEdge))
        ) {
            return true
          }
  } else {
    return false
  }
}

function createRock(x) {
  const rock = document.createElement('div')
  // console.log("Creating a rock...")
  rock.className = 'rock'
  rock.style.left = `${x}px`
  rock.style.top = '0px'

  /* Append rock to GAME */
  GAME.appendChild(rock)

  // Add the rock to ROCKS so that we can remove all rocks when there's a collision
  ROCKS.push(rock)

  // Moves the rock ROCK_SPEED number of pixels at a time
  function moveRock() {
    let rockTop = positionToInteger(rock.style.top)

    function drop() {
      // If a rock collides with the DODGER, we should call endGame()
      if (checkCollision(rock)) {
        endGame()
        return
      }

      if (rockTop < GAME_HEIGHT) {
        rock.style.top = `${rockTop += ROCK_SPEED}px`
        window.requestAnimationFrame(drop)
      } else { /* rock hit bottom and remove it from DOM*/
        rock.remove()
      }
    }

    window.requestAnimationFrame(drop)
  }

  moveRock()

  return rock
}

 /* End the game by clearing `gameInterval`, removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener. Finally, alert "YOU LOSE!" to the player. */
function endGame() {
  alert("YOU LOSE!")
  clearInterval(gameInterval)
  // Make sure all rocks are removed from the DOM
  for(let i = 0; i < ROCKS.length; i++) {
    ROCKS[i].remove()
  }

  window.removeEventListener('keydown', moveDodger)
}

function moveDodger(e) {
  if (e.which === LEFT_ARROW) {
    moveDodgerLeft()
    e.preventDefault()
    e.stopPropagation()
  } else if (e.which === RIGHT_ARROW) {
    moveDodgerRight()
    e.preventDefault()
    e.stopPropagation()
  }
}

function moveDodgerLeft() {
  const left = positionToInteger(DODGER.style.left)

  function moveLeft() {
    DODGER.style.left = `${left - SPEED}px`
  }

  if (left > 0) {
    window.requestAnimationFrame(moveLeft)
  }
}

function moveDodgerRight() {
  /*This function should move DODGER to the right using window.requestAnimationFrame() */
  const left = positionToInteger(DODGER.style.left)

  function moveRight() {
    dodger.style.left = `${left + SPEED}px`
  }

  if ((left + 40) < GAME_WIDTH) {
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
