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
  // implement me!
  // use the comments below to guide you!
  const top = positionToInteger(rock.style.top);

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);

    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left);

    const rockRightEdge = rockLeftEdge + 20;

    if (rockLeftEdge < dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge ||
        rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge ||
        rockLeftEdge <= dodgerRightEdge && rockRightEdge > dodgerRightEdge) {
      return true;
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = `${x}px`;

  // Hmmm, why would we have used `var` here?
  var top = 0;

  rock.style.top = top;

  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */
  GAME.appendChild(rock);


  function moveRock() {

     if (checkCollision(rock)){
       endGame();
     }

     else if (top <= 400){
       top = positionToInteger(rock.style.top);

       function step() {
         rock.style.top = `${top + 2}px`;
         moveRock();
       }

       window.requestAnimationFrame(step);
     }

    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM GAME.
    **/
     else {
      rock.remove();
     }
  }

  // We should kick of the animation of the rock around here
  moveRock(rock);
  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
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

  for (let i = 0, l = ROCKS.length; i < l; i++){
    ROCKS[i].remove();
  }

  document.removeEventListener('keydown', moveDodger);

  alert("YOU LOSE!");
}


function moveDodger(e) {
  const code = e.which;

  if ([LEFT_ARROW, RIGHT_ARROW].indexOf(code) > -1) {
    e.preventDefault();
    e.stopPropagation();
  }

  if (code === LEFT_ARROW) {
    moveDodgerLeft();
  } else if (code === RIGHT_ARROW) {
    moveDodgerRight();
  }
}

function moveDodgerLeft() {
   var left = positionToInteger(DODGER.style.left);

   function step() {
     DODGER.style.left = `${left - 4}px`;
   }

   if (left > 0) {
     window.requestAnimationFrame(step)
   }
}

function moveDodgerRight() {

   var left = positionToInteger(DODGER.style.left);

   function step() {
     DODGER.style.left = `${left + 4}px`;
   }

   if (left < 360) {
     window.requestAnimationFrame(step)
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
  document.addEventListener('keydown', moveDodger);

  START.style.display = 'none';

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() * (GAME_WIDTH - 20)))
  }, 1000);
}
