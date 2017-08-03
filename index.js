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
  const top = positionToInteger(rock.style.top)
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = (dodgerLeftEdge + 40);

    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20;

    if (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge)
      if (top > 360) {
        return true
    }
    if (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerLeftEdge)
      if (top > 360) {
        return true
    }
    if (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)
      if (top > 360) {
        return true
    }
    else {
      return false
    }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Hmmm, why would we have used `var` here?
  var top = 0
  rock.style.top = `${top}px`

  GAME.appendChild(rock);

  function moveRock() {
    rock.style.top = `${top += 2}px`
    if (checkCollision(rock)) {
      endGame()
    }
    if (top < GAME_HEIGHT) {
       window.requestAnimationFrame(moveRock)
    }
      else {
        rock.remove();
      }

  } // end of moveRock

  // We should kick of the animation of the rock around here
  window.requestAnimationFrame(moveRock)
  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
  ROCKS.push(rock)
  return rock
}

function endGame() {
  alert("You Lose!");
  document.removeEventListener("keydown", moveDodger);
  clearInterval(gameInterval);
  // iterate through ROCKS array and remove them individually
  ROCKS.forEach(function(rock){
    rock.remove()
  });
  ///for (var i = ROCKS.length - 1; i < ROCKS.length; i+) {
//    ROCKS.splice(i, 1);
  //}
}

function moveDodger(e) {
  if (e.which === 37) {
    e.preventDefault();
    e.stopPropagation();
    moveDodgerLeft()
  };
  if (e.which === 39) {
    e.preventDefault();
    e.stopPropagation();
    moveDodgerRight()
  };
}

function moveDodgerLeft() {
    var leftNumbers = dodger.style.left.replace('px', '')
    var left = parseInt(leftNumbers, 10)
      function step() {
        dodger.style.left = `${left - 4}px`}
        if (left > 0) {
          window.requestAnimationFrame(step)
        }
      }

function moveDodgerRight() {
   var left = positionToInteger(dodger.style.left)
     function step() {
       dodger.style.left = `${left + 4}px`}
       if (left <= 359) {
         window.requestAnimationFrame(step)
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
