
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

//////////////////////////////////////////////////////////////

function checkCollision(rock) {
  // implement me!
  const top = positionToInteger(rock.style.top);
  
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);

    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left);

    const rockRightEdge = rockLeftEdge + 20;

    return (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) || (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) || (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge);
      
    } else {
      return false;
    }

  } 

function createRock(x) {
  const rock = document.createElement('div');
  rock.className = 'rock';
  rock.style.left = `${x}px`;

  var top = 0;
  rock.style.top = `${top}px`;

  GAME.appendChild(rock);

  function moveRock() {

    if (checkCollision(rock) === true) {
      return endGame();
    }
    else if (top < GAME_HEIGHT-20) {
      top+=4;
      rock.style.top = `${top}px`;
      window.requestAnimationFrame(moveRock);
    }
    else if (top >= GAME_HEIGHT - 20) {
      GAME.removeChild(rock);
      ROCKS.shift();
    }
  }
  moveRock();

  ROCKS.push(rock);
  return rock;
}

function endGame() {
  clearInterval(gameInterval);
  ROCKS.forEach(function(rock) {
    rock.remove();
  });
  
  document.removeEventListener('keydown', moveDodger)
  alert('YOU LOSE SUCKA!')
}

function moveDodger(e) {


  if (e.which === 37) {
    e.stopPropagation();
    e.preventDefault();
    moveDodgerLeft();
  }
  else if (e.which === 39) {
    e.stopPropagation();
    e.preventDefault();
    moveDodgerRight();
  }   else {
    return;
    }
}


function moveDodgerLeft() {
  window.requestAnimationFrame(function() {
  var leftNumbers = DODGER.style.left.replace('px', '')
  var left = parseInt(leftNumbers, 10)
 
  if (left > 0) {
    DODGER.style.left = `${left - 4}px`
  }
  })
}


function moveDodgerRight() {
  window.requestAnimationFrame(function() {
  var leftNumbers = DODGER.style.left.replace('px', '')
  var left = parseInt(leftNumbers, 10)
 
  if (left < GAME_WIDTH - 40) {
    DODGER.style.left = `${left + 3}px`
  }
  })
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

function dificulty(i) {
  setInterval
}

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000 )
}
