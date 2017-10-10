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
const SPEED = 10
const ROCK_SPEED = 2
const DODGER_WIDTH = DODGER.scrollWidth
const DODGER_HEIGHT = DODGER.scrollHeight

var gameInterval = null


function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)
  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + DODGER_WIDTH;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20;

    if (  /* There's been a collision if one of three things is true:
          * 1. The rock's left edge is < the DODGER's left edge,
          *    and the rock's right edge is > the DODGER's left edge; */
          (rockLeftEdge <= dodgerLeftEdge) && (rockRightEdge >= dodgerLeftEdge) ||
          /* 2. The rock's left edge is > the DODGER's left edge,
          *    and the rock's right edge is < the DODGER's right edge; */
          (rockLeftEdge >= dodgerLeftEdge) && (rockRightEdge <= dodgerRightEdge)
          ||
          /* 3. The rock's left edge is < the DODGER's right edge,
          *    and the rock's right edge is > the DODGER's right edge */
          (rockLeftEdge <= dodgerRightEdge) && (rockRightEdge >= dodgerRightEdge)
        ) {
            console.log("COLLISION!!")
            return true
          }
  } else {
    return false
  }
}

function createRock(x) {
  const rock = document.createElement('div')
  console.log("Creating a rock...")
  rock.className = 'rock'
  rock.style.left = `${x}px`

  var rockHeight = 0

  rock.style.top = `${rockHeight}px`

  /* Append rock to GAME */
  GAME.append(rock)

  // Add the rock to ROCKS so that we can remove all rocks when there's a collision
  ROCKS.push(rock)

  //Moves the rock ROCK_SPEED number of pixels at a time
  function moveRock() {
    var rockTop = positionToInteger(rock.style.top)

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

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  alert("YOU LOSE!")
  var a = document.getElementsByClassName('rock')
  clearInterval(gameInterval)
  //Every time an element is removed, a new element becomes the first element
  while(a[0]) {
    a[0].parentNode.removeChild(a[0])
  }
}

function moveDodger(e) {
   /* This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed.*/
  document.addEventListener('keydown', function(e) {
    if (e.which === LEFT_ARROW) {
      moveDodgerLeft()
    } else if(e.which === RIGHT_ARROW) {
      moveDodgerRight()
    }
  })
}

function moveDodgerLeft() {
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
  var left = positionToInteger(DODGER.style.left)

  function moveLeft() {
    DODGER.style.left = `${left - SPEED}px`
  }

  if (left > 0) {
    window.requestAnimationFrame(moveLeft)
  }
}

function moveDodgerRight() {
  /*This function should move DODGER to the right (maybe 4 pixels?). Use window.requestAnimationFrame()! */
  const WIDTH = 40  //Figure out how to derive this without hard-coding
  var left = positionToInteger(DODGER.style.left)

  function moveRight() {
    dodger.style.left = `${left + SPEED}px`
  }

  if (left + WIDTH < GAME_WIDTH) {
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
  }, 10000)
}
