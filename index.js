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
var gameInterval = null;
/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */


  function checkCollision(rock) {
  const top = positionToInteger(rock.style.top);
 
  if (top > 360) {
    
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = rockLeftEdge + 20;
    
              //There's been a collision if one of three things is true:
               return (
                ((rockLeftEdge <= dodgerLeftEdge) && (rockRightEdge >= dodgerLeftEdge))  ||
                ((rockLeftEdge >= dodgerLeftEdge) && (rockRightEdge <= dodgerRightEdge)) ||
                ((rockLeftEdge <= dodgerRightEdge) && (rockRightEdge >= dodgerRightEdge))
                );
    }
}



function createRock(x) {
  const rock = document.createElement('div');
  rock.className = 'rock';
  rock.style.left = `${x}px`;
  var top = 0;
  rock.style.top = top;
  GAME.appendChild(rock); 

  function moveRock() {
        
        
          rock.style.top = `${top += 2}px`;
          if (checkCollision(rock)) {    
             return endGame();                       
          }    
          
          if (top < 400) {
              window.requestAnimationFrame(moveRock);
          }
          else {
               rock.remove();
          }
             
               
        
      }
 
   
       window.requestAnimationFrame(moveRock);  
       ROCKS.push(rock);
       return rock;

}  
  
     
     
/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,// iterate through ROCKS[] rock.remove
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
var rock;

  clearInterval(gameInterval);
  
  for (let i=0; i<ROCKS.length; i++){
    rock.splice(i);
  }
  
  
  moveDodger.removeEventListener();
  
  
  window.alert("YOU LOSE!");  
  
  START.style.display = 'Play Again?';
  
} 

function moveDodger(e) {
  
  
  
  // implement me!
  /**
   * This function should call `moveDodgerLeft()`if the left arrow is pressed and 
   * `moveDodgerRight()` if the right arrow is pressed. 
   * (Check the constants we've declared for you above.)
   * And be sure to use the functions declared below!
   * const LEFT_ARROW = 37 // use e.which!
   * const RIGHT_ARROW = 39 // use e.which!
   * 
   */
}

function moveDodgerLeft() {

  var leftNumbers = dodger.style.left.replace('px', '');
  var left = parseInt(leftNumbers, 10);
 
  if (top < 400) {
              window.requestAnimationFrame(moveDodgerLeft);
         
   
 
     if (left > 0) {
       dodger.style.left = `${left - 4}px`;
     }

     document.addEventListener('keydown', function(e) {
     if (e.which === 37) {
       moveDodgerLeft();
     }
  });

  }
     else { 
       
       
  window.requestAnimationFrame(moveDodgerLeft);
     }
}




function moveDodgerRight() {
  
   var rightNumbers = dodger.style.right.replace('px', '');
  var right = parseInt(rightNumbers, 10);
 
  if (right > 0) {
    dodger.style.right = `${right - 4}px`;
  }

document.addEventListener('keydown', function(e) {
  if (e.which === 39) {
    moveDodgerRight();
  }
});
 
  
  
   // Use window.requestAnimationFrame()!
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
