const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37
const RIGHT_ARROW = 39
const ROCKS = []
const START = document.getElementById('start')
const SCORE = document.getElementById('score')

var gameInterval = null
var score = 0
var itsOver = false

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20;

    if ((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge)  ||
        (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
        (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerLeftEdge)) {

        /* There's been a collision if one of three things is true:
         * 1. The rock's left edge is < the DODGER's left edge,
         *    and the rock's right edge is > the DODGER's left edge;
         * 2. The rock's left edge is > the DODGER's left edge,
         *    and the rock's right edge is < the DODGER's right edge;
         * 3. The rock's left edge is < the DODGER's right edge,
         *    and the rock's right edge is > the DODGER's right edge
         */
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
  GAME.appendChild(rock)

  // moves rock 2 pixels at a time
  function moveRock() {
    if (checkCollision(rock) && !itsOver) {
      //If a rock collides with the DODGER, call endGame()
      rock.remove()
      return endGame()
    }
    else if (positionToInteger(rock.style.top) < GAME_HEIGHT) {
       //Otherwise, if the rock hasn't reached the bottom of
       // the GAME, we want to move it again.
       var top = positionToInteger(rock.style.top)
       rock.style.top = `${top += 4}px`
       window.requestAnimationFrame(moveRock)
     }
     else if (positionToInteger(rock.style.top) === GAME_HEIGHT && !itsOver) {
       //If the rock *has* reached the bottom of the GAME,
       // remove the rock from the DOM and update the score
      rock.remove()
      score++
      runningScore.innerHTML = `Score: ${score}`;
    }
  }
  // Kick of the animation of the rock

  window.requestAnimationFrame(moveRock)
  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
  ROCKS.push(rock)

  // Return the rock element created
  return rock
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
    itsOver = true;

    clearInterval(gameInterval)
    ROCKS.forEach(function(rock) { rock.remove() })
    window.removeEventListener('keydown', moveDodger)

    rockNodeList = document.querySelectorAll('.rock')
    rockNodeList.forEach(function(rock) { rock.remove() })

    window.alert("YOU LOSE!")
    START.innerHTML = 'Play again?'

    if (score === 1) {
      SCORE.innerHTML = `Score: ${score} point!`
    }
    else {
      SCORE.innerHTML = `Score: ${score} points!`
    }

    START.style.display = 'inline'
    SCORE.style.display = 'inline'
}

function moveDodger(e) {
    // move the dodger according to which key was pressed
    if (e.which === LEFT_ARROW || e.which === RIGHT_ARROW)  {
      e.stopPropagation()
      e.preventDefault()
      if (e.which === LEFT_ARROW)
        { moveDodgerLeft()}
      else
        { moveDodgerRight() }
      return;
     }
    else {
      return;
    }
}

function moveDodgerLeft() {
    // This function moves DODGER to the left 4 pixels
    var left = positionToInteger(DODGER.style.left)

    function step() {
       if (left > 0) {
         DODGER.style.left = `${left -= 20}px`
       }
     }

    window.requestAnimationFrame(step)
}

function moveDodgerRight() {
  // This function moves DODGER to the right 4 pixels
   var left = positionToInteger(DODGER.style.left)

   function step() {
      if (left <360) {
        DODGER.style.left = `${left += 20}px`
      }
    }

   window.requestAnimationFrame(step)
}

/***
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)
  DODGER.style = "bottom: 0px; left: 180px;"
  START.style.display = 'none'
  SCORE.style.display = 'none'
  SCORE.innerHTML = 'Score: '
  runningScore.innerHTML = 'Score: ';
  score = 0;
  itsOver = false;

  // every 1 second, create a new rock of random size
  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
