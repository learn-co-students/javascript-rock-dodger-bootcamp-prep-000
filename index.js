/*Don't change these constants!*/
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

var rock;
function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20;
    if((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) || (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) || (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge))
    {return true}
  }
}

function createRock(x) {
  const rock = document.createElement('div')
  rock.className = 'rock'
  rock.style.left = `${x}px`
  var top = 0;  // Hmmm, why would we have used `var` here?
  rock.style.top = `${top}px`
  GAME.appendChild(rock);
  /* Now that we have a rock, we'll need to append it to GAME and move it downwards.*/
  //This function moves the rock. (2 pixels at a time seems like a good pace.)
  function moveRock() {
    var top = positionToInteger(rock.style.top);
	var collision = checkCollision(rock);
	if (top < 380) {rock.style.top = `${top+=2}px`};
	if (top >= 380) {GAME.removeChild(rock)};
	if (!collision) {window.requestAnimationFrame(moveRock)}
	else{endGame ()}
    // implement me!
    // (use the comments below to guide you!)
    // If a rock collides with the DODGER, we should call endGame()
    // Otherwise, if the rock hasn't reached the bottom of the GAME, we want to move it again.
    // But if the rock *has* reached the bottom of the GAME, we should remove the rock from the DOM
  }
  window.requestAnimationFrame(moveRock)
  // We should kick of the animation of the rock around here

  // Add the rock to ROCKS so that we can remove all rocks when there's a collision
  ROCKS.push(rock)

  // Finally, return the rock element you've created
  return rock
}

/*
 End the game by clearing `gameInterval`,
 removing all ROCKS from the DOM,
 and removing the `moveDodger` event listener.
 Finally, alert "YOU LOSE!" to the player.
 */

function endGame() {
	clearInterval(gameInterval);
	let rocks = GAME.querySelectorAll('.rock');
	for (let i = 0; i < rocks.length; i++) {rocks[i].remove()};
	window.removeEventListener('keydown', moveDodger);
	alert('YOU LOSE!');
}

function moveDodger(e) {
  // implement me!
	  var keyCode = e.which;
	  if (keyCode === LEFT_ARROW) {
		  moveDodgerLeft();
		  e.preventDefault();
		  e.stopPropagation();
		  };
  	  if (keyCode === RIGHT_ARROW) {
		  moveDodgerRight();
		  e.preventDefault();
		  e.stopPropagation();
		  };
  /*
   This function should call `moveDodgerLeft()` if the left arrow is pressed and `moveDodgerRight()` if the right arrow is pressed.
   (Check the constants we've declared for you above.) And be sure to use the functions declared below!
   */
}

function moveDodgerLeft() {
  // implement me!
  var dodgerLeftEdgeCheck = positionToInteger(DODGER.style.left)
  if (dodgerLeftEdgeCheck > 0) {DODGER.style.left = `${dodgerLeftEdgeCheck -= 20}px`}
  /*
   This function should move DODGER to the left
   (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
}

function moveDodgerRight() {
  // implement me!
  var dodgerLeftEdgeCheck = positionToInteger(DODGER.style.left)
  if(dodgerLeftEdgeCheck < 360) {DODGER.style.left = `${dodgerLeftEdgeCheck += 20}px`}
  /*
   This function should move DODGER to the right
   (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
}

/*
 @param {string} p The position property
 @returns {number} The position as an integer (without 'px')
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
