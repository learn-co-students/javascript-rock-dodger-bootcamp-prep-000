const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 
const RIGHT_ARROW = 39
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    const dodgerRightEdge = positionToInteger(DODGER.style.left) + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    const rockRightEdge = positionToInteger(rock.style.left) + 20;

  if((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) || (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge)
   ||(rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)){
    return true;
  }
}
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`
  
  var top = 0

  rock.style.top = top
  
  GAME.appendChild(rock);

 
  function moveRock() {  
        if(!checkCollision(rock)){
        top = positionToInteger(rock.style.top)
        if(top < GAME_HEIGHT - 20){
          rock.style.top = `${top + 5}px`
          window.requestAnimationFrame(moveRock)
        }else{
       rock.remove();
      }
    }else{
      return endGame();
    }
  }
   window.requestAnimationFrame(moveRock)
 
  ROCKS.push(rock)

  return rock
  
}

function endGame() {
  clearInterval(gameInterval)
  ROCKS.forEach(function(rock){
    rock.remove();
  })
  
document.removeEventListener('keydown',moveDodger)
window.alert('You lose! :)')
START.innerHTML = 'Play again?'
START.style.display = 'inline'
}

function moveDodger(e) {
  const code = e.which

  if ([LEFT_ARROW, RIGHT_ARROW].indexOf(code) > -1) {
    e.preventDefault()
    e.stopPropagation()
  }

  if (code === LEFT_ARROW) {
    moveDodgerLeft()
  } else if (code === RIGHT_ARROW) {
    moveDodgerRight()
  }
}

function moveDodgerLeft() {
 window.requestAnimationFrame(function(){
  const left = positionToInteger(DODGER.style.left)
  if(left > 0){
    DODGER.style.left = `${left - 4}px`
  }
})
}

 function moveDodgerRight() {
  window.requestAnimationFrame(function(){
  const left = positionToInteger(DODGER.style.left)
  if(left < 360){
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
