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
var movementInterval = null

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
    const dodgerRightEdge = positionToInteger(DODGER.style.left) + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = positionToInteger(rock.style.left) + 20;

    if ((rockLeftEdge<=dodgerLeftEdge && rockRightEdge>=dodgerLeftEdge)||
        (rockLeftEdge>=dodgerLeftEdge && rockRightEdge<=dodgerRightEdge)||
        (rockLeftEdge<=dodgerRightEdge && rockRightEdge>=dodgerRightEdge)

      //false
      /**
               * Think about it -- what's happening here?
               * There's been a collision if one of three things is true:
               * 1. The rock's left edge is < the DODGER's left edge,
               *    and the rock's right edge is > the DODGER's left edge;

               rockLeftEdge < dodgerLeftEdge && rockRightEdge > dodgerLeftEdge
               * 2. The rock's left edge is > the DODGER's left edge,
               *    and the rock's right edge is < the DODGER's right edge;
               rockLeftEdge < dodgerLeftEdge && rockRightEdge < dodgerRightEdge
               * 3. The rock's left edge is < the DODGER's right edge,
               *    and the rock's right edge is > the DODGER's right edge
               rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerRightEdge
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

//Append new rock to top of #game
  document.querySelector('#game').appendChild(rock);

//function that moves rock down page 2 pixels at a time


  function moveRock() {
    if (checkCollision(rock)) {
       return endGame();
    }

    rock.style.top = `${positionToInteger(rock.style.top) +2}px`

    if (positionToInteger(rock.style.top)<400) {
      window.requestAnimationFrame(moveRock)
    } else {
      rock.remove()
    }


  }
  window.requestAnimationFrame(moveRock)


     /* If a rock collides with the DODGER,
     * we should call endGame()
     */
     //if statement that checks if checksCollision() is true
      //if true endGame()


    //if rock is not at bottom of page, call moveRock() (with requestAnimationFrame())
    //debugger;

     //while (positionToInteger(rock.style.top) < 400) {

      //debugger;
   /*
    } else if (positionToInteger(rock.style.top) == 400) {
      rock.remove()
   */

      //window.requestAnimationFrame(moveRock)


  // We should kick of the animation of the rock around here

  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
  ROCKS.push(rock)
  //debugger;

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
  clearInterval(gameInterval);
  //var allRocks = document.getElementsByClassName('rock');
  //debugger;
  Array.prototype.slice.call(document.getElementsByClassName('rock')).forEach(function(item) {
    item.remove();
  });
  ROCKS.length = 0;
  //debugger;
  window.removeEventListener('keydown', moveDodger);
  return alert('YOU LOSE!');
  //debugger;
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
  if (e.which === 37) {
    e.preventDefault();
    e.stopPropagation();
    moveDodgerLeft()
  }
  if (e.which === 39) {
    e.preventDefault();
    e.stopPropagation();
    moveDodgerRight()
  }
}

function moveDodgerLeft() {
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */

  //var leftNumbers = dodger.style.left.replace('px', '')
  //var left = parseInt(leftNumbers, 10)
  var left = positionToInteger(DODGER.style.left)

    if (left > 0) {
      dodger.style.left = `${left - 4}px`;
      window.requestAnimationFrame(moveDodgerLeft)
    }



}

function moveDodgerRight() {
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */

  var rightNumbers = dodger.style.left.replace('px', '')
  var left = parseInt(rightNumbers, 10)


    if (left < 360) {
      dodger.style.left = `${left + 4}px`
      window.requestAnimationFrame(moveDodgerRight)
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
