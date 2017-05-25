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

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)
  const dodgerLeftEdge = positionToInteger(DODGER.style.left)
  const dodgerRightEdge = dodgerLeftEdge+40;
  const rockLeftEdge = positionToInteger(rock.style.left)
  const rockRightEdge = rockLeftEdge+20;
  if (top > 360) {
    return ((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge),
    (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge),
    (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge))
}
}

function createRock(x) {
  const rock = document.createElement('div')
  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = 0

  rock.style.top = top
  GAME.append(rock)

  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock(rock) {
      rock.style.top = "${top+=2}px"
      if (checkCollision(rock) == true) {
       endGame ()
    } else {
      if (positionToInteger(rock.style.top) >= GAME_HEIGHT) {
        rock.remove()
      } else {
        window.requestAnimationFrame (moveRock)
      }


  // We should kick of the animation of the rock around here

  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
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
for (var i=0; i < ROCKS.length; i++) {
  ROCKS[i].remove()
}
document.removeEventListener("keydown", moveDodger)
clearInterval(gameInterval)
alert ("You lose!")
}

function moveDodger(e) {
  $("document").on("keypress", function (dodger){
    if (e.which === 37) {
      function moveDodgerLeft() {}
    }
    if (e.which === 39) {
      function moveDodgerRight() {}
    }
}

function moveDodgerLeft() {
   const pos = positionToInteger(dodger.style.right)
  function step() {
    if (pos < 360)
    DODGER.style.left = "${pos+=4}px"
  window.requestAnimationFrame (step)
}
}
window.requestAnimationFrame(step)
}
  }

function moveDodgerRight() {
  const pos = positionToInteger(dodger.style.left)
  function step() {
    if (pos < 360)
    DODGER.style.right = "${pos+=4}px"
  window.requestAnimationFrame (step)
}
}
window.requestAnimationFrame(step)
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
00)
}

done()

done()

done ()
