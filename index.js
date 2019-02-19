const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('game');
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const ROCKS = [];
const START = document.getElementById('start');

var gameInterval = null;

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {
    const top = positionToInteger(rock.style.top);
    const dodge = positionToInteger(dodger.style.bottom);
    const dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const dodgerBottomEdge = positionToInteger(DODGER.style.bottom);
    const dodgerTopEdge = dodgerBottomEdge + 20;
    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockBottomEdge = positionToInteger(rock.style.bottom);
    const rockTopEdge = rockBottomEdge + 20;
    const rockRightEdge = rockLeftEdge + 20;
  if (top > 360 && dodge === 0) {
    return ((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
            (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge)||
            (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge));
   }//good
    else if (top < 360 && top > 350 && dodge == 10 ) {
    return ((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge && ((rockBottomEdge <= dodgerBottomEdge && rockTopEdge >= dodgerBottomEdge) || (rockBottomEdge >= dodgerBottomEdge && rockBottomEdge <= dodgerTopEdge))) ||
            (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge && ((rockBottomEdge <= dodgerBottomEdge && rockTopEdge >= dodgerBottomEdge) || (rockBottomEdge >= dodgerBottomEdge && rockBottomEdge <= dodgerTopEdge))) ||
            (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge && ((rockBottomEdge <= dodgerBottomEdge && rockTopEdge >= dodgerBottomEdge) || (rockBottomEdge >= dodgerBottomEdge && rockBottomEdge <= dodgerTopEdge))));
  }//good
    else if (top < 350 && top > 340 && dodge == 20 ) {
    return ((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge && ((rockBottomEdge <= dodgerBottomEdge && rockTopEdge >= dodgerBottomEdge) || (rockBottomEdge >= dodgerBottomEdge && rockBottomEdge <= dodgerTopEdge))) ||
            (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge && ((rockBottomEdge <= dodgerBottomEdge && rockTopEdge >= dodgerBottomEdge) || (rockBottomEdge >= dodgerBottomEdge && rockBottomEdge <= dodgerTopEdge))) ||
            (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge && ((rockBottomEdge <= dodgerBottomEdge && rockTopEdge >= dodgerBottomEdge) || (rockBottomEdge >= dodgerBottomEdge && rockBottomEdge <= dodgerTopEdge))));
  }//good
    else if (top < 340 && top > 330 && dodge == 30 ) {
    return ((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge && ((rockBottomEdge <= dodgerBottomEdge && rockTopEdge >= dodgerBottomEdge) || (rockBottomEdge >= dodgerBottomEdge && rockBottomEdge <= dodgerTopEdge))) ||
            (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge && ((rockBottomEdge <= dodgerBottomEdge && rockTopEdge >= dodgerBottomEdge) || (rockBottomEdge >= dodgerBottomEdge && rockBottomEdge <= dodgerTopEdge))) ||
            (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge && ((rockBottomEdge <= dodgerBottomEdge && rockTopEdge >= dodgerBottomEdge) || (rockBottomEdge >= dodgerBottomEdge && rockBottomEdge <= dodgerTopEdge))));
  }//not good :(


}
function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = `${x}px`;

  var top = 0;

  rock.style.top = top;
  
  GAME.appendChild(rock);

  function moveRock() {
    rock.style.top = `${top += 2}px`;
     if (checkCollision(rock)) {
     return endGame();
    }
    if (top < 400) {
      window.requestAnimationFrame(moveRock);
    }
    else {
      rock.remove();
    }
  }
      window.requestAnimationFrame(moveRock);
  ROCKS.push(rock);
  return rock;
}

function endGame() {
  clearInterval(gameInterval);
  ROCKS.forEach(function(rock) {
    rock.remove();
  });
  window.removeEventListener('keydown', moveDodger);
  return alert('YOU LOSE! Refresh to play again.');
}

function moveDodger(e) {
   if ([LEFT_ARROW].indexOf(e.which) > -1) {
     e.preventDefault();
     e.stopPropagation();
   }
   if ([RIGHT_ARROW].indexOf(e.which) > -1) {
     e.preventDefault();
     e.stopPropagation();
   }
   if (e.which == 37) {
     moveDodgerLeft();
   }
   if (e.which == 39) {
     moveDodgerRight();
}
   if (e.which == 38) {
     moveDodgerUp();
}
   if (e.which == 40) {
     moveDodgerDown();
}
}

function moveDodgerLeft() {
  window.requestAnimationFrame(function() {
    var left = positionToInteger(DODGER.style.left);
    if(left > 0){
      DODGER.style.left = `${left-10}px`;
    }
  });
  }

function moveDodgerRight() {
  window.requestAnimationFrame(function() {
    var left = positionToInteger(DODGER.style.left);
    if(left < 360){
      DODGER.style.left = `${left+10}px`;
  }
});
}

function moveDodgerUp() {
  window.requestAnimationFrame(function() {
    var bottom = positionToInteger(DODGER.style.bottom);
    if(bottom < 360){
      DODGER.style.bottom = `${bottom+10}px`;
    }
  });
  }
  
function moveDodgerDown() {
  window.requestAnimationFrame(function() {
    var bottom = positionToInteger(DODGER.style.bottom);
    if(bottom > 0){
      DODGER.style.bottom = `${bottom-10}px`;
    }
  });
  }

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
