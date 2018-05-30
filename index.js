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

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) { /* Maybe change that to >= for consistency; otherwise, it won't count as a collision if only the rock's bottom edge touches the dodger's top edge (without overlapping). */
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = dodgerLeftEdge + 40; //FIXED

    const rockLeftEdge = positionToInteger(rock.style.left);

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = rockLeftEdge + 20; //FIXED

    if ((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) || (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) || (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)) {
              /**
               * Think about it -- what's happening here?
               * There's been a collision if one of three things is true:
               * 1. The rock's left edge is < the DODGER's left edge,
               *    and the rock's right edge is > the DODGER's left edge;
               * 2. The rock's left edge is > the DODGER's left edge,
               *    and the rock's right edge is < the DODGER's right edge;
               * 3. The rock's left edge is < the DODGER's right edge,
               *    and the rock's right edge is > the DODGER's right edge
               */
      return true;
    }
  }
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
    if( checkCollision(rock) ) {
      endGame();
    }
    
    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */
    else if( top < GAME_HEIGHT ) { /* I think this actually passes the tests no matter what I value of top I check for here... */
      rock.style.top = `${top += 2}px`;
      window.requestAnimationFrame(moveRock);
    }
    
    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */
     else{
      rock.remove(); 
     }
  }

  // We should kick off the animation of the rock around here
  window.requestAnimationFrame(moveRock);
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
  //clearInterval(gameInterval);
  
  
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
     moveDodgerLeft();
     e.preventDefault();
     e.stopPropagation();
   }
   else if(e.which === RIGHT_ARROW) {
     moveDodgerRight();
     e.preventDefault();
     e.stopPropagation();
   }
}

function moveDodgerLeft() {
  // implement me!
  /**
   * This function should move DODGER to the left
   * (maybe 4 pixels?). Use window.requestAnimationFrame()!
   */
   
   var left = positionToInteger(DODGER.style.left);
   // I don't need the code below because positionToInteger does that for me.
   //var leftNumbers = DODGER.style.left.replace("px", "");
   //var left = parseInt(leftNumbers, 10);
   
   function stepLeft() {
     DODGER.style.left = `${left - 4}px`;
     
     /*DODGER.style.left = `${left -= 4}px`;
     if(left>0){
       window.requestAnimationFrame(stepLeft);
     } DO NOT IMPLEMENT THIS! It causes the dodger to go left automatically until it reaches the edge. However, I can't override it with the right arrow key until it's at the left edge.*/
     
     /*if(left > 0){
       DODGER.style.left = `${left - 4}px`;
       window.requestAnimationFrame(stepLeft);
     } This part of the code may not be needed. For whatever reason, it messes up the test for this function (the one that moves the dodger left), and it prevents movement of the dodger to the right. I had thought that it would just cause the dodger to move left automatically after I hit the left arrow key, but I was wrong. */
   }
   
  if(left > 0) {
    window.requestAnimationFrame(stepLeft);
  }
   
}

function moveDodgerRight() {
  // implement me!
  /**
   * This function should move DODGER to the right
   * (maybe 4 pixels?). Use window.requestAnimationFrame()!
   */
   
   var right = positionToInteger(DODGER.style.left);
   // I don't need the code below because positionToInteger does that for me.
   //var rightNumbers = DODGER.style.left.replace("px", "");
   //var right = parseInt(rightNumbers, 10);
   
   function stepRight() {
     DODGER.style.left = `${right + 4}px`;
   }
   
   /* Below, I could try having the program calculate the difference between the position of the dodger and the edge of the game for ANY position, ANY width of the dodger, and ANY width of the game. But, I'll limit it to just this game and avoid a bunch of unnecessary calculations on the program's part. I know that the dodger should move right as long as  right < (GAME_WIDTH - DODGER's width = 400 - 40 = 360px). */
   
   if(right < 360){
     window.requestAnimationFrame(stepRight);
   }
   /* I should note that there's a typo with one of the test descriptions. It should say that moveDodgerRight does not move the dodger RIGHT (not LEFT) if the dodger is touching the game's right edge. */
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
