const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('game');
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37; // use e.which!
const RIGHT_ARROW = 39; // use e.which!
const ROCKS = [];
const START = document.getElementById('start');

var gameInterval = null;

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top);

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = rockLeftEdge + 20;

    return (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge ||
            rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge ||
            rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge);
  }
}

function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = `${x}px`;

  var top = rock.style.top = 0;

  GAME.appendChild(rock);

  function moveRock() {
    rock.style.top = `${top += 2}px`;

    if (checkCollision(rock)){
      return endGame();
    }

    if (top <= GAME_HEIGHT){
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

  // for (let i = 0, l = ROCKS.length; i < l; i++){
  //   ROCKS[i].remove();
  // }

  ROCKS.forEach(function(rock) { rock.remove() })
  ROCKS.length = 0;

  document.removeEventListener('keydown', moveDodger);

  START.innerHTML = "Play Again?";
  START.style.display = 'inline';

  return alert("YOU LOSE!");
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
   const left = positionToInteger(DODGER.style.left);

   function step() {
     DODGER.style.left = `${left - 4}px`;
   }

   if (left > 0) {
     window.requestAnimationFrame(step)
   }
}

function moveDodgerRight() {
   const left = positionToInteger(DODGER.style.left);

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
