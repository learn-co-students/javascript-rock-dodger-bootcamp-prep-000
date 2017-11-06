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

    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    const rockRightEdge = rockLeftEdge + 20;

    /*if ((rockLeftEdge < dodgerLeftEdge) && (rockRightEdge > dodgerLeftEdge) ||
        (rockLeftEdge > dodgerLeftEdge) && (rockRightEdge < dodgerRightEdge) ||
        (rockLeftEdge < dodgerRightEdge) && (rockRightEdge > dodgerRightEdge)){
          return true;
        }*/
        if ((rockLeftEdge <= dodgerLeftEdge) && (rockRightEdge >= dodgerLeftEdge) || (rockLeftEdge <= dodgerRightEdge) && (rockRightEdge >= dodgerRightEdge) || (rockLeftEdge >= dodgerLeftEdge) && (rockRightEdge <= dodgerRightEdge)){
          return true;
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

  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */
   GAME.appendChild(rock);

  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
    // implement me!
    // (use the comments below to guide you!)

    if(checkCollision(rock) === true){
      return endGame();
    }
     if(top < GAME_HEIGHT){
       window.requestAnimationFrame(moveRock); //if rock hasn't reached bottom of game, move it
     } else {
       rock.remove(); //if rock is at bottom of game, remove.
     }
}
  // We should kick of the animation of the rock around here
    window.requestAnimationFrame(moveRock);
  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
  ROCKS.push(rock)

  // Finally, return the rock element you've created
  return rock
}

function endGame() {
  clearInterval(gameInterval); //clear `gameInterval`

  for(var i = 0; i < ROCKS.length; i++){
      ROCKS[i].remove(); //remove all rocks
      }
  window.removeEventListener('keydown', moveDodger); //remove `keydown` event listener
  alert("YOU LOSE!"); //alert "you lose"
  }

function moveDodger(e) {

   if(e.which === LEFT_ARROW){
     e.stopPropagation();
     e.preventDefault();
     moveDodgerLeft(); // move dodger left if LEFT_ARROW is called
   }
   else if (e.which === RIGHT_ARROW){
     e.stopPropagation();
     e.preventDefault();
     moveDodgerRight(); // move dodger right if RIGHT_ARROW is called
   }

}

function moveDodgerLeft() {

   window.requestAnimationFrame(function (){
     const left = positionToInteger(DODGER.style.left)

     if(left > 0){
       DODGER.style.left = `${left - 4}px` //move dodger to left 4 pixels
     }
   })
}

function moveDodgerRight() {

   window.requestAnimationFrame(function (){
     const left = positionToInteger(DODGER.style.left)

     if(left < 360){
       DODGER.style.left = `${left + 4}px` //move dodger to right 4 pixels
     }
   })
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
