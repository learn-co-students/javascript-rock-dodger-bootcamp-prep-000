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

    return ( /**
               * Think about it -- what's happening here?
               * There's been a collision if one of three things is true:
               * 1. The rock's left edge is < the DODGER's left edge,
               *    and the rock's right edge is > the DODGER's left edge;
               * 2. The rock's left edge is > the DODGER's left edge,
               *    and the rock's right edge is < the DODGER's right edge;
               * 3. The rock's left edge is < the DODGER's right edge,
               *    and the rock's right edge is > the DODGER's right edge.
               */
      (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
      (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
      (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)
     )
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
  /**
   * forgot to appendChild
   */
  GAME.appendChild(rock)

  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
    // implement me!
    // (use the comments below to guide you!)
    /**
     * If a rock collides with the DODGER,
     * we should call endGame().
     */
    rock.style.top = `${top += 2}px`;
    if (checkCollision(rock) === true) {
      return endGame();
    }
    /**
     * as we see else if did not work out as we had to
     * see if the top hit the bottom and the only way is 
     * by finding out if it is less than GAME_HEIGHT
     * because once it equals GAME_HEIGHT it is at the bottom 
     * since the rock is moving downwards
     */
     
    if (top < GAME_HEIGHT){
      window.requestAnimationFrame(moveRock())
    } else {
      /** As we see we dont use delete rock as 
       * that is not a function
       * we use the method .remove()
       */
      rock.remove()
    }
    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */

    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM.
     */
  }

  // We should kick off the animation of the rock around here.
  window.requestAnimationFrame(moveRock)
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
  clearInterval(gameInterval)
  
  ROCKS.forEach(function(rock) { rock.remove() })
  
  document.removeEventListener('keydown', moveDodger)
  
  /** the comments forgot to add to change the innerHTML to 
   * Play again once the game in over 
   * also to change the display to inline
   */
  START.innerHTML = 'Play again?'
  START.style.display = 'inline'
  // return alert instead of window.alert
  return alert("YOU LOSE!")
}

/** with this problem we see two errors
 * one that maximum call stack size exceeded 
 * so that means we need to stopPropagation at a certain point 
 * if not it will keep checking for collisions 
 * a way to do this is making an if statement that checks the indexOf
 * and once it is greater than -1 so 0 and above 
 * will end propagation so it does not keep checking
 */

function moveDodger(e) {
  // implement me!
  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */
  if ([LEFT_ARROW, RIGHT_ARROW].indexOf(e.which) > -1) {
    e.stopPropagation();
    e.preventDefault();
  }
   // as we see moveDodgerRight is not a good addon as all we needed
   // rememeber to read accordingly 
   // Better to next time use the constant and we will check on test
   if (e.which === 37) {
     moveDodgerLeft()
   }
   
   if (e.which === 39) {
     moveDodgerRight()
   }
}

/** a big issue with this problem is that we tend to use
    * function step when we need to animate it 
    * Also we need to look at positionToInteger and see we
    * have promoted left 
    * therefore we should use const left to move the integer 
    * the requestAnimationFrame we are looking for is a function
    * since we dont have a function to move left 4 pixels we have
    * to create one 
    * to move to the left 4 we subtract 4 from left 
    * to move right we would add 4 to left
    * Now in moving to the right we have to see if left is 
    * less than the GAME_HEIGHT which is 360px after you
    * subtract the 20px from DODGER and rock 
*/

function moveDodgerLeft() {
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   window.requestAnimationFrame(function() {
     const left = positionToInteger(DODGER.style.left)
     
     if (left > 0) {
       DODGER.style.left = `${left - 4}px`;
     }
   })
}

function moveDodgerRight() {
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
  window.requestAnimationFrame(function() {
    const left = positionToInteger(DODGER.style.left)
  
    if (left < 360) {
      DODGER.style.left = `${left + 4}px`;
    }
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
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
