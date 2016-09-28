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
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    //Ze DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left);
    //Ze rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = rockLeftEdge +20;

    //  * There's been a collision if 1 of 3 things is true:
    // Ze rock's LE is < ze DODGER's LE,and the rock's RE is > ze DODGER's LE;
    return (
      (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
      //Ze rock's LE is > ze DODGER's LE,and the rock's R edge is < ze DODGER's RE;
      (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
      //Ze rock's LE is < ze DODGER's RE edge, and the rock's R edge is > ze DODGER's LE
      (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)
    )
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Hmmm, why would we have used `var` here?
  var top = 0;
  top = rock.style.top;

  // Now that we have a rock, we'll need to append/add it to GAME and move it downwards.

  GAME.appendChild(rock);

  /**
  * This function moves the rock. (2 pixels at a time
  * seems like a good pace.)
  */
  function moveRock() {
    rock.style.top = `${top += 2}px`;
    // If a rock collides with the DODGER, we should call endGame()
    if(checkCollision(rock)) {
      return endGame();
    }
    // Otherwise, if the rock hasn't reached the bottom of the GAME, we want to move it again.
    else if (top < GAME_HEIGHT) {
      window.requestAnimationFrame(moveRock);
    }
    // But if the rock *has* reached the bottom of the GAME, we should remove the rock from the DOM
    else {
      rock.remove();
    }
  }
  // We should kick of the animation of the rock around here
  window.requestAnimationFrame(moveRock);
  // Add the rock to ROCKS so that we can remove all rocks, when there's a collision
  ROCKS.push(rock);
  // Finally, return the rock element you've created
  return rock;
}


//End the game by clearing `gameInterval`,
function endGame() {
  clearInterval(gameInterval);
  // removing all ROCKS from the DOM,
  ROCKS.forEach(function(rock) {
    rock.remove()
  });
  // and removing the `moveDodger` event listener.
  document.removeEventListener('keydown', moveDodger);
  // Finally, alert "YOU LOSE!" to the player.
  return alert("YOU LOSE!");
}

// This function should call `moveDodgerLeft()`
function moveDodger(e) {
  const code = e.which

  if(code === LEFT_ARROW || code === RIGHT_ARROW){
    e.preventDefault();
    e.stopPropagation();
  }

  // if the left arrow is pressed and `moveDodgerRight()`
  if(code === LEFT_ARROW) {
    moveDodgerLeft();
  }
  // if the right arrow is pressed. (Check the constants
  else if (code === RIGHT_ARROW) {
    moveDodgerRight();
  }
  // we've declared for you above.)
  // And be sure to use the functions declared below!
}

function moveDodgerLeft() {

  /**
  * This function should move DODGER to the left
  * (mabye 4 pixels?). Use window.requestAnimationFrame()!
  */
  window.requestAnimationFrame(function(){
    const left = positionToInteger(DODGER.style.left);

    if (left > 0) {
      DODGER.style.left = `${left - 4}px`;
    }
  });
}

function moveDodgerRight() {
  // implement me!
  //This function should move DODGER to the right
  //(mabye 4 pixels?). Use window.requestAnimationFrame()!
  window.requestAnimationFrame(function() {
    const left = positionToInteger(DODGER.style.left);

    if (left < 360) {
      DODGER.style.left = `${left + 4}px`;
    }
  });
}

/**
* @param {string} p The position property
* @returns {number} The position as an integer (without 'px')
*/
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0;
}

function start() {
  window.addEventListener('keydown', moveDodger);

  START.style.display = 'none';

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)));
  }, 1000)
}
