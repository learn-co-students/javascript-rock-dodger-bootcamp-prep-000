const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('game');
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const ROCKS = [];
const START = document.getElementById('start');

var gameInterval = null;

function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = `${x}px`;

  var top = 0;

  rock.style.top = top;
  GAME.appendChild(rock);

  /**
   * This function moves all the rocks, not only the one we just created. (20 pixels at a time
   * seems like a good pace. 2 pixels per turn looks like an impossible and undodgeable avalanche.)
   */
  function moveRock() {
     for (i = 0; i < ROCKS.length; i++) {
       top = positionToInteger(ROCKS[i].style.top);
       ROCKS[i].style.top = `${top += 20}px`;
       if (checkCollision(ROCKS[i]) === true) {
         endGame();
       }
       else if (ROCKS[i].style.top > 380)
       {
       }
       else if (ROCKS[i].style.top === 380)
       {
         ROCKS[i].remove();
       }
     }
  }

  window.requestAnimationFrame(moveRock);
  ROCKS.push(rock);
  return rock;
}

function start() {
   window.addEventListener('keydown', moveDodger);

   START.style.display = 'none';

   gameInterval = setInterval(function() {
     createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
   }, 1000)
 }

function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function moveDodger(e) {
   if (e.which === LEFT_ARROW) {
     e.preventDefault();
     e.stopPropagation();
     moveDodgerLeft();
   }
   else if (e.which === RIGHT_ARROW) {
     e.preventDefault();
     e.stopPropagation();
     moveDodgerRight();
   }
}

function moveDodgerLeft() {
   let dodgerLeftEdge = positionToInteger(DODGER.style.left);

   function step() {
     if (dodgerLeftEdge >= 4) {
       DODGER.style.left = `${dodgerLeftEdge -= 4}px`;
     }
   }
   window.requestAnimationFrame(step);
}

function moveDodgerRight() {
   let dodgerLeftEdge = positionToInteger(DODGER.style.left);
   function step() {
     if (dodgerLeftEdge <= 356) {
       DODGER.style.left = `${dodgerLeftEdge += 4}px`;
     }
   }
   window.requestAnimationFrame(step);
}

function endGame() {
  clearInterval(gameInterval);
  for (i=0; i<ROCKS.length; i++) {
    ROCKS[i].remove();
  }
  window.removeEventListener('keydown', moveDodger);
  alert('YOU LOSE!');
}

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const rockLeftEdge = positionToInteger(rock.style.left);
    const dodgerRightEdge = dodgerLeftEdge + 40; // the dodger is 40px x 20px (width x height convention)
    const rockRightEdge = rockLeftEdge + 20; // the rocks are 20px wide

    if (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) { // Rock straddles dodger left edge
      return true;
    }
    else if (rockLeftEdge > dodgerLeftEdge && rockRightEdge < dodgerRightEdge) { // Rock hits dodger center region
      return true;
    }
    else if (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge) { // Rock straddles dodger right edge
      return true;
    }
  }
}
