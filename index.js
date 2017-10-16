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
  const top = positionToInteger(rock.style.top)
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = positionToInteger(DODGER.style.left)+40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = positionToInteger(rock.style.left)+20;
    if ((rockLeftEdge<=dodgerLeftEdge && rockRightEdge>=dodgerLeftEdge === true)||(rockLeftEdge>=dodgerLeftEdge && rockRightEdge<=dodgerRightEdge === true)||(rockLeftEdge<=dodgerRightEdge && rockRightEdge>=dodgerRightEdge===true)){
      return true
    }
  }
}

function createRock(x) {
// Running the start function calls the gameInterval function which creates a new rock every second.
// Each rock must 1. be created, 2. move down the game, 3. be removed at the bottom (if no collision)
  const rock = document.createElement('div')
  rock.className = 'rock'
  rock.style.left = `${x}px`
  var top = 0
  rock.style.top = top
  GAME.appendChild(rock)
  // Define the function moveRock() below:
  function moveRock() {
    if(checkCollision(rock)){
      endGame()
    }
    else{
      // move rock down 2px
      rock.style.top = `${top += 2}px`
      //  check to make sure rock is not past the dodger
      if(top<380){
        //  since the rock still has room to move down, rock moves down 2 again
        window.requestAnimationFrame(moveRock)
      }
      // if the rock is at the bottom of the game:
      else{
        // rock disappears
        GAME.removeChild(rock)
      }
      window.requestAnimationFrame(moveRock)
    }
  }
// calls moveRock when rock is created:
moveRock()
// Stores rock in array to "keep score" of how many rocks have been dodged (not displayed anywhere, just exists to be cleared at endGame)
ROCKS.push(rock)
// ???:
return rock
}

/**
* End the game by clearing `gameInterval`,
* removing all ROCKS from the DOM,
* and removing the `moveDodger` event listener.
* Finally, alert "YOU LOSE!" to the player.
*/
function endGame() {
  clearInterval(gameInterval);
  for(let i = 0;i<ROCKS.length;i++){
    ROCKS[i].remove()
  };
  window.removeEventListener('keydown', moveDodger)
  alert("YOU LOSE!")
}

function moveDodger(e) {
  if(e.which === LEFT_ARROW){
    moveDodgerLeft()
    e.preventDefault()
    e.stopPropagation()
  }
  else if(e.which === RIGHT_ARROW){
    moveDodgerRight()
    e.preventDefault()
  }
}

function moveDodgerLeft() {
  var left = positionToInteger(DODGER.style.left)
  if(left>0){
    dodger.style.left = `${left-4}px`;
  }
}

function moveDodgerRight() {
  var left = positionToInteger(DODGER.style.left)
  var right = left + 40
  if(left<360){
    dodger.style.left = `${left+4}px`;
  }
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
