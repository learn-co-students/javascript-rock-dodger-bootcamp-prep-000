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

    if ((rockLeftEdge < dodgerLeftEdge && rockRightEdge > dodgerLeftEdge) || 
      (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
      (rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerRightEdge)) { 
    
      return true;
    } 
  }
}

function createRock(x) {
  const rock = document.createElement('div')
  var top = 0;
  rock.className = 'rock';
  rock.style.left = `${x}px`;
  rock.style.top = `${top}px`;
  
  
  GAME.appendChild(rock);

  
   
  function moveRock() {
    
     if(checkCollision(rock)){
       endGame();
     }
     else if(top < GAME_HEIGHT){
       rock.style.top = `${top +=2}px`;
       window.requestAnimationFrame(moveRock);
     }
     else if(top >= GAME_HEIGHT){
       rock.remove();
     }
    
  }
  window.requestAnimationFrame(moveRock);
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
  for(let i=0; i < ROCKS.length; i++){
    ROCKS[i].remove();
  }
  window.removeEventListener('keydown', moveDodger);
  alert("You lost boy");
}

function moveDodger(e) {
  
  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */
   if(e.which === LEFT_ARROW){
    e.preventDefault(); e.stopPropagation();
    moveDodgerLeft();
   }
   if(e.which === RIGHT_ARROW){
    e.preventDefault(); e.stopPropagation();
    moveDodgerRight();
   }
}

function moveDodgerLeft() {
  
   var left = positionToInteger(DODGER.style.left);
   function step(){
     DODGER.style.left = `${left -=4}px`;
   }
     if (left > 0) {
       window.requestAnimationFrame(step);
     }
}

function moveDodgerRight() {
  var left = positionToInteger(DODGER.style.left);
  function step(){
    DODGER.style.left = `${left += 4}px`;
  }
   if (left < GAME_WIDTH - 40) {window.requestAnimationFrame(step);}
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