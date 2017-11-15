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

  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20;

    return ((dodgerLeftEdge <= rockRightEdge && dodgerLeftEdge >= rockLeftEdge) ||
      (dodgerRightEdge <= rockRightEdge && dodgerRightEdge >= rockLeftEdge) ||
      (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge))
  }
  return false
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = 0

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

     if(checkCollision(rock)){
       endGame()
     }
     if(rock.style.top >= GAME_HEIGHT) {
       rock.style.top = `${top += 2}px`
       window.requestAnimationFrame(moveRock)
     }  else {
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
  window.removeEventListener('keydown', moveDodger)
  ROCKS.forEach(function(rock) { rock.remove() })
  document.querySelector('#game').removeEventListener('keydown', moveDodger)
}

function moveDodger(e) {
  if(e.which === LEFT_ARROW) {
      e.stopPropagation();
      e.preventDefault();
      moveDodgerLeft();
   } else if (e.which === RIGHT_ARROW) {
      e.stopPropagation();
      e.preventDefault();
      moveDodgerRight();
   }
}

function moveDodgerLeft() {
   var leftNumbers = DODGER.style.left.replace('px', '');
   var left = parseInt(leftNumbers,10)
   if (left > 0) {
      DODGER.style.left = `${left - 4}px`
   }
}

function moveDodgerRight() {
   var leftNumbers = DODGER.style.left.replace('px', '');
   var left = parseInt(leftNumbers,10)
   if(left <= GAME_WIDTH - 44){
      DODGER.style.left = `${left + 4}px`
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
