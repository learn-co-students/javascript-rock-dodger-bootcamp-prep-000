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

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20;
    
  
    if ((rockLeftEdge <= dodgerLeftEdge) && (rockRightEdge >= dodgerLeftEdge)|| (rockLeftEdge >= dodgerLeftEdge) && (rockRightEdge <= dodgerRightEdge) || (rockLeftEdge <= dodgerRightEdge) && (rockRightEdge >= dodgerRightEdge))
    
   {
      return true
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock';
  rock.style.left = `${x}px`;

  var rockTop = 0

  rock.style.top = rockTop;
  function moveRock() {
    // implement me!
    // (use the comments below to guide you!)
     
      rock.style.top = `${top += 2}px`;
      if (top <380){
        windows.requestAnimationFrame(move)
      
    }
    
   
     if(checkCollision(rock)===true) {
       endGame();
     } else if(rock.style.top <= 380) {
       moveRock();
     } 
   
   
  return rock;
  }
  GAME.appendChild(rock);
  ROCKS.push(rock)
  window.requestAnimationFrame(moveRock)
return rock;
}
  

 
 

function endGame() {
  
  
  for(var i = 0; i < ROCKS.length; i++){
   ROCKS[i].remove();
   }
   clearInterval(gameInterval)
}

function moveDodger(e) {
  // implement me!
 if(e.which === LEFT_ARROW) { 
   moveDodgerLeft();
   e.preventDefault();
   e.stopPropagation();
 } else if(e.which === RIGHT_ARROW) {
   moveDodgerRight();
   e.preventDefault();
   e.stopPropagation();
   
 }
}

function moveDodgerLeft() {
  var left = positionToInteger(DODGER.style.left)
  
     if(left > 0) {
       DODGER.style.left = `${left -= 4}px`
     }
    
   
}  
 window.requestAnimationFrame(moveDodgerLeft)

 

function moveDodgerRight() {
  
  var left = positionToInteger(DODGER.style.left)
  
  
     if(left <360) {
       DODGER.style.left = `${left += 4}px`
     }
    
   
}  
 window.requestAnimationFrame(moveDodgerRight)


  
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

