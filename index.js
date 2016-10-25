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
  const dodgerRightEdge = dodgerLeftEdge + 40;
  const rockLeftEdge = positionToInteger(rock.style.left)
  const rockRightEdge = rockLeftEdge + 20;

  if (rockLeftEdge <= dodgerLeftEdge & rockRightEdge >= dodgerLeftEdge |
    rockLeftEdge >= dodgerLeftEdge & rockRightEdge <= dodgerRightEdge |
    rockLeftEdge <= dodgerRightEdge & rockRightEdge >= dodgerRightEdge) {
    return true
}
}
}

function createRock(x) {
  const rock = document.createElement('div') //create rock div
  rock.className = 'rock'
  rock.style.left = `${x}px`
  var top = 0
  rock.style.top = top
  document.getElementById('game').appendChild(rock) //add rock to page

  var mover = 0

  function moveRock() {
    document.querySelector('.rock').style.top = `${mover}px`
    mover += 2

    if (checkCollision(rock)) {
      endGame()
    };

    if (mover >= GAME_HEIGHT) {
     var parent = document.getElementById("game");
     var child = document.querySelector('.rock');
     parent.removeChild(child);
   };

   requestAnimationFrame(moveRock)
 }
 moveRock()
  ROCKS.push(rock) // Add the rock to ROCKS so that we can remove all rocks when there's a collision
     // Finally, return the rock element you've created
  // debugger said this is an "illegal return statement" -> return rock
}


function endGame() {
  gameInterval = 0 //End the game by clearing `gameInterval`
  ROCKS.length = 0 //removing all ROCKS from the DOM
  // document.removeEventListener('keydown',function) remove the `moveDodger` event listener.
  alert('YOU LOSE!') //Finally, alert "YOU LOSE!" to the player
}

function moveDodger(e) {
 document.addEventListener('keydown', function(e) {
  if (e.which === 37) {
    moveDodgerLeft()
  }
  if (e.which === 39) {
    moveDodgerRight()
  }
  console.log(e.which)
})
}

function moveDodgerLeft() {
 var leftNumbers = DODGER.style.left.replace('px', '')
 var left = parseInt(leftNumbers, 10)
 if (left > 0) {
   DODGER.style.left = `${left - 4}px`
   requestAnimationFrame(moveDodgerLeft)
 }
}

function moveDodgerRight() {
 var leftNumbers = DODGER.style.left.replace('px', '')
 var left = parseInt(leftNumbers, 10)
 if (left < 360) {
  DODGER.style.left = `${left + 4}px`
  requestAnimationFrame(moveDodgerRight)
}
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
 function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
} // splits a string into an array of values, gets rid of "px", returns the first value of that array.

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
