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

    const dodgerRightEdge = positionToInteger(DODGER.style.left) + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    const rockRightEdge = positionToInteger(rock.style.left) + 20;

    if ((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) || (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) || (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)) {
      return true
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

  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */
   GAME.appendChild(rock)


  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
    if(checkCollision(rock)) {
      endGame()
      return false;
    }

    rock.style.top = `${top += 1}px`

    if(top >! 400) {
        window.requestAnimationFrame(moveRock)
    } else {
      rock.remove()
    }

  }

  // We should kick of the animation of the rock around here
  window.requestAnimationFrame(moveRock)

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
  clearInterval(gameInterval)
  for(let r in ROCKS) {
    ROCKS[r].remove()
  }
  window.removeEventListener('keydown', moveDodger)
}

function moveDodger(e) {
  if(e.which == LEFT_ARROW) {
    e.preventDefault()
    e.stopPropagation()
    moveDodgerLeft()
  } else if(e.which == RIGHT_ARROW) {
    e.preventDefault()
    e.stopPropagation()
    moveDodgerRight()
  }
}

function moveDodgerLeft() {
  var horzPos = parseInt(DODGER.style.left.slice(0, -1));
  var moved = 0;

  function step() {

    if(horzPos == 0) {
      return;
    }

    DODGER.style.left = `${horzPos -= 1}px`
    moved += 1

    if (moved < 4) {
      window.requestAnimationFrame(step)
    }
  }

  window.requestAnimationFrame(step)
}

function moveDodgerRight() {

  var horzPos = parseInt(DODGER.style.left.slice(0, -1));
  var moved = 0;

  function step() {

    if(horzPos == 360) {
      return;
    }

    DODGER.style.left = `${horzPos += 1}px`
    moved += 1

    if (moved < 4) {
      window.requestAnimationFrame(step)
    }
  }

  window.requestAnimationFrame(step)
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
