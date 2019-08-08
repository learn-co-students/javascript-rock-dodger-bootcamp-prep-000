
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37
const RIGHT_ARROW = 39
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
    } else if (rockLeftEdge > dodgerLeftEdge && rockRightEdge < dodgerRightEdge) {
      return true;
    } else if (rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerRightEdge) {
      return true;
    } else {
      return false;
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Hmmm, why would we have used `var` here?
  var top = 0;

  dodger.style.bottom = top

  GAME.append(rock);
  moveRock();

  function moveRock() {
    for (var i = 0; i < ROCKS.length; i++) {
      var rockCheck = ROCKS[i];
      if (checkCollision(rockCheck)) {
        ROCKS = [];
        endGame();
      } else if ((positionToInteger(rockCheck.style.bottom)) === 400) {
        GAME.remove(rockCheck);
      }
    }
    move(ROCKS);
  }

  function move(ROCKS) {
    for (var i = 0; i < ROCKS.length; i++) {
      var rockToMove = ROCKS[i];
      var bottom = positionToInteger(rockToMove.style.bottom);
      function step(rockToMove) {
        bottom = `${bottom += 2}px`
        rockToMove.bottom;
        // window.requestAnimationFrame(rockToMove.bottom)
      }
    }
  ROCKS.push(rock)
  return ROCKS;
  }
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
}

function moveDodger(e) {
  document.addEventListener('keydown', function(e) {
    if (e.which === LEFT_ARROW) {
      moveDodgerLeft()
    }
  })

  document.addEventListener('keydown', function(e) {
    if (e.which === RIGHT_ARROW) {
      moveDodgerRight()
    }
  })
}

function moveDodgerLeft() {
  var leftNumbers = dodger.style.left.replace('px', '');
  var left = parseInt(leftNumbers, 10);

  function leftStep() {
    dodger.style.left = `${left - 5}px`;

    if (left > 0) {
      window.requestAnimationFrame(leftStep);
    }
  }
  window.requestAnimationFrame(leftStep);
}

function moveDodgerRight() {
  var leftNumbers = dodger.style.left.replace('px', '');
  var left = parseInt(leftNumbers, 10);

  function leftStep() {
    dodger.style.left = `${left + 5}px`;

    if (left < 360) {
      window.requestAnimationFrame(leftStep);
    }
  }
  window.requestAnimationFrame(leftStep);
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
