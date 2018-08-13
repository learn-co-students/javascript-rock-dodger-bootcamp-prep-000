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
    const dodgerRightEdge = 40 + dodgerLeftEdge ;

    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = 20 + rockLeftEdge;

    if ((rockLeftEdge < dodgerLeftEdge && rockRightEdge > dodgerLeftEdge) ||
        (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
        (rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerRightEdge)){ /**
               * Think about it -- what's happening here?
               * There's been a collision if one of three things is true:
               * 1. The rock's left edge is < the DODGER's left edge,
               *    and the rock's right edge is > the DODGER's left edge;
               * 2. The rock's left edge is > the DODGER's left edge,
               *    and the rock's right edge is < the DODGER's right edge;
               * 3. The rock's left edge is < the DODGER's right edge,
               *    and the rock's right edge is > the DODGER's right edge
               */
      return true
    } else {
      return false
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Hmmm, why would we have used `var` here?
  var top = 0

  rock.style.top = `${top}px`

  GAME.appendChild(rock);

  function moveRock() {
    rock.style.top = `${top += 2}px`
    if (checkCollision(rock)) {
     endGame();
    } else if (rock.style.top == '400px') {
     rock.remove();
    } else {
     window.requestAnimationFrame(moveRock);
    }
  }
  window.requestAnimationFrame(moveRock);
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
  ROCKS.forEach(rock => rock.remove());
  window.clearInterval(gameInterval)
  START.style.display = 'block'
}

function moveDodger(e) {

   let top



   if (e.which == '37') {
     e.preventDefault();
     e.stopPropagation();
     moveDodgerLeft();
   } else if (e.which == '39') {
     e.preventDefault();
     e.stopPropagation();
     moveDodgerRight();
   }
}

function moveDodgerLeft() {
   let left = positionToInteger(DODGER.style.left);
   function moveLeft() {
     DODGER.style.left = `${left -= 4}px`
   }
   if (left > 0) {
   window.requestAnimationFrame(moveLeft);
    }
}

function moveDodgerRight() {
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   let left = positionToInteger(DODGER.style.left);
   function moveRight() {
     DODGER.style.left = `${left += 4}px`
   }
   if (left < 360) {
     window.requestAnimationFrame(moveRight);
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
  DODGER.style.left = '180px'
  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
