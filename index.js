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
  // implement me!
  // use the comments below to guide you!
  const top = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20;

    if (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) {
      console.log("Rock hit left side of dodger")
      return true
    } else if (rockLeftEdge > dodgerLeftEdge && rockRightEdge < dodgerRightEdge) {
      console.log("Rock hit middle of dodger")
      return true
    } else if (rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerRightEdge) {
      console.log("Rock hit right side of dodger")
      return true
    }
  }
}
//requestAnimationFrame is failing with move rock
function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = 0

  rock.style.top = top
  GAME.appendChild(rock)
  moveRock()

  function moveRock() {
    top = top + 2
    rock.style.top = top.toString() + "px"
    //console.log(rock.style.top)
    // implement me!
    // (use the comments below to guide you!)
    /**
     * If a rock collides with the DODGER,
     * we should call endGame().
     */
     if (checkCollision(rock)) {
       console.log(checkCollision(rock))
       endGame()
     } else if (top >= 380) {
       rock.remove()
     } else {
       //console.log("the rock moved 2px")
       window.requestAnimationFrame(moveRock)
     }
    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */

    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM.
     */
  }
  window.requestAnimationFrame(moveRock)
  // We should kick off the animation of the rock around here.
  //window.requestAnimationFrame(moveRock)
  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision.
  ROCKS.push(rock)

  // Finally, return the rock element you've created.
  return rock
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
 //we need to remove all the rocks from the DOM
 //
function endGame() {
  clearInterval(gameInterval)
  ROCKS.forEach(function(value) {
    value.remove()
  })
  alert("YOU LOSE!!!!!")
}

//this is registering as failing
function moveDodger(e) {
  if (e.which === LEFT_ARROW) {
    e.preventDefault()
    e.stopPropagation()
    moveDodgerLeft()
  } else if (e.which === RIGHT_ARROW) {
    e.preventDefault()
    e.stopPropagation()
    moveDodgerRight()
  }
   //window.requestAnimationFrame(moveDodger)
}

function moveDodgerLeft() {
  var left = positionToInteger(DODGER.style.left)
  if (left > 0) {
    var newLeft = left - 4
    DODGER.style.left = newLeft.toString() + "px"
    window.requestAnimationFrame(moveDodgerLeft)
  }
}

function moveDodgerRight() {
  var left = positionToInteger(DODGER.style.left)
  if (left < 360) {
    var newLeft = left + 4
    DODGER.style.left = newLeft.toString() + "px"
    window.requestAnimationFrame(moveDodgerRight)
  }
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
