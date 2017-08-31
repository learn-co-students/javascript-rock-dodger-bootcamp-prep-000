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
    // implement me!
    // use the comments below to guide you!
   const top = positionToInteger(rock.style.top) // current position of rock

    // rocks are 20px high
    // DODGER is 20px high
    // GAME_HEIGHT - 20 - 20 = 360px;
   if (top > (GAME_HEIGHT - 40)) { // if this condition is true, then we check to see if there is a collision
      const dodgerLeftEdge = positionToInteger(DODGER.style.left)

     // The DODGER is 40 pixels wide -- how do we get the right edge?
     const dodgerRightEdge = dodgerLeftEdge + 40;

      const rockLeftEdge = positionToInteger(rock.style.left)

     // The rock is 20 pixel's wide -- how do we get the right edge?
     const rockRightEdge = rockLeftEdge + 20;

     if ((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
         (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
         (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)) {
               //  * Think about it -- what's happening here? // these conditionals determine if a collision has taken place
              //  * There's been a collision if one of three things is true:
              //  * 1. The rock's left edge is < the DODGER's left edge,
               //  *    and the rock's right edge is > the DODGER's left edge;
               //  * 2. The rock's left edge is > the DODGER's left edge,
               //  *    and the rock's right edge is < the DODGER's right edge;
               //  * 3. The rock's left edge is < the DODGER's right edge,
               //  *    and the rock's right edge is > the DODGER's right edge
               //  */) {
       return true // this return means a collision has taken place
      }
    }
  }

  function createRock(x) {
    const rock = document.createElement('div')

   rock.className = 'rock';
   rock.style.left = `${x}px`; // sets the leftmost edge of the rock when the rock starts to fall
    // Hmmm, why would we have used `var` here?

   var top = 0;
   rock.style.top = top; // this means that every rock starts at the top of the screen
    /**
     * Now that we have a rock, we'll need to append
     * it to GAME and move it downwards.
     */

    GAME.appendChild(rock); // this adds each rock as a child to the GAME element (defined as a constant above)
    /**
     * This function moves the rock. (2 pixels at a time
     * seems like a good pace.)
     */
    function moveRock() {
      // implement me!
      // (use the comments below to guide you!)

     rock.style.top = `${top += 2}px` // this moves the rock down two pixels (Note: '+' here moves down the screen)
         /**
          * If a rock collides with the DODGER,
          * we should call endGame()
          */
         if (checkCollision(rock)) { // this conditional checks to see if there has been a collision
            return endGame(); // this returns the endGame function if a collision has taken place
         }
         /**
          * Otherwise, if the rock hasn't reached the bottom of
          * the GAME, we want to move it again.
          */
         if (top < GAME_HEIGHT) { // this conditional determines if the rock is still within the screen
           window.requestAnimationFrame(moveRock); // if the rock is still within the screen, it is moved again
         } else { // But if the rock *has* reached the bottom of the GAME, we should remove the rock from the DOM
           rock.remove(); // this else statement is satisfied when the rock is outside the screen, and it removes the rock from the DOM
        }
       } //end of move rock recursive function

    // We should kick of the animation of the rock around here
   window.requestAnimationFrame(moveRock);

    // Add the rock to ROCKS so that we can remove all rocks
    // when there's a collision

   ROCKS.push(rock); // this adds each rock to the ROCKS array
    // Finally, return the rock element you've created

   return rock;
  }

  /**
function createRock(x) {
   * Finally, alert "YOU LOSE!" to the player.
   */
  function endGame() {
   clearInterval(gameInterval); // this clears the gameInterval
   ROCKS.forEach(function(rock) { rock.remove() }); // this removes the each rock still within the ROCKS array
   window.removeEventListener('keydown', moveDodger); // this removes the eventListener, which is looking for keystrokes to move the DODGER
   START.innerHTML = 'Play again?' // displays 'Play again' in replace of 'Start' to begin the Game again
   START.style.display = 'inline' // An inline element has floating content on its left and right side (this will be centered)
   return alert("YOU LOSE!"); // this returns the alert letting the player know they have lost
  }

  function moveDodger(e) {
  const move = e.which;
    // implement me!
   /**
    * This function should call `moveDodgerLeft()`
    * if the left arrow is pressed and `moveDodgerRight()`
    * if the right arrow is pressed. (Check the constants
    * we've declared for you above.)
   * And be sure to use the functions declared below!
    */
   // This function should call `moveDodgerLeft()`
   // if the left arrow is pressed
   if (LEFT_ARROW === move) { // this conditional checks for a keydown on the LEFT_ARROW
     e.preventDefault(); // prevents the LEFT_ARROW keydown from triggering its default behavior
     e.stopPropagation(); // prevents the LEFT_ARROW keydown from triggering other nodes in the DOM that might be listening for the same event
     moveDodgerLeft(); // calls the function to move the DODGER to the left
   }

    // and `moveDodgerRight()`
    // * if the right arrow is pressed. (Check the constants
    // * we've declared for you above.)

    if (RIGHT_ARROW === move) { // this conditional checks for a keydown on the RIGHT_ARROW
      e.preventDefault(); // prevents the RIGHT_ARROW keydown from triggering its default behavior
      e.stopPropagation(); // prevents the RIGHT_ARROW keydown from triggering other nodes in the DOM that might be listening for the same event
      moveDodgerRight(); // calls the function to move the DODGER to the right
    }
  }
    // * And be sure to use the functions declared below!
    // */


  /**
    * This function should move DODGER to the left
    * (mabye 4 pixels?). Use window.requestAnimationFrame()!
    */

   function moveDodgerleft() {
     window.requestAnimationFrame(function() { // this is the animation moving the DODGER to the left -- it calls another function
       const left = positionToInteger(DODGER.style.left) // this is the number corresponding to the coordinates of the leftmost edge of the DODGER (in pixels)

       if (left > 0) { // this is checking to see if the leftmost edge of the DODGER has reached the left edge of the screen
         DODGER.style.left = `${left - 4}px`; // if the leftmost edge of the DODGER hasn't reached the left side, it moves the DODGER 4 pixels to the left
       }
     })
   }


     /* This function should move DODGER to the right
     * (mabye 4 pixels?). Use window.requestAnimationFrame()!
     */
   function moveDodgerRight() {
     window.requestAnimationFrame(function() { // this is the animation moving the DODGER to the right -- it calls another function
       const left = positionToInteger(DODGER.style.left) // this is the number corresponding to the coordinates of the leftmost edge of the DODGER (in pixels)

       if (left < 360) { // this is checking to see if the leftmost edge of the DODGER has reached the right edge of the screen
         DODGER.style.left = `${left + 4}px`; // if the leftmost edge of the DODGER hasn't reached the left side, it moves the DODGER 4 pixels to the right
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
