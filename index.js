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
  // implement me!
  // use the comments below to guide you!
  const top = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = dodgerLeftEdge+40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = rockLeftEdge+20;

    if (rockLeftEdge<dodgerLeftEdge && rockRightEdge>dodgerLeftEdge
              
                /**
               * Think about it -- what's happening here?
               * There's been a collision if one of three things is true:
               * 1. The rock's left edge is < the DODGER's left edge,
               *    and the rock's right edge is > the DODGER's left edge;
               * 2. The rock's left edge is > the DODGER's left edge,
               *    and the rock's right edge is < the DODGER's right edge;
               * 3. The rock's left edge is < the DODGER's right edge,
               *    and the rock's right edge is > the DODGER's right edge.
               */) {
      return true
    } if (rockLeftEdge>=dodgerLeftEdge && rockRightEdge<=dodgerRightEdge){
      return true
    } if (rockLeftEdge<dodgerRightEdge && rockRightEdge>dodgerRightEdge){
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
  function moveRock() {
    // implement me!
    // (use the comments below to guide you!)
    /**
     * If a rock collides with the DODGER,
     * we should call endGame().
     */
    rock.style.top=`${top+=2}px`
    
    if (checkCollision(rock)){
      endGame()
    }
    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */
    if (positionToInteger(rock.style.top)<380){
      window.requestAnimationFrame(moveRock)
    } 
    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM.
     */
    if (positionToInteger(rock.style.top)>=380){
      rock.remove()
    }
  }

  // We should kick off the animation of the rock around here.
  window.requestAnimationFrame(moveRock)
  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision.
  ROCKS.push(rock)

  // Finally, return the rock element you've created.
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
  for(let i=0;i<ROCKS.length;i++){
    let aRock=ROCKS[i]
    aRock.remove()
  }
  window.removeEventListener('keydown',moveDodger)
  alert("YOU LOSE!")
}

function moveDodger(e) {
  if(e.which===LEFT_ARROW){
    moveDodgerLeft()
    e.stopPropagation()
    e.preventDefault()
  } if(e.which===RIGHT_ARROW){
    moveDodgerRight()
    e.stopPropagation()
    e.preventDefault()
  }
}

function moveDodgerLeft() {
  function moveLeft(){
    var currentPos=positionToInteger(DODGER.style.left)
    dodger.style.left=`${currentPos-4}px`
  }
  if(positionToInteger(dodger.style.left)>0){
  window.requestAnimationFrame(moveLeft)
} // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
}

function moveDodgerRight() {
  function moveRight(){
    var currentPos=positionToInteger(DODGER.style.left)
    dodger.style.left=`${currentPos+4}px`
  }
  if(positionToInteger(dodger.style.left)<360){
  window.requestAnimationFrame(moveRight)
  }
  // implement me!
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
