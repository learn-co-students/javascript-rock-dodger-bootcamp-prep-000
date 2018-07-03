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


  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = rockLeftEdge + 20;

    if (
      (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge)|| 
      (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge)||
      (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)) {
      return true;
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = `${x}px`;

  var top = rock.style.top = 0;
  
  // appaneds rock to game
  GAME.appendChild(rock);

  function moveRock() {
    rock.style.top = `${top += 2}px`;
    
    if (checkCollision(rock)) {
      return endGame();
    }

    if (top < GAME_HEIGHT) {
      window.requestAnimationFrame(moveRock);
    } else {
      rock.remove();
    }
  }
    window.requestAnimationFrame(moveRock);

  ROCKS.push(rock);

  return rock;
}

function endGame() {
  
  // runs through each item in the ROCKS array and removes that item
  ROCKS.forEach(function(rock){
    rock.remove()
  })
  
  // stops the event listener from listening to keydown
  window.removeEventListener('keydown', moveDodger)
  
  // clears the game interval
  clearInterval(gameInterval);
  
  // alerts the player they have lost
  alert ('YOU LOSE!');
}

function moveDodger(e) {
  // implement me!
    const code = e.which
    
    //if (code !== LEFT_ARROW || code !== RIGHT_ARROW){
    if ([LEFT_ARROW, RIGHT_ARROW].indexOf(code) > -1){
        e.preventDefault()
        e.stopPropagation()
      }
        if (code === RIGHT_ARROW) {
          moveDodgerRight();
        }
        if (code === LEFT_ARROW) {
          moveDodgerLeft();
        }
}

function moveDodgerLeft() {
        var leftNumbers = DODGER.style.left.replace('px', '')
        var left = parseInt(leftNumbers, 10)
        
        if (left > 0) {
          DODGER.style.left = `${left - 1}px`
        }
}

function moveDodgerRight() {
  // implement me!
        var leftNumbers = DODGER.style.left.replace('px', '')
        var left = parseInt(leftNumbers, 10)
      
        if (left < 360) {
          DODGER.style.left = `${left + 1}px`
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
