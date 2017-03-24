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

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    //const dodgerRightEdge = 0;
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    //const rockRightEdge = 0;
    const rockRightEdge = rockLeftEdge + 20;

  /*  if (false /**
               * Think about it -- what's happening here?
               * There's been a collision if one of three things is true:
               * 1. The rock's left edge is < the DODGER's left edge,
               *    and the rock's right edge is > the DODGER's left edge;
               * 2. The rock's left edge is > the DODGER's left edge,
               *    and the rock's right edge is < the DODGER's right edge;
               * 3. The rock's left edge is < the DODGER's right edge,
               *    and the rock's right edge is > the DODGER's right edge
             ){*/
      if (
        (rockLeftEdge < dodgerLeftEdge && rockRightEdge > dodgerLeftEdge) ||
        (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
        (rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerRightEdge) 
      ) {return true} else{
         return false}
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`
  
  // Hmmm, why would we have used `var` here?
  var top = rock.style.top = 0
  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */
   GAME.appendChild(rock)
  
  function moveRock() {
     rock.style.top = `${top += 2}px`
     
     if (checkCollision(rock)){
        endGame();
     }

     if (top < GAME_HEIGHT) {
       window.requestAnimationFrame(moveRock)
     } else{
       rock.remove()
     }
   }
window.requestAnimationFrame(moveRock)

ROCKS.push(rock)

return rock
}

function endGame() {
  clearInterval(gameInterval);
  ROCKS.forEach(function(element){
    element.remove()
  });
  document.removeEventListener('keydown', moveDodger);
  window.alert("YOU LOSE!");
}

function moveDodger(e) {
  if (e.which === LEFT_ARROW) {
    e.preventDefault()
    e.stopPropagation()
    moveDodgerLeft();
  } 
  if (e.which === RIGHT_ARROW) {
    e.preventDefault()
    e.stopPropagation()
    moveDodgerRight();
  }
}

function moveDodgerLeft() {
  var left = positionToInteger(DODGER.style.left)
  if (left > 0) {
   dodger.style.left = `${left -= 4}px`
 }
}

function moveDodgerRight() {
  var left = positionToInteger(DODGER.style.left)  
  if (left < 360) {
   dodger.style.left = `${left += 4}px`
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
