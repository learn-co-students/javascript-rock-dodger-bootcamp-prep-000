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
  const top = positionToInteger(rock.style.top);
  const rockLeftEdge = positionToInteger(rock.style.left);
  const dodgerLeftEdge = positionToInteger(DODGER.style.left);
  const rockRightEdge = rockLeftEdge + 20;
  const dodgerRightEdge = dodgerLeftEdge + 40;
  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    
    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    
    // const rockLeftEdge = positionToInteger(rock.style.left); // moved up to clear rockLeftEdge not defined error
    
    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
     

    /* if (false /**
               * Think about it -- what's happening here?
               * There's been a collision if one of three things is true:
               * 1. The rock's left edge is < the DODGER's left edge,
               *    and the rock's right edge is > the DODGER's left edge;
               * 2. The rock's left edge is > the DODGER's left edge,
               *    and the rock's right edge is < the DODGER's right edge;
               * 3. The rock's left edge is < the DODGER's right edge,
               *    and the rock's right edge is > the DODGER's right edge
               *///)  {
      /* return true */
    }
    

    return (
      (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
      (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
      (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)
    );
}

function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = `${x}px`;

  // Hmmm, why would we have used `var` here?
  var top = 0;

  rock.style.top = top;

  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
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
     * we should call endGame()
     */
     rock.style.top = `${top += 2}px`;
     
     if(checkCollision(rock)) {
       return endGame();
     }

    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */
     
     if (top < GAME_HEIGHT) {
       window.requestAnimationFrame(moveRock);
     } else {
       rock.remove();
     }

    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */
  }

  // We should kick of the animation of the rock around here
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
  clearInterval(gameInterval);
  window.removeEventListener('keydown', moveDodger);
  ROCKS.forEach(function(rock) {rock.remove()});
  
  
  
}

function moveDodger(e) {
     const code=e.which;
   
   if ([LEFT_ARROW, RIGHT_ARROW].indexOf(code) > -1) {
     e.preventDefault();
     e.stopPropagation();
   }
   
   
   
  // document.addEventListener('keydown', function(e) {
     if (code === LEFT_ARROW){
       moveDodgerLeft();
     } else {
    if (code === RIGHT_ARROW) {
        moveDodgerRight();
     } 
     
     
     /* switch (e.which) {
       
      case LEFT_ARROW:
        moveDodgerLeft();
        break;
         
      case RIGHT_ARROW:
         moveDodgerRight();
         break;
       
       
     } */
     
     
   }
   
}

function moveDodgerLeft() {
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   
   var leftNumbers = dodger.style.left.replace(`px`, ``)
   var left = parseInt(leftNumbers, 10)
   if (left > 0) {
     dodger.style.left = `${left -4}px`
   }
   
}

function moveDodgerRight() {
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   
   // var right = 0
   
   // var rightNumbers = dodger.style.right.replace(`px`, ``)
   // var right = parseInt(rightNumbers, 10)
   // for some reason 'style.right' does nothing
   
   var leftNumbers = dodger.style.left.replace(`px`, ``)
   var left = parseInt(leftNumbers, 10)
   if (left < 360) {
     dodger.style.left = `${left +4}px`
   }
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0;
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
