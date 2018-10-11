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

/* Be aware of what's above this line, but all of your work should happen below.*/

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)

  if (top > 359) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge+40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge+20;

    return (
      (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
      (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
      (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge))
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`
  var top = 0 // Hmmm, why would we have used `var` here?
  rock.style.top = `${top}px`
  GAME.appendChild(rock); /* Now that we have a rock, we'll need to append it to GAME and move it downwards.*/
 
  function moveRock() {   /*This function moves the rock. (2 pixels at a time seems like a good pace.)*/
    if (checkCollision(rock)===true){  /* If a rock collides with the DODGER, we should call endGame()*/
      endGame();
    }
    else if(top < GAME_HEIGHT-20){ /*Otherwise, if the rock hasn't reached the bottom of the GAME, we want to move it again.*/
      top+=4;
      rock.style.top = `${top}px`;
      window.requestAnimationFrame(moveRock);}
    else if(top >= GAME_HEIGHT-20){ /*But if the rock *has* reached the bottom of the GAME, we should remove the rock from the DOM*/
      GAME.removeChild(rock);
      ROCKS.shift();
    }
  }
   moveRock(); // We should kick of the animation of the rock around here
  ROCKS.push(rock) // Add the rock to ROCKS so that we can remove all rocks when there's a collision
  return rock   // Finally, return the rock element you've created
}

/*End the game by clearing `gameInterval`, removing all ROCKS from the DOM, and removing the `moveDodger` event listener.
     Finally, alert "YOU LOSE!" to the player.*/

function endGame() {
  while(ROCKS.length > 0){
    GAME.removeChild(ROCKS[0]);
    ROCKS.shift();
  }

  clearInterval(gameInterval);
  window.removeEventListener('keydown', moveDodger);
  alert("YOU LOSE!");
  START.innerHTML = 'Play again?'
  START.style.display = 'inline'
}

function moveDodger(e) {
  if(e.which == LEFT_ARROW){
    e.stopPropagation();
    e.preventDefault();
    moveDodgerLeft();
  }
  if(e.which == RIGHT_ARROW){
    e.stopPropagation();
    e.preventDefault();
    moveDodgerRight();
  }
}

function moveDodgerLeft() {
  const left = positionToInteger(dodger.style.left);
  if (left > 0) {
    dodger.style.left = `${left - 2}px`
    window.requestAnimationFrame(moveDodgerLeft);
  }
}

function moveDodgerRight() {
  const left = positionToInteger(dodger.style.left);
  if (left < GAME_WIDTH - 40){
    dodger.style.left = `${left + 2}px`;
    window.requestAnimationFrame(moveDodgerRight);
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
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
