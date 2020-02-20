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
  

  if (top > 360)
  {

    const rockLeftEdge = positionToInteger(rock.style.left)
    const dodgerLeftEdge =positionToInteger(DODGER.style.left)
    const dodgerRightEdge =dodgerLeftEdge + 40 ;
   
     const rockRightEdge = rockLeftEdge + 20; 
     
    if ((rockLeftEdge<=dodgerLeftEdge&&dodgerLeftEdge<= rockRightEdge) || (rockLeftEdge>=dodgerLeftEdge&& rockRightEdge<=dodgerRightEdge) || (rockLeftEdge<= dodgerRightEdge&&dodgerRightEdge<=rockRightEdge))
    
    {
      
      return true;
    }
    
  }
}


function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = 0

  rock.style.top = top

    GAME.appendChild(rock)
  
    function moveRock() 
        {
    
        rock.style.top = `${top+=2}px` 

        if(checkCollision(rock))
          {
             return  endGame();
           }

        // rock.style.top = `${top + 2}px` 
         if( top < GAME_HEIGHT)
            {
               window.requestAnimationFrame(moveRock)
            }else
            {
              rock.remove();
            }
        }


   window.requestAnimationFrame(moveRock)
   
  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision.
  
  ROCKS.push(rock);

  // Finally, return the rock element you've created.
  return rock;
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() 
{
  clearInterval(gameInterval);
  
  ROCKS.forEach(function(rock){rock.remove()})
  
  document.removeEventListener('keydown', moveDodger);
  
  alert ("YOU LOSE!");
}


function moveDodger(e) {
  // implement me!
  /*
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */
   if( e.which === LEFT_ARROW){
     
     e.preventDefault();
     e.stopPropagation();
     moveDodgerLeft()
     
   }
   if(e.which === RIGHT_ARROW)
   {
    e.preventDefault();
     e.stopPropagation();
     moveDodgerRight()
      
   }
}

function moveDodgerLeft() {
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   
 window.requestAnimationFrame(function step(){
var dodgerLeftEdge = positionToInteger(DODGER.style.left)

   if (dodgerLeftEdge  > 0) 
   {  
    DODGER.style.left = `${dodgerLeftEdge - 4}px` 
   }
   
 })
  
}
   
function moveDodgerRight() {
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
    window.requestAnimationFrame(function step(){
    var dodgerLeftEdge = positionToInteger(DODGER.style.left)
   if (dodgerLeftEdge  < 360) 
   {  
    DODGER.style.left = `${dodgerLeftEdge + 4}px` 
   }
   })
}
/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p)
{
  return parseInt(p.split('px')[0]) || 0;
}

function start() 
{
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none';

    gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *(GAME_WIDTH-20)))
  },1000);
}
