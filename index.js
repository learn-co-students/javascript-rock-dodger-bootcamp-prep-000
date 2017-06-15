
// Don't change these constants!
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')
var gameInterval = null
// Don't change these constants!

function checkCollision(rock) {
  // implement me!
  const top = positionToInteger(rock.style.top) //input string & return int position

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20;

    if (((rockLeftEdge <= dodgerLeftEdge) && (rockRightEdge >= dodgerLeftEdge)) ||
    ((rockLeftEdge >= dodgerLeftEdge) && (rockRightEdge <= dodgerRightEdge)) ||
    ((rockLeftEdge <= dodgerRightEdge) && (rockRightEdge >= dodgerRightEdge))) {
      return true
    }
  }
  return false
}

function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
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
  var left = positionToInteger(DODGER.style.left);
  if (left > 0) {
    window.requestAnimationFrame(function() {
      DODGER.style.left = (left -= 4) + 'px';
    });
  }
}


function moveDodgerRight() {
  var left = positionToInteger(DODGER.style.left);
  if (left < GAME_WIDTH-40) {
    window.requestAnimationFrame(function() {
      DODGER.style.left = (left += 4) + 'px';
    });
  }
}

function endGame() {
  window.clearInterval(gameInterval);
  ROCKS.forEach(function(el) {
    el.remove();
  });
  ROCKS.length = 0;
  document.removeEventListener('keydown', moveDodger);
  alert('YOU LOSE!');
}

function start() {
  window.addEventListener('keydown', moveDodger)
  START.style.display = 'none'
  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = 0 //400*Math.random()

  rock.style.top = top
  //Now that we have a rock, we'll need to append it to GAME and move it downwards.

  GAME.appendChild(rock)

  function moveRock() {
    rock.style.top = `${top += 2}px`
    // FIXME If a rock collides with the DODGER, we should call endGame()

     if(checkCollision()){
       endGame()
     }

     if (top < GAME_HEIGHT){
       window.requestAnimationFrame(moveRock)
     } else {
       rock.remove()
     }
     }

     window.requestAnimationFrame(moveRock)
     ROCKS.push(rock)
     return rock
}
