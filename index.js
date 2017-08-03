const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('game');
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const ROCKS = [];
const START = document.getElementById('start');

var gameInterval = null;
var move = 0;

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > (GAME_HEIGHT - 20 - 20)) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    //The DODGER is 40 pixels wide
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    //The rock is 20 pixel's wide
    const rockRightEdge = rockLeftEdge + 20;

    if (rockLeftEdge < dodgerRightEdge &&
        rockRightEdge > dodgerLeftEdge
            /**
               * There's been a collision if one of three things is true:
               * 1. The rock's left edge is < the DODGER's left edge,
               *    and the rock's right edge is > the DODGER's left edge;
               * 2. The rock's left edge is > the DODGER's left edge,
               *    and the rock's right edge is < the DODGER's right edge;
               * 3. The rock's left edge is < the DODGER's right edge,
               *    and the rock's right edge is > the DODGER's right edge
               */) {
      return true;
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock';
  rock.style.left = `${x}px`;

  var top = 0;

  rock.style.top = top;

  GAME.appendChild(rock);

  function moveRock() {
     if (checkCollision(rock)){
       //call endGame() if a rock collides with dodger
        endGame();
     }else if(positionToInteger(rock.style.top) > (GAME_HEIGHT-20)){
       //Remove Rock once it reaches bottom
        rock.remove();
     }else{
       //else move rock
       rock.style.top = `${positionToInteger(rock.style.top)+2}px`;
       window.requestAnimationFrame(moveRock);
     }
  }

  // We should kick of the animation of the rock around here
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
  for(let i=0; i<ROCKS.length; i++){
      ROCKS[i].remove();
  }
  window.clearInterval(gameInterval);
  document.removeEventListener('keydown', moveDodger);
  alert("YOU LOSE!");
}

function moveDodger(e) {
   if(e.which === LEFT_ARROW && positionToInteger(DODGER.style.left) >= 4){
     e.preventDefault();
     moveDodgerLeft();
     e.stopPropagation();
   }else if(e.which === RIGHT_ARROW && positionToInteger(DODGER.style.right) <= GAME_WIDTH-4){
     e.preventDefault();
     moveDodgerRight();
     e.stopPropagation();
   }
}

function moveDodgerLeft() {
  if(positionToInteger(DODGER.style.left)>0){
   DODGER.style.left = `${positionToInteger(DODGER.style.left)-4}px`;
   window.requestAnimationFrame(moveDodgerLeft);
  }
}

function moveDodgerRight() {
   if(positionToInteger(DODGER.style.left)<=GAME_WIDTH-40-4){
     DODGER.style.left = `${positionToInteger(DODGER.style.left)+4}px`;
     window.requestAnimationFrame(moveDodgerRight);
   }
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0 ;
}

function start() {
  window.addEventListener('keydown', moveDodger);

  START.style.display = 'none';

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
