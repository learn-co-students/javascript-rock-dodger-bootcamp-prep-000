/**
 * Don't change these constants!
 */
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

  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    const dodgerRightEdge = dodgerLeftEdge + 40

    const rockLeftEdge = positionToInteger(rock.style.left)

    const rockRightEdge = rockLeftEdge + 20

    if ((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) || (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) || (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)) {
      return true
    }
    else {
      return false
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Hmmm, why would we have used `var` here?
  var top = 0 // to make it appear in the top every time this function runs.

  rock.style.top = top
  GAME.appendChild(rock)

  function moveRock() {

    var top = positionToInteger(rock.style.top)
    
     if (checkCollision(rock)) {
       endGame()
     }
     else if (top < 400) {
       rock.style.top = `${top += 2}px`
       window.requestAnimationFrame(moveRock)
     }
     else {
       rock.remove()
     }

    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */

    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */
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

  for (var i = 0; i < ROCKS.length; i++) {
    ROCKS[i].remove()
  }

  document.removeEventListener('keydown', moveDodger)

  alert('YOU LOSE!')
}

function moveDodger(e) {// Done
  if (e.which === LEFT_ARROW){
    moveDodgerLeft()
  }
  if (e.which === RIGHT_ARROW) {
    moveDodgerRight()
  }
}

function moveDodgerLeft() {// Done
  var left = positionToInteger(DODGER.style.left)

  function step() {
    DODGER.style.left = `${left -= 4}px`
    if(left > 0) {
      window.requestAnimationFrame(step)
    }
  }
  window.requestAnimationFrame(step)
}

function moveDodgerRight() {// Done
  var right = positionToInteger(DODGER.style.left)

  function step() {
    DODGER.style.left = `${right += 4}px`
    if(right < 360) {
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
  document.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
