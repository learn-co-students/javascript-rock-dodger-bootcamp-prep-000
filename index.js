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
  // use the comments below to guide you!
  const top = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    // (FIXED) FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    // (FIXED) FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = rockLeftEdge + 20;

if ((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) || (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) || (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)) {
  return true
  } else {
  return false
  }  
}

// NOTE** --> Here 360 is the amt the rock traveled, once it's able to collide, this is when the function starts testing for collisions. 

// NOTE** You can do the if conditional... return true or else if false... but it is unnecessary here because logical operators return a boolean already. Parenthesis are optional in this case. 
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Measuring by the left side of the rock, so 0 to 380 is the position set, so rock doesn't go off screen when created
  // Hmmm, why would we have used `var` here?
  var top = 0

  GAME.appendChild(rock)
  
  

  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */

  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
   // IMPNOTE**: createRock & moveRock formatted in this way (moveRock within createRock) so that it can follow the function move() & step() example 
  // ImpNOTE: Recursion = A function calling itself and Callback is passing a function in it's entirety into another function (Remember function vs function() example)
   function moveRock() {
    
    // SideNote: move function is the overall function but lines 12, 13 
    // actually calls the step function and the if conditional creates a boundary 
    // (use the comments below to guide you!)
    if (checkCollision() === false) {
    rock.style.top = `${top += 2}px`
    
       if (top < 380) {
         window.requestAnimationFrame(moveRock)
       }
       
       if (top === 380) {
         rock.remove()
       }
    } else {
      endGame();
    }    
 
    //add a if statement here that checks collision method and if true, calls endGame()
    /**
     * If a rock collides with the DODGER,
     * we should call endGame()
     */
    // Basically saying if no collision keep moveRock() going 
    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */
    
// you need an else here (from the if from 88)
    
    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */
    }
    
  window.requestAnimationFrame(moveRock)   

  // We should kick off the animation of the rock around here

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
  oldRocks = []
  clearInterval(gameInterval)
  
  for (i = 0; i < ROCKS.length; i++) {
    oldRocks.push(ROCKS[i])
    oldRocks[i].remove()
  } 
  
  //use clearInterval()
  // Pass each rock from ROCKS and remove them individually
  alert("YOU LOSE!");
  
}

// Ask what those stopPropagation and preventDefault is..., also why window.requestAnimationFrame is necessary...

function moveDodger(e) {
   
  if (e.which === LEFT_ARROW) {
    moveDodgerLeft();
    e.stopPropagation();
    e.preventDefault();
  } 
  
  if (e.which === RIGHT_ARROW) {
    moveDodgerRight();
    e.stopPropagation();
    e.preventDefault();
  }
  
  if (e.which !== LEFT_ARROW || e.which !== RIGHT_ARROW) {
    return null 
  }
}  

  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */


function moveDodgerLeft() {
     var dodgerLeftEdge = positionToInteger(DODGER.style.left) 
      
      function left() {
      if (dodgerLeftEdge > 0) {
         dodger.style.left = `${dodgerLeftEdge - 7}px`
         }
   }
   window.requestAnimationFrame(left)
}
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */


function moveDodgerRight() {
     var dodgerLeftEdge = positionToInteger(DODGER.style.left)
     var dodgerRightEdge = dodgerLeftEdge + 40
      function right() {
      if (dodgerRightEdge < 360) {
         dodger.style.left = `${dodgerLeftEdge + 7}px`
         }
   }
   window.requestAnimationFrame(right)
}
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */


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
