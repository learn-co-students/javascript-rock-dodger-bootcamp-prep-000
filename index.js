const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)
  if (top > 360) {
    //dodger
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40;
    //rock
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20 ;

    // actual collision check
    if((rockLeftEdge <=dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge)||
       (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge)||
       (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)){
         return true;
       }
  }
}
function createRock(x) {
  const rock = document.createElement('div')    //adding rock
  rock.className = 'rock'
  rock.style.left = `${x}px`
  var top = 0
  rock.style.top = `${top}px`;
  GAME.appendChild(rock);                 // rock added

  function moveRock(){
    if(checkCollision(rock)){
      endGame();
    }
    else if(positionToInteger(rock.style.top) < 400){
        rock.style.top = `${top+=2}px`;
        window.requestAnimationFrame(moveRock);
    }
    else{
      console.log("removed")
      rock.remove();
    }
  }

  window.requestAnimationFrame(moveRock)
  ROCKS.push(rock)

  return rock
}
function endGame(){
  for(var i=0;i<ROCKS.length;i++){
    ROCKS[i].remove();
  }
  clearInterval(gameInterval);
  window.removeEventListener('keydown', moveDodger);
  alert("You lose.")
}
function moveDodger(e){
  if(e.which == LEFT_ARROW){
    e.preventDefault();
    e.stopPropagation();
    moveDodgerLeft();

  }
  else if (e.which == RIGHT_ARROW) {
    moveDodgerRight();
    e.preventDefault();
    e.stopPropagation();
  }
}
function moveDodgerLeft(){
  var left = positionToInteger(DODGER.style.left);
  if(left > 0){
  function step(){
    DODGER.style.left=`${left-4}px`;
  }
  window.requestAnimationFrame(step);
  }
}
function moveDodgerRight(){
  var right = positionToInteger(DODGER.style.left);
  function step(){
    DODGER.style.left=`${right+4}px`;
    }
  if(right < 360){
    window.requestAnimationFrame(step)
  }
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
