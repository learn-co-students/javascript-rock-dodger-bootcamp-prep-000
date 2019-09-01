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

    if ((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) || (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) || (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)) {return true
    } else {
      return false
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`
  rock.style.top = '0px';
  GAME.appendChild(rock);

  // Hmmm, why would we have used `var` here?
  var top = 0

  

  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */
  

  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
    rock.style.top = `${top += 2}px`;
    
    if (checkCollision(rock)) {
      endGame();
    }
    
    if (top <= GAME_HEIGHT) {
      rock.remove(); 
    } else {
      window.requestAnimationFrame(moveRock);
    }
  

  // We should kick of the animation of the rock around here
  
  window.requestAnimationFrame(moveRock);
  
  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
  
  ROCKS.push(rock)

  // Finally, return the rock element you've created
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
  var act = {37: moveDodgerLeft, 38: moveDodgerRight};
  if (e.which == 37 || e.which == 39) {
    e.preventDefault();
    e.stopPropagation();
    e.which == 37 ? moveDodgerLeft() : false;
    e.which == 39 ? moveDodgerRight() : false;
  }
  }
  
  
}

function moveDodgerLeft() {
  var move = 5;
  function stepLeft() {
    if (positionToInteger(DODGER.style.left) > 0) {
      DODGER.style.left = `${positionToInteger(DODGER.style.left) - 1}px`;
    } else {
      return
    }
    move-- > 0 ? window.requestAnimationFrame(stepLeft) : false;
  }

window.requestAnimationFrame(stepLeft);

}

function moveDodgerRight() {
  var move = 5;
  function stepRight() {
    if (positionToInteger(DODGER.style.left) < GAME_WIDTH - 40) {
      DODGER.style.left = `${positionToInteger(DODGER.style.left) + 1}px`;
    } else {
      return
    }
    
     move-- > 0 ? window.requestAnimationFrame(stepRight) : false;
  }
  
  window.requestAnimationFrame(stepRight);
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
