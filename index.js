
const DODGER = document.getElementById('dodger')
const DODGER_WIDTH=40
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
    const dodgerRightEdge = dodgerLeftEdge+40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge+20;

    if ((rockRightEdge > dodgerLeftEdge) && ((rockRightEdge-dodgerLeftEdge)<60)) {
      rock.remove()
      return true
    }
    else {
      return false
    }
  }
}


function createRock(x) {
  const rock = document.createElement('div')
  GAME.append(rock)
  rock.className = 'rock'
  rock.style.left = `${x}px`
  var top = 0
  rock.style.top = top
  moveRock(rock)
}




function moveRock(movingRock) {
  var rock=movingRock
  rockInterval = setInterval(function() {
    var top=parseInt(rock.style.top.split('px',1))+2
    if ((top<(GAME_HEIGHT-20)) && (!checkCollision(rock))) {
      rock.style.top=`${top+2}px`
    }
    else if (checkCollision(rock)) {
      clearInterval(rockInterval)
      endGame()
    }
    else {
      clearInterval(rockInterval)
      rock.remove()
    }
   }, 4)

}


function endGame() {
  clearInterval(gameInterval)
  window.removeEventListener('keydown', moveDodger)
  alert('YOU LOSE!')
}





function moveDodger(e) {
   if (e.which===LEFT_ARROW) {
     e.preventDefault()
     moveDodgerLeft()
     e.stopPropagation()
   }
   else if (e.which===RIGHT_ARROW) {
     e.preventDefault()
     moveDodgerRight()
     e.stopPropagation()
   }
}


function moveDodgerLeft() {
  var left = positionToInteger(DODGER.style.left)  //current left edge of dodger

  function step() {
    if (left > 3) {
      DODGER.style.left = `${left -= 4}px`
      window.requestAnimationFrame(step)
    }
  }

  window.requestAnimationFrame(step)
}




function moveDodgerRight() {
  var left = positionToInteger(DODGER.style.left)  //current left edge of dodger

  function step() {
    if (left < ((GAME_WIDTH-DODGER_WIDTH)-3)) {
      DODGER.style.left = `${left += 4}px`
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
