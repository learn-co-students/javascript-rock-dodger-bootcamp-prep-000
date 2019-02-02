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

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = dodgerLeftEdge+40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = rockLeftEdge+20;
    
    //Check for collision
    if( (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) || (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) || (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge) ) {
      return true
    }
    else {
      return false
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Hmmm, why would we have used `var` here?
  var top = 0

  rock.style.top = top

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
     if(checkCollision(rock) === true) {
       endGame();
     }

    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */
     else if( top < GAME_HEIGHT - 20 ) {
       
       rock.style.top = `${top += 4}px`
       window.requestAnimationFrame(moveRock);
     }

    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */
     else if( top >=  GAME_HEIGHT - 20) {
       GAME.removeChild(rock);
       ROCKS.shift();
     }
  }

  // We should kick of the animation of the rock around here
moveRock();

  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
  ROCKS.push(rock)

  // Finally, return the rock element you've created
  return rock
}


function endGame() {
  //Clear gameInterval
   clearInterval(gameInterval);
  
  //Remove all rocks from DOM
  ROCKS.forEach(function(rock) { rock.remove() })
  
  //Remove 'moveDodger' event listener
  window.removeEventListener('keydown', moveDodger);
  alert("YOU LOSE!");

  START.innerHTML = 'Play again?'
  START.style.display = 'inline'
}

function moveDodger(e) {
  //Move dodger left
  if(e.which === LEFT_ARROW) {
    e.stopPropagation();
    e.preventDefault();
    moveDodgerLeft();
  }
  
  //Move dodger right
  else if( e.which === RIGHT_ARROW) {
    e.stopPropagation();
    e.preventDefault();
    moveDodgerRight();
  }
  

}

function moveDodgerLeft() {
  // implement me!
   const left = positionToInteger(DODGER.style.left);
   if(left > 0) {
     DODGER.style.left = `${left - 4}px`;
     window.requestAnimationFrame(moveDodgerLeft);
   }
}


function moveDodgerRight() {
  const left = positionToInteger(DODGER.style.left);
  if( left < GAME_WIDTH-40 ) {
    DODGER.style.left = `${left + 4}px`;
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
