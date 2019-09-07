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
  const top = positionToInteger(rock.style.top);
  // rocks are 20px high, DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    //The DODGER is 40 pixels wide - get the right edge
    const dodgerRightEdge = positionToInteger(DODGER.style.left) + 40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    //The rock is 20 pixel's wide -  get the right edge
    const rockRightEdge = positionToInteger(rock.style.left) + 20;
    if (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) {
      return true
    } else if (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) {
      return true
    } else if (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge) {
      return true
    } else {
      return false
    }
}
}

function createRock(x) {
  const rock = document.createElement('div');
  rock.className = 'rock';
  rock.style.left = `${x}px`;
  var changingTop = 0;
  rock.style.top = `${changingTop}px`;
  GAME.appendChild(rock);

  function moveRock() {
    function step() {
      changingTop +=2;
      rock.style.top = `${changingTop}px`;
    if (checkCollision(rock)) {
      endGame()
    } else if (changingTop <= 400) {
      window.requestAnimationFrame(step)
    } else {
      rock.remove()
    }
  }
      window.requestAnimationFrame(step);
  }
    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */
  moveRock();
  // We should kick of the animation of the rock around here
  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
  ROCKS.push(rock);
  return rock
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  clearInterval(gameInterval);
  for (var i = 0; i < ROCKS.length; i++) {
    ROCKS[i].remove();
  }
  window.removeEventListener('keydown', moveDodger);
  alert("YOU LOSE!");
  DODGER.style.left = "180px";
  START.removeAttribute("style");

}

function moveDodger(e) {
  if (e.which === LEFT_ARROW) {
    e.preventDefault();
    e.stopPropagation();
    moveDodgerLeft()
  } else if (e.which === RIGHT_ARROW) {
    e.preventDefault();
    e.stopPropagation();
    moveDodgerRight()
}
}

function moveDodgerLeft() {
  var posNum = positionToInteger(DODGER.style.left);
  var newPos = posNum - 4;
  if (newPos >= 0) {
    DODGER.style.left = `${newPos}px`;
  }
}

function moveDodgerRight() {
  var posNum = positionToInteger(DODGER.style.left);
  var newPos = posNum + 4;
  if (newPos <= 360) {
    DODGER.style.left = `${newPos}px`;
  }
}


function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger);
  START.style.display = 'none';
  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
