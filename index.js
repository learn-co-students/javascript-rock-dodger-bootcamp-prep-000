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
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = rockLeftEdge + 20;
    return (
      (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
      (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
      (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)
    )
  }
}

function createRock(x) {
  const rock = document.createElement('div')
  rock.className = "rock"
  //console.log(`${rock.className} classed`)
  rock.style.left = `${x}px`
   //console.log(`rock placed`)
  // Hmmm, why would we have used `var` here?
  var top = rock.style.top = 0;
   GAME.appendChild(rock)
  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */
  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
    rock.style.top = `${top += 2}px`;
    if (checkCollision(rock)) {
      endGame()
    }
    /*function step() {
      var topNumbers = rock.style.top.replace('px', '');
      var top = parseInt(topNumbers, 10);
      rock.style.top = `${top + 2}px`;
      if (top < 360) {
        window.requestAnimationFrame(step);
      } else {
      rock.remove();
    }
    window.requestAnimationFrame(step)
  }*/
  if (top < 400) {
    window.requestAnimationFrame(moveRock);
  } else {
    rock.remove();
  }
}
  
  ROCKS.push(rock)
  window.requestAnimationFrame(moveRock);
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
  ROCKS.forEach(function(rock) {
    rock.remove();
  })
}

function moveDodger(e) {
  const code = e.which;
  if (code === 37 || code === 39) {
    e.preventDefault();
    e.stopPropagation();
  }
  if (code === 37) {
    moveDodgerLeft();
  } else if (code === 39) {
    moveDodgerRight()
  }
  // implement me!
  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */
}

function moveDodgerLeft() {
  window.requestAnimationFrame ( function() {
  const left = positionToInteger(DODGER.style.left);
  if (left > 0) {
  DODGER.style.left = `${left - 4}px`;
  }
  })
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
}

function moveDodgerRight() {
  window.requestAnimationFrame ( function() {
  const left = positionToInteger(DODGER.style.left);
  if (left < 360) {
  DODGER.style.left = `${left + 4}px`;
  }
  })
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
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
