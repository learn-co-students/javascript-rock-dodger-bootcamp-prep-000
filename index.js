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

  if (top > GAME_HEIGHT - 20 - 20) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = rockLeftEdge + 20;

    if ((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
    (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
    (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)
    ) {
      return true
    }
  }
  return false
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
    if (checkCollision(rock)) {
      endGame()
    }
    else if (top < 400) {
      requestAnimationFrame(moveRock) // but see index.js line 94
    }
    else if (top >= 400) {
      rock.remove()
    }
  }
  requestAnimationFrame(moveRock)
  ROCKS.push(rock)
  return rock
}

/**
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 */
function endGame() { // don't bother trying to fix endGame until createRock(x) is fixed; it won't work
  console.log('called endGame')
  clearInterval(gameInterval)

  console.log(`ROCKS has ${ROCKS.length} elements before being cleared`)

  while (ROCKS.length > 0) {
    ROCKS.shift()
  }

  console.log(`ROCKS has ${ROCKS.length} elements after being cleared`)

  // var rockEls = GAME.getElementsByClassName('rock');
  //
  // while(rocksEls[0]) {
  //   console.log(`There are currently elements with class name rock in the document.`)
  //   rock.remove(); // maybe parentNode needs to be replaced with the actual name
  //   // console.log(`There are currently ${rockEls.length} elements with class name rock in the document.`)
  // }​

  alert('YOU LOSE!')
}

function moveDodger(e) {
  document.addEventListener('keydown', function(e) {
    if (e.which === LEFT_ARROW) {
      e.preventDefault()
      e.stopPropagation()
      moveDodgerLeft()
      console.log("moveDodger called e.which == LEFT_ARROW")
      return
    }
    if (e.which == RIGHT_ARROW) {
      moveDodgerRight()
      e.preventDefault()
      e.stopPropagation()
      console.log("moveDodger called e.which == RIGHT_ARROW") // debugging
      return
    }
    if (e.which != LEFT_ARROW && e.which != RIGHT_ARROW) {
    console.log("moveDodger called e.which is not either arrow")
    return
    }
  })
//  window.requestAnimationFrame(moveDodger) // there's a bug making this loop infinitely
  console.log("moveDodger went past its animation request") // debugging; odd that this calls on the first arrow even though e.g. e.which === LEFT_ARROW does NOT call on the first left arror (and the dodger doesn't move on the first left arrow)
}

function moveDodgerLeft() {
  var leftNumbers = DODGER.style.left.replace('px','')
  var left = parseInt(leftNumbers, 10)

  if (left >= 4) { // debugging
    DODGER.style.left = `${left - 4}px`
//    window.requestAnimationFrame(moveDodgerLeft)
  }
}

function moveDodgerRight() {
  // console.log("moveDodgerRight was called")
  var leftNumbers = DODGER.style.left.replace('px','')
  var left = parseInt(leftNumbers, 10)

  if (left <= (GAME_WIDTH - (40 + 4))) {
    DODGER.style.left = `${left + 4}px`
    // console.log("DODGER moved right")
//    window.requestAnimationFrame(moveDodgerRight)
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
