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

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = dodgerLeftEdge + 40;
    
    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = rockLeftEdge + 20; 

    if (rockLeftEdge <= dodgerLeftEdge && rockLeftEdge >= dodgerLeftEdge || rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge || rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge) {
      return true;
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock';
  rock.style.left = `${x}px`;

  var top = 0;
  rock.style.top = top;
  
  GAME.appendChild(rock);

  function moveRock() {
  
    // moves the rock down 2px at a time   
    rock.style.top = `${top += 2}px`;
     
    if (checkCollision(rock)) {
      endGame();
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
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  clearInterval(gameInterval);
  
  // empty ROCKS array
  for (let i = 0; i < ROCKS.length; i++) {
    ROCKS[i].remove();
  }
  
  window.removeEventListener('keydown', moveDodger);
  alert('YOU LOSE!');
}

function moveDodger(e) {
  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */
  if (e.which === LEFT_ARROW) {
    moveDodgerLeft();
    e.preventDefault();
    e.stopPropagation();
  }
  if (e.which === RIGHT_ARROW)  {
    moveDodgerRight();
    e.preventDefault();
    e.stopPropagation();
  }
}

function moveDodgerLeft() {
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
  window.requestAnimationFrame(function() {
    const left = positionToInteger(DODGER.style.left);
    
    if (left > 0) {
      DODGER.style.left = `${left - 4}px`;
    } 
  });
}

function moveDodgerRight() {
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   window.requestAnimationFrame(function() {
     const left = positionToInteger(DODGER.style.left);
     
     if (left < 360) {
       DODGER.style.left = `${left + 4}px`;
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
