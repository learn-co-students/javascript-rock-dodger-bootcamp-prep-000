const DODGER = document.getElementById('dodger');
 const GAME = document.getElementById('game');
 const GAME_HEIGHT = 400;
 const GAME_WIDTH = 400;
 const LEFT_ARROW = 37;
 const RIGHT_ARROW = 39;
 const START = document.getElementById('start');

 const ROCKS = [];

 var gameInterval = null;

 function checkCollision(rock) {
   const top = positionToInteger(rock.style.top);

   if (top > 360) {
     const dodgerLeftEdge = positionToInteger(DODGER.style.left);
     const dodgerRightEdge = dodgerLeftEdge + 40;
     const rockLeftEdge = positionToInteger(rock.style.left);
     const rockRightEdge = rockLeftEdge + 20;

     return (
       (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
       (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
      (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)
    );
   }
 }

 function createRock(x) {
   const rock = document.createElement('div');

   rock.className = 'rock';
   rock.style.left = `${x}px`;

   var top = rock.style.top = 0;

   GAME.appendChild(rock);

   function moveRock() {
     rock.style.top = `${top += 2}px`;

     if (checkCollision(rock)) {
       return endGame();
     }

    if (top < GAME_HEIGHT) {
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
for (var i = 0; i < ROCKS.length; i++) {
  ROCKS[i].remove();
}

   window.removeEventListener('keydown', moveDodger);

   START.innerHTML = 'Play again?';
   START.style.display = 'inline';

   return alert('YOU LOSE!');
 }

 function moveDodger(e) {
   const code = e.which;

   if ([LEFT_ARROW, RIGHT_ARROW].indexOf(code) > -1) {
    e.preventDefault();
    e.stopPropagation();
   }

   if (code === LEFT_ARROW) {
     moveDodgerLeft();
   } else if (code === RIGHT_ARROW) {
     moveDodgerRight();
   }
 }

 function moveDodgerLeft() {
   window.requestAnimationFrame(function() {
     const left = positionToInteger(DODGER.style.left);

     if (left > 0) {
       DODGER.style.left = `${left - 4}px`;
    }
   });
 }

 function moveDodgerRight() {
  window.requestAnimationFrame(function() {
     const left = positionToInteger(DODGER.style.left);

     if (left < 360) {
       DODGER.style.left = `${left + 4}px`;
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
