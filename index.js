// Don't change these constants!

const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var dodgerLeftEdge = positionToInteger(DODGER.style.left)
var dodgerRightEdge = positionToInteger(DODGER.style.left) + 40

var gameInterval = null

// all of your work should happen below.

function checkCollision(rock) {
  console.log("checkCollision begins")
//???? DO I NEED THIS?  rock = GAME.getElementsByClassName("rock")[0]
  var topC = positionToInteger(rock.style.top)    // 1.17.16 these were declared as const
  // rocks are 20px high & DODGER is 20px high;; GAME_HEIGHT - 20 - 20 = 360px;
  if (topC < 360) {
    return false
  }

  if (topC >= 360) {
//    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    // The DODGER is 40 pixels wide
//    const dodgerRightEdge = positionToInteger(DODGER.style.left) + 40

    var rockLeftEdge = positionToInteger(rock.style.left)

    // The rock is 20 pixels wide
    var rockRightEdge = positionToInteger(rock.style.left) + 20

//    if (false            ////  ??? This line was provided in sample code.

// There's been a collision if one of three things is true:
        if ( rockLeftEdge < dodgerLeftEdge && rockRightEdge > dodgerLeftEdge ) {
//TEST          console.log(rockLeftEdge, rockRightEdge, dodgerLeftEdge, dodgerRightEdge)
          return true
        }

        else if ( rockLeftEdge > dodgerLeftEdge && rockRightEdge < dodgerRightEdge ) {
//TEST          console.log(rockLeftEdge, rockRightEdge, dodgerLeftEdge, dodgerRightEdge)
          return true
        }

        else if ( rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerRightEdge) {
//TEST          console.log(rockLeftEdge, rockRightEdge, dodgerLeftEdge, dodgerRightEdge)
          return true
        }

        else { return false }
    }
    console.log("checkCollision ends")
}

function createRock(x) {
  console.log("createRock begins")
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = 0    // Note use of var here (not const)

  rock.style.top = top

// Now that we have a rock, we'll need to append it to GAME and move it downwards.
   GAME.appendChild(rock)

   ROCKS.push(rock)

// This function moves the rock (2 pixels at a time):
  function moveRock() {
      rock.style.top = `${top += 2}px`   // should be += 2

// If a rock collides with the DODGER, we should call endGame()
        if (checkCollision(rock) === true) {    // same as if (checkCollision(rock) === true)
          return endGame()    // 1/12/17 changed from: return endGame(rock)
        }

// Otherwise, if the rock hasn't reached the bottom of the GAME, we want to move it again.
        if (top < 380) {
          window.requestAnimationFrame(moveRock)
        }

// But if the rock *has* reached the bottom of the GAME, we should remove the rock from the DOM
        if (top === 380) {
          rock.remove()
          //GAME.removeChild(rock)
        }
    }
// We should kick off the animation of the rock around here

  //moveRock()  //***DO I NEED THIS????***//

  window.requestAnimationFrame(moveRock)

  // SEE ABOVE: Add the rock to ROCKS so that we can remove all rocks when there's a collision

  // Finally, return the rock element you've created
  return rock    ///// Why do I need this? I've tried without it, and it still works
  console.log("createRock ends")
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {     // 1.12.17 changed from: function endGame(rock)
  console.log("endGame begins")
  clearInterval(gameInterval)

  function removeRocks() {
//        var allRocks = document.getElementsByClassName("rock")
          for (i = 0, l = ROCKS.length; i < l; i++) {
              if (typeof ROCKS[i] === undefined) {
                continue
              }
              //GAME.removeChild(ROCKS[i])
              ROCKS[i].remove()
          }
        }

        removeRocks()


//      for (i = 0; l = ROCKS.length; i++)
//          GAME.removeChild(ROCKS[i])
          //ROCKS[i].remove()
//      }
//}


//    allRocks = document.getElementsByClassName("rock")
//      for (i = 0, l = allRocks.length; i < l; i++)
//        GAME.removeChild(allRocks[i])
//      }
//    }

  window.removeEventListener('keydown', moveDodger)

  function loseMessage() {
  return alert("SORRY, YOU LOSE!")
  }

  return loseMessage()
  console.log("endGame ends")
}

function moveDodger(e) {
  console.log("moveDodger begins")
   // This function should call `moveDodgerLeft()` if the left arrow is pressed
   // and `moveDodgerRight()` if the right arrow is pressed.
     if (e.which === LEFT_ARROW) { moveDodgerLeft(DODGER) };
     if (e.which === RIGHT_ARROW) { moveDodgerRight(DODGER) };

     dodgerLeftEdge = positionToInteger(DODGER.style.left)
     dodgerRightEdge = positionToInteger(DODGER.style.left) + 40
     console.log("moveDodger ends")
}

function moveDodgerLeft(DODGER) {
    console.log("moveDodgerLeft begins")
   //This function should move DODGER to the left (4 pixels). Use window.requestAnimationFrame()!
    var leftNumbers = DODGER.style.left.replace('px', '')
    var left = parseInt(leftNumbers, 10)

    function moveItLeft() {
      DODGER.style.left = `${left - 4}px`

     if (left > 0) {
        window.requestAnimationFrame(moveItLeft)
     }
   }
  window.requestAnimationFrame(moveItLeft)
  console.log("moveDodgerLeft ends")
}

function moveDodgerRight(DODGER) {
    console.log("moveDodgerRight begins")
  // This function should move DODGER to the right (4 pixels). Use window.requestAnimationFrame()!
   var leftNumbers = dodger.style.left.replace('px', '')
   var left = parseInt(leftNumbers, 10)

   function moveItRight() {
     DODGER.style.left = `${left + 4}px`

     if (left < 360) {
       window.requestAnimationFrame(moveItRight)
    }
  }
  window.requestAnimationFrame(moveItRight)
  console.log("moveDodgerRight ends")
}

function positionToInteger(p) {
  console.log("positionToInteger begins")
  return parseInt(p.split('px')[0]) || 0
  console.log("positionToInteger ends")
}

function start() {
  console.log("start begins")
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)  // should be 1000
  console.log("start ends")
}

// START.addEventListener('click', start) //** Why don't I need this?? **//
