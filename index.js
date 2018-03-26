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



function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20;

    if (
      (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
      (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
      (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)) {
        return true
      }
  }
}

function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock'
  rock.style.left = `${x}px`


  var top = 0

  rock.style.top = top
  
  GAME.appendChild(rock);

  function moveRock() {
    rock.style.top = `${top+=2}px`;
    
    if (checkCollision(rock)){
      return endGame();
    }
    
    else if (rock<GAME_HEIGHT){
      window.requestAnimationFrame(moveRock);
    }
      else{
      return rock.remove();
    
    }
  }

  
  window.requestAnimationFrame(moveRock);
  ROCKS.push(rock);
 
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
 
 for (var i=0; i<ROCKS.length; i++){
   ROCKS[i].remove();
 }

window.removeEventListener('keydown', moveDodger)
 
alert('YOU LOSE!') 
  
  
    
    
  
  
}

function moveDodger(e) {
  
  // * if the left arrow is pressed and `moveDodgerRight()`
  // * if the right arrow is pressed. (Check the constants
  // * we've declared for you above.)
  // * And be sure to use the functions declared below!
  // */
 
    if (e.which===RIGHT_ARROW){
       moveDodgerRight();
       e.preventDefault();
       
    }
    else if (e.which===LEFT_ARROW){
        moveDodgerLeft();
         e.preventDefault()
         e.stopPropagation();
    }
 
}

function moveDodgerLeft() {
  // // implement me!
  // /**
  // * This function should move DODGER to the left
  
  var leftNumber = DODGER.style.left.replace('px', '');
  var left = parseInt(leftNumber, 10);
  
  if (left>0){
   DODGER.style.left= `${left-4}px`
   ;
   window.requestAnimationFrame(moveDodgerLeft);
  }
  // * (mabye 4 pixels?). Use window.requestAnimationFrame()!
  // */
  
}

function moveDodgerRight() {
  var leftNumber =DODGER.style.left.replace('px', '');
  var left = parseInt(leftNumber, 10)
  if (left<360){
   DODGER.style.left= `${left+4}px`
    
    window.requestAnimationFrame(moveDodgerRight)
  }
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   
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
