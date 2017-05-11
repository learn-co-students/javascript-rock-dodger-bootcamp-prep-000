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

    if ((rockRightEdge > dodgerLeftEdge && rockLeftEdge < dodgerRightEdge) ||
    (rockLeftEdge < dodgerLeftEdge && rockRightEdge > dodgerLeftEdge)) {
      return true
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')
  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = rock.style.top = 0
  //rock.style.top = `${top}px`
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
  console.log(ROCKS)
  return rock
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  for (var i = 0; i < ROCKS.length; i++) {
    ROCKS[i].remove()
  }
  ROCKS.length = 0
  document.removeEventListener('keydown', moveDodger)
  clearInterval(gameInterval)
  console.log(ROCKS)
  alert("YOU LOSE!")
}

function moveDodger(e) {
  //why is there an e here?
  //what does this do?
  //what do we want to preventDefault of?
  //the function already ignores all inputs other than left or right arrow
    if (e.which === LEFT_ARROW) {
      e.stopPropagation()
      e.preventDefault()
      moveDodgerLeft()
      //what to preventDefault here??
    } else if (e.which === RIGHT_ARROW) {
      e.stopPropagation()
      e.preventDefault()
      moveDodgerRight()
    }
}

function moveDodgerLeft() {

  function step() {
    var left = positionToInteger(DODGER.style.left)

    if (left > 0) {
      DODGER.style.left = `${left - 10}px`
      //BUT WHAT IF LEFT IS 1? SHOULD THERE BE A SEPARATE FUNCTION SO IT ONLY MOVES 1 PX?
      //window.requestAnimationFrame(step)
    }
  }
  window.requestAnimationFrame(step)
}

function moveDodgerRight() {

  function step() {
    var left = positionToInteger(DODGER.style.left)

    if (left < 360) {
      DODGER.style.left = `${left + 4}px`
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
