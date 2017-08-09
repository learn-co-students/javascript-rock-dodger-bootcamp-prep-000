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

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = positionToInteger(DODGER.style.left) + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = positionToInteger(rock.style.left) + 20;

    if ( ((rockLeftEdge < dodgerLeftEdge) && (rockRightEdge > dodgerLeftEdge)) ||
           ((rockLeftEdge > dodgerLeftEdge) && (rockRightEdge < dodgerRightEdge)) ||
           ((rockLeftEdge < dodgerRightEdge) && (rockRightEdge > dodgerRightEdge))
         ) {

      return true;
        }
      }
  }


function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Hmmm, why would we have used `var` here?
  var top = 0;
  rock.style.top = top;
   $('#game').append(rock);

   function move(rock) {
      function step() {
        rock.style.top = `${top += 2}px`
          if(checkCollision(rock) === true){
            endGame();
          }

        else if (top < 380) {
          window.requestAnimationFrame(step)
          }
        else if(top === 380){
          $(rock).remove();
          }
      }
      window.requestAnimationFrame(step)
    }


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
  move(rock);

  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
  ROCKS.push(rock)
  // Finally, return the rock element you've created
  return rock

}/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  clearInterval(gameInterval);
  $('.rock').remove();
  alert('You Lose');
  window.removeEventListener('keydown', moveDodger);




}

function moveDodger(e) {

   document.addEventListener('keydown', function(e){
   	if(e.which === LEFT_ARROW){
   		moveDodgerLeft(DODGER);
       }
     if(e.which === RIGHT_ARROW){
       moveDodgerRight(DODGER);
     }
     });
}

function moveDodgerLeft(DODGER) {
  var leftNumbers = DODGER.style.left.replace('px', '')
	var left = parseInt(leftNumbers, 10);
  function move(){
    DODGER.style.left = `${left-4}px`
	 if(left > 0){
     window.requestAnimationFrame(move);
   }
  }
  window.requestAnimationFrame(move);
}

function moveDodgerRight(DODGER) {
  var leftNumbers = DODGER.style.left.replace('px', '')
	var left = parseInt(leftNumbers, 10);
  function move(){
    DODGER.style.left = `${left+4}px`
	 if(left < 360){
     window.requestAnimationFrame(move);
   }
  }
  window.requestAnimationFrame(move);
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
