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
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = rockLeftEdge + 20;

    if ((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
        (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
        (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)) {
      return true
    }
  }
}

function createRock(x) {
  var top = 0
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`
  rock.style.top = top

  GAME.appendChild(rock)

  function moveRock() {
    if (checkCollision(rock)) {
      return endGame()
    }

    if (positionToInteger(rock.style.top) < (GAME_HEIGHT - 20)) {
      rock.style.top = `${top += 2}px`
      window.requestAnimationFrame(moveRock)
    }

    if (positionToInteger(rock.style.top) === (GAME_HEIGHT - 20)) {
      rock.remove()
    }
  }

  window.requestAnimationFrame(moveRock)

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
  clearInterval(gameInterval)

  for (let i = 0; i < ROCKS.length; i++) {
    ROCKS[i].remove()
  }
  window.removeEventListener('keydown', moveDodger)
  return alert("YOU LOSE!")
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
     var left = positionToInteger(DODGER.style.left)
     if (left > 0) {
       DODGER.style.left = `${left - 4}px`
     }
   })
}

function moveDodgerRight() {
  window.requestAnimationFrame(function() {
    var left = positionToInteger(DODGER.style.left)
    if ((left + 40) < GAME_WIDTH) {
    DODGER.style.left = `${left + 4}px`
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
    createRock(Math.floor(Math.random() * (GAME_WIDTH - 20)))
  }, 1000)
}
