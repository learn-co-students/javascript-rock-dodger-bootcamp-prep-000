//Constants

const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('game');
const START = document.getElementById('start');

const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const DODGER_WIDTH = 40;
const DODGER_HEIGHT = 20;
const ROCK_WIDTH = 20;
const ROCK_HEIGHT = 20;

const ROCKS = [];

var stopMultipleAlerts = 0;
var gameInterval = null;

function checkCollision(rock) {
	const rockPosition_Y = positionToInteger(rock.style.top);
	const collisionZone = GAME_HEIGHT - DODGER_HEIGHT - ROCK_HEIGHT;
	if (rockPosition_Y > collisionZone) {
		const dodgerLeftEdge = positionToInteger(DODGER.style.left);
		const dodgerRightEdge = dodgerLeftEdge + DODGER_WIDTH;
		const rockLeftEdge = positionToInteger(rock.style.left);
		const rockRightEdge = rockLeftEdge + ROCK_WIDTH;
		if (rockRightEdge < dodgerLeftEdge || rockLeftEdge > dodgerRightEdge) {
			return false;
		} else {
			return true;
		}
	}
}

function createRock(x) {
	const rock = document.createElement('div');

	rock.className = 'rock';
	rock.style.left = `${x}px`;
	var rockPosition_Y = 0;
	rock.style.top = rockPosition_Y;

	GAME.appendChild(rock);

	function moveRock() {
		if (checkCollision(rock)) {
			return endGame();
		}

		if (rockPosition_Y < GAME_HEIGHT) {
			rock.style.top = `${rockPosition_Y += 3}px`;
			window.requestAnimationFrame(moveRock);
		} else {
			rock.remove();
		}
	}

	window.requestAnimationFrame(moveRock);

	ROCKS.push(rock);

	return rock;
}

function endGame() {
	clearInterval(gameInterval);
	ROCKS.forEach(function(rock){
		rock.remove();
	});
	window.removeEventListener('keydown',moveDodger);
	if (stopMultipleAlerts === 0) {
		stopMultipleAlerts++;	
		alert("YOU LOSE!");
	}
}

function moveDodger(e) {
	if ([LEFT_ARROW, RIGHT_ARROW].indexOf(e.which) > -1) {
		e.preventDefault();
		e.stopPropagation();
	}

	if (e.which === LEFT_ARROW) {
		moveDodgerLeft();
	} else if (e.which === RIGHT_ARROW) {
		moveDodgerRight();
	}
}

function moveDodgerLeft() {
	window.requestAnimationFrame(function() {
		const dodgerPosition = positionToInteger(DODGER.style.left);
		if (dodgerPosition > 0) {
			DODGER.style.left = `${dodgerPosition - 4}px`;
		}
	});
}

function moveDodgerRight() {
	window.requestAnimationFrame(function() {
		const dodgerPosition = positionToInteger(DODGER.style.left);
		if (dodgerPosition < GAME_WIDTH - DODGER_WIDTH) {
			DODGER.style.left = `${dodgerPosition + 4}px`;
		}
	});
}

function positionToInteger(pos) {
	return parseInt(pos.split('px')) || 0;
}

function start() {
	window.addEventListener('keydown', moveDodger);

	START.style.display = 'none';

	gameInterval = setInterval(function() {
		createRock(Math.floor(Math.random() * (GAME_WIDTH - 20)));
	}, 200);
}
