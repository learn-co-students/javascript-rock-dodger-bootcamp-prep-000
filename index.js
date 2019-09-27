/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('game');
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37; // use e.which!
const RIGHT_ARROW = 39; // use e.which!
const ROCKS = [];
const START = document.getElementById('start');

var gameInterval = null;

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top);

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
   
    const dodgerRightEdge = dodgerLeftEdge+40;

    const rockLeftEdge = positionToInteger(rock.style.left);

    const rockRightEdge = rockLeftEdge+20;

    if ( ((rockLeftEdge<=dodgerLeftEdge)&&(rockRightEdge>=dodgerLeftEdge))||((rockLeftEdge>=dodgerLeftEdge)&&(rockRightEdge<=dodgerRightEdge))||((rockLeftEdge<=dodgerRightEdge)&&(rockRightEdge>=dodgerRightEdge))) {
      return true;
    }
    return false;
  }
}

function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = `${x}px`;

  var top = 0;

  rock.style.top = top;

  GAME.appendChild(rock);
  top = top+2;
     rock.style.top = `${top}px`;

  function moveRock() {
    top = top+2;
     rock.style.top = `${top}px`;
     if (checkCollision(rock))
     {
       return endGame();
     } else if (top < GAME_HEIGHT)
     {
        window.requestAnimationFrame(moveRock);
        
     } else 
     {
       GAME.removeChild(rock);
     }
     
  }

  window.requestAnimationFrame(moveRock);
  
  ROCKS.push(rock);

  return rock;
}


function endGame() {
  clearInterval(gameInterval);
  for (var x = 0; x <ROCKS.length; x++)
  {
    ROCKS[x].remove();
  }
  window.removeEventListener('keydown', moveDodger);
  alert("YOU LOSE!");
  
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
   if(e.which===37)
   {
     e.stopPropagation();
     e.preventDefault();
     moveDodgerLeft();
   }
   else if (e.which ===39)
   {
     e.stopPropagation();
     e.preventDefault();
     moveDodgerRight();
   }
}

function moveDodgerLeft() {
 
   window.requestAnimationFrame(function(){if(positionToInteger(DODGER.style.left)>0)DODGER.style.left=`${positionToInteger(DODGER.style.left)-4}px`});
   
}

function moveDodgerRight() {
  
   window.requestAnimationFrame(function(){if(positionToInteger(DODGER.style.left)<360)DODGER.style.left = `${positionToInteger(DODGER.style.left)+4}px`});
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0;
}

function start() {
  window.addEventListener('keydown', moveDodger);

  START.style.display = 'none';

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))}, 1000);
}
