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

 //Starting value:
 DODGER.style.left = '180px';

 //additional value for smoother fall
 var gameSmooth = null;


function checkCollision(rock) {
  //console.log(ROCKS);
  // implement me!
  // use the comments below to guide you!
  const top = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top >= 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = dodgerLeftEdge+40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = rockLeftEdge+20;

    if ((rockLeftEdge<=dodgerLeftEdge && rockRightEdge>=dodgerLeftEdge) || (rockLeftEdge>=dodgerLeftEdge && rockRightEdge<=dodgerRightEdge) || (rockLeftEdge<=dodgerRightEdge && rockRightEdge>=dodgerRightEdge) ) {
      /**
                 * Think about it -- what's happening here?
                 * There's been a collision if one of three things is true:
                 * 1. The rock's left edge is < the DODGER's left edge,
                 *    and the rock's right edge is > the DODGER's left edge;
                 * 2. The rock's left edge is > the DODGER's left edge,
                 *    and the rock's right edge is < the DODGER's right edge;
                 * 3. The rock's left edge is < the DODGER's right edge,
                 *    and the rock's right edge is > the DODGER's right edge
                 */
      return true
    }

  }
  else return false;
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Hmmm, why would we have used `var` here?
  var top = 0;

  rock.style.top = top

  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */

   document.querySelector('#game').appendChild(rock);

  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */

   ROCKS.push(rock)

   // Finally, return the rock element you've created
   //window.requestAnimationFrame(createRock);

   //window.requestAnimationFrame(createRock);        heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeelp
   return rock
 }


function moveRock() {
    // implement me!
    // (use the comments below to guide you!)
    //console.log("move rock started")

     for(var i = 0; i < ROCKS.length; i++) {
       var currentrock = ROCKS[i];
      // console.log('---------------------------------------------')
       //console.log(`currentrock value is ${currentrock.style.top}`)

       /**
        * If a rock collides with the DODGER,
        * we should call endGame()
        */



        if(checkCollision(currentrock) == true) endGame();

        /**
         * But if the rock *has* reached the bottom of the GAME,
         * we should remove the rock from the DOM
         */

        else if(positionToInteger(currentrock.style.top)>380) {
          currentrock.remove();
          ROCKS.shift();
          //currentrock.shift();
        }
        /*
         *
         * Otherwise, if the rock hasn't reached the bottom of
         * the GAME, we want to move it again.
         */

         else {
           currentrock.style.top = (positionToInteger(currentrock.style.top)+2)+'px';

         ROCKS[i] = currentrock;
         //console.log(`top ${currentrock.style.top}`)
        // console.log('---------------------------------------------')
      }



     }
    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */

    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */

}
  // We should kick of the animation of the rock around here

  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision


/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  clearInterval(gameInterval);
  clearInterval(gameSmooth);
  window.removeEventListener('keydown', moveDodger)

  for (var i = 0; i < ROCKS.length; i++) {
    ROCKS[i].remove();

  }

  alert("YOU LOSE!");
}



function moveDodger(e) {
  // implement me!
  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */
   //console.log('moveDodger started');

   leftInt = positionToInteger(DODGER.style.left);

   if (e.which == 37) {moveDodgerLeft(); e.stopPropagation();  e.preventDefault();}
   if (e.which == 39) {moveDodgerRight();  e.stopPropagation();  e.preventDefault();}

   //DODGER.style.left = `${leftInt}px`;
}

function moveDodgerLeft() {
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */

    if(leftInt>0) {
       leftInt -= 4;
       DODGER.style.left = `${leftInt}px`;

      stopIdleft = window.requestAnimationFrame(moveDodgerLeft);
    }


}

function moveDodgerRight() {
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */

   if(leftInt<360) {
     leftInt +=4;
     DODGER.style.left = `${leftInt}px`;

   stopIdright = window.requestAnimationFrame(moveDodgerRight);
 }

   return leftInt;
}


/*
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

var faster = 0;

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))}, 1000)

//additional interval for smoother game

  gameSmooth = setInterval(function() {
    moveRock();
    faster +=10;
    }, 50-faster)
}
