
const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('game');
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37; // use e.which!
const RIGHT_ARROW = 39; // use e.which!
const ROCKS = [];
const START = document.getElementById('start');

var gameInterval = null;

/** game code **/

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top);

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);

    // DODGER is 40 pixels wide 
    const dodgerRightEdge = dodgerLeftEdge+40;

    const rockLeftEdge = positionToInteger(rock.style.left);

    // ROCK is 20 pixel's wide 
    const rockRightEdge = rockLeftEdge+20;

    if (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) {
      return true;
    } else if (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge){
      return true;
    } else if (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge){
      return true;
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = `${x}px`;

  var top = 0;

  rock.style.top = top;

  GAME.appendChild(rock);

  function moveRock() {
    
     if (checkCollision(rock)){
       endGame();
     } else if ((top + 10)>= GAME_HEIGHT){

       rock.remove();
     } else {

       top+=2;
       rock.style.top = `${top}px`;
       window.requestAnimationFrame(moveRock);
     }
  }
  
  window.requestAnimationFrame(moveRock);
  
  ROCKS.push(rock);

  return rock;
}

/** End game **/
function endGame() {
  clearInterval(gameInterval);
  ROCKS.forEach(function (rock){
    rock.remove();
  });
  document.removeEventListener('keydown', moveDodger);
  alert("YOU LOSE!");
}

function moveDodger(e) {
   if (e.which === LEFT_ARROW){
      e.preventDefault();
      e.stopPropagation();
      moveDodgerLeft();
   } else if ( e.which === RIGHT_ARROW){
     e.preventDefault();
     e.stopPropagation();
     moveDodgerRight();
   }

}

function moveDodgerLeft() {
  
   function doMove() {
     const dodgerLeftEdge = positionToInteger(DODGER.style.left);
     const newLeft = Math.max(0, dodgerLeftEdge-4);
     DODGER.style.left =  `${newLeft}px`;
   }

   window.requestAnimationFrame(doMove);
}

function moveDodgerRight() {

   function doMove() {
     const dodgerLeftEdge = positionToInteger(DODGER.style.left);
     const newLeft = Math.min(GAME_WIDTH-40, dodgerLeftEdge+4);
     DODGER.style.left =  `${newLeft}px`;
   }

   window.requestAnimationFrame(doMove);
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
