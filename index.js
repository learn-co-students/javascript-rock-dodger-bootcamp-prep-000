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
  // implement me!
  // use the comments below to guide you!
  const top = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = rockLeftEdge + 20;

    return (
        (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
        (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
        (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)
      )
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

      if (top > GAME_HEIGHT) {
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
  START.innerHTML = 'Play again?'
  START.style.display = 'inline'

  return alert('YOU LOSE!')
}

function moveDodger(e) {
  // implement me!
  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */
   const code = e.which

   if ([LEFT_ARROW, RIGHT_ARROW].indexOf(code) > -1) {
     e.preventDefault()
     e.stopPropagation()
   }

   if (code === LEFT_ARROW) {
     moveDodgerLeft()
   } else if (code === RIGHT_ARROW) {
     moveDodgerRight()
   }


}

function moveDodgerLeft() {
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   window.requestAnimationFrame(function() {
   const left = positionToInteger(DODGER.style.left)

   if (left > 0) {
     DODGER.style.left = `${left - 4}px`;
   }
 })
}

function moveDodgerRight() {
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   window.requestAnimationFrame(function() {
    const left = positionToInteger(DODGER.style.left)

    if (left < 360) {
      DODGER.style.left = `${left + 4}px`;
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
