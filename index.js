/**
 * Don't change these constants!
 */
 const DODGER = document.getElementById('dodger')
 const GAME = document.getElementById('game')
 const GAME_HEIGHT = 400
 const GAME_WIDTH = 400
 const DODGER_HEIGHT = 20
 const DODGER_WIDTH = 40
 const ROCK_HEIGHT = 20
 const ROCK_WIDTH = 20
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

   // We check to see if top > 360 because it means that the rock's bottom
   // is starting to impinge upon where the dodger's top is, along the y axis.
   // Let's make that more robust with our constants.
   if (top > GAME_HEIGHT - DODGER_HEIGHT - ROCK_HEIGHT) {
     const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    //  const dodgerLeftEdge  =
     const dodgerRightEdge = dodgerLeftEdge + DODGER_WIDTH;
     const rockLeftEdge = positionToInteger(rock.style.left)
     const rockRightEdge = rockLeftEdge + ROCK_WIDTH;
  //      /**
  //               * Think about it -- what's happening here?
  //               * There's been a collision if one of three things is true:
  //               * 1. The rock's left edge is < the DODGER's left edge,
  //               *    and the rock's right edge is > the DODGER's left edge;
  //               * 2. The rock's left edge is > the DODGER's left edge,
  //               *    and the rock's right edge is < the DODGER's right edge;
  //               * 3. The rock's left edge is < the DODGER's right edge,
  //               *    and the rock's right edge is > the DODGER's right edge
  //               */
     if ((rockLeftEdge <= dodgerLeftEdge  && rockRightEdge >= dodgerLeftEdge)
       ||(rockLeftEdge >= dodgerLeftEdge  && rockRightEdge <= dodgerRightEdge)
       ||(rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)
     ){
       return true
     }
     else{
       return false
     }
   }
 }
 //  return true;
 // }

function createRock(x) {
  // console.log("rock created")
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


  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
    // implement me!
    // (use the comments below to guide you!)
    var top = parseInt(rock.style.top.replace('px',''))
    /**
     * If a rock collides with the DODGER,
     * we should call endGame()
     */
     if (checkCollision(rock)) {
      //  return(rock,true)
      //  remove()
       endGame()
       return (rock,true)
     }
    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */
     else if (top < GAME_HEIGHT){
       //Move it down by 2 pixels. move(rock)?
      //  top = move(rock)
       move(rock)
       window.requestAnimationFrame(moveRock)
     }
     else{
      //  remove()
        return (rock,true)
     }
    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */
  }

  function remove(){
    // console.log("remove called")
    setInterval(moveRock,0) //pls stop calling this thx
    //??? FIXME
    //GAME.removeChild(rock)

    // the actionListener persists. How do we remove it...
    // this isn't working at all. FIXME
    for (var i = 0; i < ROCKS.length; i++) {
      if (ROCKS[i] == rock){
        ROCKS.splice(i,1)
      }
    }
  }


  // We should kick off the animation of the rock around here
  setInterval(moveRock, 700)
  window.requestAnimationFrame(moveRock)
  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
  ROCKS.push(rock)
  // console.log("here's a rock: " + rock)
  // Finally, return the rock element you've created
  return rock
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */

function moveVertically(el) {
  var top = positionToInteger(el.style.top)

  function step() {
    el.style.top = `${top += 2}px`

    if (top < 200) {
      window.requestAnimationFrame(step)
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
  // }, 1000)
  }, 20000)
}

function move(el) {
  //var top = 0
  // var top = parseInt(el.style.top.replace('px',''))
  var top = positionToInteger(el.style.top)

  function step() {
    el.style.top = `${top += 2}px`
    // console.log(`should be moving to ${top + 2}`)
    if (top < 200) {
      window.requestAnimationFrame(step)
    }
  }

  window.requestAnimationFrame(step)
  //return positionToInteger(el.style.top);
}

//Dodger moves by 4 pixels left or right. but we'll need that passed in.
function horizontalMove(el,stepSize){
  var left = parseInt(el.style.left.replace('px',''))
  function step(){
    if(left + DODGER_WIDTH + stepSize < GAME_WIDTH && left + stepSize > 0){ // not quite?
      el.style.left = `${left + stepSize}px`
      // window.requestAnimationFrame(step)
    }
  }
  window.requestAnimationFrame(step)
}

function moveDodgerLeft() {
  horizontalMove(DODGER,-4)
}

function moveDodgerRight() {
  horizontalMove(DODGER,4)
}

function moveDodger(e) {

    if (e.which === LEFT_ARROW) {
      e.preventDefault()
      e.stopPropagation()
      moveDodgerLeft()
    }
    if (e.which == RIGHT_ARROW) {
      e.preventDefault()
      e.stopPropagation()
      moveDodgerRight()
    }

}

function endGame() {
  clearInterval()
  for (var i = 0; i < ROCKS.length; i++) {
    ROCKS[i].remove()
  }
  ROCKS.pop()
  //remove moveDodger event listener
  window.removeEventListener('keydown', moveDodger)
  alert("YOU LOSE!")
  //RUDE
}
