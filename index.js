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

const directions = { NONE:"Do nothing", MOVE_LEFT: "Moving Left", MOVE_RIGHT:"Moving right"}
var direction = directions.NONE;

var gameInterval = null


function checkCollision(rock) {

  const top = positionToInteger(rock.style.top)

  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20;

    if((rockLeftEdge >= dodgerLeftEdge && rockLeftEdge <= dodgerRightEdge)
    || (rockRightEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge))
    {
      return true;
    } else {
      return false;
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Hmmm, why would we have used `var` here?
  var top = 0

  rock.style.top = integerToPosition(top);

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

    top = top + 2;
    rock.style.top = integerToPosition(top);

     if(checkCollision(rock))
     {
       endGame();
     } else {
       if(top >= 400)
       {
         rock.parentNode.removeChild(rock);
       } else
       {
         window.requestAnimationFrame(moveRock);
       }
    }
  }

  window.requestAnimationFrame(moveRock);
  ROCKS.push(rock)
  return rock
}

function endGame() {
  clearInterval(gameInterval);
  window.removeEventListener('keydown', moveDodger);
  for(var i = 0; i < ROCKS.length; i++)
  {
    ROCKS[i].remove();

  }
  window.alert("YOU LOSE!");
  START.style.display = 'none';
}

function removeElement(elementToRemove){
  elementToRemove.remove();
}

var CurrentAnimationID;

function moveDodger(e) {
  // implement m

  var key = e.which;

  if(key == LEFT_ARROW)
  {
    console.log("left arrow pressed.");
    e.stopPropagation();
    e.preventDefault();
    if(direction === direction.MOVE_LEFT)
    {
      direction = directions.NONE;
      cancelAnimation();
    } else {
      direction = directions.MOVE_LEFT;
      moveDodgerLeft();
    }

  } else if (key == RIGHT_ARROW)
  {
    e.stopPropagation();
    e.preventDefault();
      console.log("Right arrow pressed.");
      if(direction === direction.MOVE_RIGHT)
      {
        direction = directions.NONE;
        cancelAnimation();
      } else {
        direction = directions.MOVE_RIGHT;
        moveDodgerRight();
      }
  }
}

function cancelAnimation() {
  clearInterval(CurrentAnimationID);
}


function startAnimation(animFunc){
  clearInterval(CurrentAnimationID);
  CurrentAnimationID = setInterval(animFunc, 100);
}

function moveDodgerLeft() {
  var leftPos = positionToInteger(DODGER.style.left);
  if(leftPos > 0)
  {
      DODGER.style.left = integerToPosition(leftPos - 4);
      if(direction === directions.MOVE_LEFT)
      {
        startAnimation(moveDodgerLeft);
      } else {
        cancelAnimation();
      }
  }
}

function moveDodgerRight() {
   var rightPos = positionToInteger(DODGER.style.left);
   if((rightPos + 40) < 400)
   {
     DODGER.style.left = integerToPosition(rightPos + 4);
     if(direction === directions.MOVE_RIGHT)
     {
       startAnimation(moveDodgerRight);
     } else {
       cancelAnimation();
     }
   }
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function integerToPosition(n){
  return `${n}px`
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
