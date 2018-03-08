/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which == 37 to id it
const RIGHT_ARROW = 39 // use e.which == 39 to id it
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
  const top = positionToInteger(rock.style.top);
  
  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = rockLeftEdge + 20;


        if ((rockLeftEdge < dodgerLeftEdge) && (rockRightEdge > dodgerLeftEdge)) 
          {
            return true;
          }
          
        else if ((rockLeftEdge > dodgerLeftEdge) && (rockRightEdge < dodgerLeftEdge))
          {
            return true;
          }
          
        else if ((rockLeftEdge < dodgerRightEdge) && (rockRightEdge > dodgerLeftEdge))
          {
            return true;
          }
        else 
          {
            return false;
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


  function moveRock() { // moves rock 2px /time
    rock.style.top = `${top +=2}px`
    
    if (checkCollision(rock))// if collision: endGame
      {
        return endGame();
      }

    else if (positionToInteger(rock.style.top) === 400)
      {
        rock.remove(); // remove rock when bottomed
      }

    else
     {
       window.requestAnimationFrame(moveRock);
     }
  }

  // We should kick off the animation of the rock around here

  if (top < 400) {
    window.requestAnimationFrame(moveRock);
  }

//window.requestAnimationFrame(moveRock);
  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
  ROCKS.push(rock);

  // Finally, return the rock element you've created
  return rock;
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  clearInterval(gameInterval);
  ROCKS.forEach(
    function(rock) { 
      rock.remove() 
      }
    ); //I don't understand this snippet from solution 

  
  window.removeEventListener('keydown', moveDodger);
  
  alert('YOU LOSE!');
}

function moveDodger(e) {

  if ([LEFT_ARROW, RIGHT_ARROW].indexOf(e.which) > -1) {
    e.preventDefault()
    e.stopPropagation()
  }

  //document.addEventListener('keydown', function(e) {
  if (e.which === LEFT_ARROW) {

    moveDodgerLeft();
  }
  if (e.which === RIGHT_ARROW) {

    moveDodgerRight();
  }
}

function moveDodgerLeft() {
  window.requestAnimationFrame( function () {
    var leftNumbers = dodger.style.left.replace('px', '');
    var left = parseInt(leftNumbers, 10);
 
    if (left > 0) 
    {
      dodger.style.left = `${left - 8}px`
    }
  })
}

function moveDodgerRight() {
  window.requestAnimationFrame( function () {
    var leftNumbers = dodger.style.left.replace('px', '');
    var left = parseInt(leftNumbers, 10);
    var right = left + 40;
    if (right < GAME_WIDTH) 
    {
      dodger.style.left = `${left + 8}px`
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
