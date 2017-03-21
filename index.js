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
    // console.log(dodgerLeftEdge)
    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = positionToInteger(rock.style.left) + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = rockLeftEdge + 20;
    // console.log('rockright = ' + rockRightEdge)

    if ( rockLeftEdge < dodgerLeftEdge && rockRightEdge > dodgerLeftEdge) {
        // * 1. The rock's left edge is < the DODGER's left edge,
        // *    and the rock's right edge is > the DODGER's left edge;
        return true
    }
    if ( rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) {
        // * 2. The rock's left edge is > the DODGER's left edge,
        // *    and the rock's right edge is < the DODGER's right edge;
        return true
    }
    if ( rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerRightEdge){
        // * 3. The rock's left edge is < the DODGER's right edge,
        // *    and the rock's right edge is > the DODGER's right edge
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

  appendRock()

  function appendRock(){
      GAME.appendChild(rock);
  }

  window.requestAnimationFrame(moveRock)



  function moveRock() {

    //   if ( top < GAME_HEIGHT ){
    //        window.requestAnimationFrame(moveRock)
    //   }
          rock.style.top = `${top += 2}px`

    // if (top > 360){
        if (checkCollision(rock) === true){
            endGame()
        }
    // }

    if (top > GAME_HEIGHT){
        rock.remove()
    } else {
       window.requestAnimationFrame(moveRock)

    }
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

  // We should kick of the animation of the rock around here

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
    document.removeEventListener('keydown', moveDodger)



    ROCKS.forEach(rock  => rock.remove())
    // for (var i = 0; i < ROCKS.length; i++){
    //     ROCKS.shift(ROCKS[i])
    // }
    // console.log(ROCKS)
    // window.requestAnimationFrame(function() {
    //     $('#game').remove(rock)
    // })

    alert('YOU LOSE!')
}

function moveDodger(e) {

    // document.addEventListener('keydown', (e){
        if (e.which === LEFT_ARROW){
            moveDodgerLeft()
        }
        if (e.which === RIGHT_ARROW){
            moveDodgerRight()
        }
        if( e.which === LEFT_ARROW || e.which === RIGHT_ARROW){
            e.preventDefault()
            e.stopPropagation()
        }
}

function moveDodgerLeft() {
  var leftPos = positionToInteger(dodger.style.left)

      function stepLeft(){
          dodger.style.left = `${leftPos -= 4}px`
      }

      if (leftPos > 0) {
          window.requestAnimationFrame(stepLeft)
      }
}

function moveDodgerRight() {
    var leftPos = positionToInteger(dodger.style.left)

    function stepRight(){
        dodger.style.left =  `${leftPos += 4}px`
    }

    if (leftPos + 40 < 400){
        window.requestAnimationFrame(stepRight)
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
