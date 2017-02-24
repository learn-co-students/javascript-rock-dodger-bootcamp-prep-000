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

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left);

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = rockLeftEdge + 20;

    if ((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerRightEdge) ||
        (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
        (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge) ||
        (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge))
    {
      return true
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')
  rock.className = 'rock'
  rock.style.left = `${x}px`
  var top = 0
  rock.style.top = top
  GAME.appendChild(rock);
  //moveRock();

  function moveRock() {
    var topNumbers = rock.style.top.replace('px', '')
    var top = parseInt(topNumbers, 10)
    rock.style.top = `${top + 2}px`
      if (checkCollision(rock)) {
        console.log("test");
        if( top >= 400 ) {
            rock.remove();
        } else {
          endGame();
        }
      } else {
        window.requestAnimationFrame(moveRock);
      }
  }
  window.requestAnimationFrame(moveRock);
  //just stores the name of the rock element so you can remove it later.
  ROCKS.push(rock)
  return rock
}

function moveDodger(e) {
  //return document.preventDefault();
    if (e.which === LEFT_ARROW) {
      moveDodgerLeft()
    } else if (e.which === RIGHT_ARROW) {
      moveDodgerRight()
    }
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
  var leftNumber =
  DODGER.style.left.replace('px', '')
  var left = parseInt(leftNumber, 10)
  if (left >= 0 ) {
    dodger.style.left = `${left-8}px`
  }
  //window.requestAnimationFrame(moveDodger)
}
function moveDodgerRight() {
  var leftNumber =
  DODGER.style.left.replace('px', '')
  var left = parseInt(leftNumber, 10)
  if (left < GAME_WIDTH - 40) {
    dodger.style.left = `${left+8}px`
   }
   //window.requestAnimationFrame(moveDodger)
}

   /**
    * End the game by clearing `gameInterval`,
    * removing all ROCKS from the DOM,
    * and removing the `moveDodger` event listener.
    * Finally, alert "YOU LOSE!" to the player.
    */
function endGame() {
  window.removeEventListener('keydown', moveDodger);
  for (var i=0; i<ROCKS.length; i++){
    ROCKS[i].remove();
  }
  clearInterval(gameInterval);
  alert("YOU LOSE!");
  window.preventDefault;
  //event.preventDefault()

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
