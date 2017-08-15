/** Don't change these constants! */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

// Be aware of what's above this line, but all of your work should happen below.

 function checkCollision(rock) {
   function positionToInteger(p) {var leftNumbers = p.replace('px', '');
     var left = parseInt(leftNumbers, 10); return left};
   const top = positionToInteger(rock.style.top);

   /* rocks are 20px high DODGER is 20px high */
   // GAME_HEIGHT - 20 - 20 = 360px;
   if (top >= 360)
   {const dodgerLeftEdge = positionToInteger(DODGER.style.left);

     // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
     const dodgerRightEdge = dodgerLeftEdge+40;
     const rockLeftEdge = positionToInteger(rock.style.left);
     // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
     const rockRightEdge = rockLeftEdge+20;

     if (
       ((rockLeftEdge <= dodgerLeftEdge) & (rockRightEdge >= dodgerLeftEdge))
         || ((rockLeftEdge >= dodgerLeftEdge) & (rockRightEdge <= dodgerRightEdge))
         || ((rockLeftEdge <= dodgerRightEdge) & (rockRightEdge >= dodgerRightEdge))
       )
         {
       return true
     } else {return false}
   } else {return false}
 }

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Hmmm, why would we have used `var` here?
  var top = 0

  rock.style.top = top
  console.log('VAR TOP SET TO 0; BEFORE moveRock; TOP is ' + top)


  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */
    game.appendChild(rock)

  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
    // implement me!
    // (use the comments below to guide you!)
    /**
     * If a rock collides with the DODGER,
     * we should call endGame()
     */
  /*   var topNumbers = rock.style.top.replace('px', '');
     var top = parseInt(topNumbers, 10);
     console.log('RIGHT BEFORE THE WHILE LOOP' + top);

     while (top<380)
     {if (checkCollision(rock)) {endGame()}
       else {
         var topNumbers = rock.style.top.replace('px', '');
         var top = parseInt(topNumbers, 10);
         console.log('INSIDE THE WHILE LOOP' + top);
         rock.style.top = `${top + 2}px`; console.log(rock.style.top)  }
     }
*/

rock.style.top = `${top += 2}px`;
 if (checkCollision(rock)) {return endGame()}
   if (top < 380) {
     window.requestAnimationFrame(moveRock)}
     else {rock.remove()}
   }
    /* Otherwise, if the rock hasn't reached the bottom of the GAME, we want to move it again. */
    /** But if the rock *has* reached the bottom of the GAME, we should remove the rock from the DOM */
window.requestAnimationFrame(moveRock)
  // We should kick of the animation of the rock around here

  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
  ROCKS.push(rock)

  // Finally, return the rock element you've created
  return rock
}

/**  End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player. */
/* function endGame() {
clearInterval(gameInterval);
console.log("I've ended");
var allDOMROcks = document.getElementsByClassName('rock');
var nR=allDOMROcks.length;
while (nR >0) {console.log("nR is" + nR);
              allDOMROcks[0].remove();
              console.log(allDOMROcks.length);
              ROCKS.pop();
              console.log('I just removed a Rock');
              nR--;
              console.log("nR is" + nR)};
ROCKS.pop();
window.removeEventListener('keydown',moveDodger);
window.alert("YOU LOSE!")
} */

function endGame() {
clearInterval(gameInterval);
console.log("I've ended");
ROCKS.forEach(function(rock) {rock.remove()});
var nR=ROCKS.length;
while (nR >0) {ROCKS.pop();nR--;};
document.removeEventListener('keydown',moveDodger);
window.alert("YOU LOSE!");
}

/*  function moveDodger(e) {
  *This function should call `moveDodgerLeft()` if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants we've declared for you above.)
   * And be sure to use the functions declared below!
   *  ORIGINAL !!! THIS PRODUCED 20 PASS; 3 FAIL.  ONLY FAILURES ARE mD LEFT missing preventDef and stopProp, md RIGHT preventDef and stopProp
   if (e.which===LEFT_ARROW) return moveDodgerLeft();
   if (e.which===RIGHT_ARROW) return moveDodgerRight();
} */

/*function moveDodger(e) {  THIS ADDED AN ERROR "if neither, SPY was NOT SUPPOSED TO BE CALLED!"
   if ((e.which !== LEFT_ARROW) && (e.which !== RIGHT_ARROW)) {return e.preventDefault()}
	else {
   if (e.which===LEFT_ARROW) return moveDodgerLeft();
   if (e.which===RIGHT_ARROW) return moveDodgerRight();
   }
} */

/*  SAME RESULT AS ABOVE
function moveDodger(e) {
   if (e.which===LEFT_ARROW) return moveDodgerLeft();
   if (e.which===RIGHT_ARROW) return moveDodgerRight();
   return e.preventDefault()
 }  */

 function moveDodger(e) {
    if (e.which===LEFT_ARROW) {e.preventDefault(); e.stopPropagation(); moveDodgerLeft()}
    if (e.which===RIGHT_ARROW) {e.preventDefault(); moveDodgerRight()}
 }







function moveDodgerLeft() {
// This function should move DODGER to the left (mabye 4 pixels?). Use window.requestAnimationFrame()!
var leftD = dodger.style.left.replace('px', '');
var left = parseInt(leftD, 10);
if (left>4)
{dodger.style.left = `${left -= 4}px`;}
else {}
}

function moveDodgerRight() {
  // This function should move DODGER to the right (mabye 4 pixels?). Use window.requestAnimationFrame()!
    var leftD = dodger.style.left.replace('px', '');
    var left = parseInt(leftD, 10);
    if (left<360)
    {dodger.style.left = `${left += 4}px`;}
else {}
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
