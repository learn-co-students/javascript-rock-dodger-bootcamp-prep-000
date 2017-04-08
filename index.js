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
  if (top > 360 && top <= 400) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = positionToInteger(DODGER.style.left) + 40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = positionToInteger(rock.style.left) + 20;

    if (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) {
      return true
    }
    else if(rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge){
      return true
    }
    else if(rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge){
      return true
    }
    else{
      return false
    }
  }
}


function createRock(x) {
  const rock = document.createElement('div')
  rock.className = 'rock'
  rock.style.left = `${x}px`
  var top = 0
  rock.style.top = `${top}px`
  GAME.appendChild(rock)

  function moveRock() {
    rock.style.top = `${top += 2}px`
    checkCollision(rock)
    if (top <= 360){
      window.requestAnimationFrame(moveRock)
    }
    else if(top>360 && top<=400){
      if(checkCollision(rock)){
        return endGame()
      }
      else{
        window.requestAnimationFrame(moveRock)
      }
    }
    else if(top>400){
      rock.remove()
    }
  }
  window.requestAnimationFrame(moveRock)
  ROCKS.push(rock)
  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
   // We should kick of the animation of the rock around here

   // Add the rock to ROCKS so that we can remove all rocks
   // when there's a collision
  // Finally, return the rock element you've created
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
  while(ROCKS.length>0){
    ROCKS[0].remove()
    ROCKS.shift()
  }
  document.removeEventListener('keydown', moveDodger)
  window.removeEventListener('keydown', moveDodger)
  return alert("YOU LOSE!");
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
     if (e.which === LEFT_ARROW) {
       moveDodgerLeft()
       e.preventDefault()
       e.stopPropagation()
     }
     else if (e.which === RIGHT_ARROW){
       moveDodgerRight()
       e.preventDefault()
       e.stopPropagation()
     }
}

function moveDodgerLeft() {
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   var left = positionToInteger(dodger.style.left)
   function step() {
     if (left > 0) {
       dodger.style.left = `${left -= 4}px`
       window.requestAnimationFrame(step)
       }
     }
    window.requestAnimationFrame(step)
}

function moveDodgerRight() {
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */

   var right = positionToInteger(dodger.style.left)
   function step() {
     if (right < 360) {
       dodger.style.left = `${right += 4}px`
       window.requestAnimationFrame(step)
       }
     }
    window.requestAnimationFrame(step)
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
