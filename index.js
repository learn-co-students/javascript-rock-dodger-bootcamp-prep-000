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
    //console.log("at the right height")
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = positionToInteger(DODGER.style.left) + 40

    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = positionToInteger(rock.style.left) + 20
    
    if(dodgerRightEdge > rockLeftEdge && rockRightEdge > dodgerLeftEdge){
      console.log("hit"+toString(top))
      return true
    } 
  }
  return false
}

function createRock(x) {
  var fallSpeed = 0
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = 0

  rock.style.top = top
  GAME.appendChild(rock)

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
    if(checkCollision(rock)){
      endGame()
    }else{
      top += fallSpeed
      fallSpeed += 0.08
      rock.style.top = `${top}px`
      
      if(top > 400){
        rock.remove()
      }
      window.requestAnimationFrame(moveRock)
    }
  }

  // We should kick of the animation of the rock around here
  moveRock()
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
  clearInterval(gameInterval)
  for (let i = 0;i< ROCKS.length;i++) {
    ROCKS[i].remove();
  }
  DODGER.removeEventListener('keydown', moveDodger)
  alert("YOU LOSE!")
}

function moveDodger(e) {
    if (e.which === LEFT_ARROW){
      e.preventDefault()
      e.stopPropagation()
      moveDodgerLeft();
    }
    if (e.which === RIGHT_ARROW){
      e.preventDefault()
      e.stopPropagation()
      moveDodgerRight();
    }
}

function moveDodgerLeft() {
  var left = positionToInteger(DODGER.style.left)
 
  if (left > 0) {
    dodger.style.left = `${left - 6}px`;
  }
  return
}
function moveDodgerRight() {
  var left = positionToInteger(DODGER.style.left)
 
  if (left + 40 < 400) {
    dodger.style.left = `${left + 6}px`;
  }
  return
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0;
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none';

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000);
}
