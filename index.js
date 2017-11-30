const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('game');
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const ROCKS = [];
const START = document.getElementById('start');

var gameInterval = null;

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top);
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = rockLeftEdge + 20;

    if (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) {
      return true;
    }
    if (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) {
      return true;
    }
    if (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge) {
      return true;
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div');
  rock.className = 'rock';
  rock.style.left = `${x}px`;
  var top = 0;
  rock.style.top = `${top}px`;
  GAME.append(rock);

  function moveRock() {

    function step() {
      if(top < 380){
        top += 3;
        rock.style.top = `${top}px`;
        window.requestAnimationFrame(moveRock)
      } else {
        rock.remove();
      }
    }

    if(checkCollision(rock)) {
      endGame();
    }
    window.requestAnimationFrame(step)
  }

  window.requestAnimationFrame(moveRock)
  ROCKS.push(rock)
  return rock
}

function endGame() {
  window.clearInterval(gameInterval);
  window.removeEventListener('keydown', moveDodger)
  for (var i = 0; i < ROCKS.length; i++) {
    ROCKS[i].remove();
  }
  document.getElementById("gameover").innerHTML = "GAME OVER"
}

function moveDodger(e) {
  if(e.which === LEFT_ARROW) {
    e.preventDefault();
    e.stopPropagation();
    moveDodgerLeft();
  }
  if(e.which === RIGHT_ARROW) {
    e.preventDefault();
    e.stopPropagation();
    moveDodgerRight();
  }
}

function moveDodgerLeft() {
  function toTheLeft(){
    var dodgerLeftEdge = positionToInteger(DODGER.style.left)
    if(dodgerLeftEdge > 0) {
      dodgerLeftEdge -= 4
      DODGER.style.left = `${dodgerLeftEdge}px`
    }
  }
  window.requestAnimationFrame(toTheLeft)
}

function moveDodgerRight() {
  function toTheRight(){
    var dodgerLeftEdge = positionToInteger(DODGER.style.left)
    if(dodgerLeftEdge < 360) {
      dodgerLeftEdge += 4
      DODGER.style.left = `${dodgerLeftEdge}px`
    }
  }
  window.requestAnimationFrame(toTheRight)
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
