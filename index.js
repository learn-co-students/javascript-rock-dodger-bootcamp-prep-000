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
const DODGER_LENGTH = 40
const ROCK_LENGTH = 20
var gameInterval = null
var localIntervals = []
var gameEnd = false;
/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {

  const top = positionToInteger(rock.style.top)

  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + DODGER_LENGTH;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + ROCK_LENGTH;
    var boundsData = [dodgerLeftEdge,dodgerRightEdge,rockLeftEdge,rockRightEdge] //lower,upper,check1,check2
    if(DODGER_LENGTH < ROCK_LENGTH){ //facilitate changing sizes 
      boundsData[0] = rockLeftEdge;
      boundsData[1] = rockRightEdge;
      boundsData[2] = dodgerLeftEdge;
      boundsData[3] = dodgerRightEdge;
    }
    //Make this an if statement that returns nothing if false if this doesnt pass the test - that's how the original code worked
      return (withinRange(boundsData[0], boundsData[1], boundsData[2]) || withinRange(boundsData[0], boundsData[1], boundsData[3])) 
  }
}

function withinRange(lower, upper, number){
  return (number >= lower) && (number <= upper);
}


function createRock(x) {
  
  const rock = document.createElement('div')
  rock.className = 'rock'
  rock.style.left = `${x}px`
  rock.style.backgroundColor = '#FF69B4'

  var top = 0
  rock.style.top = `${top}px`;

  GAME.appendChild(rock);

  function inCollisionZone(rock){
    return positionToInteger(rock.style.top) >= 360;
  }
  
  function atBottom(rock){
    return positionToInteger(rock.style.top) > 400;
  }

  function moveRock() {

    if(gameEnd){rock.remove();return rock;}
    var final = positionToInteger(rock.style.top);
    top = final;

    if(checkCollision(rock)){
      endGame(); 
    }else if(atBottom(rock)){
      rock.remove();
    }else{
      final = 421;
      if(top < final){
        rock.style.top = `${top += 2}px`;
        window.requestAnimationFrame(moveRock);
      }
      
    }

  }

  window.requestAnimationFrame(moveRock);

  ROCKS.push(rock);

  return rock;
}

function endGame() {
  gameEnd = true;
  clearInterval(gameInterval);
  while(ROCKS.length > 0){
    var rockToRemove = ROCKS.pop();
    rockToRemove.remove();
  }
  window.removeEventListener('keydown', moveDodger);
  alert("YOU LOSE!");
  
}

function moveDodger(key) {
  switch(key.which){
    case LEFT_ARROW:
      key.stopPropagation();
      key.preventDefault();
      moveDodgerLeft();
      break;
    case RIGHT_ARROW:
      key.preventDefault();
      moveDodgerRight();
      break;
    default:
      break;
  }
    
}


function moveDodgerLeft() {
  var left = positionToInteger(DODGER.style.left);
  var final = (left - 4) > 0 ? (left - 4) : 0 ;
  
  function move(){

    if(left > final){
      DODGER.style.left = `${--left}px`
      window.requestAnimationFrame(move);
    }
  }
  
  window.requestAnimationFrame(move);
}

function moveDodgerRight() {
  var left = positionToInteger(DODGER.style.left);
  var final = (left + 4 + DODGER_LENGTH) < GAME_WIDTH ? (left + 4) : 400-DODGER_LENGTH;
  
  function move(){
    
    if(left < final){
      DODGER.style.left = `${++left}px`
      window.requestAnimationFrame(move);
    }
  }
  
  window.requestAnimationFrame(move);
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
