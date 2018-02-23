/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

function checkCollision(rock) {

  const top = positionToInteger(rock.style.top)

  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = positionToInteger(DODGER.style.left)+ 40;
    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = positionToInteger(rock.style.left)+20;

    if (
      (rockLeftEdge < dodgerLeftEdge && rockRightEdge > dodgerLeftEdge) ||
      (rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerRightEdge) ||
      (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge)
    ) {
      return true
    }
  }
};

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = 0
  rock.style.top = top

  GAME.appendChild(rock);

  function moveRock() {
    rock.style.top = `${top += 2}px`;

    if (checkCollision(rock)){
      return endGame()
    }
    else if (top < 400){
      window.requestAnimationFrame(moveRock);
    }
    else {
    rock.remove(0);
    }
  }

  window.requestAnimationFrame(moveRock);

  ROCKS.push(rock);

  return rock;
}

function endGame() {
  clearInterval(gameInterval);

  for (var i =0; i<ROCKS.length; i++){
    ROCKS[i].remove(0);
  }

  document.removeEventListener('keydown', moveDodger);

  alert ('You Lose!')

}

function moveDodger(e) {

     if (e.which === 37){
       moveDodgerLeft();
       e.preventDefault();
       e.stopPropagation();
     }
     if (e.which ===39){
       moveDodgerRight();
       e.preventDefault();
       e.stopPropagation();
     }
   }

function moveDodgerLeft() {
  window.requestAnimationFrame(function() {
    const left = positionToInteger(DODGER.style.left)

    if (left > 0) {
      DODGER.style.left = `${left - 4}px`;
    }
  })
}

function moveDodgerRight() {
  window.requestAnimationFrame(function() {
    const left = positionToInteger(DODGER.style.left)

    if (left < 360) {
      DODGER.style.left = `${left + 4}px`;
    }
  })
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
