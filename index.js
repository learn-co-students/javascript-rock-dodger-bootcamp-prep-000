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

    if (
(rockLeftEdge<dodgerLeftEdge && rockRightEdge > dodgerLeftEdge) ||
(rockLeftEdge >= dodgerLeftEdge && rockRightEdge<= dodgerRightEdge)||
(rockLeftEdge<dodgerRightEdge &&rockRightEdge>dodgerRightEdge)
             ) {
      return true
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = 0

  rock.style.top = top
  GAME.appendChild(rock);

  function moveRock() {
     if (checkCollision(rock)) {
       endGame()
     }
     else if (rock.style.top < 380) {
        rock.style.top += 2
        window.requestAnimationFrame(moveRock)
    }
    else {
        GAME.removeChild(rock) //remove the rock from the DOM
    }
  }
  window.requestAnimationFrame(moveRock);

  ROCKS.push(rock)

  return rock
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame(rock) {
  clearInterval(gameInterval);
  GAME.removeChild(rock);
  for (var i = ROCK.length-1; i>=0;i--) {
    ROCK.remove(ROCK[i]);
  }
  window.removeEventListener('keydown',moveDodger);
  alert("YOU LOSE!");
}

function moveDodger(e) {
  // implement me!
       if (e.which === LEFT_ARROW) {
         e.preventDefault()
         e.stopPropagation()
         moveDodgerLeft()
       }
       else if (e.which === RIGHT_ARROW) {
          e.preventDefault()
          e.stopPropagation()
          moveDodgerRight()
       }
}

function moveDodgerLeft() {
  // implement me!
  var dodgerLeftEdge = positionToInteger(DODGER.style.left)
   function step() {
    DODGER.style.left = `${dodgerLeftEdge -= 4}px`

    if (dodgerLeftEdge > 4) {
      window.requestAnimationFrame(step)
    }
    else {
      DODGER.style.left = "0px"
    }
  }
  window.requestAnimationFrame(step)
}

function moveDodgerRight() {
  // implement me!
   var dodgerRightEdge = positionToInteger(DODGER.style.right)
   function step() {
    DODGER.style.right = `${dodgerRightEdge += 4}px`

    if (dodgerRightEdge < 400) {
      window.requestAnimationFrame(step)
    }
    if (dodgerRightEdge === 400) {
      DODGER.style.left = "360px"
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
