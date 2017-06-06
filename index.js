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

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = rockLeftEdge + 20;

    if ((dodgerLeftEdge >= rockLeftEdge && dodgerLeftEdge <= rockRightEdge) ||
        (dodgerLeftEdge <= rockLeftEdge && dodgerRightEdge >= rockRightEdge) ||
        (dodgerRightEdge >= rockLeftEdge && dodgerRightEdge <= rockRightEdge)/**
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
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Hmmm, why would we have used `var` here?
  var top = 0

  rock.style.top = top

  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */
   GAME.appendChild(rock)

  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
   ROCKS.push(rock)
  function moveRock() {
    // implement me!
    // (use the comments below to guide you!)
    /**
     * If a rock collides with the DODGER,
     * we should call endGame()
     */
    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */

    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */

     current_top = positionToInteger(rock.style.top)

     if(checkCollision(rock)){
       endGame()
     } else if (current_top < 380) {
        window.requestAnimationFrame(fall)
     } else {
       rock.remove()
     }

     function fall(){
       rock.style.top = `${current_top + 2}px`
       moveRock()
     }
  }


  // We should kick of the animation of the rock around here
  moveRock()
  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision


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
  for (var i = 0; i < ROCKS.length; i++){
    ROCKS[i].remove()
  }
  clearInterval(gameInterval);
  document.removeEventListener('keydown', moveDodger)
  alert('YOU LOSE!')
}

function moveDodger(e) {

  if (e.which === LEFT_ARROW){
      e.stopPropagation()
      e.preventDefault()
      moveDodgerLeft()
  } else if(e.which === RIGHT_ARROW){
      e.stopPropagation()
      e.preventDefault()
     moveDodgerRight()
  }
}

function moveDodgerLeft() {
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   var left  = positionToInteger(DODGER.style.left)

   function step() {
     DODGER.style.left = `${left - 4}px`
   }

   if (left > 0) {
     window.requestAnimationFrame(step)
   }

}

function moveDodgerRight() {
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   const left  = positionToInteger(DODGER.style.left)

   function step() {
     DODGER.style.left = `${left + 4}px`
   }

   if (left < 360) {
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

START.addEventListener('click', start)
