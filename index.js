// /**
//  * Don't change these constants!
//  */
 const DODGER = document.getElementById('dodger')
 const GAME = document.getElementById('game')
 const GAME_HEIGHT = 400
 const GAME_WIDTH = 400
 const LEFT_ARROW = 37 // use e.which!
 const RIGHT_ARROW = 39 // use e.which!
 const ROCKS = []
 const START = document.getElementById('start')
//
var gameInterval = null
//
// /**
//  * Be aware of what's above this line,
//  * but all of your work should happen below.
//  */
//
 function checkCollision(rock) {
   const top = positionToInteger(rock.style.top)
   if (top >= 360) {
      const dodgerLeftEdge = positionToInteger(DODGER.style.left)
      const dodgerRightEdge = dodgerLeftEdge + 40;
      const rockLeftEdge = positionToInteger(rock.style.left)
      const rockRightEdge = rockLeftEdge + 20;
      if ((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge)||
      (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge)||(
        rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)) {
        return true
      }
    }
  }

  function createRock(x) {
    const rock = document.createElement('div')
    rock.className = 'rock'
    rock.style.left = `${x}px`
    var top = rock.style.top = 0
    GAME.appendChild(rock)
    /**
     * This function moves the rock. (2 pixels at a time
     * seems like a good pace.)
     */
    function moveRock() {
      // function step() {
      rock.style.top = `${top += 2}px`
      //  if (top < 400) {
      //    window.requestAnimationFrame(rock)
      //  }
             /**
       * If a rock collides with the DODGER,
       * we should call endGame()
       */
       if (checkCollision(rock)) {
          endGame()
       }
      /**
       * Otherwise, if the rock hasn't reached the bottom of
       * the GAME, we want to move it again.
       */
       else if (rock.style.top < GAME_HEIGHT) {
         window.requestAnimationFrame(moveRock);
      }
      /**
       * But if the rock *has* reached the bottom of the GAME,
       * we should remove the rock from the DOM
       */
       else {
         rock.remove()
       }
    }

    // We should kick of the animation of the rock around here
    window.requestAnimationFrame(moveRock)

    // Add the rock to ROCKS so that we can remove all rocks
    // when there's a collision
    ROCKS.push(rock)

    // Finally, return the rock element you've created
    return rock
  }


function endGame() {
 clearInterval(gameInterval);
 window.removeEventListener("keydown", moveDodger);
  for (i = 0; i < ROCKS.length; i++){
   ROCKS[i].remove()
  }
  window.alert("YOU LOSE!!");
}

function moveDodger(e) {
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
  var leftNumbers = DODGER.style.left.replace('px', '')
  var right = parseInt(leftNumbers, 10)
  if (right > 0) {
    DODGER.style.left = `${right - 1}px`
  }
}

function moveDodgerRight() {
  var leftNumbers = DODGER.style.left.replace('px', '')
  var right = parseInt(leftNumbers, 10)
  if (right < 360) {
    DODGER.style.left = `${right + 1}px`
  }
}

// /**
//  * @param {string} p The position property
//  * @returns {number} The position as an integer (without 'px')
//  */
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
  
