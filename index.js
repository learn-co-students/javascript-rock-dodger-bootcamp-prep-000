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

  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    const dodgerRightEdge = positionToInteger(DODGER.style.left) + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    const rockRightEdge = positionToInteger(rock.style.left) + 20;

      if (rockLeftEdge < dodgerLeftEdge && rockRightEdge > dodgerLeftEdge) {
        return true
      }
      if (rockLeftEdge > dodgerLeftEdge && rockRightEdge < dodgerRightEdge) {
        return true
      } 
      if (rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerRightEdge) {
        return true
      }
        
    
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

  GAME.appendChild(rock);



  function moveRock(rock) {
    var top = 0
    function step() {
      rock.style.top = `${top += 2}px`
    }
    
    if (rock.style.top < 380 && checkCollision(rock) === false) {
       window.requestAnimationFrame(step)
     }


     if (checkCollision(rock) === true) {
       endGame();
     }


     if (rock.style.top === 380 && checkCollision(rock) === false) {
       rock.remove();
     }
     
    
  }


  ROCKS.push(rock)


  return rock
}


function endGame() {
  gameInterval = null;
  ROCKS = [];
  window.removeEventListener('keydown', moveDodger)
  alert("YOU LOSE!");
}

function moveDodger(e) {
  if (e.which === 37) {
    moveDodgerLeft();
  }
  if (e.which === 39) {
    moveDodgerRight();
  }
}


function moveDodgerLeft() {
  var leftNumbers = dodger.style.left.replace('px','')
  var left = parseInt(leftNumbers)
  
  if (left > 0) {
    dodger.style.left = `${left - 1}px`
  }
}

function moveDodgerRight() {
  var rightNumbers = dodger.style.left.replace('px','')
  var right = parseInt(rightNumbers)
  
  if (right < 360) {
    dodger.style.left = `${right + 1}px`
  }
}


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
