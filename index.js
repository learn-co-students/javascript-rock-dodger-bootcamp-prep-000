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

var gameOver = false
var gameInterval = null

// ------------------------------------------------------------------------

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top);
  // rocks are 20px high
  // DODGER is 40px x 20 px
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = rockLeftEdge + 20;

    if ((rockLeftEdge < dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
        (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
        (rockLeftEdge < dodgerRightEdge && rockRightEdge >= dodgerRightEdge)) {
        return true;
    } else {
        return false;
    }
  }
}

function createRock(x) {
    const rock = document.createElement('div');
    rock.className = 'rock';
    rock.style.left = `${x}px`;

    var top = 0;
    rock.style.top = top + 'px';
    GAME.appendChild(rock);
    ROCKS.push(rock);
    function moveRock() {
        if (!gameOver) {
            if (checkCollision(rock)) {
                endGame()
                return
            } else if (positionToInteger(rock.style.top) < 400) {
                top += 2;
                rock.style.top = top + 'px';
                window.requestAnimationFrame(moveRock)
                return
            } else if (positionToInteger(rock.style.top) >= 380) {
                rock.remove();
                return
            }
        }
    }
    window.requestAnimationFrame(moveRock)
    return rock
}

function spaceRight(pos) {
    if (pos <= 356) {
        return true;
    }
    return false;
}

function spaceLeft(pos) {
    if (pos >= 4) {
        return true;
    }
    return false;
}

function moveDodger(e) {
    if (e.which == LEFT_ARROW) {
        moveDodgerLeft()
        e.stopPropagation();

    } else if (e.which == RIGHT_ARROW) {
        moveDodgerRight()
        e.stopPropagation();
        
    } else {
        return
    }
    e.preventDefault();
}

function moveDodgerLeft() {
    var vPos = positionToInteger(dodger.style.left);
    function step() {
        DODGER.style.left = vPos - 4 + 'px';
    }
    if (spaceLeft(vPos)) {
        window.requestAnimationFrame(step)
    }
}

function moveDodgerRight() {
    var vPos = positionToInteger(dodger.style.left);
    function step() {
        DODGER.style.left = vPos + 4 + 'px';
    }
    if (spaceRight(vPos)) {
        window.requestAnimationFrame(step)
    }
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}
/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
 function removeElementsByClass(className){
     var elements = document.getElementsByClassName(className);
     for (var i = 0; i < elements.length; i++){
         elements[i].remove()
     }
 }

function endGame() {
    gameOver = true;
    window.clearInterval(gameInterval);
    removeElementsByClass('rock');
    document.removeEventListener('keydown', moveDodger);
    alert('YOU LOSE!');
}

function start() {
  window.addEventListener('keydown', moveDodger);
  START.style.display = 'none'
  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
