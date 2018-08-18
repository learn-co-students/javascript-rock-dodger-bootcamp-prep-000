
const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('game');
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37; // use e.which!
const RIGHT_ARROW = 39; // use e.which!
const ROCKS = [];
const START = document.getElementById('start');

var gameInterval = null;


function checkCollision(rock) {
  
  const top = positionToInteger(rock.style.top) // this is weird because I did not create the rock yet
  
  if (top > 360) {
    const rockLeftEdge = positionToInteger(rock.style.left)
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40; 
    const rockRightEdge = rockLeftEdge + 20;
    
    if ((( rockLeftEdge <= dodgerLeftEdge ) && (rockRightEdge >= dodgerLeftEdge)) || ((rockLeftEdge >= dodgerLeftEdge) && (rockRightEdge <= dodgerRightEdge)) || ((rockLeftEdge <= dodgerRightEdge) && (rockRightEdge >= dodgerRightEdge))) { return true } else { return false}
}
 else {return false} 
}

 
function createRock(x) {
  
  const rock = document.createElement('div')
  rock.className = 'rock'
  rock.style.left = `${x}px`
  var topZero = 0;
  rock.style.top = `${topZero}px`
  GAME.appendChild(rock)

  
  function moveRock() {
            rock.style.top = `${topZero += 2}px`
             if (top < 400){
                if (checkCollision(rock)){
                  endGame();
                } else {
                 window.requestAnimationFrame(moveRock)
                } 
              } else {rock.remove()}
          }

  window.requestAnimationFrame(moveRock)
  ROCKS.push(rock)
  return rock

}



 
function endGame() {
  clearInterval(gameInterval);
  
  for (var i = 0; i < ROCKS.length ; i++ ) {
    ROCKS[i].remove()
  }
  
  window.removeEventListener('keydown', moveDodger);
  alert('You Lose!');
  
}

function moveDodger(e) {

  
  if (e.which === LEFT_ARROW){
    moveDodgerLeft();
    e.preventDefault()
    e.stopPropagation();
  }
  else if (e.which === RIGHT_ARROW){
    moveDodgerRight();
    e.preventDefault()
    e.stopPropagation();
  }
}

function moveDodgerLeft() {
 var leftMove = parseInt(DODGER.style.left)
 function leftStep(){
   DODGER.style.left = `${leftMove - 4}px`
   if (leftMove > 0 )
   window.requestAnimationFrame(leftStep)
 }
 window.requestAnimationFrame(leftStep)
}
  
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */


function moveDodgerRight() {
 var rightMove = parseInt(DODGER.style.left)
 function rightStep(){
   DODGER.style.left = `${rightMove + 4}px`
   if (rightMove < 360 )
   window.requestAnimationFrame(rightStep)
 }
 window.requestAnimationFrame(rightStep)
}

  // implement me!
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
/*
  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  
    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    if (false 
               * Think about it -- what's happening here?
               * There's been a collision if one of three things is true:
               * 1. The rock's left edge is < the DODGER's left edge,
               *    and the rock's right edge is > the DODGER's left edge;
               * 2. The rock's left edge is > the DODGER's left edge,
               *    and the rock's right edge is < the DODGER's right edge;
               * 3. The rock's left edge is < the DODGER's right edge,
               *    and the rock's right edge is > the DODGER's right 
               
                  * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
       
    // implement me!
    // (use the comments below to guide you!)
    /**
     * If a rock collides with the DODGER,
     * we should call endGame()
     */

    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */

    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */

  // We should kick of the animation of the rock around here

  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
  /**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 * 
 *   // implement me!
  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */



