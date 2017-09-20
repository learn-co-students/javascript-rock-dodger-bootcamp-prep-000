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

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
  //if (top < 40 ) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    // The DODGER is 40 pixels wide
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)
    // The rock is 20 pixel's wide
    const rockRightEdge = rockLeftEdge + 20;

    if (rockRightEdge > dodgerLeftEdge && rockRightEdge < dodgerRightEdge ||
        rockLeftEdge  > dodgerLeftEdge && rockLeftEdge < dodgerRightEdge) {
      return true
    } else {
      return false
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = 0
  rock.style.top = top

  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */
  GAME.appennd(rock)

  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock(rock) {
      var top = 0

      function step() {
        rock.style.top = `${top += 2}px`

        if (checkCollision(rock)) {
          endGame()
        } else if (top > 400) {
          rock.remove();
        } else {
          window.requestAnimationFrame(step)
        }

      }

      window.requestAnimationFrame(step)
    }

  }

  moveRock(); // We should kick of the animation of the rock around here

  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
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
  var gameInterval = null
  for (i in ROCKS) {
    ROCKS[i].remove()
  }
  moveDodger.remove()
  alert("YOU LOSE!");
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
  document.addEventListener('keydown', function(e) {
    if (e.which === LEFT_ARROW) {
      moveDodgerLeft()
    } else if (e.which === RIGHT_ARROW) {
      moveDodgerRight()
    }
  })


}

function moveDodgerLeft() {
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
  var leftNumbers = DODGER.style.left.replace('px', '')
  var left = parseInt(leftNumbers, 10)
  const newLeft = left - 4;

  function step() {
    DODGER.style.left = `${top -= 1}px`
     if (left > newLeft)) {
      window.requestAnimationFrame(step)
    }
  }

  window.requestAnimationFrame(step)
}

function moveDodgerRight() {
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   var leftNumbers = DODGER.style.left.replace('px', '')
   var left = parseInt(leftNumbers+40, 10)
   const newLeft = left + 4;

   function step() {
     DODGER.style.left = `${left += 1}px`
      if (left < newLeft)) {
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

start()
