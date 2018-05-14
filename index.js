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
  const top = positionToInteger(rock.style.top)
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20;
      if (rockLeftEdge < dodgerLeftEdge && rockRightEdge > dodgerLeftEdge) {
      return true;
      
    } else if (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) {
      return true;
      
    } else if (rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerRightEdge)
      return true;
      
   } else {
      return false;
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  // height of rocks relative to top of game
  var top = rock.style.top = 0 ;
 
  GAME.appendChild(rock);
  
  function moveRock() {
    rock.style.top = `${top += 2}px`
       
       if (checkCollision(rock)) {
       return endGame();
       }
  
       if (top < GAME_HEIGHT) {
         window.requestAnimationFrame(moveRock);
       } else {
         rock.remove();
       }
  }
  window.requestAnimationFrame(moveRock);
  ROCKS.push(rock);
  return rock;
}

/**
 * End the game by clearing `gameInterval`, x
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.x
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  const rock = document.createElement('div');
  clearInterval(GAME);
  
  ROCKS.forEach(function(rock) {
    rock.remove();
  });
  
  removeEventListener('keydown', moveDodger);
  
  alert ("YOU LOSE!");
}


function moveDodger(e) {
    if (e.which === LEFT_ARROW) {
      e.preventDefault();
      e.stopPropagation();
      moveDodgerLeft();
    } else {
      if (e.which === RIGHT_ARROW) {
      e.preventDefault();
      e.stopPropagation();
      moveDodgerRight();
    }
  }
}

function moveDodgerLeft() {
   window.requestAnimationFrame(function () {
   var leftNumbers = DODGER.style.left.replace('px', '') //replaces string
   var left = parseInt(leftNumbers, 10) //converts string to integer radix 10
   if (left > 0) {
      DODGER.style.left=`${left-4}px`
   }
  });
}

function moveDodgerRight() {
  window.requestAnimationFrame(function () {
    var leftNumbers = DODGER.style.left.replace('px', '') //replaces string
    var left = parseInt(leftNumbers, 10) //converts string to integer radix 10
    if (left < 360) {
      DODGER.style.left=`${left+4}px`
    }
  });
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
