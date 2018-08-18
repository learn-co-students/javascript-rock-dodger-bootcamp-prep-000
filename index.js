
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
  
  const top = positionToInteger(rock.style.top)
  
  if (top > 360) {
    const rockLeftEdge = positionToInteger(rock.style.left)
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40; 
    const rockRightEdge = rockLeftEdge + 20;
    
    if ((( rockLeftEdge <= dodgerLeftEdge ) && (rockRightEdge >= dodgerLeftEdge)) || ((rockLeftEdge >= dodgerLeftEdge) && (rockRightEdge <= dodgerRightEdge)) || ((rockLeftEdge <= dodgerRightEdge) && (rockRightEdge >= dodgerRightEdge))) { return true } else { return false}
}
  else {return false}
}

 
function createRock(x) {
  console.log(x)
  const rock = document.createElement('div')
  rock.className = 'rock'
  rock.style.left = `${x}px`
  var topZero = 0;
  rock.style.top = topZero;
  GAME.appendChild(rock)
  
  function moveRock() {
            rock.style.top = `${topZero += 2}px`
             if (topZero < 400){
                if (checkCollision(rock) === true){
                  endGame();
                } else {
                 window.requestAnimationFrame(moveRock)
                } 
              } else {rock.remove()}
          }

  window.requestAnimationFrame(moveRock) 
  ROCKS.push(rock)
  return rock

  
}



 
function endGame() {
  clearInterval(gameInterval);
  
  for (var i = 0; i < ROCKS.length ; i++ ) {
    ROCKS[i].remove()
  }
  
  window.removeEventListener('keydown', moveDodger);
  alert('You Lose!');
  
}

function moveDodger(e) {

  
  if (e.which === LEFT_ARROW){
    moveDodgerLeft();
    e.preventDefault()
    e.stopPropagation();
  }
  else if (e.which === RIGHT_ARROW){
    moveDodgerRight();
    e.preventDefault()
    e.stopPropagation();
  }
}

function moveDodgerLeft() {
 var leftMove = parseInt(DODGER.style.left)
 function leftStep(){
   if (leftMove > 0 ){
   DODGER.style.left = `${leftMove - 4}px`
   //{
   // window.requestAnimationFrame(leftStep)
 }}
 window.requestAnimationFrame(leftStep)
}



function moveDodgerRight() {
 var rightMove = parseInt(DODGER.style.left)
 function rightStep(){
   if (rightMove < 360 ){
   DODGER.style.left = `${rightMove + 4}px`
  //  {
   //window.requestAnimationFrame(rightStep)
 }}
 window.requestAnimationFrame(rightStep)
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
