/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const DODGER_WIDTH = 40;
const DODGER_HEIGHT = 20;
const ROCK_WIDTH = 20;
const ROCK_HEIGHT = 20;
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
var ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)

  if (top > GAME_HEIGHT - DODGER_HEIGHT - ROCK_HEIGHT) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + DODGER_WIDTH;

    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + ROCK_WIDTH;

    const rockCenter = (rockLeftEdge + rockRightEdge) / 2;
    const dodgerCenter = (dodgerLeftEdge + dodgerRightEdge) / 2;

    // none of that awkward edge stuff, are they close enough to have collided?
    return Math.abs(rockCenter - dodgerCenter) < ROCK_WIDTH/2 + DODGER_WIDTH/2;
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = 0 - ROCK_HEIGHT;

  rock.style.top = top;

   GAME.appendChild(rock);

  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
    top+=2;
    rock.style.top = `${top}px`;

    if(checkCollision(rock))
       return endGame();

     if(top < GAME_HEIGHT) {
       window.requestAnimationFrame(moveRock);
     } else {
       rock.remove();
       //ROCKS.shift(); // only if they're perfectly in order
       ROCKS.splice(ROCKS.indexOf(rock),1); // avoid eventual memory leaks
     }
  }

  window.requestAnimationFrame(moveRock)

  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
  ROCKS.push(rock);

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
  clearInterval(gameInterval)
  document.removeEventListener('keydown', moveDodger)
  START.innerHTML = 'Play again?';
  START.style.display = 'inline';
  ROCKS.forEach((e,i) => e.remove());
  ROCKS = [];

  //return alert('YOU LOSE!');
}

function moveDodger(e) {
  const key = e.which;

  if ([LEFT_ARROW, RIGHT_ARROW].indexOf(key) > -1) {
    e.preventDefault()
    e.stopPropagation()
  }

   if(key == LEFT_ARROW) moveDodgerLeft();
   if(key == RIGHT_ARROW) moveDodgerRight();
}

function moveDodgerLeft() {
  window.requestAnimationFrame(() => {
     var left = positionToInteger(DODGER.style.left);
     left-=4;
     if (left < 0) left=0;
     DODGER.style.left = `${left}px`;
   })
}

function moveDodgerRight() {
  window.requestAnimationFrame(() => {
     var left = positionToInteger(DODGER.style.left);
     left+=4;
     if (left > GAME_WIDTH - DODGER_WIDTH) left = GAME_WIDTH - DODGER_WIDTH;
     DODGER.style.left = `${left}px`;
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
  document.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - ROCK_WIDTH)))
  }, 1000)
}
