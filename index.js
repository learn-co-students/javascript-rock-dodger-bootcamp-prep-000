// Don't change these constants!
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null


//fxn => check for rock collision
function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)

  //rocks ht = 20px & DODGER ht= 20px => GAME_HEIGHT-20-20 = 360px;
  //**NOTE: will move left/right based on REFERENCING LEFT values!**

  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    const dodgerRightEdge = dodgerLeftEdge + 40; // DODGER width = 40px. right-edge:

    const rockLeftEdge = positionToInteger(rock.style.left)

    const rockRightEdge = rockLeftEdge + 20; // rock width=20px, so left-edge?

    //if any of these 3 conditions are met => collision = true
    if (
       (rockLeftEdge < dodgerLeftEdge && rockRightEdge > dodgerLeftEdge) ||
      (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
       (rockLeftEdge < dodgerRightEdge && rockRightEdge > dodgerRightEdge)
               ) {
      return true
    }
  }
}



//fxn: create rock, add to game, set conditions for 'rock' behavior
function createRock(x) {
  const rock = document.createElement('div')
  rock.className = 'rock'
  rock.style.left = `${x}px`
  var top = 0;
  GAME.appendChild(rock); //append newly created 'rock' to game, & move it downwards

  function moveRock() { //fxn => moves rock at 2px rate
  rock.style.top = `${top += 2}px`

     if (checkCollision(rock)) { //rock collides with DODGER => endGame()
       return endGame();
     }

     else if (top < GAME_HEIGHT) {
       window.requestAnimationFrame(moveRock);//if rock hasn't reached GAME bottom, keep moving
     }

     else {
       rock.remove(); //but if rock HAS reached GAME bottom- remove the rock from DOM
     }
  }
  window.requestAnimationFrame(moveRock);

  ROCKS.push(rock); //add 'rock'=>ROCKS: so can remove all if collision **see endGame()!

  return rock; //finally return rock element just created
}


//fxn: execute when END THE GAME
function endGame() {
  clearInterval(gameInterval);//clearing 'gameInterval'
  ROCKS.forEach(function(rock) { rock.remove() }); // remove all ROCKS from DOM
  window.removeEventListener('keydown', moveDodger); //remove `moveDodger` event listener
  return alert('YOU LOSE!'); //alert user
}

//fxn calls`moveDodgerLeft()`if left arrow is pressed &
//`moveDodgerRight()`if right arrow pressed.
function moveDodger(e) {
   if (e.which === LEFT_ARROW) {
     e.preventDefault();
     e.stopPropagation();
      moveDodgerLeft(e);
   }
   if (e.which === RIGHT_ARROW) {
     e.preventDefault();
     e.stopPropagation();
     moveDodgerRight(e);
   }
}


//fxn move DODGER 4px to the left & Using window.requestAnimationFrame()!
function moveDodgerLeft() {
  var left = positionToInteger(DODGER.style.left);
   window.requestAnimationFrame(function() {
    if (left > 0) {
      dodger.style.left = `${left - 4}px`;
    }
  })
}


//fxn move DODGER 4px to the right & Using window.requestAnimationFrame()!
//note: will move left or right based on LEFT reference values! (as above)
function moveDodgerRight() {
  var left = positionToInteger(DODGER.style.left);
  window.requestAnimationFrame(function() {
    if (left < 360) {
      dodger.style.left = `${left + 4}px`;
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
