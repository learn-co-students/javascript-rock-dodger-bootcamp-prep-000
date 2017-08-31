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
var SPEED = 2
var movingLeft = false
var movingRight = false

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
  if (top > 360 && top < 400) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = rockLeftEdge + 20

    if (rockLeftEdge < dodgerLeftEdge && rockRightEdge > dodgerLeftEdge) {
      //console.log("A HIT2")
      rock.remove()
      return true
    } if (rockLeftEdge > dodgerLeftEdge && rockRightEdge < dodgerRightEdge) {
    //  console.log("hit in the middle")
    rock.remove()
      return true
    } if (rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerRightEdge) {
      //console.log("A HITTT")
      rock.remove()
      return true
    }
      return false
            /**
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
    rock.style.top = `${top += 2}px`
    var rockPos = rock.style.top.replace('px', '')
    rockPos = parseInt(rockPos, 10)
    //console.log(`rock position ${rock.style.top}`)
    if(checkCollision(rock)) {
      endGame()
      alert("You Lose!")
    } else {

    if (rockPos > GAME_HEIGHT) {
      //console.log(GAME)
      rock.remove()
      ROCKS.shift()
    }


     window.requestAnimationFrame(moveRock)
}

  }


  moveRock()
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
  for (i = 0; i < ROCKS.length; i++) {
    var currRock = ROCKS[i]
    console.log(ROCKS)
    currRock.remove()
  }
  window.removeEventListener('keydown', moveDodger)
  window.removeEventListener('keyup', stopDodger)
  //alert("YOU LOSE")
}

function moveDodger(e) {
  if (e.which === 37) {

  movingLeft = true

  }
  if (e.which === 39) {
    movingRight = true

  }


}

function stopDodger(e) {
  if (e.which === 37) {
   movingLeft = false


  }
  if (e.which === 39) {
    movingRight = false

  }
}


function moveDodgerLeft() {


   var positionStr = DODGER.style.left.replace('px', '')
   var currPos = parseInt(positionStr, 10)

   if (currPos <= 0 ) {
     DODGER.style.left = `${0}px`
   } else {
     if (movingLeft == true) {

   DODGER.style.left = `${currPos -= SPEED}px`

 }

 }
   window.requestAnimationFrame(moveDodgerLeft)

}

function moveDodgerRight() {

   var positionStr = DODGER.style.left.replace('px', '')
   var currPos = parseInt(positionStr, 10)
   if (currPos >= 360  ) {
     DODGER.style.left = `${360}px`
   } else {
     if (movingRight == true){
   DODGER.style.left = `${currPos += SPEED}px`
 }
 }
  window.requestAnimationFrame(moveDodgerRight)

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
  window.addEventListener('keyup', stopDodger)
  moveDodgerLeft()
  moveDodgerRight()


  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
