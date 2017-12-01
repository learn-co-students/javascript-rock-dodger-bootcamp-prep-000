const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('game');
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const BURGERS = [];
const START = document.getElementById('start');
const GAMEOVER = document.getElementById('gameover');

var COUNTER = document.getElementById('counterbox');
var gameInterval = null;

function checkCollision(burger) {
  const top = positionToInteger(burger.style.top);
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const burgerLeftEdge = positionToInteger(burger.style.left);
    const burgerRightEdge = burgerLeftEdge + 20;

    if (burgerLeftEdge <= dodgerLeftEdge && burgerRightEdge >= dodgerLeftEdge) {
      return true;
    }
    if (burgerLeftEdge >= dodgerLeftEdge && burgerRightEdge <= dodgerRightEdge) {
      return true;
    }
    if (burgerLeftEdge <= dodgerRightEdge && burgerRightEdge >= dodgerRightEdge) {
      return true;
    }
  }
}

function createburger(x) {
  const burger = document.createElement('div');
  burger.className = 'burger';
  burger.style.left = `${x}px`;
  var top = 0;
  burger.style.top = `${top}px`;
  GAME.append(burger);

  function moveburger() {

    function step() {
      if(top < 380){
        top += 3;
        burger.style.top = `${top}px`;
        window.requestAnimationFrame(moveburger);
      } else {
        burger.remove();
        COUNTER.innerHTML = parseInt(COUNTER.innerHTML) + 1;
      }
    }

    if(checkCollision(burger)) {
      endGame();
      return;
    }

    window.requestAnimationFrame(step);
  }

  window.requestAnimationFrame(moveburger);
  BURGERS.push(burger);
  return burger;
}

function endGame() {
  var button = document.createElement('BUTTON');
  button.addEventListener('click', function() {
    window.location.reload();
  })
  for (var i = 0; i < BURGERS.length; i++) {
    BURGERS[i].remove();
  }
  window.clearInterval(gameInterval);
  window.removeEventListener('keydown', moveDodger);
  GAMEOVER.innerHTML = 'GAME OVER';
  GAMEOVER.appendChild(button);
  button.innerHTML = 'Restart';
  COUNTER = undefined;
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
    var dodgerLeftEdge = positionToInteger(DODGER.style.left);
    if(dodgerLeftEdge < 360) {
      dodgerLeftEdge += 4;
      DODGER.style.left = `${dodgerLeftEdge}px`;
    }
  }

  window.requestAnimationFrame(toTheRight);
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
    createburger(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
