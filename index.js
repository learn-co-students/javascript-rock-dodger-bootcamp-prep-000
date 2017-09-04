/**
 * To Fix:
 * After game ends, remaining rocks keep falling
 * even though they're not on the DOM
 * because their functions go to the end.
 * How to stop those?
 * Either the gameInterval isn't clearing properly,
 * or the moveRock function needs to check for end condition
 * each time it runs?
 */

// To fix: Call window.requestAnimationFrame() on moveDodgerLeft/moveDodgerRight


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
  // If top > 360 that means the rock is within 40 pixels
  // of the bottom of the screen, which means it's time to
  // check collision between bottom of rock and top of dodger.
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    // The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    // The rock is 20 pixels wide -- how do we get the right edge?
    const rockRightEdge = rockLeftEdge + 20;

    // if (false /**
      //         * Think about it -- what's happening here?
      //         * There's been a collision if one of three things is true:
      //         * 1. The rock's left edge is < the DODGER's left edge,
      //         *    and the rock's right edge is > the DODGER's left edge;
      //         * 2. The rock's left edge is > the DODGER's left edge,
      //         *    and the rock's right edge is < the DODGER's right edge;
      //         * 3. The rock's left edge is < the DODGER's right edge,
      //         *    and the rock's right edge is > the DODGER's right edge
      //         */) {
      // return true
      // }
    if ( rockLeftEdge >= dodgerRightEdge ) {
      return false; // Rock misses to the right
    }
    else if (rockRightEdge <= dodgerLeftEdge) {
      return false; // Rock misses to the left
    }
    else {
      console.log("BOOM!");
      return true; // All other circumstances are a collision
    }

  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`
  // console.log(rock.style.left);
  // console.log("Is the left of the rock");

  // Hmmm, why would we have used `var` here?
  var top = 0

  rock.style.top = top

  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */

  GAME.appendChild(rock);

  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {

    rock.style.top = `${top += 2}px`
    // console.log(rock.style.top);
    // console.log("Is the top of the rock");

    /**
     * If a rock collides with the DODGER,
     * we should call endGame()
     */

    if (checkCollision(rock)) {
      endGame()
      return false;
    }

    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */

     else if (top < GAME_HEIGHT - 20) {
       window.requestAnimationFrame(moveRock)
     }

    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */

     else {
       rock.remove()
     }

  }

  // We should kick off the animation of the rock around here

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
  clearInterval(gameInterval);
  for (let i = 0; i < ROCKS.length; i++) {
    ROCKS[i].remove();
  }
  ROCKS.length = 0;
  window.removeEventListener('keydown', moveDodger);
  alert("YOU LOSE!");
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
   else if (e.which === RIGHT_ARROW) {
     e.preventDefault();
     e.stopPropagation();
     moveDodgerRight();
   }
   else {
     // do nothing
   }
}

function moveDodgerLeft() {
  // implement me!
  /**
   * This function should move DODGER to the left
   * (maybe 4 pixels?). Use window.requestAnimationFrame()!
   */
   var left = positionToInteger(DODGER.style.left);
   left = left - 4;
   if (left < 0) {
     left = 0; // left boundary of window
   }
   DODGER.style.left = `${left}px`;

}

function moveDodgerRight() {
  // implement me!
  /**
   * This function should move DODGER to the right
   * (maybe 4 pixels?). Use window.requestAnimationFrame()!
   */
   var left = positionToInteger(DODGER.style.left);
   left = left + 4;
   if (left > GAME_WIDTH - 40) {
     left = GAME_WIDTH - 40; // right bound of dodger is when left = 40px from right side of game window
   }
   DODGER.style.left = `${left}px`;

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
