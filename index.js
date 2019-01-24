/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('game');
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37; // use e.which!;
const RIGHT_ARROW = 39; // use e.which!;
const ROCKS = [];
const START = document.getElementById('start');

var gameInterval = null;
const dodgerWidth = 40

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */
DODGER.style.color = 'magenta';
 
function checkOverlap(dodLeft, rocLeft){ // use in checkCollision
  if(rocLeft > dodLeft &&
     rocLeft < dodLeft + dodgerWidth  ){
    endGame()  ;
    return null;
  }
  if(rocLeft + 20 > dodLeft &&
     rocLeft + 20 < dodLeft + dodgerWidth){
    endGame();
    return null;
  }
  
}

function checkCollision(rock) {
  // implement me!
  // use the comments below to guide you!
  const top = positionToInteger(rock.style.top);

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);

    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left);

    const rockRightEdge = rockLeftEdge + 20;
    
    checkOverlap(dodgerLeftEdge, rockLeftEdge);
      
    }
  
}

function createRock(x) {
  const rock = document.createElement('div');
  GAME.appendChild(rock)
  rock.className = 'rock';
  rock.style.left = `${x}px`;
  // Hmmm, why would we have used `var` here?
  var top = 0;

  rock.style.top = `${top}px`;
  
  ROCKS.push(rock);

  // Finally, return the rock element you've created
  return rock;
}
 function moveRock() {
    var rockList = document.getElementsByClassName('rock')
    for(var i = 0; i < rockList.length; i++){
    var rockTop = positionToInteger(rockList[i].style.top);
    rockList[i].style.top = `${rockTop+2}px`;
    checkCollision(rockList[i]);
    if (rockTop >= 380){
     rockList[i].remove();    
    }
    

    }
  }
/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  clearInterval(gameInterval);
  //clearInterval(moveInterval);
  for(i = 0; i < ROCKS.length; i++){
    ROCKS[i].remove()
  }
  DODGER.remove()
  
  alert('end of game triggered')
  
}

function moveDodger(e) {
  // implement me!
  e.stopPropagation()
  if (e.which === LEFT_ARROW){
    if(positionToInteger(DODGER.style.left) <= 0){
      DODGER.style.left = '0px';
      return null;
    }
    requestAnimationFrame(moveDodgerLeft);
  }
  if (e.which === RIGHT_ARROW){
    if (positionToInteger(DODGER.style.left) >= 360){
      DODGER.style.left = '360px';
      return null;
    }
    requestAnimationFrame(moveDodgerRight);
    
  }

}

function moveDodgerLeft() {
  // implement me!
      if(positionToInteger(DODGER.style.left) <= 0){
      DODGER.style.left = '0px';
      return null;}
  DODGER.style.left = `${positionToInteger(DODGER.style.left)-4}px`;
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
}

function moveDodgerRight() {
  // implement me!
      if (positionToInteger(DODGER.style.left) >= 360){
      DODGER.style.left = '360px';
      return null;
    }
  DODGER.style.left = `${positionToInteger(DODGER.style.left)+4}px`;
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
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
                             },             
                 1000);
  moveInterval = setInterval(function(){
                 window.requestAnimationFrame(moveRock);
                 },
                 10)               
  
}
