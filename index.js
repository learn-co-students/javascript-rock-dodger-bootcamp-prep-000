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


function checkCollision(rock) {

  const top = positionToInteger(rock.style.top)

  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = positionToInteger(DODGER.style.left) + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = positionToInteger(rock.style.left) + 20;

    return (
      (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
      (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
      (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge))
  }
}
//rock's left edge is <= the DODGER's left edge and the rock's right edge is >= the DODGER's left edge"

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`
  var top = 0

  rock.style.top = top

  GAME.appendChild(rock) //attaches to DOM
  //console.log('GAME', GAME)

  //console.log('ROCKS', ROCKS)

  function moveRock() {
    //console.log('moving rock', rock)
    rock.style.top = `${top += 2}px`
    if (checkCollision(rock)) {
      endGame()
    }


    if (top < GAME_HEIGHT) {
      window.requestAnimationFrame(moveRock)
    }
    else {
      rock.remove() //removes rock from DOM
    }
  }
  window.requestAnimationFrame(moveRock)

  ROCKS.push(rock)
  // if (ROCKS.length > 5) {
  //   clearInterval(gameInterval)
  // }
  //console.log('bottom of move func')
  return rock
  // return GAME
  // return ROCKS
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  //domElement = GAME
  //array = ROCKS
  //console.log('game end called', ROCKS) //prints this, ROCKS & GAME undefined
  //console.log('GAME', GAME)
  document.removeEventListener('keydown', moveDodger)
  clearInterval(gameInterval)
  //gameInterval = null
  //console.log('past interval, ROCKS', ROCKS) //ROCKS undefined

  for (let i = 0; i < ROCKS.length; i++) {
    ROCKS[i].remove();
  }
  //console.log('ROCKS array', ROCKS)

  alert('YOU LOSE!')
}

function moveDodger(e) {

    if (e.which === LEFT_ARROW) {
      e.preventDefault()
      e.stopPropagation()
      moveDodgerLeft()
    }
    if (e.which === RIGHT_ARROW) {
      e.preventDefault()
      e.stopPropagation()
      moveDodgerRight()
    }
}

function moveDodgerLeft() {
  var leftNumbers = positionToInteger(DODGER.style.left)
  var left = parseInt(leftNumbers, 10)
  if (left > 0) {
     dodger.style.left = `${left - 4}px`
   }
}

function moveDodgerRight() {
  var leftNumbers = dodger.style.left.replace('px', '')
   var left = parseInt(leftNumbers, 10)
   if (left < 360) {
      dodger.style.left = `${left + 4}px`
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
