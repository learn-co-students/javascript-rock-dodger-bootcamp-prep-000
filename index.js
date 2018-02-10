
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const ROCK_WIDTH = 20
const DODGER_WIDTH = 40
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')


var gameInterval = null

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = dodgerLeftEdge + DODGER_WIDTH;

    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = rockLeftEdge + ROCK_WIDTH;

    if (rockRightEdge > dodgerLeftEdge && rockLeftEdge < dodgerRightEdge) {
      return true;
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = `${x}px`;

  // Hmmm, why would we have used `var` here?
  var top = 0;

  rock.style.top = `${top}px`;

  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */
  GAME.appendChild(rock);
  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
    // implement me!
    // (use the comments below to guide you!)
    /**
     * If a rock collides with the DODGER,
     * we should call endGame()
     */
     if(checkCollision(rock)){
       endGame();
     }
    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */
     if(top <= 400){
       top += 2;
       rock.style.top = `${top}px`;
       window.requestAnimationFrame(moveRock);
     }
     else{
       rock.remove();
     }
  }

  // We should kick of the animation of the rock around here
  window.requestAnimationFrame(moveRock);
  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
  ROCKS.push(rock);

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
  window.clearInterval(gameInterval);

  for(let it = 0; it < ROCKS.length; ++it){
    ROCKS[it].remove();
  }

  window.removeEventListener('keydown', moveDodger);

  alert("YOU LOSE!");
}

function moveDodger(e) {
  if(e.which === LEFT_ARROW){
    moveDodgerLeft();
    e.preventDefault();
    e.stopPropagation();
  }
  else if(e.which === RIGHT_ARROW){
    moveDodgerRight();
    e.preventDefault();
    e.stopPropagation();
  }
}

function moveDodgerLeft() {
   var moved = positionToInteger(DODGER.style.left);
   if(moved.length === 0) moved = 0;
   const prev = moved - 4;

   function step(){
     moved -= 1;
     if(moved >= prev && moved >= 0){
       DODGER.style.left = `${moved}px`;
       window.requestAnimationFrame(step);
     }
   }

   window.requestAnimationFrame(step);
}

function moveDodgerRight() {
   var moved = positionToInteger(DODGER.style.left);
   if(moved.length === 0) moved = 0;
   const prev = moved + 4;

   function step(){
     moved += 1;
     if(moved <= prev && moved <= 360){
       DODGER.style.left = `${moved}px`;
       window.requestAnimationFrame(step);
     }
   }

   window.requestAnimationFrame(step);
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
