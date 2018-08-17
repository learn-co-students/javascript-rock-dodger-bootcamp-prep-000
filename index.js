const DODGER = document.getElementById("dodger");
const GAME = document.getElementById("game");
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const ROCKS = [];
const START = document.getElementById("start");

var gameInterval = null;

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top);

  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);

    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left);

    const rockRightEdge = rockLeftEdge + 20;

    if (
      (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
      (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
      (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)
    ) {
      return true;
    }
  }
}

function createRock(x) {
  const rock = document.createElement("div");

  rock.className = "rock";
  rock.style.left = `${x}px`;

  var top = 0;

  GAME.appendChild(rock);

  function moveRock() {
    if (checkCollision(rock)) endGame();
    rock.style.top = `${top += 2}px`;

    if (top <= 380) {
      window.requestAnimationFrame(moveRock);
    } else {
      rock.romove();
    }
  }

  window.requestAnimationFrame(moveRock);

  ROCKS.push(rock);

  return rock;
}

function endGame() {
  clearInterval(gameInterval);
  for (let i = 0; i < ROCKS.length; i++) {
    ROCKS[i].remove();
  }
  window.removeEventListener("keydown", moveDodger);
  alert("YOU LOSE!");
}

function moveDodger(e) {
  if (e.which === LEFT_ARROW) {
    e.preventDefault();
    e.stopPropagation();
    moveDodgerLeft();
  }
  if (e.which === RIGHT_ARROW) {
    e.preventDefault();
    e.stopPropagation();
    moveDodgerRight();
  }
}

function moveDodgerLeft() {
  let left = positionToInteger(DODGER.style.left);
  if (left <= 4) left = 0;
  else {
    DODGER.style.left = `${left - 4}px`;
    window.requestAnimationFrame(moveDodgerLeft);
  }
}

function moveDodgerRight() {
  let left = positionToInteger(DODGER.style.left);
  if (left >= 360) left = 360;
  else {
    DODGER.style.left = `${left + 4}px`;
    window.requestAnimationFrame(moveDodgerRight);
  }
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split("px")[0]) || 0;
}

function start() {
  window.addEventListener("keydown", moveDodger);

  START.style.display = "none";

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() * (GAME_WIDTH - 20)));
  }, 1000);
}
