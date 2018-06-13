const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('game');
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37; // use e.which!
const RIGHT_ARROW = 39; // use e.which!
const ROCKS = [];
const START = document.getElementById('start');

var gameInterval = null;

function checkCollision(rock) {
   const top = positionToInteger(rock.style.top);
  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = positionToInteger(DODGER.style.left) + 40;
    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = positionToInteger(rock.style.left) + 20;

    if ((rockLeftEdge <= dodgerLeftEdge  && rockRightEdge >= dodgerLeftEdge) ||
            (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge)  ||
            (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = `${x}px`;
  

  // Hmmm, why would we have used `var` here?
  var top = 0;

  rock.style.top = top;
  
  GAME.append(rock);
  

  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */


  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
    rock.style.top = `${top += 5}px`;
    
    if (top < 400) {
      
      if (checkCollision(rock)) {
        endGame();
      } else {
        window.requestAnimationFrame(moveRock);
      }
      
    } else {
      rock.remove();
    }
  }
  window.requestAnimationFrame(moveRock);
  
  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
  

  // Finally, return the rock element you've created
  ROCKS.push(rock);
  return rock;
}


function endGame() {
  clearInterval(gameInterval);
  for (let i = 0; i<ROCKS.length; i++) {
    ROCKS[i].remove();
  }
  window.removeEventListener('keydown', moveDodger);
  DODGER.remove();
  alert("YOU LOSE!");
  
}

function moveDodger(e) {
  
  if (e.which === LEFT_ARROW) {
    moveDodgerLeft();
  } else if (e.which === RIGHT_ARROW) {
    moveDodgerRight();
  } else {
    return;
  }
  
  // implement me!
  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */
}

function moveDodgerLeft() {
  
  var left = positionToInteger(DODGER.style.left);
  
  function stepLeft(){
    DODGER.style.left = `${left -= 4}px`;
    if (left > 0) {
      window.requestAnimationFrame(stepLeft); 
    } else {
      DODGER.style.left = "0px";
    }
  }
  window.requestAnimationFrame(stepLeft);
}

function moveDodgerRight() {
  var left = positionToInteger(DODGER.style.left);
  
  function stepRight(){
    DODGER.style.left = `${left += 4}px`;
    if (left < 360) {
      window.requestAnimationFrame(stepRight); 
    } else {
      DODGER.style.left = "360px";
    }
  }
  window.requestAnimationFrame(stepRight);
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
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 800);
}
