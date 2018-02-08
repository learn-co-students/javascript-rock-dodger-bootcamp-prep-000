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

function checkCollision(rock){
  const topRock = positionToInteger(rock.style.top);
  if (topRock > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = rockLeftEdge + 20;

    if (((rockLeftEdge <= dodgerLeftEdge) && (rockRightEdge > dodgerLeftEdge)) ||
       ((rockLeftEdge >= dodgerLeftEdge) && (rockRightEdge <= dodgerRightEdge)) ||
       ((rockLeftEdge <= dodgerRightEdge) && (rockRightEdge >= dodgerRightEdge))) {
      return true
    } else {
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')
  rock.className = 'rock'
  rock.style.left = `${x}px`
  var top = 0
  rock.style.top = top
  GAME.appendChild(rock)

  function moveRock() {
   While (rock.style.bottom < 400) {
     
     if (checkCollision(rock)){
       endGame()
     } else {
       function step() {
          rock.style.top = `${top += 2}px`
          if (top < 380) {
            window.requestAnimationFrame(step)
          }
      }
      window.requestAnimationFrame(step)
    }
    
  }
  GAME.removeChild(rock)
}

  moveRock()
  ROCKS.push(rock)
  // Finally, return the rock element you've created
  return rock
}

function endGame() {
  clearInterval(gameInterval);
  for(let i = 0; i < ROCKS.length; i++){
    var currentRock = ROCKS[i];
    currentRock.remove();
  }
  window.removeEventListener('keydown', moveDodger);
  alert("YOU LOSE!");
}

function moveDodger(e) {
   if(e.which === LEFT_ARROW){
     moveDodgerLeft()
     e.preventDefault()
     e.stopPropagation()
   } else if(e.which === RIGHT_ARROW){
     moveDodgerRight()
     e.preventDefault()
   }
}

function moveDodgerLeft() {
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   var Left  = positionToInteger(DODGER.style.left)
   if (Left > 0 ){
    console.log("testl")
    function step(){
      DODGER.style.left = `${Left - 4}px`
    }
    window.requestAnimationFrame(step)
  }
}

function moveDodgerRight() {
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
  var Right  = positionToInteger(DODGER.style.left)
  if (Right < 360){
    console.log("testr")
    function step(){
      DODGER.style.left = `${Right + 4}px`
      console.log(DODGER.style.right)
    }
    window.requestAnimationFrame(step)
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
