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

  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40;
    
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20;
    
    if((rockLeftEdge <= dodgerLeftEdge) && (rockRightEdge >= dodgerLeftEdge)){
      return true
    } else if ((rockLeftEdge > dodgerLeftEdge) && (rockRightEdge < dodgerRightEdge)){
      return true
    } else if ((rockLeftEdge < dodgerRightEdge) && (rockRightEdge > dodgerRightEdge)){
      return true
    } else {
      return false
    }
  } else {
      return false
  }
}

function createRock(x) {
  const rock = document.createElement('div')
  rock.className = 'rock'
  rock.style.left = `${x}px`
  var top = 0
  rock.style.top = top

  GAME.appendChild(rock)

  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
     if(checkCollision(rock)){
       return endGame()
     } else {
      rock.style.top = `${top += 2}px`
    
      if (top < 380) {
        window.requestAnimationFrame(moveRock)
      } 
     }

    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */
  }

  // We should kick of the animation of the rock around here
  window.requestAnimationFrame(moveRock)
  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
  ROCKS.push(rock)

  // Finally, return the rock element you've created
  return rock
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */

function removeRock() {
  var rock = document.getElementsByClassName("rock");
  for (var i = 0; i < rock.length; i++) {
    rock[i].remove()
  }
}

function endGame() {
  clearInterval(gameInterval)
  removeRock()
  alert("YOU LOSE!")
}

  
  // This function should call `moveDodgerLeft()`
  // if the left arrow is pressed and `moveDodgerRight()`
  // if the right arrow is pressed. (Check the constants
  // we've declared for you above.)
  // And be sure to use the functions declared below!
function moveDodger(e) {
   if (e.which === LEFT_ARROW){
     e.preventDefault()
     e.stopPropagation()
     return moveDodgerLeft()
   } else if (e.which === RIGHT_ARROW){
     e.preventDefault()
     e.stopPropagation()
     return moveDodgerRight()
   }
   
}

  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
function moveDodgerLeft() {
    var left = positionToInteger(DODGER.style.left)
    if(left > 0){
      DODGER.style.left = `${left - 4}px`
    }
}

  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
function moveDodgerRight() {
    var left = positionToInteger(DODGER.style.left)
    if(left < 360){
      DODGER.style.left = `${left + 4}px`
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
