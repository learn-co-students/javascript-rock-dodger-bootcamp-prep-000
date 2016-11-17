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
    if
	(((rockRightEdge  >= dodgerLeftEdge) && (rockRightEdge <= dodgerRightEdge)) ||
	((rockLeftEdge >= dodgerLeftEdge) && (rockLeftEdge <= dodgerRightEdge))) {
      return true
    }
  }
}

function createRock(x) {debugger
 	const rock = document.createElement('div')
  	rock.className = 'rock'
  	rock.style.left = `${x}px`
  	rock.style.top = 0
	GAME.appendChild(rock)

     function  moveRock(){
     		function step(){
     		if (ROCKS.length===0){
     		return}
     		rock.style.top = `${top + 2}px`
     		if(checkCollision(rock)){
				endGame()
			}
   	  	 	else if (top <380){
   	  	 	window.requestAnimationFrame(step)
   	  	 	}
   	  	 	else {
   	  	 	rock.remove()
   	  	 }
   	  	}
   	  	     window.requestAnimationFrame(step)
	}

	ROCKS.push(rock)
	moveRock()
	return rock
}

function moveDodger(e) {
	if(e.which===LEFT_ARROW){
    e.preventDefault()
    e.stopPropagation()
		moveDodgerLeft()
	}
	if(e.which===RIGHT_ARROW){
    e.preventDefault()
		moveDodgerRight()
		}
	}

function moveDodgerLeft() {
  function step(){
  	var leftNumbers = DODGER.style.left.replace('px', '')
  	var left = parseInt(leftNumbers, 10)
  		  if (left > 0){
  			DODGER.style.left = `${left - 4}px`;
  			window.requestAnimationFrame(step)
  		}
	 }
	 window.requestAnimationFrame(step)
}

function moveDodgerRight() {
  function step(){
  	var rightNumbers = DODGER.style.left.replace('px', '')
  	var right = parseInt(rightNumbers, 10)
  		  if (right < 360){
  			DODGER.style.left = `${right + 4}px`;
  			window.requestAnimationFrame(step)
  		}
	 }
	 window.requestAnimationFrame(step)
}

function endGame() {
clearInterval(gameInterval)
for(i=0,l=ROCKS.length;i<l;i++){
    ROCKS[0].remove()
}
document.removeEventListener('keydown',moveDodger)
alert('YOU LOSE')
}

function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  document.addEventListener('keydown', moveDodger)
  START.style.display = 'none'
  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
