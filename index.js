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

  var height = GAME_HEIGHT - 20 - 20;
  if (top > height) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = rockLeftEdge + 20;

    if ((rockLeftEdge <= dodgerLeftEdge) && (rockRightEdge >= dodgerLeftEdge)) {
      return true
    }else if((rockLeftEdge >= dodgerLeftEdge) && (rockRightEdge <= dodgerRightEdge)){
      return true
    }else if((rockLeftEdge <= dodgerRightEdge) && (rockRightEdge >= dodgerRightEdge)){
      return true
    }else{
      return false
    }
  }else{
    return false
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = 0;
  var height = GAME_HEIGHT - 20 - 20;

  rock.style.top = top;

  function moveRock() {
     rock.style.top = `${top += 2}px`;
     if(checkCollision(rock) === true){
       endGame();
       return
     }else{
       if(top < height){
         window.requestAnimationFrame(moveRock);
       }else{
         $('.rock').remove();
       }
     }
  }
  window.requestAnimationFrame(moveRock);
  ROCKS.push(rock)
  return rock
}

function endGame() {
  clearInterval(gameInterval);
  for(var i = 0; i < ROCKS.length; i++){
    ROCKS[i].remove();
  }
  window.removeEventListener('keydown',moveDodger)
  window.alert("YOU LOSE!")
}

function moveDodger(e) {
  // implement me!
  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */
   if(e.which === RIGHT_ARROW){
     e.preventDefault();
     e.stopPropagation();
     moveDodgerRight();
   }else if(e.which === LEFT_ARROW){
     e.preventDefault();
     e.stopPropagation();
     moveDodgerLeft();
   }
}

function moveDodgerLeft() {
  window.requestAnimationFrame(function(){
    const left = positionToInteger(DODGER.style.left);
    if(left > 0){
      DODGER.style.left = `${left - 4}px`;
    }
  })
}

function moveDodgerRight() {
  var width = GAME_WIDTH - 20 - 20;
  window.requestAnimationFrame(function(){
    const left = positionToInteger(DODGER.style.left);
    if(left < width){
      DODGER.style.left = `${left + 4}px`
    }
  })
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
