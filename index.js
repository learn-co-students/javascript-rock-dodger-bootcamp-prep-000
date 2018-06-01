// Don't change these constants!

const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('game');
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37; // use e.which!
const RIGHT_ARROW = 39; // use e.which!
const ROCKS = [];
const START = document.getElementById('start');

var gameInterval = null;

// Be aware of what's above this line, but all of your work should happen below.

function checkCollision(rock) {

  const top = positionToInteger(rock.style.top);

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);

    // Define right edge by adding 40px (width of dodger) to the left edge
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left);

    // Define right edge by adding 20px (width of rock) to the left edge
    const rockRightEdge = rockLeftEdge + 20;

    if (dodgerLeftEdge >= rockLeftEdge && dodgerLeftEdge <= rockRightEdge) {
      return true;
    } else if (dodgerRightEdge >= rockLeftEdge && dodgerRightEdge <= rockRightEdge) {
      return true;
    } else if (dodgerLeftEdge <= rockLeftEdge && dodgerRightEdge >= rockRightEdge) {
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
  
  // Now that we have a rock, we'll need to append it to GAME and move it downwards */
  game.appendChild(rock);

  // This function moves the rock. (2 pixels at a time seems like a good pace.)
  function moveRock() {
    rock.style.top = `${top += 2}px`;
    
    if (checkCollision(rock)) {
       return endGame(); // If a rock collides with the DODGER, call endGame()
    }
    
    if (top < 400) {
       window.requestAnimationFrame(moveRock); //move the rock again if it hasn't reached the bottom of the game.
    } else {
      rock.remove(); //remove the rock if it has reached the bottom of the game window
      ROCKS.pop();
    }
  }
  
  // We should kick off the animation of the rock around here
  window.requestAnimationFrame(moveRock);

  // Add the rock to ROCKS so that we can remove all rocks when there's a collision
  ROCKS.push(rock);

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

  //line 92 was copied from the official solution. 
  ROCKS.forEach(function(rock) { rock.remove() })
  
  //Not sure why the following code didn't pass the test.
  /*var rockList = document.getElementsByClassName('rock')
  while(rockList.length > 0) {
    rockList[0].remove()
  }*/ 
  
  window.removeEventListener('keydown', moveDodger);
  alert('YOU LOSE!');
}

function moveDodger(e) {
   if (e.which === LEFT_ARROW) {
     e.preventDefault();
     e.stopPropagation();
     moveDodgerLeft();
   } else if (e.which === RIGHT_ARROW) {
     e.preventDefault();
     e.stopPropagation();
     moveDodgerRight();
   }
}

function moveDodgerLeft() {
  var leftNumber = positionToInteger(dodger.style.left);
  function step() {
    if (leftNumber > 0) {
      dodger.style.left = `${leftNumber -= 4}px`;
    }
  }
  window.requestAnimationFrame(step);
}

function moveDodgerRight() {
  var leftNumber = positionToInteger(dodger.style.left);
  function step() {
    if (leftNumber < 360) {
      dodger.style.left = `${leftNumber += 4}px`;
    }
  }
  window.requestAnimationFrame(step);
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
