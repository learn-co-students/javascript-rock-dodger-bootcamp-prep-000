/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('game');
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37; // use e.which!
const RIGHT_ARROW = 39; // use e.which!
var ROCKS = [];
const START = document.getElementById('start');

var gameInterval = null;

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {
  // implement me!
  // use the comments below to guide you!
  const top = positionToInteger(rock.style.top);

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left);

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = rockLeftEdge + 20;

    if ((rockLeftEdge<=dodgerLeftEdge&&rockRightEdge>=dodgerLeftEdge) ||   //  `  __`____
        (rockLeftEdge>=dodgerLeftEdge&&rockRightEdge<=dodgerRightEdge) ||  //   __`__`___
        (rockLeftEdge<=dodgerRightEdge&&rockRightEdge>=dodgerRightEdge)){  //   _____`__  `
      return true;
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = `${x}px`;

  rock.style.top = "0px";

  GAME.appendChild(rock);

  function moveRock() {
    //move the rock down 2 px
    var rockFromTop = positionToInteger(rock.style.top);
    rock.style.top = `${rockFromTop+2}px`;
    
    //if it's collided, end the game. If it's still in play, move again, otherwise, remove it
    if(checkCollision(rock)){
      return endGame();
    } else if (rockFromTop<380) {
      window.requestAnimationFrame(moveRock);
    } else {
      rock.remove();
    }
  }
  
  window.requestAnimationFrame(moveRock);

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
  //stops making rocks
  clearInterval(gameInterval);
  
  //visually removes rocks, but they are still in the background falling, so move them off the game board to the right
  ROCKS.forEach(function(element){
    element.remove();
    element.style.left = "401px";
  });
  
  document.removeEventListener('keydown', moveDodger);
  
  alert("You've lost!");
}

function moveDodger(e) {
  // implement me!
  
  if(e.which === LEFT_ARROW){
    moveDodgerLeft();
    e.preventDefault();
    e.stopPropagation();
  } else if (e.which === RIGHT_ARROW){
    moveDodgerRight();
    e.preventDefault();
    e.stopPropagation();
  }
}

function moveDodgerLeft() {
  // implement me!
  var dodgerLeftEdge = positionToInteger(DODGER.style.left);
  if(dodgerLeftEdge>0){
    window.requestAnimationFrame(()=>{DODGER.style.left = `${dodgerLeftEdge-4}px`});
  }
}

function moveDodgerRight() {
  // implement me!
  var dodgerLeftEdge = positionToInteger(DODGER.style.left);
  if(dodgerLeftEdge<360){
    window.requestAnimationFrame(()=>{DODGER.style.left = `${dodgerLeftEdge+4}px`});
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
