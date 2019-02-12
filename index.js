/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger') // selects element using element tag
const GAME = document.getElementById('game') // also selects element using element tag
const GAME_HEIGHT = 400 // Line 6 && 7 sets width and height of game box
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which! (numbers correlate to keycode)
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = [] // empty array
const START = document.getElementById('start') // selects element using element tag

var gameInterval = null // gameInterval exists with an empty value of null

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) { // function called with paramenter set to variable rock
  // implement me!
  // use the comments below to guide you!
  const top = positionToInteger(rock.style.top) // const set to equal top of rock object

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) { // if top of rock object is within game board
    const dodgerLeftEdge = positionToInteger(DODGER.style.left) // the left edge is set to equal the left side of the dodger object

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = dodgerLeftEdge + 40; // set const to equal 40px plus left edge of dodger object

    const rockLeftEdge = positionToInteger(rock.style.left)  // const set to equal left side of rock object

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = rockLeftEdge + 20; // const set to equal 20px from left edge of rock object

    if (false /**  // if false do nothing
               * Think about it -- what's happening here?
               * There's been a collision if one of three things is true:
               * 1. The rock's left edge is < the DODGER's left edge,
               *    and the rock's right edge is > the DODGER's left edge;
               * 2. The rock's left edge is > the DODGER's left edge,
               *    and the rock's right edge is < the DODGER's right edge;
               * 3. The rock's left edge is < the DODGER's right edge,
               *    and the rock's right edge is > the DODGER's right edge
               */) {
      return true // eh? Need to research why we need this part
    }
    return ( // below checks for collision based on cases above
      (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) // 1.Rocks left edge is < or equal to  dodger's left edge and rock right edge is > or equal to dodger left edge
      || (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) // 2. Rocks left edge > or equal to dodgers left edge and rocks right edge < or eqaul to dodgers right edge
      || (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge) // 3. Rocks left edge < dodgers right edge and rocks right edge > dodgers right edge
    )
  }
}

function createRock(x) { // here we create the rock object
  const rock = document.createElement('div') // created an element using element tag

  rock.className = 'rock' // set class name
  rock.style.left = `${x}px` // set rock left side px to equal parameter initialized with (x)

  // Hmmm, why would we have used `var` here? // for the scope

  var top = rock.style.top = 0 // top of rock is equal to 0px

  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */
  GAME.appendChild(rock) //here we're appending the rock to GAME

  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() { // here is where we will move it downward
    // implement me!
    // (use the comments below to guide you!)
    rock.style.top = `${top += 2}px`; // we are making the rock move using its top by 2px each time
    /**
     * If a rock collides with the DODGER,
     * we should call endGame()
     */
     if (checkCollision(rock)) { //using function previously written to determine if collided
       return endGame() //using function to be written below
     }

    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */
    if (top < GAME_HEIGHT) { //if the rock hasn't hit bottom of game box
      window.requestAnimationFrame(moveRock) //use animation to run the moveRock function
    } else { // if it has hit bottom of game box, get rid of the rock
      rock.remove()
    }

    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */
  }

  // We should kick of the animation of the rock around here

  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
  window.requestAnimationFrame(moveRock) // move rock around
  ROCKS.push(rock) //shovel rock into array created above

  // Finally, return the rock element you've created
  return rock // returning element
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  clearInterval(gameInterval) //clearing gameInterval initialy set to null above
  ROCKS.forEach(function(rock) {rock.remove()})
  START.innerHTML = 'Play again?'
  START.style.display = 'inline'
  return alert('YOU LOSE!')
}

function moveDodger(e) {
  // implement me!
  const code = e.which
  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */
   if ([LEFT_ARROW, RIGHT_ARROW].indexOf(code) > -1) {
     e.preventDefault()
     e.stopPropagation()
   }
   if (code === LEFT_ARROW) {
     moveDodgerLeft()
   } else if (code === RIGHT_ARROW) {
     moveDodgerRight()
   }
}

function moveDodgerLeft() {
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
}

function moveDodgerRight() {
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
