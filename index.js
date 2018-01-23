const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null



function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20;

    if ((rockLeftEdge <= dodgerLeftEdge  && rockRightEdge >= dodgerLeftEdge) ||
        (rockLeftEdge >= dodgerLeftEdge  && rockRightEdge <= dodgerRightEdge) ||
        (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)) {
      return true
    }
  }
} // end f checkCollision



function createRock(x) {
  const rock = document.createElement('div')
  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = 0
  rock.style.top = top

  GAME.appendChild(rock);

  function moveRock() {
    if (checkCollision(rock)) endGame();
    if (top < GAME_HEIGHT) {
      top+=2;
      rock.style.top = top + "px";
      window.requestAnimationFrame(moveRock);
    } else {
      rock.remove();
    }
  } // end f moveRock

  window.requestAnimationFrame(moveRock);
  ROCKS.push(rock);
  return rock;

} // end f createRock



function endGame() {
  clearInterval(gameInterval);
  for (var i in ROCKS) {
    ROCKS[i].remove();
  }

  window.removeEventListener('keydown', moveDodger);

  alert('YOU LOSE!');
} // end f endGame



function moveDodger(e) {
  
} // end f moveDodger



function moveDodgerLeft() {
  
}



function moveDodgerRight() {
  
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
