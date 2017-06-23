/*
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


  if (top < 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    const dodgerRightEdge = positionToInteger(DODGER.style.left) + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    const rockRightEdge = positionToInteger(rock.style.left) + 20;

    if (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge ||
        rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge ||
        rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge) {
      return true
    }
  }
}



/*--------------------------check collision end----------------*/




function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = 0

  rock.style.top = `${top}px`

  var rockTop = positionToInteger(rock.style.top)

  GAME.appendChild(rock)


  window.requestAnimationFrame(moveRock)

  function moveRock() {

    if (checkCollision() === true) {
      return endGame()
    }
    if (rockTop < 400) {
        rock.style.top = `${top + 2} px`
      }

    if (rockTop === 400) {
      rock.style.display = 'none'
    }
  }

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
  $('div').remove('.rock')
  window.removeEventListener('keydown', moveDodger)
  alert('YOU LOSE!')
}



// ------------------MoveDodgers All Finished!------------------



function moveDodger(e) {

  if (e.which === LEFT_ARROW) {
    moveDodgerLeft()
    e.preventDefault()
    e.stopPropagation()
  } else if (e.which === RIGHT_ARROW) {
    moveDodgerRight()
    e.preventDefault()
    e.stopPropagation()
  }
}


function moveDodgerLeft() {
  window.requestAnimationFrame(function(){

    var left = positionToInteger(dodger.style.left)
    if (left > 0) {
      dodger.style.left = `${left - 4}px`
    }
  });
}

function moveDodgerRight() {
  window.requestAnimationFrame(function(){
    var right = positionToInteger(dodger.style.left) + 40;
    var left = positionToInteger(dodger.style.left)
    if (right < GAME_WIDTH) {
      dodger.style.left = `${left + 4}px`
    }
  });
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
