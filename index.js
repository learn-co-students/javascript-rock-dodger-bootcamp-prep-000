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

  const between = function(x, min, max) {
    return x >= min && x <= max;
  }
  // implement me!
  // use the comments below to guide you!
  const top = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    const rockRightEdge = rockLeftEdge + 20;

    if (between(rockLeftEdge, dodgerLeftEdge, dodgerRightEdge) ||
        between(rockRightEdge, dodgerLeftEdge, dodgerRightEdge)) {
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

  rock.style.top = top

  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */
   GAME.appendChild(rock);
   const rockInterval = setInterval(function() {
     moveRock(rock);
   }, 500);
   rock.rockInterval = rockInterval;

  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
    // implement me!
    // (use the comments below to guide you!)
    /**
     * If a rock collides with the DODGER,
     * we should call endGame()
     */
     let rockTopPos = positionToInteger(rock.style.top)
     rockTopPos += 2
     rock.style.top = `${rockTopPos}px`;

     if(checkCollision(rock)) {
       endGame();
     }


    if (rockTopPos >=400) {
      ROCKS.shift();
      rock.remove();
      clearInterval(rock.rockInterval);
    } else {
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
  ROCKS.forEach(rock => {
    clearInterval(rock.rockInterval);
    rock.remove();
  });
  window.removeEventListener('keydown', moveDodger);
  window.alert('YOU LOSE!');
}

function moveDodger(e) {
  if(e.which === LEFT_ARROW) {
    e.preventDefault();
    e.stopPropagation()
    moveDodgerLeft();
  } else if (e.which === RIGHT_ARROW) {
    e.preventDefault();
    e.stopPropagation()
    moveDodgerRight();
  }
}

function moveDodgerLeft() {
   const dodgerLeftEdge = positionToInteger(DODGER.style.left);
   let newLeftPos = clamp(dodgerLeftEdge - 16, 0, 360);
   DODGER.style.left = newLeftPos + 'px';
}

function moveDodgerRight() {
  const dodgerLeftEdge = positionToInteger(DODGER.style.left);
  let newLeftPos = clamp(dodgerLeftEdge + 16, 0, 360);
  DODGER.style.left = newLeftPos + 'px';
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function clamp(x, min, max) {
  return Math.max(Math.min(x, max), min);
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
