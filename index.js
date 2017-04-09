/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
var ROCKS = []
const START = document.getElementById('start')
const DODGEDROCKS = []
var gameInterval = null



/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */
 function myStopFunction() {
     clearInterval(gameInterval);
 }
function checkCollision(rock) {

  const top = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20;

    if (
        (rockLeftEdge < dodgerLeftEdge && rockRightEdge > dodgerLeftEdge) ||
        (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
        (rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerRightEdge)
        ) {
      return true
    }
  } return false
} // end checkCollision

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = 0
  rock.style.top = top

   GAME.appendChild(rock)
   ROCKS.push(rock)
  function moveRock() {

    rock.style.top = `${top += 2}px`

     if (checkCollision(rock)){
       endGame()
     } else if (top >= GAME_HEIGHT) {
       DODGEDROCKS.push(rock)
       GAME.removeChild(rock)
     } else {
       window.requestAnimationFrame(moveRock)
     }
  } // end moveRock

  window.requestAnimationFrame(moveRock)
  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision


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
  var rocksDodged = DODGEDROCKS.length
  DODGER.style.backgroundImage = 'url("explosion.png")' //explosion of ship
  clearInterval(gameInterval)
  for (var i = 0; i < ROCKS.length; i++){
    ROCKS[i].remove()
  }
  ROCKS = [];
  document.removeEventListener('keydown', moveDodger)
  window.removeEventListener('keydown', moveDodger)
  
  alert(`YOU LOSE\n You dodged: ${rocksDodged} rocks.`)
  console.log('end of game');
}

function moveDodger(e) {
  // implement me!
  document.addEventListener('keydown', function(e){
    if (e.which === LEFT_ARROW){
      moveDodgerLeft()
    } else if (e.which === RIGHT_ARROW) {
      moveDodgerRight()
    }
  })
}

function moveDodgerLeft() {

  function nestedFunction(){
    var left = positionToInteger(DODGER.style.left)
    if (left > 0){
      DODGER.style.left = `${left - 4}px`
    }
  }
  window.requestAnimationFrame(nestedFunction)
}

function moveDodgerRight() {

  function nestedFunction(){
    var left = positionToInteger(DODGER.style.left)
    if (left < 360){
      DODGER.style.left = `${left + 4}px`
    }
  }
  window.requestAnimationFrame(nestedFunction)
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
