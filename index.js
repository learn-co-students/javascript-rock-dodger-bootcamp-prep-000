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

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {
  // implement me!
  // use the comments below to guide you!
  const top = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = 40 + dodgerLeftEdge;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = 20 + rockLeftEdge;

    return (
      (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||  // rock fell/collided on lefthand side of dodger
      (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) || // rock fell/collided in center of dodger
      (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)   // rock fell/collided on righthand side of dodger
    )
  }
}


function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = `${x}px`;

  // Hmmm, why would we have used `var` here?
  //var top = rock.style.top = 0;   //use this line not the following to have this program work in the browser. The line below is only for purposes of test
  top = rock.style.top = 0;

  GAME.appendChild(rock);

  function moveRock() {
    top += 2;
    rock.style.top = `${top}px`;

    if(checkCollision(rock)){
      return endGame();
    }else if(top < GAME_HEIGHT){
      window.requestAnimationFrame(moveRock);
    }else{
      rock.remove();
    }
  }

  window.requestAnimationFrame(moveRock);

  ROCKS.push(rock)

  return rock
}


/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  clearInterval(gameInterval);
  ROCKS.forEach(function(rock) { rock.remove() })
  document.removeEventListener('keydown', moveDodger)
  return alert('YOU LOSE!')
}

function moveDodger(e) {
  const input = e.which

  if(input === LEFT_ARROW || input === RIGHT_ARROW){
    e.preventDefault();
    e.stopPropagation();
  }

  if(input === RIGHT_ARROW){
    moveDodgerRight();
  }else if(input === LEFT_ARROW){
    moveDodgerLeft();
  }
}

function moveDodgerLeft() {
  function leftDodging(){
    const left = positionToInteger(DODGER.style.left);

    if(left > 0){
      let leftwardShift = left - 4;
      DODGER.style.left = `${leftwardShift}px`;
    }
  }
  window.requestAnimationFrame(leftDodging);
}

function moveDodgerRight() {
  function rightDodging(){
    const left = positionToInteger(DODGER.style.left);

    if(left < 360){
      let rightwardShift = left + 4;
      DODGER.style.left = `${rightwardShift}px`;
    }
  }
  window.requestAnimationFrame(rightDodging);
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

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
