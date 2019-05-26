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
const rock = document.createElement('div')
rock.className = 'rock'

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
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = rockLeftEdge + 20;
    if (rockLeftEdge<=dodgerLeftEdge && rockRightEdge >=dodgerLeftEdge){return true }
    if (rockLeftEdge>=dodgerLeftEdge && rockRightEdge<=dodgerRightEdge){return true}
    if(rockLeftEdge<=dodgerRightEdge && rockRightEdge>=dodgerRightEdge) {return true}
    else {return false}

    //if (false /**

               //* Think about it -- what's happening here?
              // * There's been a collision if one of three things is true:
               /* 1. The rock's left edge is < the DODGER's left edge,
               *    and the rock's right edge is > the DODGER's left edge;
               * 2. The rock's left edge is > the DODGER's left edge,
               *    and the rock's right edge is < the DODGER's right edge;
               * 3. The rock's left edge is < the DODGER's right edge,
               *    and the rock's right edge is > the DODGER's right edge
               *///) {
      //return true
    }
  }
  function createRock(x) {
    const rock = document.createElement('div')
    rock.className = 'rock'
    rock.style.left = `${x}px`
    var top = 0
    rock.style.top = top
  $('#game').append(rock)

    function moveRock() {
           rock.style.top = `${top += 2}px`

  if (checkCollision(rock)===true){
    endGame()
  }
      else if (top < 380) {
      window.requestAnimationFrame(moveRock)
    }
    else if (top===380){
      $(rock).remove(); //PROBLEMATIC REMOVES THEM CONTINUOUSLY!! ONCE ONE HIT BOTTOM
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
  clearInterval(gameInterval);
  for (let i=0; i<ROCKS.length;i++){
    ROCKS[i].remove()
  };
  window.removeEventListener('keydown', moveDodger)
  //document.removeEventListener('keydown', function(e) {
  //if (e.which == 37){
    //moveDodgerLeft()

//});
//document.removeEventListener('keydown', function(e) {
//if (e.which == 39){
  //moveDodgerRight()
//}
//});

//remove moveDodger event listener
alert("YOU LOSE!")
}


function moveDodger(e) {
  var leftNumbers=DODGER.style.left.replace('px','')
  var left=parseInt(leftNumbers,10)

  //document.addEventListener('keydown', function(e) {
  if (e.which == 37){
    moveDodgerLeft();
    e.preventDefault();
    e.stopPropagation()

  }
//  else if (left<=3){e.preventDefault(); e.stopPropagation()}

//});
//document.addEventListener('keydown', function(e) {
if (e.which == 39){
  moveDodgerRight()
  e.preventDefault()
}
//else if (left>=357){e.preventDefault()}
//});
}

  // implement me!
  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */


function moveDodgerLeft() {
  var leftNumbers=DODGER.style.left.replace('px','')
  var left=parseInt(leftNumbers,10)

  function step() {

    if (left>3) {
        DODGER.style.left=`${left-4}px`
    //  window.requestAnimationFrame(step)
    }
    }
   window.requestAnimationFrame(step)
}

  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */


function moveDodgerRight() {

  var leftNumbers=DODGER.style.left.replace('px','')
  var left=parseInt(leftNumbers,10)

  function step() {

    if (left<357) {
      DODGER.style.left=`${left+4}px`
      //window.requestAnimationFrame(step)
    }

  }
   window.requestAnimationFrame(step)
}
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */


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
