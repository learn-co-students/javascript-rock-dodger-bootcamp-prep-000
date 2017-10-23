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

// dodger moves and is boudned in region
//rocks fall and are removed when they hit the bottom of screen
// NEED TO: implement end game, check collision,


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
  if (top <= 360) {
    return false
  }
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = dodgerLeftEdge + 40

    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = rockLeftEdge + 20

    if (rockLeftEdge < dodgerLeftEdge && rockRightEdge > dodgerLeftEdge) {
      return true
    } else if (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) {
      return true
    } else if (rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerRightEdge) {
      return true
    } else {return false}
  }
}

function createRock(x) {
  const rock = document.createElement('div')
  rock.className = 'rock'
  rock.style.left = `${x}px`
  // Hmmm, why would we have used `var` here?
  var top = 0
  rock.style.top = top

  function step() {
    GAME.appendChild(rock)
    if (checkCollision(rock) == false) {
      window.requestAnimationFrame(step)
    }
  }
  window.requestAnimationFrame(step);
  //GAME.appendChild(rock)
  const rockInterval = setInterval(moveRock, 100)
  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */
  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */

  function moveRock() {
    // implement me!
    // (use the comments below to guide you!)
    /**
     * If a rock collides with the DODGER,
     * we should call endGame()
     */
     for (var i = 0; i < ROCKS.length; i++) {
       var topNumbers = ROCKS[i].style.top.replace('px', '')
       var rockTop = parseInt(topNumbers, 10)
       if (rockTop < 380) {
         ROCKS[i].style.top = `${rockTop + 2}px`
       }
       if (rockTop >379) {
         ROCKS[i].remove()
       }
     }
     if (checkCollision(rock)) {
       endGame()
     }
  }

  // We should kick of the animation of the rock around here

  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
  if (checkCollision(rock)) {
    endGame()
  }
  ROCKS.push(rock)

  // Finally, return the rock element you've created
  return rock
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  clearInterval(gameInterval);
  ROCKS.forEach(function(rock) {
    rock.remove()
  })
  window.removeEventListener('keydown', moveDodger)
  document.removeEventListener('keydown', moveDodger)
  return alert("YOU LOSE!")
}

function moveDodger(e) {
  if (e.which === LEFT_ARROW || e.which === RIGHT_ARROW) {
    e.preventDefault()
    e.stopPropagation()
  }
  if (e.which === LEFT_ARROW) {
      moveDodgerLeft()
  }
  if (e.which === RIGHT_ARROW) {
      moveDodgerRight()
  }
}

function moveDodgerLeft() {
  window.requestAnimationFrame(function() {
    const left = positionToInteger(DODGER.style.left)
    if (left > 0) {
      DODGER.style.left = `${left - 4}px`
    }
  })
}

function moveDodgerRight() {
  window.requestAnimationFrame(function() {
    const left = positionToInteger(DODGER.style.left)
    if (left < 360) {
      DODGER.style.left = `${left + 4}px`
    }
  })
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
  document.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
