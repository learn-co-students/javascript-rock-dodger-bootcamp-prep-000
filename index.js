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

   if (top > 360) { // only check for collision if at top of dodger
     const dodgerLeftEdge = positionToInteger(DODGER.style.left);
     const dodgerRightEdge = dodgerLeftEdge + 40;
     const rockLeftEdge = positionToInteger(rock.style.left);
     const rockRightEdge = rockLeftEdge + 20;

     if (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) {
       return true;
     }

     if (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) {
       return true;
     }

     if (rockLeftEdge <= dodgerRightEdge && rockRightEdge >=dodgerRightEdge) {
       return true;
     }
   }
 }

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = rock.style.top = 0

  GAME.appendChild(rock); // add rock to the DOM

  function moveRock() { // create movement
    rock.style.top = `${top += 2}px`; // move

     if (checkCollision(rock)) {
       return endGame()
     }

     if (top < GAME_HEIGHT) {
       window.requestAnimationFrame(moveRock)
     } else {
         rock.remove()
     }
   }
   window.requestAnimationFrame(moveRock) // kick off the movement

  ROCKS.push(rock)

  return rock
}

function endGame() {
  console.log('calling endgame()')

  clearInterval(gameInterval)

  ROCKS.forEach(function(rock) { rock.remove() })

  document.removeEventListener('keydown', moveDodger)

  START.innerHTML = 'Play again?'
  START.style.display = 'inline'

  return alert('YOU LOSE!')
}

function moveDodger(e) {
  const key = e.which;

  if ([LEFT_ARROW, RIGHT_ARROW].indexOf(key) > -1) {
    e.preventDefault()
    e.stopPropagation()
  }

   if(key === LEFT_ARROW) {
     moveDodgerLeft();
   } else if (key === RIGHT_ARROW) {
     moveDodgerRight();
   }
 }

function moveDodgerLeft() {
  window.requestAnimationFrame(function () {
    var position = positionToInteger(dodger.style.left)
    if (position > 0) {
      dodger.style.left = `${position - 4}px`
    }
  })
}

function moveDodgerRight() {
  window.requestAnimationFrame(function() {
    var position = positionToInteger(dodger.style.left)
    if (position < GAME_WIDTH - 40) {
      dodger.style.left = `${position +4}px`
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

  gameInterval = setInterval(function() { // create a rock each second
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
