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
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20;

    if ((rockLeftEdge>=dodgerLeftEdge && rockRightEdge<=dodgerRightEdge) ||
    (rockLeftEdge<=dodgerLeftEdge && rockRightEdge>=dodgerLeftEdge) ||
    (rockLeftEdge<=dodgerRightEdge && rockRightEdge>=dodgerRightEdge)/**
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

  const game = document.getElementById('game')
  game.appendChild(rock)
  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */
  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
      rock.style.top=`${top+=2}px`
      if(checkCollision(rock)){
        return endGame()
      }
      if(top<380){
        window.requestAnimationFrame(moveRock)
      }
      else{
        game.removeChild(rock)
      }
    }
    window.requestAnimationFrame(moveRock)
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
  clearInterval(gameInterval)
  for(var index = 0; index<ROCKS.length; index++){
    ROCKS[index].remove()
  }
  window.removeEventListener('keydown', moveDodger)
  alert("YOU LOSE!")
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
   if(e.which===LEFT_ARROW){
     e.preventDefault()
     e.stopPropagation()
     moveDodgerLeft()
   }

   if(e.which===RIGHT_ARROW){
     e.preventDefault()
     e.stopPropagation()
     moveDodgerRight()
   }
}

function moveDodgerLeft() {
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
  var i=0
  function leftStep(){
     var left = positionToInteger(DODGER.style.left)
     if(left>0){
     DODGER.style.left = `${left-=1}px`
     i++
      if(i<4){
       window.requestAnimationFrame(leftStep)
      }
    }
  }
  window.requestAnimationFrame(leftStep)
}

function moveDodgerRight() {
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
  var j=0
  function rightStep(){
     var left = positionToInteger(DODGER.style.left)
     if(left<360){
     DODGER.style.left = `${left+=1}px`
     j++
      if(j<4){
       window.requestAnimationFrame(rightStep)
      }
    }
  }
  window.requestAnimationFrame(rightStep)
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
