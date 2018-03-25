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
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = rockLeftEdge + 20;

    if (rockLeftEdge > dodgerRightEdge || rockRightEdge < dodgerLeftEdge) {
      return false;
    } else {
      return true;
    }
    /**
               * Think about it -- what's happening here?
               * There's been a collision if one of three things is true:
               * 1. The rock's left edge is < the DODGER's left edge,
               *    and the rock's right edge is > the DODGER's left edge;
               * 2. The rock's left edge is > the DODGER's left edge,
               *    and the rock's right edge is < the DODGER's right edge;
               * 3. The rock's left edge is < the DODGER's right edge,
               *    and the rock's right edge is > the DODGER's right edge
               */
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
//console.log(rock); 
//console.log(GAME.childNodes);
  GAME.appendChild(rock);
//console.log(GAME); 
//console.log(GAME.childNodes);
  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
    // implement me!
    // (use the comments below to guide you!)
    console.log(rock);
    rock.style.top += 2;
    /**
     * If a rock collides with the DODGER,
     * we should call endGame()
     */
    if (checkCollision(rock)){
      endGame();
    } else if (rock.top < 360) {
      window.requestAnimationFrame(moveRock);
    } else {
      rock.remove();
    }
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
  //remove ROCKS
  for (let i = 0; i < ROCKS.length; i++){
    ROCKS[i].remove();
  }
  window.removeEventListener('keydown', moveDodger);
  window.alert("YOU LOSE!");
}

function moveDodger(e) {
  if (e.which === LEFT_ARROW) {
    e.preventDefault();
    e.stopPropagation();
    moveDodgerLeft()
  }
  else if (e.which === RIGHT_ARROW) {
    e.preventDefault();
    e.stopPropagation();
    moveDodgerRight()
  }                    
}

function moveDodgerLeft() {
  function moveLeft (){
    var leftNumbers = DODGER.style.left.replace('px', '')
    var left = parseInt(leftNumbers, 10)
    var frameStep = 4;
    while (left > 0 && frameStep > 0) {
      dodger.style.left = `${left - 1}px`;
      left--;
      frameStep--;
    }
  }
  window.requestAnimationFrame(moveLeft);
}

function moveDodgerRight() {
  function moveRight (){
    var leftNumbers = DODGER.style.left.replace('px', '')
    var left = parseInt(leftNumbers, 10)
    var frameStep = 4;
    while (left < (GAME_WIDTH - 40) && frameStep > 0) {
      dodger.style.left = `${left + 1}px`;
      left++;
      frameStep--;
    }
  }
  window.requestAnimationFrame(moveRight);
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
