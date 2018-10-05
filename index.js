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
const DODGER_WIDTH = 40
const ROCK_HEIGHT = 20
const DODGER_HEIGHT = 20
const DODGER_PACE = 5
const ROCK_PACE = 5
const START = document.getElementById('start')

var gameInterval = null

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {

  return false

  // implement me!
  // use the comments below to guide you!
  const top = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = 0;

    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = 0;

    if (false /**
               * Think about it -- what's happening here?
               * There's been a collision if one of three things is true:
               * 1. The rock's left edge is < the DODGER's left edge,
               *    and the rock's right edge is > the DODGER's left edge;
               * 2. The rock's left edge is > the DODGER's left edge,
               *    and the rock's right edge is < the DODGER's right edge;
               * 3. The rock's left edge is < the DODGER's right edge,
               *    and the rock's right edge is > the DODGER's right edge
               */) {
      return true
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')
  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = 0     // Hmmm, why would we have used `var` here?
  rock.style.top = `${0}px`
  GAME.appendChild(rock)
  ROCKS.push(rock)

  function rockAtBottom() {
    console.log(rock.style.top);
    return (positionToInteger(rock.style.top) >= GAME_HEIGHT - ROCK_HEIGHT)
  }

  function moveRock() {
    if (checkCollision) {
      // endGame()
    }

    if (!rockAtBottom()) {
      let topNum = positionToInteger(rock.style.top)
      rock.style.top = `${topNum + ROCK_PACE}px`
    } else {
      rock.parentNode.removeChild(rock)
    }


    //  But if the rock *has reached the bottom of the GAME, we should remove the rock from the DOM
    window.requestAnimationFrame(moveRock)

  }


  // We should kick of the animation of the rock around here
  window.requestAnimationFrame(moveRock)

  // Finally, return the rock element you've created
  return rock
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function () {
    // createRock(Math.floor(Math.random() * (GAME_WIDTH - 20)))
    createRock(Math.floor(Math.random() * (GAME_WIDTH - 20)))
  }, 1000)
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  for (let i = 0; i < ROCKS.length; i++) {
    var rock = ROCKS[i]
    rock.parentNode.removeChild(rock)
  }
  clearInterval(gameInterval)
}

function shouldMoveLeft() {
  return positionToInteger(DODGER.style.left) > 0
}

function shouldMoveRight() {
  return (positionToInteger(DODGER.style.left) < GAME_WIDTH - DODGER_WIDTH)
}

function moveDodger(e) {
  switch (e.which) {
    case LEFT_ARROW: moveDodgerLeft(); break
    case RIGHT_ARROW: moveDodgerRight(); break
    default: return
  }
  e.preventDefault()
  e.stopPropagation()
}

function moveDodgerLeft() {
  if (shouldMoveLeft()) {
    let left = positionToInteger(DODGER.style.left)
    DODGER.style.left = `${left - DODGER_PACE}px`
  }
  // TO-DO: Use window.requestAnimationFrame()!

}

function moveDodgerRight() {
  if (shouldMoveRight()) {
    let left = positionToInteger(DODGER.style.left)
    DODGER.style.left = `${left + DODGER_PACE}px`
  }
  // TO-DO: Use window.requestAnimationFrame()!

}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}



``