// JavaScript Document

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
var event = document.createEvent("Event");
event.initEvent('stopInterval', true, true);

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
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = rockLeftEdge + 20;

    console.log(`${rockLeftEdge}-${rockRightEdge} | ${dodgerLeftEdge}-${dodgerRightEdge}`);
    console.log(rockLeftEdge < dodgerRightEdge && rockRightEdge < dodgerRightEdge);

    if ( (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) || (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) || (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge) )
	    /**
               * Think about it -- what's happening here?
               * There's been a collision if one of three things is true:
               * 1. The rock's left edge is < the DODGER's left edge,
               *    and the rock's right edge is > the DODGER's left edge;
               * 2. The rock's left edge is > the DODGER's left edge,
               *    and the rock's right edge is < the DODGER's right edge;
               * 3. The rock's left edge is < the DODGER's right edge,
               *    and the rock's right edge is > the DODGER's right edge
               */
	{
      return true
    }
  }
  return false;
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`
  rock.addEventListener("stopInterval",function(e) {
	clearInterval(rockInterval);
  })

  // Hmmm, why would we have used `var` here?
  // because we want it specific to the instance of the rock
  // avoid collision with other functions?
  var top = 0

  rock.style.top = top

//

  GAME.appendChild(rock);

  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */


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


	if (checkCollision(rock)) {
		endGame();
	}
    /**
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     */
	var topPos = positionToInteger(rock.style.top)
   	if (topPos === GAME_HEIGHT) {
   		//window.cancelAnimationFrame(id);
   		GAME.removeChild(rock);
   	}
   	else {
   		rock.style.top = `${topPos + 2}px`
		window.requestAnimationFrame(moveRock);
   	}

   	//var topNumbers = rock.style.top.replace('px', '')
   	//var topPos = parseInt(topNumbers, 10)



    /**
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */
  }


  // We should kick of the animation of the rock around here
  //var rockInterval = setInterval(function() {moveRock()},100);
  var id = requestAnimationFrame(moveRock);
  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
  ROCKS.push(rock)

  // Finally, return the rock element you've created
  return rock
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
	window.removeEventListener("keydown", moveDodger);
	clearInterval(gameInterval);
	/*ROCKS.forEach(e => {
		e.dispatchEvent(event);
		GAME.removeChild(e);
	})*/
	ROCKS.splice(0,ROCKS.length)

	elements = document.querySelectorAll(".rock");
	for (var i=0; i < elements.length; i++) {
		//elements[i].dispatchEvent(event);
		//GAME.removeChild(elements[i]);
    elements[i].remove();
	}
	START.style.display = 'block'
	START.innerHTML = "YOU LOSE!"
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
	//console.log("move called");
	if (e.which === LEFT_ARROW) {
    //console.log("move left");
    e.preventDefault()
    e.stopPropagation()
		moveDodgerLeft()
  	}
	if (e.which === RIGHT_ARROW) {
		//console.log("move right");
    e.preventDefault()
    e.stopPropagation()
		moveDodgerRight()
  	}
}

function moveDodgerLeft() {
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
   //var leftNumbers = dodger.style.left.replace('px', '')
   //var left = parseInt(leftNumbers, 10)
   var left = positionToInteger(dodger.style.left)
   //console.log(left);

   function step() {
   	if (left > 0) {
   		 dodger.style.left = `${left - 4}px`
   	}
   }
   window.requestAnimationFrame(step);
}

function moveDodgerRight() {
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
	//var leftNumbers = dodger.style.left.replace('px', '')
 	var left = positionToInteger(dodger.style.left)

  	function step() {
		if (left < 360) {
		 dodger.style.left = `${left + 4}px`
		}
	}
	window.requestAnimationFrame(step);
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
