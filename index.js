/*****************************************************************************************************************************************************/

const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('game');
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37; // use e.which!
const RIGHT_ARROW = 39; // use e.which!
const START = document.getElementById('start');
var ROCKS = [];
var gameInterval = null;

/*****************************************************************************************************************************************************/

function checkCollision(rock) {

  const top = positionToInteger(rock.style.top);

  if (top >= 360 && top <= 400) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);

    const dodgerRightEdge = dodgerLeftEdge + 40; 
  
    const rockLeftEdge = positionToInteger(rock.style.left);

    const rockRightEdge = rockLeftEdge + 20;
      
    if (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) {
      return true;
    }
    if (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) {
      return true;    
    }
    if (rockLeftEdge <= dodgerRightEdge && rockRightEdge >=dodgerRightEdge){
      return true;
    }  
}
}
/*****************************************************************************************************************************************************/

function createRock(x, top) {
  const rock = document.createElement('div');

  rock.className = 'rock';
    
  rock.style.left = `${x}px`;
  rock.style.top = `${top}px`;

  GAME.appendChild(rock);

/*****************************************************************************************************************************************************/
      
  function moveRock() {
    
    var top = positionToInteger(rock.style.top);
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
    if (top < 380){
      rock.style.top = `${top + 2}px`;
      console.log('h');
      window.requestAnimationFrame(moveRock); 
    }
    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */
    if(top >= 380)
    {
      rock.remove();
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

/*****************************************************************************************************************************************************/

function endGame() {
  
    clearInterval(gameInterval);
    for (let i=0; i<ROCKS.length;i++){
      ROCKS[i].remove();
    }
    START.innerHTML = 'Want to play again?';
    START.style.display = 'inline';
    
    return alert('YOU LOSE!');
}

/*****************************************************************************************************************************************************/

function moveDodger(key) {
  
    if(key.which === LEFT_ARROW){
      key.preventDefault();
      moveDodgerLeft();
      //window.requestAnimationFrame(moveDodgerLeft);
      key.stopPropagation();
    }
    else if(key.which === RIGHT_ARROW){
      key.preventDefault();
      moveDodgerRight();
      key.stopPropagation();
      //window.requestAnimationFrame(moveDodgerRight);
    }
	
}

/*****************************************************************************************************************************************************/

function moveDodgerLeft() {

  var left = positionToInteger(DODGER.style.left);

  if (left > 0){
    DODGER.style.left = `${left -2}px`;}
}

/*****************************************************************************************************************************************************/

function moveDodgerRight() {

  var right = positionToInteger(DODGER.style.left);
  
  if (right < 360){
    DODGER.style.left = `${right +2}px`;}
}

/*****************************************************************************************************************************************************/

function positionToInteger(p) {  // returns 200 without px.
  return parseInt(p.split('px')[0]) || 0;
}

/*****************************************************************************************************************************************************/

function integerToPosition(pos){ // returns 200px.
    return `${pos}px`;
}

/*****************************************************************************************************************************************************/

function start() {
      
  START.style.display = 'none';
    
  document.addEventListener('keydown', moveDodger);
     
  gameInterval = setInterval(function() {createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)), 0)
  }, 1500);
    
  }

