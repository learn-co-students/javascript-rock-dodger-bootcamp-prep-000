/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME   = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37  // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

const ROCK_HEIGHT = 20
const ROCK_WIDTH  = 20
const COLLISION_AREA = GAME_HEIGHT - ROCK_HEIGHT - ROCK_HEIGHT

var gameIsEnding = false
var gameInterval = null

function checkCollision(rock) {
  var collision = false;

  if (positionToInteger(rock.style.top) > COLLISION_AREA) {
    const dodgerLeftEdge  = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + DODGER.clientWidth - 1;
    const rockLeftEdge    = positionToInteger(rock.style.left)
    const rockRightEdge   = rockLeftEdge + ROCK_WIDTH - 1;

    if ((rockLeftEdge <= dodgerRightEdge ) && (rockRightEdge >= dodgerLeftEdge))
      collision = true
  }

  return collision;
}

function createRock(x) {
  const rock = document.createElement('div')
  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Hmmm, why would we have used `var` here?
  var top = -ROCK_HEIGHT;
  rock.style.top = `${top}px`

  /** Now that we have a rock, we'll need to append it to GAME and move it downwards. */
  GAME.appendChild(rock);

  /** This function moves the rock. (2 pixels at a time seems like a good pace.) */
  function moveRock() {
    var top = positionToInteger(rock.style.top);
    rock.style.top = `${top += 2}px`

    // implement me!
    // (use the comments below to guide you!)
    /**
     * If a rock collides with the DODGER,
     * we should call endGame()
     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.
     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */
    if (gameIsEnding)
      return;

    if (checkCollision(rock))
      endGame();
    else if (positionToInteger(rock.style.top) >= GAME_HEIGHT)
      removeRock(rock);
    else
      frame = window.requestAnimationFrame(moveRock);
  }

  // We should kick off the animation of the rock around here
  frame = window.requestAnimationFrame(moveRock);
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
  gameIsEnding = true;
  clearInterval(gameInterval);
  window.cancelAnimationFrame(frame);
  while (ROCKS.length>0)
    removeRock(ROCKS.pop());
  document.removeEventListener('keydown', moveDodger);
  alert("YOU LOSE!");
}

// implement me!
/**
 * This function should call `moveDodgerLeft()`
 * if the left arrow is pressed and `moveDodgerRight()`
 * if the right arrow is pressed. (Check the constants
 * we've declared for you above.)
 * And be sure to use the functions declared below!
 */
function moveDodger(e) {
  switch (e.which) {
    case LEFT_ARROW:
      e.preventDefault();  // don't know what these calls will do, but tests wanted them.
      e.stopPropagation();
      moveDodgerLeft();
      break;
    case RIGHT_ARROW:
      e.preventDefault();
      e.stopPropagation();
      moveDodgerRight();
      break;
    default:
      break;
  }
}

function moveDodgerLeft() {
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
  var newLeftPos = positionToInteger(DODGER.style.left) - 4;
  if (newLeftPos >= 0)
    DODGER.style.left = `${newLeftPos}px`
}

function moveDodgerRight() {
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
  var newLeftPos = positionToInteger(DODGER.style.left) + 4;
  if (newLeftPos <= (GAME.clientWidth-DODGER.clientWidth))
    DODGER.style.left = `${newLeftPos}px`
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function removeRock(rock) {
//  if (GAME.contains(rock))  // seems to be a conflict between moveRock() and endGame()
    rock.remove();
}

function start() {
  document.addEventListener('keydown', moveDodger)
  START.style.display = 'none'
  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() * (GAME_WIDTH - 20)))
  }, 1000)
}
