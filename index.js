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
    return(
    (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
    (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
    (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)
  )
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`
  rock.style.top = 0
  var top = 0
  GAME.appendChild(rock)
  function moveRock() {
    rock.style.top = `${top += 4}px`
     if(checkCollision(rock)){
       return endGame();
     }
     if (top < 400) {
         window.requestAnimationFrame(moveRock)
       }
     else {
       rock.remove()
      }
     }
  window.requestAnimationFrame(moveRock)

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
  ROCKS.forEach(function(rock){
    rock.remove()
  })
  clearInterval(gameInterval)
  window.removeEventListener('keydown', moveDodger)
  alert("You lose!")
  }


function moveDodger(e) {
  const which = e.which
  if ([LEFT_ARROW,RIGHT_ARROW].indexOf(which) > -1){
    e.preventDefault()
    e.stopPropagation()
  }
    if(which === LEFT_ARROW){
      moveDodgerLeft()
    }
    else if(which === RIGHT_ARROW){
      moveDodgerRight()
    }
  }

function moveDodgerLeft() {
    const left = positionToInteger(DODGER.style.left)
    function move(){
      if (left > 0){
        DODGER.style.left = `${left - 4}px`
    }
  }
  window.requestAnimationFrame(move)
}

function moveDodgerRight() {
    const right = positionToInteger(DODGER.style.left)
    function move(){
      if (right < 360){
        DODGER.style.left = `${right + 4}px`
    }
  }
  window.requestAnimationFrame(move)
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
