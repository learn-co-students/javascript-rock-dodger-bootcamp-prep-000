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
    const dodgerRightEdge = 40 + dodgerLeftEdge;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = 20 + rockLeftEdge;

    if((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
       (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
       (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)) {
      return true;
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Hmmm, why would we have used `var` here?
  var top = rock.style.top = 0;

  GAME.appendChild(rock);


  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
    rock.style.top = `${top += 2}px`

    // implement me!
    // (use the comments below to guide you!)
    if(checkCollision(rock) === true) {
      endGame();
    }

    if(top-20 < 400) {
     window.requestAnimationFrame(moveRock);
    } else if((rock - 20) === 0) {
      rock.remove();
    }
  }

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

  ROCKS.forEach(function(rock) {rock.remove()});

  document.removeEventListener('keydown', moveDodger);

  resetDodger();
  START.removeAttribute('style');
  return START;
  start();
}


function resetDodger() {
  DODGER.style.left = '180px';
  return DODGER;
}

function moveDodger(e) {
 if(e.which === LEFT_ARROW || e.which === RIGHT_ARROW) {
    e.preventDefault()
    e.stopPropagation()
  }

  if(e.which === LEFT_ARROW && positionToInteger(DODGER.style.left) >= 4) {
    moveDodgerLeft();
  } else if(e.which === RIGHT_ARROW && positionToInteger(DODGER.style.left) <= 356) {
    moveDodgerRight();
  }
}

function moveDodgerLeft() {
  var leftNumbers = DODGER.style.left.replace('px', '')
  var left = parseInt(leftNumbers, 10)

  if (left > 0) {
    DODGER.style.left = `${left - 4}px`
  }
}

function moveDodgerRight() {
  var rightNumbers = DODGER.style.left.replace('px', '')
  var right = parseInt(rightNumbers, 10)

  if (right <= 356) {
    DODGER.style.left = `${right + 4}px`
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
