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
  ROCKS.push(rock)
  // use the comments below to guide you!
  const top = positionToInteger(rock.style.top)
  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = positionToInteger(DODGER.style.left)+40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = positionToInteger(rock.style.left)+20;

    if ((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge)
    ||(rockLeftEdge>=dodgerLeftEdge && rockRightEdge<=dodgerRightEdge)
    ||(rockLeftEdge<=dodgerRightEdge && rockRightEdge>=dodgerRightEdge)){
      return true;
    }
    else{
      return false;
    } /**
               * Think about it -- what's happening here?
               * There's been a collision if one of three things is true:
               * 1. The rock's left edge is < the DODGER's left edge,
               *    and the rock's right edge is > the DODGER's left edge;
               * 2. The rock's left edge is > the DODGER's left edge,
               *    and the rock's right edge is < the DODGER's right edge;
               * 3. The rock's left edge is < the DODGER's right edge,
               *    and the rock's right edge is > the DODGER's right edge
               */
  }
  else {
    return false;
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
  moveRock()

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
    if(checkCollision()===true){
      endgame()
    }
    else {
        function step(){
        rock.style.top = `${top += 2}px`
        if (top <360){
          window.requestAnimationFrame(step)
        }
        else if(top>360){
          ROCKS.shift();
        }
      }
    }
    window.requestAnimationFrame(step)
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
  }
  const gameInterval = setInterval(moveRock, 1000)
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
  ROCKS = []
  clearInterval(myInterval)
  document.removeEventListener("keydown", moveDodger)
  alert("YOU LOSE!")
}
function moveDodger(e) {
  document.addEventListener('keydown', function(e){
    if(e.which===LEFT_ARROW){
      moveDodgerLeft()
    }
    if(e.which===RIGHT_ARROW){
      moveDodgerRight()
    }
  })
}
function moveDodgerLeft() {
  var leftNumbers = DODGER.style.left.replace('px','')
  var left = parseInt(leftNumbers, 10)
  function moveLeft(){
    DODGER.style.left = `${left-4}px`
  }
  if (left > 0){
    window.requestAnimationFrame(moveLeft)
  }
}
function moveDodgerRight() {
  var leftNumbers = DODGER.style.left.replace('px','')
  var left = parseInt(leftNumbers, 10)
  function moveRight(){
    DODGER.style.left = `${left+4}px`
  }
  if (left < 360){
    window.requestAnimationFrame(moveRight)
  }
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
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
