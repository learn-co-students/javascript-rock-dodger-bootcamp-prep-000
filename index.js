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

var gameInterval = null;

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;

  /*if (top <= 360){
    return false;
  }*/

  if (top > 360) {
    console.log("entered");

    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = rockLeftEdge + 20;
   //debugger;
    if ( (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
         (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
         (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge) ) {
      console.log("true returned");
      return true;
    } else return false;
  }
}


function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock';
  rock.style.left = `${x}px`;

  var top = 0;

  rock.style.top = top;

   GAME.appendChild(rock);


  function moveRock() {
    rock.style.top = `${top += 2}px`;
    console.log("Reached!");

     if(checkCollision(rock)){
       console.log('REACHED Inside checkCollision');
        return endGame();
     }

      if (top < GAME_HEIGHT) {
        window.requestAnimationFrame(moveRock);
      } else {
        rock.remove(); // remove rock from the DOM
      }

  }
  window.requestAnimationFrame(moveRock);// kick off the animation of the rock around here

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
  clearInterval(gameInterval);

  for (var i = 0; i < ROCKS.length; i++){
    ROCKS[i].remove();
  }
  window.removeEventListener('keydown', moveDodger);
  alert("YOU LOSE!");

}

function moveDodger(e) {
   if (e.which === RIGHT_ARROW){
     e.preventDefault();
     e.stopPropagation();
     moveDodgerRight();
   } else if (e.which === LEFT_ARROW){
     e.preventDefault();
     e.stopPropagation();
     moveDodgerLeft();
   }

}

function moveDodgerLeft() {
function moveLeft(){
     var leftNumbers = DODGER.style.left.replace('px','');
     var left = parseInt(leftNumbers, 10);
     if (left >= 4){
       DODGER.style.left = `${left - 4}px`;
     }
}

    window.requestAnimationFrame(moveLeft);
}

function moveDodgerRight() {
  function moveRight(){
     var leftNumbers = DODGER.style.left.replace('px','');
     var left = parseInt(leftNumbers, 10);
     if (left <= 356){
       DODGER.style.left = `${left + 4}px`;
     }
   }


    window.requestAnimationFrame(moveRight);
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
  }, 1000);
}
