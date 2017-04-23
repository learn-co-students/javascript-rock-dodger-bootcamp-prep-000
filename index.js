const START = document.getElementById('start');
const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('game');
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const ROCKS = [];
var YOUR_SCORE = 0;

var gameInterval = null;

function positionToInteger(element){
  return parseInt(element.replace('px', ''), 10)
}


function checkCollision(rock){
  const rockTop = positionToInteger(rock.style.top);

  if (rockTop > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = rockLeftEdge + 20;

    if(rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerLeftEdge){
      return true;
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
      YOUR_SCORE++;
    }
  }
  window.requestAnimationFrame(moveRock);
  ROCKS.push(rock);
  return rock;
}

function endGame(){
  clearInterval(gameInterval)
  ROCKS.forEach(function(rock){
    rock.remove();
  });
  document.removeEventListener('keydown', moveDodger);
  START.innerHTML = "Play again?"
  START.style.display = 'inline'
  DODGER.style.left = '180px'
  return alert(`YOU LOSE!\nYou dodged ${YOUR_SCORE} rocks before you were crushed!`)
}

function moveDodgerLeft() {
  function moveLeft(){
    const left = positionToInteger(DODGER.style.left);
    if(left < 4){
      DODGER.style.left = '0px';
    }
    if(left >= 4){
      DODGER.style.left = `${left - 4}px`;
      window.requestAnimationFrame(moveLeft);
    }
  }
  window.requestAnimationFrame(moveLeft);
}

function moveDodgerRight() {
  function moveRight(){
    const right = positionToInteger(DODGER.style.left);

    if(right > GAME_WIDTH - 44){
      DODGER.style.left = `${GAME_WIDTH - 40}px`
    }
    if(right <= GAME_WIDTH - 44){
      DODGER.style.left = `${right + 4}px`
      window.requestAnimationFrame(moveRight);
    }
  }
  window.requestAnimationFrame(moveRight);
}

function moveDodger(e){
  if(e.which === RIGHT_ARROW){
    moveDodgerRight();
    e.preventDefault();
    e.stopPropagation();
  } else if(e.which === LEFT_ARROW){
    moveDodgerLeft();
    e.preventDefault();
    e.stopPropagation();
  }
}

function start(){
  document.addEventListener('keydown', moveDodger);

  YOUR_SCORE = 0;

  START.style.display = 'none';

  gameInterval = setInterval(function(){
    createRock(Math.floor(Math.random() * (GAME_WIDTH - 20)));
  }, 1000);
}
