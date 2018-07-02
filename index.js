const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('game');
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37; // use e.which!
const RIGHT_ARROW = 39; // use e.which!
const ROCKS = [];
const START = document.getElementById('start');

var gameInterval = null;


function checkCollision(rock) {

  const top = positionToInteger(rock.style.top);


  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = rockLeftEdge + 20;

    return ((dodgerLeftEdge >= rockLeftEdge && dodgerLeftEdge <= rockRightEdge) ||  // links
           (dodgerRightEdge <= rockRightEdge && dodgerRightEdge >= rockLeftEdge) ||   //
           (dodgerLeftEdge <= rockLeftEdge && dodgerRightEdge >= rockRightEdge));    //mitte
           
    }
  }


function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = `${x}px`;

 
  var top = rock.style.top = 0;

 GAME.appendChild(rock)


  function moveRock() {
   
   rock.style.top = `${top += 2}px`
    
    if (checkCollision(rock))
    {return endGame()}
     

    if (top < GAME_HEIGHT)
    {
      window.requestAnimationFrame(moveRock)
    }

   else{rock.remove()}
  }
  
  window.requestAnimationFrame(moveRock)

  ROCKS.push(rock)


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
  
  document.removeEventListener('keydown', moveDodger);
  
  alert('YOU LOSE!!')
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
}

function moveDodgerLeft() {
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
}

function moveDodgerRight() {
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
}


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