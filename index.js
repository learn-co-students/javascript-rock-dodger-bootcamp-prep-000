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

debugger;
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

    if (
(rockLeftEdge < dodgerLeftEdge && rockRightEdge > dodgerLeftEdge) ||

(rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||

(rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerRightEdge)
               ) {
      return true
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Hmmm, why would we have used `var` here?
  var top = 0

  rock.style.top = top
  GAME.appendChild(rock)
  function moveRock() {
        function step() {
          if (checkCollision(rock)) {
            endGame()
          }
          rock.style.top = `${top += 2}px`
          if (top < 380) {
            window.requestAnimationFrame(step)
          } else {
            rock.remove()
          }
        }
        window.requestAnimationFrame(step)
  }

  moveRock()
  ROCKS.push(rock)
  return rock
}

/**

 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  clearInterval(gameInterval)
  //gameInterval = null
  //var rocks = document.getElementsByClassName('rock')
  totalRocks = ROCKS.length
  for (var i = 0; i < totalRocks; i++) {
    ROCKS[i].remove()
  }
  window.removeEventListener('keydown', moveDodger)
  return alert("YOU LOSE!");
}

function moveDodger(e) {
  // // implement me!
  // /**
  //  * This function should call `moveDodgerLeft()`
  //  * if the left arrow is pressed and `moveDodgerRight()`
  //  * if the right arrow is pressed. (Check the constants
  //  * we've declared for you above.)
  //  * And be sure to use the functions declared below!
  //  */
  //
    if (e.which === LEFT_ARROW) {
      e.preventDefault()
      e.stopPropagation()
      moveDodgerLeft()
    }
    if (e.which === RIGHT_ARROW) {
      e.preventDefault()
      e.stopPropagation()
      moveDodgerRight()
    }
}

  function moveDodgerLeft() {
    // implement me!
    /**
     * This function should move DODGER to the left
     * (mabye 4 pixels?). Use window.requestAnimationFrame()!
     */
        var leftNumbers = dodger.style.left.replace('px', '')
        var left = parseInt(leftNumbers, 10)
        if (left > 0) {
          dodger.style.left = `${left - 4}px`
        }
  }

// function moveDodgerLeft() {
//   var leftNumbers = dodger.style.left.replace('px', '')
//   var left = parseInt(leftNumbers, 10)
//   function step() {
//     if (left > 0) {
//       dodger.style.left = `${left - 4}px`
//     }
//
//     // if (left > 0) {
//     //   window.requestAnimationFrame(step)
//     // }
//   }
//   window.requestAnimationFrame(step)
// }


function moveDodgerRight() {
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
      var leftNumbers = dodger.style.left.replace('px', '')
      var left = parseInt(leftNumbers, 10)
      if (left < 360) {
        dodger.style.left = `${left + 4}px`
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
