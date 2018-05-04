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

  // rocks are 20px high, 20px wide
  // DODGER is 20px high, 40px wide
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20;

    if (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerLeftEdge) {

      return true
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

    function step() {
      rock.style.top = `${top += 2}px`
      
      if (checkCollision(rock) === true) {
        endGame()
      }
      
      else if (top < 400) {
        window.requestAnimationFrame(step)
      }    
      
      else if (top === 400) {
        GAME.removeChild(rock)
      }
    }
    window.requestAnimationFrame(step)
  }
  
  moveRock()
  
   // Add the rock to ROCKS so that we can remove all rocks when there's a collision
  ROCKS.push(rock)
  return rock
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  
  clearInterval(gameInterval)
  
  for(let i = 0; i < ROCKS.length; i++) {
    ROCKS[i].remove()
  }
  
  window.removeEventListener('keydown', moveDodger)
  
  alert("YOU LOSE!")
}

function moveDodger(e) {

  if (e.which === LEFT_ARROW) {
    moveDodgerLeft()
    e.stopPropagation()
    e.preventDefault()
  }
  if (e.which === RIGHT_ARROW) {
    moveDodgerRight()
    e.stopPropagation()
    e.preventDefault()
  }
}

function moveDodgerLeft() {
  
  const dodgerLeftEdge = positionToInteger(DODGER.style.left)
  
  //function step() {
    if (dodgerLeftEdge > 0) {
      dodger.style.left = `${dodgerLeftEdge - 6}px`
    }
    //window.requestAnimationFrame(step);
  //}
  //window.requestAnimation(step)
}

function moveDodgerRight() {
  
  const dodgerLeftEdge = positionToInteger(DODGER.style.left)
  const dodgerRightEdge = dodgerLeftEdge + 40
  
  //function step() {
    if (dodgerRightEdge < GAME_WIDTH) {
      dodger.style.left = `${dodgerLeftEdge + 6}px`
    }
  //  window.requestAnimationFrame(step)
  //}
  //window.requestAnimationFrame(step)
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
