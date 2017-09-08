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

function checkCollision(el) {

  const top2 = positionToInteger(el.style.top)


  if (top2 > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = positionToInteger(DODGER.style.left)+40
    const rockLeftEdge = positionToInteger(el.style.left)
    const rockRightEdge = positionToInteger(el.style.left)+20

    if (
      ((rockLeftEdge < dodgerLeftEdge) && (rockRightEdge >= dodgerLeftEdge))
      ||
      ((rockLeftEdge >= dodgerLeftEdge) && (rockRightEdge <= dodgerRightEdge))
      ||
      ((rockLeftEdge <= dodgerRightEdge) && (rockRightEdge > dodgerRightEdge))
    )
      {
      return true}
return false
    }
  return false}


function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = 0

  rock.style.top = top
  GAME.appendChild(rock)

  function moveRock() {


        rock.style.top = `${top += 2}px`

        if (top < GAME_HEIGHT) {
          if (checkCollision(rock) === false) {
          window.requestAnimationFrame(moveRock)}
          if (checkCollision(rock)===true)
          {endGame()}
        } else {
            rock.remove()
        }

        //{GAME.removeChild(rock)}
  }

window.requestAnimationFrame(moveRock)






    // implement me!
    // (use the comments below to guide you!)
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


  // We should kick of the animation of the rock around here


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
var numberOfRocks=ROCKS.length
for (i=0;i<numberOfRocks;i++)
{ROCKS[i].remove()}
window.removeEventListener('keydown', moveDodger)
  return alert("YOU LOSE!")

}

function moveDodger(e) {
if (e.which === LEFT_ARROW)
{moveDodgerLeft()
e.preventDefault()
e.stopPropagation()
}
if (e.which === RIGHT_ARROW)
{moveDodgerRight()
e.preventDefault()}

}

function moveDodgerLeft() {
window.requestAnimationFrame(function(){
      var leftNumbers = dodger.style.left.replace( 'px','')
      var left= parseInt(leftNumbers,10)
if(left>0)
      {DODGER.style.left =`${left-4}px`}

})}

function moveDodgerRight() {
window.requestAnimationFrame(function() {
      var leftNumbers = DODGER.style.left.replace( 'px','')
      var left= parseInt(leftNumbers,10)
if (left <360)
      {DODGER.style.left =`${left+4}px`}

})}



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
  }, 5000)
}
