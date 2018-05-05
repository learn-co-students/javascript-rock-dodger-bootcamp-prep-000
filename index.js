
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

    if (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) {
      return true;
    } else if (
      rockLeftEdge >= dodgerLeftEdge &&
      rockRightEdge <= dodgerRightEdge
    ) {
      return true;
    } else if (
      rockLeftEdge <= dodgerRightEdge &&
      rockRightEdge >= dodgerRightEdge
    ) {
      return true;
    } else {
      return false;
    }
  }
}

function createRock(x) {
  const rock = document.createElement("div");

  rock.className = "rock";
  rock.style.left = `${x}px`;

  var top = 0;

  rock.style.top = top;
  GAME.appendChild(rock);

  function moveRock() {
    if (checkCollision(rock) === true) {
      endGame();
    } else if (top <= 400) {
      rock.style.top = `${top += 2}px`;
      window.requestAnimationFrame(moveRock);
    } else {
      rock.remove();
    }
  }
  window.requestAnimationFrame(moveRock);

  ROCKS.push(rock);

  return rock;
}

function endGame() {
  clearInterval(gameInterval);

  let limits = ROCKS.length;

  for (let a = 0; a < limits; a++) {
    ROCKS[a].remove();
  }

  window.removeEventListener("keydown", moveDodger);

  alert("YOU LOSE!");
}

function moveDodger(e) {
  if (e.which === 37) {
    e.stopPropagation();
    e.preventDefault();
    moveDodgerLeft();
  } else if (e.which === 39) {
    e.stopPropagation();
    e.preventDefault();
    moveDodgerRight();
  }
}

function moveDodgerLeft() {
  const left = parseInt(dodger.style.left.replace(`px`, ``));

  function step() {
    window.requestAnimationFrame(step);

    if (left > 0) {
      DODGER.style.left = `${left - 4}px`;
    }
  }
  window.requestAnimationFrame(step);
}

function moveDodgerRight() {
  const west = parseInt(dodger.style.left.replace(`px`, ``));

  function move() {
    window.requestAnimationFrame(move);

    if (west < 360) {
      DODGER.style.left = `${west + 4}px`;
    }
  }
  window.requestAnimationFrame(move);
}

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
