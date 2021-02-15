/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('game');
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37; // use e.which!
const RIGHT_ARROW = 39; // use e.which!
const ROCKS = [];
const START = document.getElementById('start');

var gameInterval = null;


/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */
 



function checkCollision(rock) {
  // implement me!
  // use the comments below to guide you!
  const top = positionToInteger(rock.style.top);

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = rockLeftEdge + 20;
  return (rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerLeftEdge || rockLeftEdge > dodgerLeftEdge && rockRightEdge < dodgerLeftEdge || rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerRightEdge); 
  }
}

function createRock(x) {
  // rock is a div
  const rock = document.createElement('div');
  // assign class name .rock to rock
  rock.className = 'rock';
  // generates position on the x axis
  rock.style.left = `${x}px`;
  //rock will always be generated at the top
  var top = rock.style.top = 0;
  GAME.appendChild(rock);
  


  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
    //moves top of rock two pixels down (essentially "moving" the rock)
    rock.style.top = `${top += 2}px`;
    // checks if there is a collision with rock from dodger
    if (checkCollision(rock) === true) {
       return endGame();
       // this basically is saying as long as the top is less than GAME_HEIGHT, to let it fall.
     } if (top < GAME_HEIGHT) {
       window.requestAnimationFrame(moveRock);
     } else { rock.remove();
     }
  }
  // this requests to use the moveRock() function on the next frame
    window.requestAnimationFrame(moveRock);
  ROCKS.push(rock);
return rock;
}
/**
 * End the game by clearing `gameInterval`,
 * clearInterval(gameInterval)
 * removing all ROCKS from the DOM,
 * ROCKS.forEach(function(rock) {rock.remove();});
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  //gameInterval calls the createRock function and randomly assigns it a position on the x axis
  clearInterval(gameInterval);
  // this uses the forEach() array iterator to remove all rocks in the ROCKS array.
  ROCKS.forEach(function(rock) { rock.remove() });
  //This removes the event listener for moveDodger located in the start() function
  document.removeEventListener('keydown', moveDodger);
  alert('YOU LOSE!');
}

function moveDodger(e) {
  let code = e.which;
  
  if ([LEFT_ARROW, RIGHT_ARROW].indexOf(code) > -1) {
     e.preventDefault();
    e.stopPropagation();
  }
   if (LEFT_ARROW === code){
    return moveDodgerLeft();
  } 
  
  if (RIGHT_ARROW === code) {
   return  moveDodgerRight();
  }
}
function moveDodgerLeft() {
  window.requestAnimationFrame(function() {
    const left = positionToInteger(DODGER.style.left)

    if (left > 0) {
      DODGER.style.left = `${left - 4}px`;
    }
  })
}

function moveDodgerRight() {
  window.requestAnimationFrame(function() {
    const left = positionToInteger(DODGER.style.left)

    if (left < 360) {
      DODGER.style.left = `${left + 4}px`;
    }
  })
}



/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0;
}

function start() {
  window.addEventListener('keydown', moveDodger);

  START.style.display = 'none';

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)));
  }, 1000);
}