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
  const top = positionToInteger(rock.style.top)
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    const rockRightEdge = rockLeftEdge + 20;

    if ( rockRightEdge > dodgerLeftEdge && rockLeftEdge < dodgerRightEdge) {
      return true
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = 0

  rock.style.top = top

  GAME.appendChild(rock);

  function moveRock() {
    /*if(setInterval==null){
      return
    }*/
    rock.style.top = `${top += 2}px`

    if (top > 400){
      const index = ROCKS.indexOf(rock) ;
      ROCKS.splice(index,1); //removing rocks from array
      rock.remove(); //removing rocks from screen
      return
    }

    if (checkCollision(rock)){
      endGame();
      return;
    }

    window.requestAnimationFrame(moveRock);
  }

  // We should kick of the animation of the rock around here
   window.requestAnimationFrame(moveRock);
  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
  ROCKS.push(rock)

  // Finally, return the rock element you've created
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
  gameInterval = null;
  ROCKS.forEach(function(rock){
    rock.remove();
  })
  document.removeEventListener('keydown', moveDodger);
  ROCKS.splice(0);

  alert('over');

   START.style.display = 'inline'
}


function moveDodger(e) {
  // implemented
  if(e.which == RIGHT_ARROW) {
    moveDodgerRight()
    e.preventDefault();
  };
  if(e.which == LEFT_ARROW) {
    moveDodgerLeft()
    e.preventDefault();
    e.stopPropagation()
  };
}

function moveDodgerLeft() {
  // implemented
  const left = positionToInteger(DODGER.style.left);
  if(left > 0 ) {
    window.requestAnimationFrame(function() {
      DODGER.style.left = `${left - 4}px`
    })
  }
}


function moveDodgerRight() {
  // implemented
  const left = positionToInteger(DODGER.style.left);
  if(left < 360) {
    window.requestAnimationFrame(function() {
      DODGER.style.left = `${left + 4}px`
    })
  }
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {  //gives location of dogger from style on screen
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
