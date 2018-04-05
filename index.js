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
  const top = positionToInteger(rock.style.top)
  console.log(`const top ${rock.style.top}`)
  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    console.log(`dodgerLeft ${dodgerLeftEdge}`)
    const dodgerRightEdge = dodgerLeftEdge + 40;
    console.log(`dodgerRightEdge ${dodgerRightEdge}`)
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20 ;

    if (rockLeftEdge < dodgerLeftEdge && rockRightEdge > dodgerLeftEdge || rockLeftEdge > dodgerLeftEdge && rockRightEdge< dodgerRightEdge ||
      rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerRightEdge){
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


  GAME.appendChild(rock);

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
   if(checkCollision(rock) === true){
     endGame();
    }
    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */
    if(top < 380){
      rock.style.top = `${top += 2}px`
      window.requestAnimationFrame(moveRock);
    }
    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */
     else{
       rock.remove();
     }
  }

  // We should kick of the animation of the rock around here

    window.requestAnimationFrame(moveRock)
   

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
  window.clearInterval(gameInterval);
  ROCKS.length = 0;
  window.removeEventListener('keydown',moveDodger)
 // alert('YOU LOSE!')
}

function moveDodger(e) {
   
    if(e.which === LEFT_ARROW){
      moveDodgerLeft();
    }
    if(e.which === RIGHT_ARROW){
      moveDodgerRight()
    }
}


function moveDodgerLeft() {
    function step() {
    let leftNumbers = DODGER.style.left.replace('px', '')
    let left = parseInt(leftNumbers, 10)
      if (left > 0) {
        DODGER.style.left = `${left - 8}px`
      }
  }
  window.requestAnimationFrame(step)
}


function moveDodgerRight() {
    function step() {
      let rightNumbers = DODGER.style.left.replace('px', '')
      let right = parseInt(rightNumbers, 10)
        if (right < 360) {
          DODGER.style.left = `${right + 8}px`
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
