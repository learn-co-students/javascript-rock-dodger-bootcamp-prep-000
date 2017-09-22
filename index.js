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
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20;

    if (
      rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge
      || rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge
      || rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge
    ) {
       // Airbnb style guide on multi-line if statements:
       // https://github.com/airbnb/javascript/issues/1380
      return true
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = 0 // The value of top needs to be mutable: we use it as a counter to store the current value of "top" in this scope.
  rock.style.top = top

  GAME.appendChild(rock) // TODO: Pull request? GAME.prepend(rock) throws error in testing: "GAME.prepend is not a function" but ParentNode.prepend is a property on GAME, and GAME.prepend(rock) runs error free in console (prepend inserts Node before first child, while appendChild inserts Node at end of list of child Nodes). The .prepend() return value is undefined, while .appendChild() return value is the appended child Node. Is this why test fails?).

  function moveRock() {
    rock.style.top = `${top += 2}px`; // top += 2 increments top and also returns the incremented value
    if ( checkCollision(rock) ) {
      endGame();
    } else if ( top < 380 ) {
      window.requestAnimationFrame(moveRock);
    } else {
      rock.remove();
    }
  }

  window.requestAnimationFrame(moveRock);
  ROCKS.push(rock)
  return rock // Why?
}

function endGame() {
  clearInterval(gameInterval);
  for (let i = 0; i < ROCKS.length; i++) {
    ROCKS[i].remove();
  }
  window.removeEventListener('keydown', moveDodger);
  alert("YOU LOSE!");
}

function moveDodger(e) {
  let leftEdgeOnKeyboardEvent = positionToInteger(DODGER.style.left);
  let rightEdgeOnKeyboardEvent = GAME_WIDTH - leftEdgeOnKeyboardEvent - 20 ;

  if ( e.which === LEFT_ARROW ) {
    e.preventDefault();
    e.stopPropagation();
    if ( leftEdgeOnKeyboardEvent > 0 ) {
      moveDodgerLeft();
    }
  }
  if ( e.which === RIGHT_ARROW ) {
    e.preventDefault();
    e.stopPropagation();
    if ( rightEdgeOnKeyboardEvent > 0 ) {
      moveDodgerRight();
    }
  }
  /*
    Why not use "if (e.key === 'ArrowLeft') and "if (e.key === 'ArrowRight')"?
    https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent :
    KeyboardEvent.which:
    "This attribute is deprecated; you should use KeyboardEvent.key instead, if available."

    e.which: 37 (number), e.key: ArrowLeft (string)
    e.which: 39 (number), e.key: ArrowRight (string)

    document.addEventListener('keydown', function(e) {
      console.log(`e.which: ${e.which} (${typeof e.which}), e.key: ${e.key} (${typeof e.key})`);
    });
  */
}

function moveDodgerLeft() {
  let leftNumber = positionToInteger(DODGER.style.left); // get a position number in the outer scope

  function stepLeft() {

    if ( leftNumber > 0 ) {
      DODGER.style.left = `${leftNumber -= 4}px`; // decrement position number in inner scope and return decremented value into string '${/\d+/}px'
      window.requestAnimationFrame(stepLeft);
    }
  }

  window.requestAnimationFrame(stepLeft);
}

function moveDodgerRight() {
  let leftNumber = positionToInteger( DODGER.style.left);

  function stepRight() {

    if ( leftNumber < GAME_WIDTH - 40 ) {
      DODGER.style.left = `${leftNumber += 4}px`; // increment position number and return incremented value into string '${/\d+/}px'
      window.requestAnimationFrame(stepRight)
    }
  }

  window.requestAnimationFrame(stepRight)
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0 // split string at 'px' which returns array, pull left side of split out of array (only two elements since only one 'px')
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
