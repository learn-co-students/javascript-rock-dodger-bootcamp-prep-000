// Constants
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')
const DODGER_WIDTH = 40
const ROCK_WIDTH = 20

var gameInterval = null
var stop = false

// checks for a collision between the rock and the dodger.
// returns true if there is one, false if not.
function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)
  // rocks are 20px high, DODGER is 20px high, and GAME_HEIGHT - 20 - 20 = 360px,
  // so if top > 360, the rock is in the bottom 40px, level with the dodger
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + DODGER_WIDTH;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + ROCK_WIDTH;
    if ((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
        (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
        (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)) {
      return true
    }
  }
}

//creates a rock and moves it (moveRock() is contained inside this function)
function createRock(x) {
  const rock = document.createElement('div')
  var top = 0   // var is required here since top is also a const defined above
  // define created rock
  rock.className = 'rock'
  rock.style.left = `${x}px`
  rock.style.top = top
  // append rock to the game and move it downwards.
  GAME.appendChild(rock)

  // This function is nested inside createRock and moves the rock down 2 pixels at a time
  // define the function moveRock() below.  Call it outside the function.
  function moveRock() {
    rock.style.top = `${top += 2}px`;
    // If a rock collides with the DODGER, call endGame()
    if (checkCollision(rock)) {
      return endGame()
    // Otherwise, if the rock hasn't reached the bottom of the GAME, move it again.
  } else if (top < GAME_HEIGHT){
      window.requestAnimationFrame(moveRock)
    // But if the rock *has* reached the bottom of the GAME, remove the rock from the DOM
  } else {
      rock.remove()
    }
  }

  // kick off the animation of the rock around here
  window.requestAnimationFrame(moveRock)

  // Add the rock to ROCKS so that we can remove all rocks when there's a collision
  ROCKS.push(rock)

  // Finally, return the rock element created
  return rock
}

/**
 * End the game by (1) clearing `gameInterval`,
 * (2) removing all ROCKS from the DOM,
 * (3) removing the `moveDodger` event listener.
 * (4) alerting "YOU LOSE!" to the player.
 */
function endGame() {
  clearInterval(gameInterval)

  // can remove all rocks this way too:
  // ROCKS.forEach(function(rock) { rock.remove() })
  var rocks = document.querySelectorAll("div .rock")
  for (var i = rocks.length; i--; ) {
   rocks[i].remove();
  }

  document.removeEventListener('keydown', moveDodger)

  return alert ("YOU LOSE!")
}

function moveDodger(e) {
  const code = e.which

  if ([LEFT_ARROW, RIGHT_ARROW].indexOf(code) > -1) {
   e.preventDefault()
   e.stopPropagation()
  }
  
  if (e.which === LEFT_ARROW) {
    moveDodgerLeft()
  }
  if (e.which === RIGHT_ARROW) {
   moveDodgerRight()
  }
}

// moves DODGER left 4 px @ a time. uses requestAnimationFrame
function moveDodgerLeft() {
   var leftNumbers = DODGER.style.left.replace('px', '')
   var left = parseInt(leftNumbers, 10)
   window.requestAnimationFrame(function() {
     if (left > 0) {
     dodger.style.left = `${left - 4}px`
     }
  })
 }

// moves DODGER left 4 px @ a time without using requestAnimationFrame
function moveDodgerRight() {
   var leftNumbers = DODGER.style.left.replace('px', '')
   var left = parseInt(leftNumbers, 10)
   //var right = left + DODGER.style.width
   if (left < GAME_WIDTH - DODGER_WIDTH) {
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
  // move dodger when left/right arrow keys are pressed
  window.addEventListener('keydown', moveDodger)

  // once Start is pressed, make it disappear
  START.style.display = 'none'

  // create rocks at a random x position, one per 5 seconds
  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
