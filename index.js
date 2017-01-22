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

  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge+40
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge+20

      return ((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
        (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
        (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge))
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
    rock.style.top = `${top += 2}px`

     if (checkCollision(rock)) {
       endGame();
      }
     if (top >= GAME_HEIGHT) {
        rock.remove()
     } else {
       window.requestAnimationFrame(moveRock);
     }   
  }
window.requestAnimationFrame(moveRock);
  ROCKS.push(rock)
  return rock
}

function endGame() {
  clearInterval(gameInterval)
  for (var i = 0, l = ROCKS.length; i < l; i++){
      ROCKS[i].remove()
    }
document.removeEventListener('keydown',moveDodger)
alert('YOU LOSE!')
}
function moveDodger(e) {
  const dodgerLeftEdge = positionToInteger(DODGER.style.left)
  const dodgerRightEdge = dodgerLeftEdge+40

    if(e.which===37) {
      if(dodgerLeftEdge <= 0) {
        e.preventDefault()
      }
      moveDodgerLeft()
    }
    if (e.which===39){
      if (dodgerRightEdge >= GAME_WIDTH){
        e.preventDefault()
      }
      
      moveDodgerRight()
    }
}
function moveDodgerLeft() {
   var leftNumber =
   DODGER.style.left.replace('px', '')
   var left = parseInt(leftNumber, 10)
  
     dodger.style.left = `${left-8}px`
   
}
function moveDodgerRight() {
   var leftNumber =
   DODGER.style.left.replace('px', '')
   var left = parseInt(leftNumber, 10)
 
    dodger.style.left = `${left+8}px`
/*function moveDodger(e) {
    if(e.which===37) {
      moveDodgerLeft()
    }
    else if (e.which===39){
      moveDodgerRight()
    }
}
function moveDodgerLeft() {
   var leftNumber =
   DODGER.style.left.replace('px', '')
   var left = parseInt(leftNumber, 10)
   if (left >= 8 ) {
     dodger.style.left = `${left-8}px`
   }
}
function moveDodgerRight() {
   var leftNumber =
   DODGER.style.left.replace('px', '')
   var left = parseInt(leftNumber, 10)
   if (left >=(GAME_WIDTH-40) ) {
     e.preventDefault()
    }
    dodger.style.left = `${left+8}px`
}*/

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