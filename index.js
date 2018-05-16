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
const leftWall= positionToInteger(document.getElementById('game').style.left)
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
    const dodgerRightEdge = dodgerLeftEdge+40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = rockLeftEdge+20;

    if ((rockLeftEdge<=dodgerLeftEdge&&rockRightEdge>=dodgerLeftEdge) || (rockLeftEdge>=dodgerLeftEdge&&rockRightEdge<=dodgerRightEdge) || (rockLeftEdge<=dodgerRightEdge&&rockRightEdge>=dodgerRightEdge) /**
               * Think about it -- what's happening here?
               * There's been a collision if one of three things is true:
               * 1. The rock's left edge is < the DODGER's left edge,
               *    and the rock's right edge is > the DODGER's left edge;
               * 2. The rock's left edge is > the DODGER's left edge,
               *    and the rock's right edge is < the DODGER's right edge;
               * 3. The rock's left edge is < the DODGER's right edge,
               *    and the rock's right edge is > the DODGER's right edge
               */) {
                 endGame()
      return true
    }
    else{
      return false
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
  document.getElementById('game').appendChild(rock)
  ROCKS.push(rock)

  moveRock()

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
     /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */
      function step(){
         if (positionToInteger(rock.style.top)<GAME_HEIGHT){
          checkCollision(rock)
          window.requestAnimationFrame(step)
        }
        else{
          console.log("rock removed")
          rock.remove()
        }
        
        rock.style.top = `${positionToInteger(rock.style.top)+2}px`
      }

     window.requestAnimationFrame(step)
      
    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */
      if (positionToInteger(rock.style.top) + 20 >= GAME_HEIGHT) {
        console.log("rock removed")
        rock.remove()
      }
  }

  // We should kick of the animation of the rock around here

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
  
  clearInterval(gameInterval)
  
  var i
  
  for(i=0;i<ROCKS.length;i++){
    ROCKS[i].remove()
  }
  //window.removeEventListener("mousedown", handleMouseDown, true); 
  
  window.removeEventListener('keydown', moveDodger)

  // Succeeds

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
     console.log(e.which)
     
     if(e.which == LEFT_ARROW){
       e.preventDefault()
       e.stopPropagation()
       moveDodgerLeft()
     }
     
     if (e.which == RIGHT_ARROW){
      e.preventDefault()
      e.stopPropagation()
      moveDodgerRight()
     }
     
        
     //37 is left}
}

function moveDodgerLeft() {
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   const dodgerLeftEdge = positionToInteger(DODGER.style.left)
   
   if(dodgerLeftEdge>0){
   function left(){
     
    console.log(`dodgers left is ${DODGER.style.left} but ${positionToInteger(DODGER.style.left)+2}`)
     DODGER.style.left = `${positionToInteger(DODGER.style.left)-2}px`
   }
   //left()
   
   console.log("move left")
   window.requestAnimationFrame(left)
   }
}

function moveDodgerRight() {
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   const dodgerRightEdge = positionToInteger(DODGER.style.left)+40

   if(dodgerRightEdge<GAME_WIDTH){
   function right(){
     console.log(`dodgers left is ${DODGER.style.left} but ${parseInt(DODGER.style.left)+2}`)
     DODGER.style.left = `${positionToInteger(DODGER.style.left)+2}px`
   }
   
   window.requestAnimationFrame(right)
   console.log("move right")
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
  createRock(Math.floor(Math.random() *(GAME_WIDTH - 20)))
  }, 1000)
  //createRock(Math.floor(Math.random() *(GAME_WIDTH - 20)))
}
