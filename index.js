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
  const top = positionToInteger(rock.style.top)  // this is the top of the rock

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;


  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = `${dodgerLeftEdge + 40}`; // changed from 0      ////  `${top += 2}px`
    //const dodgerRightEdge = positionToInteger(DODGER.style.right); // changed from 0; correct ?? -- ER

    const rockLeftEdge = positionToInteger(rock.style.left);

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = `${rockLeftEdge + 20}`; // changed from 0
    //const rockRightEdge = positionToInteger(rock.style.right); // changed from 0; correct ?? -- ER


      if (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) {
        return true; // return false?
    } if (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) {
        return true; // return false?
    } if (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge) {
        return true; // return false?
    } else {
      return false; // return true?
    }
  }
}

// i'm commenting out the below to replace with the above for this function -- ER

//     if (false /**
//                * Think about it -- what's happening here?
//                * There's been a collision if one of three things is true:
//                * 1. The rock's left edge is < the DODGER's left edge,
//                *    and the rock's right edge is > the DODGER's left edge;

//                * 2. The rock's left edge is > the DODGER's left edge,
//                *    and the rock's right edge is < the DODGER's right edge;

//                * 3. The rock's left edge is < the DODGER's right edge,
//                *    and the rock's right edge is > the DODGER's right edge
//                */)
//       return true


function createRock(x) {
  const rock = document.createElement('div');
  rock.className = 'rock';
  rock.style.left = `${x}px`; // changed to `${2}px` from `${x}px` -- needs to be this, original.
  var top = 0;
  rock.style.top = top; // commented this out -- ER
  GAME.appendChild(rock); // -------- <<<<< ------ this is the one

  function moveRock() {
    rock.style.top = `${top += 2}px`;  // added this -- ER

     if (checkCollision(rock) === true) { // added -- ER
       return endGame(); // If a rock collides with the DODGER, we call endGame()
     }
     if (top < `400px`) {
       window.requestAnimationFrame(moveRock); // (moveRock), not (step) !!
     }
     else { // dont' need (top === `400px`)
       rock.remove();
     }
   } // below needs to be outside this close bracket!!
  window.requestAnimationFrame(moveRock); // -- added, ER // (moveRock), not (step) !!
  ROCKS.push(rock);   // Add the rock to ROCKS so  we can remove all rocks when there's a collision
  return rock; // Finally, return the rock element you've created
}








function endGame() {
  /**
   * End the game by clearing `gameInterval`,
   * removing all ROCKS from the DOM,
   * and removing the `moveDodger` event listener.
   * Finally, alert "YOU LOSE!" to the player.
   */
  clearInterval(gameInterval); // endGame() clears gameInterval

  ROCKS.forEach(        // remove all rocks using an anonymous function
    function(rock) {
      rock.remove()
    });

  window.document.removeEventListener("keydown", moveDodger); // // endGame() removes keydown event listener
  alert(`YOU LOSE!`); // endGame() alerts 'you lose' message
}

function moveDodger(e) {
   if(e.which === LEFT_ARROW) { // 37 = left arrow
    e.stopPropagation(); // need this
    e.preventDefault();
    moveDodgerLeft();
  }
  if(e.which === RIGHT_ARROW) { // 39 = right arrow
    e.preventDefault();
    moveDodgerRight();
  }
}

function moveDodgerLeft(DODGER) {
     var left = positionToInteger(dodger.style.left)

     function step() {
       //DODGER.style.left = `${left += 4}px`
       dodger.style.left = `${left += 4}px`

       if (dodger.style.left = `0px`) { // changed 180 to 0
         //window.requestAnimationFrame(step)
       }
     }
     window.requestAnimationFrame(step)
}


function moveDodgerRight(DODGER) {
   var right = positionToInteger(dodger.style.right)

   function step() {
     //DODGER.style.left = `${left += 4}px`
     dodger.style.right = `${right += 4}px`

     if (dodger.style.left = `360px`) { // --- shouldn't this be 'dodger.style.right' ???
     // --- shouldn't this be 'dodger.style.right' ???
     // --- shouldn't this be 'dodger.style.right' ???
     // --- shouldn't this be 'dodger.style.right' ???
     }
   }
   window.requestAnimationFrame(step)
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
