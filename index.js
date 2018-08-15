/**
 * Don't change these constants!
 */
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
  if (top >= 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);

    const dodgerRightEdge = dodgerLeftEdge + 40; 
  
    const rockLeftEdge = positionToInteger(rock.style.left);

    const rockRightEdge = rockLeftEdge + 20;

       /*
               * Think about it -- what's happening here?
               * There's been a collision if one of three things is true:
               * 1. The rock's left edge is < the DODGER's left edge,
               *    and the rock's right edge is > the DODGER's left edge;
               * 2. The rock's left edge is > the DODGER's left edge,
               *    and the rock's right edge is < the DODGER's right edge;
               * 3. The rock's left edge is < the DODGER's right edge,
               *    and the rock's right edge is > the DODGER's right edge
               */
      
    if (rockRightEdge >= dodgerLeftEdge || rockLeftEdge >= dodgerRightEdge) {
      return true
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = `${x}px`;

  var top = 0;

  rock.style.top = `${top}px`;

  GAME.appendChild(rock);

  function moveRock() {
    /**
     * If a rock collides with the DODGER,
     * we should call endGame()
     */
    if (checkCollision(rock)){
      endGame();
    }
    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */
    if (positionToInteger(rock.style.top) !== 380){
      moveRock();
    }
    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */
    else if(positionToInteger(rock.style.top) === 380)
    {
      //remove rock
    }
  top += 2;
  rock.style.top = `${top}px`;
      window.requestAnimationFrame(moveRock);
  }
  moveRock();
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
}

function moveDodger() {
  
  document.addEventListener('keydown', function(key){
  
    if(key.which === LEFT_ARROW){
      moveDodgerLeft();
    }
    else if(key.which === RIGHT_ARROW){
      moveDodgerRight();
    }
  });
}

function moveDodgerLeft() {

  var left = positionToInteger(DODGER.style.left);

  if (left > 0){
    DODGER.style.left = `${left -2}px`;}
    
  window.requestAnimationFrame(moveDodgerLeft);
}

function moveDodgerRight() {

  var right = positionToInteger(DODGER.style.left);
  
  if( right < 360){
    DODGER.style.left = `${right +2}px`;}
    
  window.requestAnimationFrame(moveDodgerRight);  
}

function positionToInteger(p) {  // returns 200 without px.
  return parseInt(p.split('px')[0]) || 0;
}

/*function integerToPosition(pos){ // returns 200px.
    return `${pos}px`;
}*/

function start() {
      
  START.style.display = 'none';
    
  document.querySelector('#start').addEventListener('keydown', moveDodger());

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1500);
}
