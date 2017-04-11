

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
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20;
        if ( (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) || (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) || (rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerRightEdge)) {
            return true
    }
  }
}


function createRock(x) {
		    const rock = document.createElement('div');
    	    rock.className = 'rock';
  		    rock.style.left = `${x}px`;
  var top = rock.style.top = 0;
  GAME.appendChild(rock);

    function moveRock() {
     rock.style.top = `${top += 2}px`;
         if (checkCollision(rock) === true) {
           return endGame();
  }    else if (top < 400) {
        moveRock;
  }  else if (top == 400)  {
      rock.remove();
  }
}
  ROCKS.push(rock);
  window.requestAnimationFrame(moveRock);
  return rock;
}



function endGame() {
clearInterval(gameInterval);
for (var i = 0; i < ROCKS.length; i++)  {
      ROCKS[i].remove();
    }
  document.removeEventListener('keydown', moveDodger);

  console.log('YOU LOSE!');
}

function moveDodger(e) {

    if (e.which === 37) {
      e.preventDefault();
        e.stopPropagation();
     return moveDodgerLeft();

   } else if (e.which === 39) {
     e.preventDefault();
       e.stopPropagation();
      return moveDodgerRight();
    }

}

function moveDodgerLeft() {
  var leftNumbers = dodger.style.left.replace('px', '')
     var left = parseInt(leftNumbers, 10)
     if (left > 0) {
     dodger.style.left = `${left - 4}px`
     window.requestAnimationFrame(moveDodgerLeft)
   }
}


function moveDodgerRight()   {
       var leftNumbers = dodger.style.left.replace('px', '')
       var left = parseInt(leftNumbers, 10)
       if (left < 360) {
       dodger.style.left = `${left + 4}px`
       window.requestAnimationFrame(moveDodgerRight)
     }
}
/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
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
