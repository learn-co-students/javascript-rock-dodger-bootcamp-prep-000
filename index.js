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
    const rockLeft = positionToInteger(rock.style.left)
  const rockRight = rockLeft + 20
  const dodgerLeft = positionToInteger(DODGER.style.left)
  const dodgerRight = dodgerLeft + 40
  
    if (top > 360){
     if ((rockLeft <= dodgerLeft && rockRight >= dodgerLeft) 
     || (rockLeft >= dodgerLeft && rockRight <= dodgerRight) 
     || (rockLeft <= dodgerRight && rockRight >= dodgerRight)){
       return true
     }
    }  
    if (top <= 360){
      return false
    }
  }

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Hmmm, why would we have used `var` here?
  var top = 0

  rock.style.top = top
 
 GAME.appendChild(rock)
 
 if (checkCollision(rock)){
      return endGame()
    }
    
  function moveRock() {

    top = `${top += 2}px`
 
    if (top <= '360px') {
      window.requestAnimationFrame(moveRock)
    }
   rock.remove()
    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */
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
  clearInterval(gameInterval)
  ROCKS.forEach(function(rock) { rock.remove() })
}

function moveDodger(e) {
  
  
  if (e.which === LEFT_ARROW){
    e.preventDefault()
    e.stopPropagation()
    moveDodgerLeft()
  }
  
  if (e.which === RIGHT_ARROW){
    e.preventDefault()
    e.stopPropagation()
    moveDodgerRight()
  }

}

function moveDodgerLeft() {
  window.requestAnimationFrame(function (){
    dodgerLeft = positionToInteger(DODGER.style.left)
  
  if (dodgerLeft > 0){
       DODGER.style.left = `${dodgerLeft -= 4}px`
    }
  })
}


function moveDodgerRight() {
   window.requestAnimationFrame(function (){
      dodgerLeft = positionToInteger(DODGER.style.left)
     
     if (dodgerLeft < 360){
       DODGER.style.left = `${dodgerLeft += 4}px`
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
