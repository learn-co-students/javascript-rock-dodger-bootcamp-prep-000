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
  if (top > 360) { // set the width of our dodger and rock
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = positionToInteger(DODGER.style.left)+40;
    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = positionToInteger(rock.style.left)+20;

    if(
      ((rockLeftEdge <= dodgerLeftEdge) && (rockRightEdge >= dodgerLeftEdge))  ||
      ((rockLeftEdge >= dodgerLeftEdge) && (rockRightEdge <= dodgerRightEdge)) ||
      ((rockLeftEdge <= dodgerRightEdge) && (rockRightEdge >= dodgerRightEdge))
      ){
        return true;
      }else{
      return false;
    }
  }
}



function createRock(x) {
  const rock = document.createElement('div');
  rock.className = 'rock';
  rock.style.left = `${x}px`;
  var top = 0;
  rock.style.top = top;
  GAME.appendChild(rock);
  
  function moveRock(rock) {
    function step(){
      rock.style.top = `${top += 2}px`; //our step
    }
    if(checkCollision(rock)){ //if collision, end game.
      endGame();
    }else if(positionToInteger(rock.style.top) === GAME_HEIGHT-20){
      ROCKS.splice(ROCKS.length-1,1); // if a rock makes it to the bottom, remove it.
    }else{
      window.requestAnimationFrame(step); //otherwise step.
    }
  }
  
  ROCKS.push(rock); //add rock to stack
  
  moveRock(rock); //start moving it
  return rock; //return the created rock
}

function endGame() {
  clearInterval(gameInterval);
  ROCKS.forEach(rock => rock.remove());
  window.removeEventListener('keydown', moveDodger);
  alert('YOU LOSE!');
}

function moveDodger(e) {
  if(e.which === LEFT_ARROW){
    moveDodgerLeft();
    e.preventDefault();
    e.stopPropagation();
  }else if(e.which === RIGHT_ARROW){
    moveDodgerRight();
    e.preventDefault();
    e.stopPropagation();
  }
}
function moveDodgerLeft() {
   // (mabye 4 pixels?). Use window.requestAnimationFrame()!
   let xL = positionToInteger(DODGER.style.left);
   function step(){
     if(xL === 0){
       DODGER.style.left = 0;
     }else{
       DODGER.style.left = `${xL-4}px`;
     }
   }
  window.requestAnimationFrame(step);
}
function moveDodgerRight() {
   // (mabye 4 pixels?). Use window.requestAnimationFrame()!
   //get current position of Right edge
   let xL = positionToInteger(DODGER.style.left); 
   function step(){
     if(positionToInteger(DODGER.style.left) === 360){ //if current right edge 
       DODGER.style.left = DODGER.style.left;
     }else{
       DODGER.style.left = `${xL+4}px`;
     }
   }
  window.requestAnimationFrame(step);
}

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
