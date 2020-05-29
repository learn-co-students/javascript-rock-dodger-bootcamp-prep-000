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
    const rockRightEdge = rockLeftEdge + 20

    if (rockLeftEdge < dodgerLeftEdge && rockRightEdge > dodgerLeftEdge) {
    return true}
    
    if (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) {
    return true}
    
    if (rockLeftEdge < dodgerRightEdge && rockRightEdge >= dodgerRightEdge) {
    return true}
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
    rock.style.top = `${top += 2}px`
    
      if (checkCollision(rock) === true) {
      return endGame()
      }
      if (top < 400) {
      window.requestAnimationFrame(moveRock)
      } else {
        rock.remove()
      }
    }
      window.requestAnimationFrame(moveRock)
  ROCKS.push(rock)

  // Finally, return the rock element you've created.
  return rock
}

// /**
// * End the game by clearing `gameInterval`,
// * removing all ROCKS from the DOM,
// * and removing the `moveDodger` event listener.
// * Finally, alert "YOU LOSE!" to the player.
// */
function endGame() {
  clearInterval(gameInterval)
  ROCKS.forEach(function(rock) {
  rock.remove()
  })
  alert("YOU LOSE!")
}

function moveDodger(e) {
  const playerInput = e.which
  
  if (playerInput == LEFT_ARROW || playerInput == RIGHT_ARROW) {
    e.preventDefault()
    e.stopPropagation()
  }
  if (e.which === LEFT_ARROW) {
      moveDodgerLeft()
    }
  if (e.which === RIGHT_ARROW) {
    moveDodgerRight()
 }
}
function moveDodgerLeft() {
  window.requestAnimationFrame(function(){
  var leftNumbers = dodger.style.left.replace('px', '')
  var left = parseInt(leftNumbers, 10)
 
  if (left >= 4) {
    dodger.style.left = `${left - 4}px`
  }
  })
}

function moveDodgerRight() {
  window.requestAnimationFrame(function(){
  var leftNumbers = dodger.style.left.replace('px', '')
  var left = parseInt(leftNumbers, 10)
  var right = left + 40
  if (right <= 396) {
    dodger.style.left = `${left + 4}px`
  }
     })
  // var leftNumbers = dodger.style.left.replace('px', '')
  // var left = parseInt(leftNumbers, 10)
  // var right = left + 40
  // if (right <= 396) {
  //   dodger.style.left = `${left + 4}px`
  // }
}

// /* @param {string} p The position property
// * @returns {number} The position as an integer (without 'px')
// */
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


  /**
    * If a rock collides with the DODGER,
    * we should call endGame().
    */

    /**
    * Otherwise, if the rock hasn't reached the bottom of
    * the GAME, we want to move it again.
    */

    /**
    * But if the rock *has* reached the bottom of the GAME,
    * we should remove the rock from the DOM.
    */


  // We should kick off the animation of the rock around here.
  
  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision.