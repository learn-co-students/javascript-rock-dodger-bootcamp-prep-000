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
  
  const top = positionToInteger(rock.style.top);
 
  if (top > 360) {
  const dodgerLeftEdge = positionToInteger(DODGER.style.left);
               // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge? //---or could be (dodgerLeftEdge+40)
  const dodgerRightEdge = dodgerLeftEdge+40;
  const rockLeftEdge = positionToInteger(rock.style.left)
                      // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?//----or could be (rockLeftEdge+20)
  const rockRightEdge = rockLeftEdge+20;

    if (((rockLeftEdge<=dodgerRightEdge) && (rockRightEdge>=dodgerRightEdge))||
     ((rockLeftEdge<=dodgerLeftEdge) && (rockRightEdge>=dodgerLeftEdge))||
    ((rockLeftEdge<=dodgerRightEdge)&&(rockRightEdge>=dodgerRightEdge))){
      return true;
    }
    else
    {
        return false;
      }
  }
  
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Hmmm, why would we have used `var` here?-Because as the rock moves downwards,top value will be dynamic- changing
  var top = 0;
  rock.style.top = top;
  document.body.appendChild(rock);
  
      
      const check = checkCollision(rock);
      if(check===true){
       endGame();
      }
  
  function moveRock() {
     
     var top=positionToInteger(rock.style.top);
     if(top<400) {
        rock.style.top=`${top+=2}px`;
        window.requestAnimationFrame(moveRock);
     }
      else{
        rock.remove();
      }
  }window.requestAnimationFrame(moveRock);
 
  ROCKS.push(rock)

    return rock
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  document.removeEventListener('keydown', moveDodger);
  window.clearInterval(gameInterval);
  ROCKS.forEach(function(rock){
    rock.remove();
  });
  alert("YOU LOSE!");
}

function moveDodger(e) {
  if (e.which == 37 || e.which == 39) {
      e.preventDefault();
      e.stopPropagation();
      e.which == 37 ? moveDodgerLeft() : false;
      e.which == 39 ? moveDodgerRight() : false;
   }
}

function moveDodgerLeft() {
      var dodger=document.getElementById('dodger');
      
      function x() {
        var left=positionToInteger(DODGER.style.left);
        if(left>40) {
          DODGER.style.left=`${left-4}px`;
          window.requestAnimationFrame(x);
        }
      }
    window.requestAnimationFrame(x);
  }


  function moveDodgerRight() {
     var dodger=document.getElementById('dodger');
      
      function x() {
        var left=positionToInteger(DODGER.style.left);
        if(left<360) {
          DODGER.style.left=`${left+4}px`;
          window.requestAnimationFrame(x);
        }
      }
    window.requestAnimationFrame(x);
  }
  
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