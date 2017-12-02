const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('game');
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39 ;
const ROCKS = [];
const START = document.getElementById('start');

var gameInterval = null;

function checkCollision(rock) {
	const top = positionToInteger(rock.style.top)
	if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
		const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = rockLeftEdge + 20;
    if (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge
    || rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge ||
    rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge) {
    return true
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

 	function moveRock(rock) {
    function move(el) {
      var top = 0
      function step() {
        el.style.top = `${top += 2}px`;
        if (checkCollision(el)) {
        		endGame();
        }
        else if (top === 388) {
          el.parentElement.removeChild(el);
        }
        else if (top < 392) {
          window.requestAnimationFrame(step);
        }
      }
      window.requestAnimationFrame(step);
    }
    move(rock);
  }
  moveRock(rock);
  ROCKS.push(rock);
  return rock;
}


function endGame() {
  clearInterval(gameInterval);
  var list = ROCKS;
  for(var i = ROCKS.length - 1; 0 <= i; i--) {
    if(ROCKS[i] && ROCKS[i].parentElement) {
      ROCKS[i].remove();
    }
  }

	window.removeEventListener('keydown', moveDodger);
  alert ('YOU LOSE!');
}

function moveDodger(e) {
	if (e.which !== LEFT_ARROW && e.which !== RIGHT_ARROW) {
		return;
	}
	e.preventDefault();
	e.stopPropagation();
	if (e.which === LEFT_ARROW) {
		moveDodgerLeft();
	} else if (e.which === RIGHT_ARROW) {
		moveDodgerRight();
	}
}

function moveDodgerLeft() {
	var posNumbers = DODGER.style.left.replace('px', '')
	var position = parseInt(posNumbers, 10)

	if (position > 0) {
		DODGER.style.left = `${position - 4}px`
	}
}

function moveDodgerRight() {
	var posNumbers = DODGER.style.left.replace('px', '')
	var position = parseInt(posNumbers, 10)

	if (position < 360) {
		DODGER.style.left = `${position + 4}px`
	}
}

function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0;
}

function start() {
  window.addEventListener('keydown', moveDodger);
  START.style.display = 'none';
  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)));
  }, 1000);
}

start();
