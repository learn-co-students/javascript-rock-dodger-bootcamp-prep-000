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
  const topRock = positionToInteger(rock.style.top);
  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (topRock > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = rockLeftEdge + 20;
    if (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge || rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge || rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge) {
      return true;
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')
  rock.className = 'rock'
  rock.style.left = `${x}px`
  var topOfRock = 0;
  rock.style.top = `${topOfRock}px`;
  GAME.append(rock);

  function moveRock(rock) {
// something wrog with the loop below - need to slow down!
    function step() {
      rock.style.top = `${topOfRock += 2}px`;
      if (checkCollision(rock) === true) {
         endGame();
         return;
       }
      if (topOfRock >= 380) {
        rock.remove();
      }
      if (topOfRock <= 380) {
          window.requestAnimationFrame(step);
          }
    }
      window.requestAnimationFrame(step);
    }

  // We should kick of the animation of the rock around here
  ROCKS.push(rock);
  moveRock(rock);
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
  $(".rock").remove();
  window.removeEventListener('keydown', moveDodger);
  alert("YOU LOSE!");
}

function moveDodger(e) {
  document.addEventListener('keydown', function(e){
     if(e.which === LEFT_ARROW) {
       moveDodgerLeft();
     }
     if (e.which === RIGHT_ARROW) {
       moveDodgerRight();
     }
   })
}

function moveDodgerLeft() {
    var left = positionToInteger(DODGER.style.left);
  function step() {
    DODGER.style.left = `${left -= 4}px`;
  }
  window.requestAnimationFrame(step);
}


function moveDodgerRight() {
  var left = positionToInteger(DODGER.style.left);
function step() {
  DODGER.style.left = `${left += 4}px`;
}
window.requestAnimationFrame(step);
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
