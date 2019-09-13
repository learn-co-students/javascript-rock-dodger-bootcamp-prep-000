
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const ROCK_WIDTH = 20
const DODGER_WIDTH = 40
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')


var gameInterval = null

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)

  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + DODGER_WIDTH;

    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + ROCK_WIDTH;

    if (rockRightEdge >= dodgerLeftEdge && rockLeftEdge <= dodgerRightEdge) {
      return true;
    }
  }

  return false;
}

function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = `${x}px`;

  var top = 0;

  rock.style.top = top;

  GAME.appendChild(rock);

  function moveRock() {
    rock.style.top = `${top += 2}px`;

     if(checkCollision(rock)){
       endGame();
     }
     else if(top < GAME_HEIGHT){
       window.requestAnimationFrame(moveRock);
     }
     else{
       rock.remove();
     }
  }

  window.requestAnimationFrame(moveRock);
  ROCKS.push(rock);

  return rock
}

function endGame() {
  window.clearInterval(gameInterval);

  ROCKS.forEach(function(rock) { rock.remove(); });

  window.removeEventListener('keydown', moveDodger);

  START.innerHTML = 'Play again?';
  START.style.display = 'inline';

  alert("YOU LOSE!");
}

function moveDodger(e) {
  if(e.which === LEFT_ARROW){
    moveDodgerLeft();
    e.preventDefault();
    e.stopPropagation();
  }
  else if(e.which === RIGHT_ARROW){
    moveDodgerRight();
    e.preventDefault();
    e.stopPropagation();
  }
}

function moveDodgerLeft() {
  window.requestAnimationFrame( function() {
    const left = positionToInteger(DODGER.style.left);

    if(left > 0){
      DODGER.style.left = `${left - 4}px`;
    }
  })
}

function moveDodgerRight() {
   window.requestAnimationFrame( function() {
     const left = positionToInteger(DODGER.style.left);

     if(left < 360){
       DODGER.style.left = `${left + 4}px`;
     }
   });
}

function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  DODGER.style.left = "180px";
  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
