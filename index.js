/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('game');
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37; // use e.which!
const RIGHT_ARROW = 39; // use e.which!
const ROCKS = [];
const START = document.getElementById('start');

var gameInterval = null;

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20;

    var collision = (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
      (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) || (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)
    return collision;
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Hmmm, why would we have used `var` here?
  var top = 0;

  rock.style.top = `${top}px`

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
    // implement me!
    // (use the comments below to guide you!)
    /**
     * If a rock collides with the DODGER,
     * we should call endGame()
     */
     var collision = checkCollision(rock);
     if(collision){
       endGame();
     }
    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */
     top = top + 2;
     rock.style.top = `${top}px`;
     if(top > GAME_HEIGHT){
        rock.remove();
     } else{
       window.requestAnimationFrame(moveRock);
     }
    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */
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
  for(let i =0;i<ROCKS.length;i++){
    (ROCKS[i]).remove();
  }
  window.removeEventListener('keydown', moveDodger);
  window.clearInterval(gameInterval);
  alert('YOU LOSE!');
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
   if(e.which === LEFT_ARROW){
     e.preventDefault();
     e.stopPropagation();
     moveDodgerLeft();
   } else if(e.which === RIGHT_ARROW){
     e.preventDefault();
     e.stopPropagation();
     moveDodgerRight();
   }
}

function moveDodgerLeft() {
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   function move(){
     var position = positionToInteger(dodger.style.left);
     if(position > 0){
       DODGER.style.left = `${position - 4}px`;
     }
   }
   window.requestAnimationFrame(move);
}

function moveDodgerRight() {
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   function move(){
     var position = positionToInteger(dodger.style.left);
     if(position < 360){
        DODGER.style.left = `${position + 4}px`;
     }
   }
   window.requestAnimationFrame(move);
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
