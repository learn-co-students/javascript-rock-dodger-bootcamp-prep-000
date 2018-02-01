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

  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);

    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left);

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = rockLeftEdge + 20;

    if ( (rockRightEdge >= dodgerLeftEdge) && (rockLeftEdge <= dodgerRightEdge) ) {
      return true;
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div');
  rock.className = 'rock';
  rock.style.left = `${x}px`;
  var top = 0;
  rock.style.top = top;
  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */
  document.getElementById('game').appendChild(rock);
  ROCKS.push(rock);
  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
    rock.style.top = `${top += 2}px`;
    if (top < GAME_HEIGHT) {
      window.requestAnimationFrame(moveRock);
      if (checkCollision(rock) === true) {
      endGame();
      }
    }
    if (top >= GAME_HEIGHT) {
      ROCKS[0].remove();
    }

  }  
  moveRock();
  

  // Finally, return the rock element you've created
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
  ROCKS.forEach(function destroyAll(rock){
    rock.remove();
  });


  window.removeEventListener('keydown', moveDodger);
  window.alert("YOU LOSE!");

}

function moveDodger(e) {
  if (e.which == 39) {
      moveDodgerRight();
      e.preventDefault();
	  	e.stopPropagation();
    }
	else {
		if (e.which == 37) {
		moveDodgerLeft();
		e.preventDefault();
		e.stopPropagation();
    	}
    }
}

function moveDodgerLeft() {
    let left = positionToInteger(DODGER.style.left);

    if (left > 0) {
      window.requestAnimationFrame(function(){
        DODGER.style.left = `${left -= 4}px`;
      });
    }
  }

function moveDodgerRight() {
    let left = positionToInteger(DODGER.style.left);
    if (left < 360) {
      window.requestAnimationFrame(function(){
        DODGER.style.left = `${left += 4}px`;
      });
    }
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
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)));
  }, 1000);

}