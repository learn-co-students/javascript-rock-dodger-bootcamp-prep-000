const DODGER = document.getElementById("dodger");
const GAME = document.getElementById("game");
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37; // use e.which!
const RIGHT_ARROW = 39; // use e.which!
const ROCKS = [];
const START = document.getElementById("start");
var gameInterval = null;

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top);
  const dodgerLeftEdge = positionToInteger(DODGER.style.left);
  const dodgerRightEdge = dodgerLeftEdge + 40;
  const rockLeftEdge = positionToInteger(rock.style.left);
  const rockRightEdge = rockLeftEdge + 20;

  if (top >= 360) {
    if (
      (rockLeftEdge <= dodgerLeftEdge && rockRightEdge > dodgerLeftEdge) ||
      (rockLeftEdge > dodgerLeftEdge && rockRightEdge < dodgerRightEdge) ||
      (rockLeftEdge < dodgerRightEdge && rockRightEdge >= dodgerRightEdge)
    ) {
      return true;
    }
  }
  return false;
}

function createRock(x) {
  const rock = document.createElement("div");

  rock.className = "rock";
  rock.style.left = `${x}px`;
  var top = 0;
  rock.style.top = top;
  game.appendChild(rock);
  ROCKS.push(rock);

  function moveRock(timestamp) {
    if (positionToInteger(rock.style.top) === 400) {
      rock.remove();
    }
    if (checkCollision(rock) === false) {
      rock.style.top = positionToInteger(rock.style.top) + 2 + `px`;
      window.requestAnimationFrame(moveRock);
    }
    if (checkCollision(rock) === true) {
      endGame();
    }
  }
  window.requestAnimationFrame(moveRock);
}

function endGame() {
  clearInterval(gameInterval);
  
  window.removeEventListener("keydown", moveDodger);
  
  const elements = document.getElementsByClassName("rock");

while (elements.length > 0) elements[0].remove();
  
  START.style.display = "";
  alert("YOU LOSE!");
}

function moveDodger(e) {
  document.addEventListener("keydown", function(e) {
    if (e.which === RIGHT_ARROW) {
            moveDodgerRight();
    }
    if (e.which === LEFT_ARROW) {
        moveDodgerLeft();
    }
  });
}

function moveDodgerLeft() {
  if (positionToInteger(DODGER.style.left) > 0) {
    DODGER.style.left = positionToInteger(DODGER.style.left) - 2 + "px";
    //window.requestAnimationFrame(moveDodgerLeft);
  }
}

function moveDodgerRight() {
  if (positionToInteger(DODGER.style.left) < 360) {
    DODGER.style.left = positionToInteger(DODGER.style.left) + 2 + "px";
    //window.requestAnimationFrame(moveDodgerRight);
  }
}

function positionToInteger(p) {
  return parseInt(p.split("px")[0]) || 0;
}

function start() {
  window.addEventListener("keydown", moveDodger);

  START.style.display = "none";

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() * (GAME_WIDTH - 20)));
  }, 2000);
}
