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

// Blah blah test, made a comment. 

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

 var leftDown = false;
 var rightDown = false;
 var isMoving = false;
 var dodgerSpeed = 4;

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

    if (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) {
      return true;
    } else if (rockLeftEdge >= dodgerLeftEdge && rockRightEdge || dodgerRightEdge) {
      return true; 
    } else if (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge) {
      return true;
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

  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {

    rock.style.top = `${top += 2}px`;
    // implement me!
    // (use the comments below to guide you!)
    /**
     * If a rock collides with the DODGER,
     * we should call endGame().
     */
    if (checkCollision(rock)) {
      return endGame();
    }

    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */
    if (top < GAME_HEIGHT) {
      window.requestAnimationFrame(moveRock); 
    } else {
      /**
      * But if the rock *has* reached the bottom of the GAME,
      * we should remove the rock from the DOM.
      */
      rock.remove(); 
    }
  }

  // We should kick off the animation of the rock around here.
  window.requestAnimationFrame(moveRock); 

  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision.
  ROCKS.push(rock)

  // Finally, return the rock element you've created.
  return rock
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {

  console.log("END GAME!"); 

  clearInterval(gameInterval); 
  removeEventListener('keydown', moveDodger); 

  ROCKS.forEach(function(rock) {
    rock.remove(); 
  })
}

function moveDodger(e) {
  switch(e.which) {
    case LEFT_ARROW:

      leftDown = true;
      rightDown = false;

      if (!isMoving) {
        moveDodgerLeft();
        isMoving = true;
      }  

      break;

    case RIGHT_ARROW:

      leftDown = false;
      rightDown = true;

      if (!isMoving) {
        moveDodgerRight();
        isMoving = true;
      }  
      break;
  }
}

function moveDodgerLeft() {
  var currentPos = positionToInteger(DODGER.style.left);

  function step() {
    if (leftDown) {
      DODGER.style.left = `${currentPos -= dodgerSpeed}px`;
      window.requestAnimationFrame(step); 
    } 
  }
  
  step(); 
}

function moveDodgerRight() {
  var currentPos = positionToInteger(DODGER.style.left);

  function step() {
    if (rightDown) {
      DODGER.style.left = `${currentPos += dodgerSpeed}px`;
      window.requestAnimationFrame(step); 
    } 
  }

  step(); 
}

function stopDodger() {
  leftDown = false;
  rightDown = false;
  isMoving = false;
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
  window.addEventListener("keyup", stopDodger);

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
