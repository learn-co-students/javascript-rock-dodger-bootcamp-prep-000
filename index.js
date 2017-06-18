
const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('dodger');
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37 // use e.which;
const RIGHT_ARROW = 39 // use e.which;
const ROCKS = [];
const START = document.getElementById('start');

var gameInterval = null;


function checkCollision(rock){
  const top = positionToInteger(rock.style.top);
  if (top < 360){
    return false;
  }
  else if (top > 360){
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = rockLeftEdge + 20;
    if (rockLeftEdge < dodgerLeftEdge && rockRightEdge > dodgerLeftEdge ||
       rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge ||
       rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerRightEdge){
      return true;
    }
  }
}

function createRock(x){
  const rock = document.createElement('div');
  rock.className = 'rock';
  rock.style.left = `${x}px`;
  var top = 0;
  rock.style.top = top;
  GAME.appendChild(rock);
  function moveRock(){
    rock.style.top = `${top += 2}px`;
    if (checkCollision(rock)){
      endGame();
    }
    else if(top > 0 && top < 400){
      window.requestAnimationFrame(moveRock);
    }
    else{
      document.remove(rock);
    }
  }
  window.requestAnimationFrame(moveRock);
  ROCKS.push(rock);
  return rock;
}

function endGame(){
  clearInterval(gameInterval);
  ROCKS.forEach(function(rock){
    if (rock.parentNode){
      rock.remove();
    }
  })
  document.removeEventListener("keydown", moveDodger);
  alert("YOU LOSE!");
}

function moveDodger(e){
  if (e.which === 37){
    e.preventDefault();
    e.stopPropagation();
    moveDodgerLeft();
  }
  if (e.which === 39){
    e.preventDefault();
    e.stopPropagation();
    moveDodgerRight();
  }
}

function moveDodgerLeft(){
  var leftNumbers = DODGER.style.left.replace('px', '');
  var left = parseInt(leftNumbers, 10);
  if (left > 0 && left < 360) {
    DODGER.style.left = `${left - 4}px`
    window.requestAnimationFrame(moveDodgerLeft);
  }
}

function moveDodgerRight(){
  var leftNumbers = DODGER.style.left.replace('px', '');
  var left = parseInt(leftNumbers, 10);
  if (left > 0 && left < 360) {
    DODGER.style.left = `${left + 4}px`
    window.requestAnimationFrame(moveDodgerRight);
  }
}

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
