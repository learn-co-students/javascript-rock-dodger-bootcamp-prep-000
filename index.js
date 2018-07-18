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

    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left);

    const rockRightEdge = rockLeftEdge + 20;

    if (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) {
      return true;
    } else if(rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) {
      return true;
    } else if(rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge) {
      return true;
    } else {
      return false;
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div');
  rock.className = 'rock';
  rock.style.left = `${x}px`;
  var rockTop = 0;
  rock.style.top = `0px`;

  function moveRock() {
    rockTop = positionToInteger(rock.style.top);
    rock.style.top = `${rockTop + 1}px`;
    
    if(checkCollision(rock) === true) {
      endGame();
    } else if(rockTop < 400) {
      //console.log('Moving the rock.')
      rock.style.top = `${rockTop + 1}px`;
      window.requestAnimationFrame(moveRock);
      //console.log(`${rock.style.top}`);
    } else if(rockTop === 400) {
      //console.log(`Removing the rock at position ${rockTop}.`);
      rock.remove();
      ROCKS.shift();
    }
    
    

  }
  
  moveRock();
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
  while(ROCKS.length > 0) {
    ROCKS[0].remove();
    ROCKS.shift();
  }
  window.removeEventListener('keydown', moveDodger, true);
  alert('YOU LOSE!');
}

function moveDodger(e) {
    if(e.which === LEFT_ARROW) {
      //console.log(e);
      moveDodgerLeft();
      e.preventDefault();
      e.stopPropagation();
    } else if(e.which === RIGHT_ARROW) {
      //console.log(e);
      moveDodgerRight();
      e.preventDefault();
      e.stopPropagation();
    }
}

function moveDodgerLeft() {
  var left = positionToInteger(dodger.style.left);
  if(left > 0) {
    dodger.style.left = `${left - 4}px`;
  }
}

function moveDodgerRight() {
  var left = positionToInteger(dodger.style.left);
  //console.log(left);
  if(left < 360) {
    dodger.style.left = `${left + 4}px`;
  }
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
