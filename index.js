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

  const top = positionToInteger(rock.style.top)

  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    const dodgerRightEdge = positionToInteger(DODGER.style.left) + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    const rockRightEdge = positionToInteger(rock.style.left) + 20;

    if(rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge){
      return true;
    } else if(rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge){
      return true;
    } else if(rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge){
      return true
    } else {
      return false
    }
    }
}



function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = `${x}px`;

  var top = 0;

  rock.style.top = top;

  GAME.appendChild(rock);

  function moveRock() {

       rock.style.top = `${top += 2}px`;

        if(checkCollision(rock)){
          return endGame();
        }

        if(top < GAME_HEIGHT){
          window.requestAnimationFrame(moveRock)
        }

        if(top === GAME_HEIGHT){
          rock.remove();
        }
      }

  window.requestAnimationFrame(moveRock);

  ROCKS.push(rock);

  return rock;
}

function endGame() {
    clearInterval(gameInterval);

    const rocksList = GAME.querySelectorAll('.rock')
    for(var i = 0; i < rocksList.length; i++){
      rocksList[i].remove()
    }

    //ROCKS.forEach(function(rock) { rock.remove() })

    document.removeEventListener('keydown', moveDodger);

    return alert("YOU LOSE!");
 }

  function moveDodger(e) {

     if(e.which === LEFT_ARROW){
       moveDodgerLeft();
       e.stopPropagation()
       e.preventDefault()
     } else if(e.which === RIGHT_ARROW){
       moveDodgerRight();
       e.stopPropagation()
       e.preventDefault()
     }
  }

function moveDodgerLeft() {

  var left = positionToInteger(DODGER.style.left)

  function move(){
    DODGER.style.left = `${left - 4}px`
  }

  if (left > 0){
    window.requestAnimationFrame(move)
  }
}


function moveDodgerRight() {

   var left = positionToInteger(DODGER.style.left)

   function move(){
     DODGER.style.left = `${left + 4}px`
   }
   if(left < 360){
     window.requestAnimationFrame(move)
   }
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
