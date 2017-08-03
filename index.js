const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37
const RIGHT_ARROW = 39
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

const MOVE_DIST = 4;
const DODGER_WIDTH = 40;

function pxAsInteger(dimension){
  return parseInt(dimension.replace('px',''));
}

function checkCollision(rock) {

  const top = positionToInteger(rock.style.top)

  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    const rockRightEdge = rockLeftEdge + 20;;

     let leftHit = rockLeftEdge <= dodgerLeftEdge && dodgerLeftEdge <= rockRightEdge;
     let insideHit = dodgerLeftEdge <= rockLeftEdge && rockRightEdge <= dodgerRightEdge;
     let rightHit = rockLeftEdge <= dodgerRightEdge && dodgerRightEdge <= rockRightEdge;
     return (leftHit || insideHit || rightHit);
  }
}

function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = `${x}px`;
  var top = 0

  rock.style.top = top

   GAME.appendChild(rock);

  function moveRock() {

    top += 2;
    rock.style.top = `${top}px`;

      if(checkCollision(rock)){
        endGame();
      }

     if(GAME.contains(rock)){
       if(top >= GAME_HEIGHT){
          rock.remove();
       } else {
          window.requestAnimationFrame(moveRock);
       }
     }

   }

  window.requestAnimationFrame(moveRock);

  ROCKS.push(rock)

  return rock;
}

function endGame() {
  window.clearInterval(gameInterval);
  ROCKS.forEach(rock => rock.remove());
  document.removeEventListener('keydown', moveDodger);
  alert('YOU LOSE!');
}

function moveDodger(e) {

   if(e.which === LEFT_ARROW || e.which == RIGHT_ARROW){
     e.preventDefault();
     e.stopPropagation();
   }


   if(e.which === LEFT_ARROW){
     moveDodgerLeft();
   } else if(e.which === RIGHT_ARROW){
     moveDodgerRight();
   }

}

function moveDodgerLeft() {

   var left = positionToInteger(DODGER.style.left);
   if(left > 0){
     window.requestAnimationFrame(function(){
       DODGER.style.left = `${left - MOVE_DIST}px`;
     });
   }

}

function moveDodgerRight() {

   var left = positionToInteger(DODGER.style.left);
   if(left < (GAME_WIDTH - DODGER_WIDTH)){
     window.requestAnimationFrame(function(){
       DODGER.style.left = `${left + MOVE_DIST}px`;
     });
   }
}


/**
 * @param {string} p
 * @returns {number}
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  document.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
