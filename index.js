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
  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  // If the top of the rock is > 360px from the top of the game,
  // a collision is possible

  const top = positionToInteger(rock.style.top)
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    // The DODGER is 40 pixels wide -- add 40 to left edge to get right edge
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    // The rock is 20 pixel's wide -- add 20 to left edge to get right edge
    const rockRightEdge = rockLeftEdge + 20;

    if ((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
        (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
        (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge))
      {
        return true;
      }
  }

  // there was no collission so return false
  return false;
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Use a var because top needs to be available globally so it can be incremented
  var top = 0
  rock.style.top = top

  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */
   //GAME.append(rock);
   GAME.appendChild(rock);
  /**
   * This function moves the rock. (2 pixels at a time)
   */
  function moveRock() {

    rock.style.top = `${top += 2}px`;
    /**
     * If a rock collides with the DODGER,
     * we should call endGame()
     */
     if (checkCollision(rock)) {
       endGame();
       return;
     }

    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */
     else if (top <= 380) {
       window.requestAnimationFrame(moveRock);
     }

    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */
     else if (top > 380) {
       rock.remove();
     }
  }

  // kick of the animation of the rock
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
  // stop the timer
  clearInterval(gameInterval);

  // remove all of the rocks from the array
  for (let i of ROCKS) {
    i.remove();
  }

  // Remove the moveDodger event listener
  window.removeEventListener('keydown', moveDodger);

  // alert the player that they lost
  //alert("YOU LOSE!");
  // Enhance the game by giving the ability to Start Over
  // move the dodger back to its starting place
  DODGER.style = "bottom: 0px; left: 180px";

  START.innerHTML = "Game Over!\nNew Game?"
  START.style.display = 'inline'

}

function moveDodger(e) {
  /**
   * This function will call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed.
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
    return;
  }
}

function moveDodgerLeft() {
  /**
   * This function moves the DODGER to the left by 4 pixels
   * as long as it isn't all the way left already
   */
  let left = positionToInteger(DODGER.style.left);
  if (left > 0) {
    DODGER.style.left = `${left-4}px`;
  }
}

function moveDodgerRight() {
  /**
   * This function moves the DODGER to the right by 4 pixels
   * as long as it isn't all the way right already
   */
  let left = positionToInteger(DODGER.style.left);
  if (left < 360) {
    DODGER.style.left = `${left+4}px`;
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
  window.addEventListener('keydown', moveDodger);

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
