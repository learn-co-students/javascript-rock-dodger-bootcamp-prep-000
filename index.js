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
  const top = positionToInteger(rock.style.top) //

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left) //180

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = rockLeftEdge + 20;

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
      return ((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
              (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
              (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)
            );
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Hmmm, why would we have used `var` here? //because it will be moving downwards
  var top = rock.style.top = 0;

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

     rock.style.top = `${top += 2}px`; //moves rock 2 pixels at a time.
     if (checkCollision(rock)) { //If a rock collides with the DODGER,
       return endGame(); //we should call endGame()
     }

     if (top < GAME_HEIGHT) { //if the rock hasn't reached the bottom of the GAME
       window.requestAnimationFrame(moveRock);  //move it again. callback containing function for animation.
     } else {
       rock.remove();
       }
     }
    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */
     window.requestAnimationFrame(moveRock);

  // We should kick of the animation of the rock around here

  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
     ROCKS.push(rock);

  // Finally, return the rock element you've created
     return rock;
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  clearInterval(gameInterval);

  ROCKS.forEach(function(rock) {rock.remove()});

  document.removeEventListener('keydown', moveDodger);

  START.innerHTML('PLAY AGAIN?');
  START.style.display = 'inline';

  return alert('GAME OVER: You lose!');
}

function moveDodger(e) {
  const input = e.which;

  if ([LEFT_ARROW, RIGHT_ARROW]).indexOf(input) > -1) { //ignores non left and right arrow key inputs
    e.preventDefault();
    e.stopPropagation();
  }

  if (input === LEFT_ARROW) { //if left arrow key input
    moveDodgerLeft(); //move left
  } else if (input === RIGHT_ARROW) { //if right arrow key input
    moveDodgerRight(); //move right
  }
}

function moveDodgerLeft() {
  window.requestAnimationFrame(function() {
    const left = positionToInteger(DODGER.style.left);

    if (left > 0) { //if the left rock edge isnt touching the left screen edge
      DODGER.style.left = `${left - 4}px`;
    }
  });
}

function moveDodgerRight() {
  window.requestAnimationFrame(function() {
    const right = positionToInteger(DODGER.style.right);

    if (left < 360) { //if the left right isnt at 400-40 = 360(because the rock is 40px wide)
      DODGER.style.left = `${left + 4}px`;
    }
  });
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
