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
const top = positionToInteger(rock.style.top)
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = rockLeftEdge + 20;
    const scenario1 = (rockLeftEdge <= dodgerLeftEdge) && (rockRightEdge >= dodgerLeftEdge);
    const scenario2 = (rockLeftEdge >= dodgerLeftEdge) && (rockRightEdge <= dodgerRightEdge);
    const scenario3 = (rockLeftEdge <= dodgerRightEdge) && (rockRightEdge >= dodgerRightEdge);
    if (scenario1 || scenario2 || scenario3) {
      return true
    }
    else { return false
  }
}}


function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`
  var top = 2;
  rock.style.top = top

  GAME.appendChild(rock);

  function moveRock() {
    rock.style.top = `${top += 2}px`;

    if (checkCollision(rock) === true) {
      return endGame();
    }
    if (top < GAME_HEIGHT) {
      rock.remove();
    }
    else {
      window.requestAnimationFrame(moveRock);
    }

}
  // We should kick of the animation of the rock around here
window.requestAnimationFrame(moveRock);
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
  clearInterval(gameInterval);
  window.removeEventListener('keydown', moveDodger);
  ROCKS.forEach(function(rock) { rock.remove() })
  alert("YOU LOSE!")
}

function moveDodger(e) {
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
  var moveleft = positionToInteger(DODGER.style.left);
  function move() {
    if (moveleft > 0) {
    DODGER.style.left = `${moveleft - 4}px`;
  }}
  window.requestAnimationFrame(move)
}

function moveDodgerRight() {
  var moveright = positionToInteger(DODGER.style.left);
  function move() {
    if (moveright < 360) {
    DODGER.style.left = `${moveright + 4}px`;
  }}
  window.requestAnimationFrame(move)
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
