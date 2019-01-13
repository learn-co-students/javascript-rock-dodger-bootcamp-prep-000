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

var gameInterval = null

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {
  // implement me!
  // use the comments below to guide you!
  const top = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left)

    const rockRightEdge = rockLeftEdge + 20;

    if (rockLeftEdge <= dodgerRightEdge && rockLeftEdge >= dodgerLeftEdge){
      return true;
    }
    if(rockRightEdge <= dodgerRightEdge && rockRightEdge >= dodgerLeftEdge) {
      //console.log((rockLeftEdge, dodgerLeftEdge));
      return true
    }
  }
  return false;
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Hmmm, why would we have used `var` here?
  var top = 0

  rock.style.top = top;
  GAME.appendChild(rock);
  
  function moveRock() {
    
    if (checkCollision(rock)){
      endGame();
    }
    top = rock.style.top;
    top = positionToInteger(top);
    rock.style.top = `${top + 2}px`;
    if (top > (GAME_HEIGHT)){
      rock.remove();
      return
    }
    window.requestAnimationFrame(moveRock);
    
  }
  window.requestAnimationFrame(moveRock);
  ROCKS.push(rock)
  return rock
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  while(ROCKS.length > 0){
    let rock = ROCKS.pop();
    rock.remove();
    
  }
  //alert("Game Over!");
  START.style.display = "initial";
  clearInterval(gameInterval);
}

function moveDodger(e) {
   if(e.which === LEFT_ARROW){ 
      e.stopPropagation();
      e.preventDefault();
      moveDodgerLeft(); 
    }
   if(e.which === RIGHT_ARROW){ 
      e.stopPropagation();
      e.preventDefault();
      moveDodgerRight(); 
   }
}

function moveDodgerLeft() {
  let left = positionToInteger(DODGER.style.left);
  function move() {
    if (left > 0){
      DODGER.style.left = `${left - 4}px`;
      //window.requestAnimationFrame(move);
      //return
    }
  }
  //window.requestAnimationFrame(move);
  //return
  move();
}

function moveDodgerRight() {
   let width = 40;
   let left = positionToInteger(DODGER.style.left);

   function move(){
     if (left + width < GAME_WIDTH ){
       DODGER.style.left = `${left + 4}px`;
       //window.requestAnimationFrame(move);
      // return
     }
   }
   //window.requestAnimationFrame(move);
   move()
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
