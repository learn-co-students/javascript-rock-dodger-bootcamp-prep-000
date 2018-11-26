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


function checkCollision(rock) {
  
  const top = positionToInteger(rock.style.top)
  
  const dodgerLeftEdge = positionToInteger(DODGER.style.left)

  const dodgerRightEdge = positionToInteger(DODGER.style.left) + 40;

  const rockLeftEdge = positionToInteger(rock.style.left)

  const rockRightEdge = positionToInteger(rock.style.left) + 20;
 
  if ((top > 360) &&
     ((rockLeftEdge <= dodgerLeftEdge) && (rockRightEdge >= dodgerLeftEdge) ||
      (rockLeftEdge >= dodgerLeftEdge) && (rockRightEdge <= dodgerRightEdge) ||
      (rockLeftEdge <= dodgerRightEdge) && (rockRightEdge >= dodgerRightEdge))) {
      return true
    } 
  else return     
  
}


function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = rock.style.top = 0

  GAME.appendChild(rock)

  function moveRock() {
    rock.style.top = `${top += 2}px`;

    if (checkCollision(rock)) {
      return endGame()
    }

    if (top < GAME_HEIGHT) {
      window.requestAnimationFrame(moveRock)
    } else {
      rock.remove()
    }
  }

  window.requestAnimationFrame(moveRock)

  ROCKS.push(rock)

  return rock
}

function endGame() {
  clearInterval(gameInterval);
  
  while (ROCKS.length > 0) {
  ROCKS.pop()
  }
  
  for (let i = GAME.children.length - 1; i > 1; --i) { 
    GAME.children[i].remove()
  }
  
  window.removeEventListener('keydown', moveDodger)
     
  
  return alert("YOU LOSE!")
}


function moveDodger(e) {
  
  if ([LEFT_ARROW, RIGHT_ARROW].indexOf(e.which) > -1) {
    e.preventDefault();
    e.stopPropagation();
  }
  
    if (e.which === LEFT_ARROW) {
     
      moveDodgerLeft();
      
      }
    
    else if (e.which === RIGHT_ARROW) {
     moveDodgerRight();
     
    }
   
  
  
}


function moveDodgerLeft() {
  var dodgeLeft = document.getElementById('dodger')
  var leftAsInteger = positionToInteger(dodgeLeft.style.left);
    
    function step() {
      if (leftAsInteger > 0) {
        dodgeLeft.style.left = `${leftAsInteger += -4}px`;
         
          window.requestAnimationFrame(step)
        }
      else return
        
      
    }
  window.requestAnimationFrame(step);
}

function moveDodgerRight() {
  var dodgeRight = document.getElementById('dodger');
  var rightAsInteger = positionToInteger(dodgeRight.style.left);
    
    function step() {
      
        if (rightAsInteger < 360) {
          dodgeRight.style.left = `${rightAsInteger += 4}px`;
          window.requestAnimationFrame(step)
        }
        else return
  } 
 window.requestAnimationFrame(step)
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