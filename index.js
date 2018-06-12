/**
 * Don't change these constants!
 */
const DODGER = document.getElementById("dodger");
const GAME = document.getElementById("game");
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37; // use e.which!
const RIGHT_ARROW = 39; // use e.which!
const ROCKS = [];
const START = document.getElementById("start");
var gameInterval = null;

function checkCollision(rock) {
	const top = positionToInteger(rock.style.top);

	// rocks are 20px high
	// DODGER is 20px high
	// GAME_HEIGHT - 20 - 20 = 360px;
	if (top > 360) {
		const dodgerLeftEdge = positionToInteger(DODGER.style.left);
		const dodgerRightEdge = dodgerLeftEdge + 40;
		const rockLeftEdge = positionToInteger(rock.style.left);
		const rockRightEdge = rockLeftEdge + 20;

		if (
			(rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
			(rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerLeftEdge) ||
			(rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)

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
		) {
			return true;
		} else {
			return false;
		}
	}
}

function createRock(x) {
	const rock = document.createElement("div");
	rock.className = "rock";
	rock.style.left = `${x}px`;

	// Hmmm, why would we have used `var` here?
	var top = 0;
	rock.style.top = `${top}px`;

	/**
	 * Now that we have a rock, we'll need to append
	 * it to GAME and move it downwards.
	 */
	GAME.appendChild(rock);
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

		var topOfRock = positionToInteger(rock.style.top);

		if (checkCollision(rock)) {
			endGame();
		} else if (topOfRock < 360) {
			window.requestAnimationFrame(function() {
				rock.style.top = `${topOfRock + 16}px`;
			});
		} else if (topOfRock >= 360) {
			rock.remove();
		}

		/**
		 * Otherwise, if the rock hasn't reached the bottom of
		 * the GAME, we want to move it again.
		 */

		/**
		 * But if the rock *has* reached the bottom of the GAME,
		 * we should remove the rock from the DOM
		 */
	}
	window.requestAnimationFrame(moveRock);

	setInterval(moveRock, 500);

	// We should kick of the animation of the rock around here

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
	ROCKS.forEach(rock => {
		rock.remove();
	});
	clearInterval(gameInterval);
	window.removeEventListener("keydown", moveDodger);
	alert("YOU LOSE!");
}

function moveDodger(e) {
	// implement me!
	if (e.which === LEFT_ARROW) {
		e.preventDefault();
		e.stopPropagation();
		console.log("going left");
		moveDodgerLeft();
	} else if (e.which === RIGHT_ARROW) {
		e.preventDefault();
		e.stopPropagation();
		console.log("right");
		moveDodgerRight();
	} else {
		return;
	}
	/**
	 * This function should call `moveDodgerLeft()`
	 * if the left arrow is pressed and `moveDodgerRight()`
	 * if the right arrow is pressed. (Check the constants
	 * we've declared for you above.)
	 * And be sure to use the functions declared below!
	 */
}

function moveDodgerLeft() {
	var left = positionToInteger(DODGER.style.left);
	if (left > 0) {
		function stepLeft() {
			left -= 4;
			DODGER.style.left = `${left}px`;
		}
		window.requestAnimationFrame(stepLeft);
	}

	// implement me!
	/**
	 * This function should move DODGER to the left
	 * (mabye 4 pixels?). Use window.requestAnimationFrame()!
	 */
}

function moveDodgerRight() {
	var left = positionToInteger(DODGER.style.left);
	if (left < 360) {
		function stepLeft() {
			left += 4;
			DODGER.style.left = `${left}px`;
		}
		window.requestAnimationFrame(stepLeft);
	}
	// implement me!
	/**
	 * This function should move DODGER to the right
	 * (mabye 4 pixels?). Use window.requestAnimationFrame()!
	 */
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
	return parseInt(p.split("px")[0]) || 0;
}

function start() {
	window.addEventListener("keydown", moveDodger);

	START.style.display = "none";

	gameInterval = setInterval(function() {
		createRock(Math.floor(Math.random() * (GAME_WIDTH - 20)));
	}, 1000);
}
