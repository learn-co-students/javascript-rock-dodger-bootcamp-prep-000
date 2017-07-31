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
  console.log(`checkCollision  rock: ${rock}`)
  // implement me!
  // use the comments below to guide you!
  const top = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    // FIXED---_FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = dodgerLeftEdge+40  //0;

    const rockLeftEdge = positionToInteger(rock.style.left)

    // Fixed_FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = rockLeftEdge+20;//0;

    if (
      // false /**
      //          * Think about it -- what's happening here?
      //          * There's been a collision if one of three things is true:
      //          * 1. The rock's left edge is < the DODGER's left edge,
      //          *    and the rock's right edge is > the DODGER's left edge;
               (rockLeftEdge<=dodgerLeftEdge && rockRightEdge>=dodgerLeftEdge) || //**************
      //          * 2. The rock's left edge is > the DODGER's left edge,
      //          *    and the rock's right edge is < the DODGER's right edge;
               (rockLeftEdge>=dodgerLeftEdge && rockRightEdge<=dodgerRightEdge) ||  //************** my work to uncomment
      //          * 3. The rock's left edge is < the DODGER's right edge,
      //          *    and the rock's right edge is > the DODGER's right edge
               (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge) //****************
      //          */
             ) {
      return true
    }
  }
}

function createRock(x) {
  //console.log(`x from createRock ${x}`) //a random value
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Hmmm, why would we have used `var` here? //becaause top will change
  var top = 0

  rock.style.top = top

  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */
     GAME.appendChild(rock);

  //  GAME.append(rock);
  // moveRock() //*********possibly remove this here
  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
    // implement me!
    // (use the comments below to guide you!)
    // console.log(`moveRock() rock.style.top : ${rock.style.top} ${parseInt(rock.style.top)}`)
    rock.style.top = `${parseInt(rock.style.top)+2}px`
    // console.log(` after moveRock() rock.style.top : ${rock.style.top} ${parseInt(rock.style.top)}`)

    /**
     * If a rock collides with the DODGER,
     * we should call endGame()
     */
     if(checkCollision(rock)){ console.log("moveRock() collision, calling endGame()");endGame()}
    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */
     else if( parseInt(rock.style.top) < GAME_HEIGHT) {moveRock(rock)}
    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */
     //    frameid.parentNode.removeChild(frameid);
     else if( parseInt(rock.style.top) >= GAME_HEIGHT ) { rock.parentNode.removeChild(rock) }
  }

  // We should kick of the animation of the rock around here
  move(rock);
  function move(el) {
    var top = 0
    function step() {
      el.style.top = `${top += 2}px`;      // console.log(el.style.top)
      if (top < 400) {
        window.requestAnimationFrame(step)
      }
      if(checkCollision(el)){endGame();
        return null //added becuase hving to click alert 20+ times

      }
    }
   window.requestAnimationFrame(step)
 }
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
  clearInterval(gameInterval)//gameInterval = null;
  // var rocks = document.querySelectorAll(".rock");
  //for(var i=0;i<rocks.length;i++){ rocks[i].parentNode.removeChild(rocks[i])}
  // while(ROCKS.length > 0){ROCKS[0].parentNode.removeChild(ROCKS[0]); ROCKS.shift();} //works not pass test
  // for(var i=0;i<ROCKS.length;i++){ ROCKS[i].parentNode.removeChild(ROCKS[i]);}
  // for(var i=0;i<ROCKS.length;i++){ ROCKS[i].removeChild(ROCKS[i]);}
  for(var i=0;i<ROCKS.length;i++){ ROCKS[i].remove(ROCKS[i]);} //<- pass test

  window.removeEventListener('keydown', moveDodger)
  alert("YOU LOSE!")

}
function moveDodger(e) {
  // e.stopPropagation() //  4) Rock Dodger moveDodger(e) e.which === LEFT_ARROW calls e.stopPropagation():
  // e.preventDefault(); //   5) Rock Dodger moveDodger(e) e.which === RIGHT_ARROW calls e.preventDefault():
  // console.log(`e: ${e} \ne.which ${e.which}`)
  var key = parseInt(e.detail || e.which);
  // console.log(`key ${key} // typeof key ${typeof key}`)
  if(key === 37) { e.stopPropagation(); e.preventDefault();moveDodgerLeft()}
  if(key === 39) { e.stopPropagation(); e.preventDefault();moveDodgerRight()}
  // implement me!
  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */
}

function moveDodgerLeft() {
  // console.log(`moveDodgerLeft called`)
  window.requestAnimationFrame(function(){
    // console.log(`DODGER.style.left ${DODGER.style.left} ${parseInt(DODGER.style.left)}`)
    if(parseInt(DODGER.style.left) > 0) {
      DODGER.style.left = `${parseInt(DODGER.style.left)-4}px`
    }
    // DODGER.style.left
  })
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
}

function moveDodgerRight() {
  var left = DODGER.style.left;
  // console.log(`moveDodgerRight called`)
  window.requestAnimationFrame(function(){
    // console.log(`DODGER.style.left ${DODGER.style.left} ${parseInt(DODGER.style.left)}`)
    if(parseInt(DODGER.style.left) < 360) {      DODGER.style.left = `${parseInt(DODGER.style.left)+4}px`    }
  })
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
  console.log("start was called")
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
//console.log("EYYYYY")
// start() //remove this later, for testing only
