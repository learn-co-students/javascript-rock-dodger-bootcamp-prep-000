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

  GAME.append('rock');

  function moveRock() {
    var topNumbers = rock.style.top.replace('px', '')
    var top = parseInt(topNumbers, 10)

    rock.style.top = `${top + 2}px`

     if(checkCollision(rock)) {
       endGame();
     } else if(rock.style.top >= 400) {
       $('.rock').remove();
     }
   window.requestAnimationFrame(moveRock);

  }

  window.requestAnimationFrame(moveRock);

  ROCKS.push(rock)

  return rock
}


function endGame() {
  var gameInterval = null
  DODGER.remove('rocks')
  DODGER.removeEventLister('moveDodger')
  alert('YOU LOSE!')
}

function moveDodger(e) {

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
   if (left > 0) {
     dodger.style.left = `${left-8}px`

   }

}

function moveDodgerRight() {

   var leftNumber =
   DODGER.style.left.replace('px', '')
   var left = parseInt(leftNumber, 10)
   if (left > 0) {
     dodger.style.left = `${left+8}px`

    }
    window.requestAnimationFrame(moveDodger)
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
