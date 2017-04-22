const START = document.getElementById('start');
const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('game');
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const ROCKS = [];

var gameInterval = null;

function positionToInteger(element){
  return parseInt(element.style.left.replace('px', ''), 10)
}


function checkCollision(rock){
  var rockTop = rock.style.top.replace('px', '');
  var topCheck = parseInt(rockTop, 10);

  if (topCheck > 360) {
    var dodgerLeftEdge = parseInt(DODGER.style.left.replace('px', ''), 10);
    var dodgerRightEdge = dodgerLeftEdge + 40;
    var rockLeftEdge = parseInt(rock.style.left.replace('px', ''), 10);
    var rockRightEdge = rockLeftEdge + 20;

    if(rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerLeftEdge){
      return true;
    } else {
      return false;
    }
  }
}

function createRock(x){
  const rock = document.createElement('div');
  rock.className = 'rock';
  rock.style.left = `${x}px`;
  var top = 0;

  GAME.appendChild(rock);

  function moveRock(){
    rock.style.top = `${top}px`;
    if(checkCollision(rock)){
      endGame();
    } else if(top < GAME_HEIGHT){
      top += 2;
      window.requestAnimationFrame(moveRock);
    } else {
      rock.remove();
    }
  }
  window.requestAnimationFrame(moveRock);
  ROCKS.push(rock);
  return rock;
}

function endGame(){
  clearInterval(gameInterval);
  ROCKS.forEach(function(rock){
    rock.remove();
  });
  document.removeEventListener('keydown', moveDodger);
  alert('YOU LOSE!');
}

function moveDodgerLeft() {
  const left = positionToInteger(DODGER);
  DODGER.style.left = `${left - 4}px`;

  if(left > 4){
    window.requestAnimationFrame(moveDodgerLeft);
    //e.preventDefault()
    //e.stopPropagation()
    return left;
  }
}

function moveDodgerRight() {
  var dodgerLeftEdge = DODGER.style.left.replace('px', '');
  var right = parseInt(dodgerLeftEdge, 10);
  //const right = positionToInteger(DODGER.style.left)
  DODGER.style.left = `${right + 4}px`;

  if(right < (GAME_WIDTH - 44)){
    window.requestAnimationFrame(moveDodgerRight);
    //e.preventDefault()
    //e.stopPropagation()
    return right;
  }
}

function moveDodger(e){
  if(e.which === RIGHT_ARROW){
    e.preventDefault();
    e.stopPropagation();
    moveDodgerRight();
  } else if(e.which === LEFT_ARROW){
    e.preventDefault();
    e.stopPropagation();
    moveDodgerLeft();
  }
}

function start(){
  document.addEventListener('keydown', moveDodger);

  START.style.display = 'none';

  gameInterval = setInterval(function(){
    createRock(Math.floor(Math.random() * (GAME_WIDTH - 20)));
  }, 1000);
}
