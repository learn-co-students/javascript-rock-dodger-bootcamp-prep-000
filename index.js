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
    const top = positionToInteger(rock.style.top);
// GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
 
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = positionToInteger((DODGER.style.left) + 40)
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = positionToInteger((rock.style.left) + 20);

    let collide1 = ((rockLeftEdge <= dodgerLeftEdge) && (rockRightEdge >= dodgerLeftEdge));
    let collide2 = ((rockLeftEdge >= dodgerLeftEdge) && (rockRightEdge <= dodgerRightEdge));
    let collide3 = ((rockLeftEdge <= dodgerRightEdge) && (rockRightEdge >= dodgerRightEdge));
    
    return ( collide1 || collide2 || collide3)
  }
}


function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Hmmm, why would we have used `var` here?
  var top = 0
 var rockTop = positionToInteger(rock.style.top)
  rock.style.top = `${top}px`
GAME.appendChild(rock);
  function moveRock() {
    if (checkCollision()) {
      return endGame();
    } else if (rockTop < 380) {
      rock.style.top = `${top += 2}px`
    } else {
      rock.remove;
    }
  }

  //requestAnimationFrame(moveRock) we pass the function as a var not the return value of it, that would look like requestAnimationFrame(moveRock())
  window.requestAnimationFrame(moveRock);
  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
  ROCKS.push(rock)

  // Finally, return the rock element you've created
  return rock;
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  clearInterval(gameInterval);
  ROCKS.forEach(function(element){
    element.remove();
  })
  document.removeEventListener('keydown', moveDodger)
  alert('YOU LOSE!')
}

function moveDodger(e) {
  // implement me!
  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */
  if (e.which === LEFT_ARROW) {
    e.preventDefault();
    e.stopPropagation();
     moveDodgerLeft();
   }
   if (e.which === RIGHT_ARROW) {
     e.preventDefault();
     e.stopPropagation();
     moveDodgerRight();
   }
}


function moveDodgerLeft() {
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    
   if (dodgerLeftEdge > 0) {
     dodger.style.left = `${dodgerLeftEdge-4}px`
     window.requestAnimationFrame(moveDodgerLeft)
   }
}

function moveDodgerRight() {
  const dodgerRightEdge = positionToInteger((DODGER.style.left) + 40)
  
  if (dodgerRightEdge < 360) {
    dodger.style.left = `${dodgerRightEdge+4}px`
    window.requestAnimationFrame(moveDodgerRight)
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

document.ready(start())
