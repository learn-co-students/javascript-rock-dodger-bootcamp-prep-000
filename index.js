const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37
const RIGHT_ARROW = 39
const ROCKS = []
const START = document.getElementById('start')
var gameInterval = null

function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0;
};



function checkCollision(rock) {
  const top = positionToInteger(rock.style.top);

  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge+ 20 ;

      if ((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
          (rockLeftEdge >= dodgerLeftEdge && rockRightEdge<= dodgerRightEdge) ||
          (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)){
        return true;
      }else{
        return false;
      }
    }
  };

function createRock(x) {
  const rock = document.createElement('div');
    rock.className = 'rock';
    rock.style.left = `${x}px`;

    var top = 0;
    rock.style.top = top;
  GAME.appendChild(rock);

  function moveRock() {
    top += 2;
    rock.style.top = `${top}px`;

      if (checkCollision(rock)){
        endGame();
      }
      if (top< 400){
        requestAnimationFrame(moveRock);
      }else{
        rock.remove();
      }

  };


  requestAnimationFrame(moveRock);
  ROCKS.push(rock);
  return rock;
}

function endGame() {
  window.clearInterval(gameInterval);
  window.removeEventListener('keydown', moveDodger);
  ROCKS.forEach(function(rock){
      rock.remove();
  })
  alert("YOU LOSE!");
}

function moveDodger(e) {


     if (e.which === 37) {
       e.preventDefault();
       e.stopPropagation();
       moveDodgerLeft()
     } if (e.which === 39) {
       e.preventDefault();
       e.stopPropagation();
       moveDodgerRight()
     }

};

function moveDodgerLeft() {
     var leftNumbers = dodger.style.left.replace('px', '');
     var left = parseInt(leftNumbers, 10);

     if (left > 0) {
       dodger.style.left = `${left - 4}px`;
     }

};

requestAnimationFrame(moveDodgerLeft);

function moveDodgerRight(){
   	var rightNumbers = dodger.style.left.replace('px', '');
   	var right = parseInt(rightNumbers, 10);

    if (right < 360) {
   	  dodger.style.left = `${right + 4}px`;
    }

};

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */


function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
