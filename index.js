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



function checkCollision(rock) {
        const top = positionToInteger(rock.style.top)
        const dodgerLeftEdge = positionToInteger(DODGER.style.left)
        const dodgerRightEdge = dodgerLeftEdge + 40;
        const rockLeftEdge = positionToInteger(rock.style.left)
        const rockRightEdge = rockLeftEdge + 20;

      if (top > 360) {
        if ((dodgerLeftEdge > rockRightEdge) || (dodgerRightEdge < rockLeftEdge)){
          console.log("1")
           return false

         } else if ((dodgerRightEdge > rockLeftEdge) && (dodgerRightEdge < rockRightEdge)){
             console.log("2")
             return true

         } else if ((dodgerRightEdge > rockRightEdge) && (dodgerLeftEdge < rockLeftEdge)){
             console.log("3")
             return true

         } else if ((dodgerLeftEdge < rockRightEdge) && (dodgerLeftEdge > rockLeftEdge)){
               console.log("4")
               return true
         }
              { return true
            }
          }
      }


function createRock(x) {
  const rock = document.createElement('div')
  rock.className = 'rock'
  rock.style.left = `${x}px`
  var top = 0
  rock.style.top = top
  GAME.appendChild(rock)

  /** * Now that we have a rock, we'll need to append * it to GAME and move it downwards.*/
  function move (){
     rock.style.top = `${top += 2}px`
     if (top < 400){
       window.requestAnimationFrame(move)
     }
   }

   function moveRock() {
      move()
      if (checkCollision() === true){
        console.log("HIT!")
        endGame()
     } else if (rock > 400) {
       $(rock).remove()
    }
  }


  window.requestAnimationFrame(moveRock)
  // We should kick off the animation of the rock around here

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
  ROCKS.forEach(function(rock) { rock.remove() })
  clearInterval(gameInterval)
  window.removeEventListener('keydown', moveDodger)
  alert("YOU LOSE!")

  }




function moveDodger(e) {

    if (e.which === LEFT_ARROW){
          moveDodgerLeft()
          e.stopPropagation()
          e.preventDefault()
          console.log("CHECKCHECK")

  }  else if (e.which === RIGHT_ARROW){
          moveDodgerRight()
          e.stopPropagation()
          e.preventDefault()
        }
  }



function moveDodgerLeft() {
    var leftNumbers = dodger.style.left.replace('px', '')
    var left = parseInt(leftNumbers, 10)

    if (left > 0) {
      dodger.style.left = `${left - 4}px`
      window.requestAnimationFrame(moveDodgerLeft)
    }
  }

function moveDodgerRight() {
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

/*INVOKE FUNCTIONS HERE */
checkCollision();
createRock();
moveDodger();
