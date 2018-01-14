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

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left);

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = rockLeftEdge + 20;

    if (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge ) {
      return true;
    }
    if (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge){
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

  GAME.appendChild(rock)
  
  function moveRock() {
    rock.style.top = `${top + 2}px`
    if (checkCollision()) {
      return endGame()
    }
    if (top < 400) {
      window.requestAnimationFrame(moveRock);
    }
    if (top >= 400) {
      rock.remove()
    }
    
  }
  window.requestAnimationFrame(moveRock)

  
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
  ROCKS.forEach(function(rock) {rock.remove()});
  window.removeEventListener('keydown', moveDodger);
  alert("You Lose!");
}

function moveDodger(e) {
    if (e.which === LEFT_ARROW) {
        moveDodgerLeft();
        e.preventDefault();
        e.stopPropagation();
    }
    if (e.which === RIGHT_ARROW) {
      moveDodgerRight();
     e.preventDefault();
    }
}

function moveDodgerLeft(DODGER) {
    var leftNumbers = dodger.style.left.replace('px', '');
    var left = parseInt(leftNumbers, 10);
    var newLeft = left-4;
    function moveLeft() {
      if (left > 0){
    dodger.style.left = `${left - 1}px`;
      }
    if (left-newLeft < 4) {
      window.requestAnimationFrame(moveLeft);
    }
    }
    window.requestAnimationFrame(moveLeft);
    
}

function moveDodgerRight(DODGER) {
  var rightNumbers = dodger.style.left.replace('px', '');
  var right = parseInt(rightNumbers, 10);
  var newRight = right+40;
  function moveRight() {
    if(right < 360){
      dodger.style.left = `${right + 1}px`;
    }
    if (newRight-right < 4) {
      window.requestAnimationFrame(moveRight);
    }
    }
    window.requestAnimationFrame(moveRight);
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
