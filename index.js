
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

    if (top > 360) {
      const dodgerLeftEdge = positionToInteger(DODGER.style.left)
      const dodgerRightEdge = dodgerLeftEdge+40;
      const rockLeftEdge = positionToInteger(rock.style.left)
      const rockRightEdge = rockLeftEdge+20;

   /**  //false
               * Think about it -- what's happening here?
               * There's been a collision if one of three things is true:
               * 1. The rock's left edge is < the DODGER's left edge,
               *    and the rock's right edge is > the DODGER's left edge;
               * 2. The rock's left edge is > the DODGER's left edge,
               *    and the rock's right edge is < the DODGER's right edge;
               * 3. The rock's left edge is < the DODGER's right edge,
               *    and the rock's right edge is > the DODGER's right edge
               */


      return (
        (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
        (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
        (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge))
    }
  }

function createRock(x) {
    const rock = document.createElement('div')
    rock.className = 'rock'
    rock.style.left = `${x}px`

     // Hmmm, why would we have used `var` here?
    var top = 0
    rock.style.top = `${top}px`

    GAME.appendChild(rock);

    function moveRock() {
      if(checkCollision(rock)===true){
        endGame();
      }
      else if (top < GAME_HEIGHT-20) {

        // rock.style.top = `${top += 2}px`
        // window.requestAnimationFrame(moveRock);
        top+=4;
        rock.style.top = `${top}px`
        window.requestAnimationFrame(moveRock);
      }
      else if (top >= GAME_HEIGHT-20) {
        GAME.removeChild(rock);
        ROCKS.shift();
      }
    }

    moveRock();

    ROCKS.push(rock);
    return rock;
  }

  function endGame() {
    while(ROCKS.length > 0){
      GAME.removeChild(ROCKS[0]);
      ROCKS.shift();
    }

    clearInterval(gameInterval);
    window.removeEventListener('keydown', moveDodger);
    alert("YOU LOSE!");
    START.innerHTML = 'Play again?'
    START.style.display = 'inline'
  }


function moveDodger(e) {
  if(e.which === 37) {
      moveDodgerLeft();
  } else if (e.which === 39){
      moveDodgerRight();
  }
}

function moveDodgerLeft() {
   function step() {
    var leftNumbers =
    DODGER.style.left.replace('px', '');

    var left = parseInt(leftNumbers, 10);

       if(left > 0) {
        DODGER.style.left = `${left -= 4}px`
           window.requestAnimationFrame(step);
       }
   }
   window.requestAnimationFrame(step);

}

function moveDodgerRight() {
   function step() {
    var leftNumbers =
  DODGER.style.left.replace('px', '')

      var left = parseInt(leftNumbers, 10);

    if(left < 360) {
      DODGER.style.left = `${left += 4}px`
      window.requestAnimationFrame(step)
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
