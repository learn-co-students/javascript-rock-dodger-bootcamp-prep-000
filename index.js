const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const START = document.getElementById('start')

const ROCKS = []

var gameInterval = null

function checkCollision(rock) {
  // implement me!
  // use the comments below to guide you!
  const top = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {  //  A rock has at least reached the hight of the dodger
    //alert("A rock has reached the bottom.")
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = rockLeftEdge + 20;

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

    if(
        ( (rockLeftEdge < dodgerLeftEdge) && (rockRightEdge > dodgerLeftEdge) )
          ||
        ( (rockLeftEdge >= dodgerLeftEdge) && (rockRightEdge <= dodgerRightEdge) )
          ||
        ( (rockLeftEdge < dodgerRightEdge) && (rockRightEdge > dodgerRightEdge) )
      )
      {
        // alert("COLLISION")
        return true
      }

  }

  return false  // Either the rock is not low enough or there was no collision
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
   GAME.appendChild( rock )

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

     // Move the rock down 2px
     //     rock.style.bottom += `{rock.style.bottom-2}px`
     var rockTop = positionToInteger( rock.style.top )
     rock.style.top = `${rockTop + 2}px`

     //  Check for collision
     if( checkCollision(rock) )
     {
       endGame()
       return false
     }

    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */
     /**
      * But if the rock *has* reached the bottom of the GAME,
      * we should remove the rock from the DOM
      */
     if( rockTop < GAME_HEIGHT - 20 )
       window.requestAnimationFrame( moveRock )
      else
        GAME.removeChild( rock )

  }  // end moveRock

  // We should kick of the animation of the rock around here
  window.requestAnimationFrame( moveRock )

  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
  ROCKS.push(rock)
}  // end createRock

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  //  Clear gameInterval
  clearInterval( gameInterval )

  //  Remove all ROCKS
  //ROCKS.remove()
  //const rock = document.createElement('div')
  // GAME.appendChild( rock )
  // ROCKS.push(rock)
  //GAME.removeChild( ROCKS )
  //ROCKS.forEach( function(rock) {GAME.removeChild( rock ) })
  ROCKS.forEach( function(rock) { rock.remove() })

  //  Remove moveDodger event listner
   window.removeEventListener( 'keydown', moveDodger )

  START.innerHTML = "GAME OVER!!"
  START.style.display = 'block'
  alert("GAME OVER!!")
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
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

  if ( e.which == LEFT_ARROW )
     moveDodgerLeft()
  else if( e.which == RIGHT_ARROW )
      moveDodgerRight()


}

function moveDodgerLeft() {
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   //alert("Moving DODGER Left")

   //window.requestAnimationFrame()
   var leftPosition = positionToInteger( DODGER.style.left )
   DODGER.style.left = `${leftPosition-4}px`
}

function moveDodgerRight() {
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   //alert("Moving DODGER Right")

   //window.requestAnimationFrame()

   var leftPosition = positionToInteger( DODGER.style.left )
   DODGER.style.left = `${leftPosition+4}px`

}


function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
