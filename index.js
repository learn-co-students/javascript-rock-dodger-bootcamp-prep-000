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

function moveDodgerLeft() {
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   leftPosition = positionToInteger(DODGER.style.left)

   function moveLeft() {
     console.log(`ML: left position is ${leftPosition}`)

     function stepLeft() {
       DODGER.style.left = `${leftPosition -= 4}px`
     }

     window.requestAnimationFrame(stepLeft)
   } if (leftPosition > 0) {
     moveLeft()
   }
}

function moveDodgerRight() {
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   leftPosition = positionToInteger(DODGER.style.left)

   function moveRight() {
     console.log(`MR: left position is ${leftPosition}`)

     function stepRight() {
       DODGER.style.left = `${leftPosition += 4}px`
     }

     window.requestAnimationFrame(stepRight)
   } if (leftPosition < 360) {
     moveRight()
   }
}

function moveDodger(e) {
  // implement me!
  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */

   console.log(e.which)
   if (e.which === 37) {
     console.log('activate moveDodgerLeft')
		 e.preventDefault()
     moveDodgerLeft()
		 e.stopPropagation()
   } else if (e.which === 39) {
     console.log('activate moveDodgerLeft')
		 e.preventDefault()
		 moveDodgerRight()
		 e.stopPropagation()
   } else {
     console.log("invalid input")
   }
}

function endGame() {
  console.log('game over')
  clearInterval(gameInterval)

  for (var i = 0; i < ROCKS.length; i++) {
    ROCKS[i].remove()
    console.log(`Rock ${i} removed`)
  }

  document.removeEventListener('keydown', moveDodger)

  alert('YOU LOSE!')
}

function checkCollision(rock) {
	// implement me!
  	// use the comments below to guide you!
  	var top  = positionToInteger(rock.style.top)

  	// rocks are 20px high
  	// DODGER is 20px high
  	// GAME_HEIGHT - 20 - 20 = 360px;
  	if (top > 360) {
    	var dodgerLeftEdge = positionToInteger(DODGER.style.left)

    	// [FIXME - Fixed]: The DODGER is 40 pixels wide -- how do we get the right edge?
    	var dodgerRightEdge = dodgerLeftEdge + 40;

    	var rockLeftEdge = positionToInteger(rock.style.left)

    	// FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    	var rockRightEdge = rockLeftEdge + 20;

    	if ( (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
        (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
        (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)
        /**
        * Think about it -- what's happening here?
        * There's been a collision if one of three things is true:
        * 1. The rock's left edge is < the DODGER's left edge,
        *    and the rock's right edge is > the DODGER's left edge;
        * 2. The rock's left edge is > the DODGER's left edge,
        *    and the rock's right edge is < the DODGER's right edge;
        * 3. The rock's left edge is < the DODGER's right edge,
        *    and the rock's right edge is > the DODGER's right edge
        */) {
    		return true
    		}
    }
}

function createRock(x) {
  console.log('rock created')
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Hmmm, why would we have used `var` here?
  var top = 0

  rock.style.top = `${top}px`

  game.appendChild(rock)

  ROCKS.push(rock)

  function moveRock() {
    if (rock) {

      rockTop = positionToInteger(rock.style.top)
      rock.style.top = `${rockTop += 2}px`
      /**
      * If a rock collides with the DODGER,
      * we should call endGame()
      */
      if (checkCollision(rock)) {
        endGame()
      }
      /**
      * Otherwise, if the rock hasn't reached the bottom of
      * the GAME, we want to move it again.
      */
      if( positionToInteger(rock.style.top) < 370 ) {
       window.requestAnimationFrame(moveRock)
      }
      /**
      * But if the rock *has* reached the bottom of the GAME,
      * we should remove the rock from the DOM
      */
      else {
        rock.remove()
        console.log('rock removed')
      }
    }
  }
  window.requestAnimationFrame(moveRock)

	return rock
}



/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  console.log('start!')

  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
  createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
