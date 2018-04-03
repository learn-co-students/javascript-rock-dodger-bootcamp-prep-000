/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('game');
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37; // use e.which!
const RIGHT_ARROW = 39; // use e.which!
const ROCKS = [];
const START = document.getElementById('start');
var winAniRock=null;
var gameInterval = null;



function checkCollision(rock) {

  const top = positionToInteger(rock.style.top);

  if (top > 360) {
    const  dodgerLeftEdge = positionToInteger(DODGER.style.left);
    const dodgerRightEdge = dodgerLeftEdge+40;
    const rockLeftEdge = positionToInteger(rock.style.left);
    const rockRightEdge = rockLeftEdge+20;
    return (rockLeftEdge<=dodgerLeftEdge&&rockRightEdge>=dodgerLeftEdge) || (rockLeftEdge>=dodgerLeftEdge&&rockRightEdge<=dodgerRightEdge) || (rockLeftEdge<=dodgerRightEdge&&rockRightEdge>=dodgerRightEdge);
  } else {
    return false;
    }

  }


function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = `${x}px`;

  let top = 0;


  rock.style.top = top;


    GAME.appendChild(rock);
     moveRock();


  function moveRock() {

   rock.style.top= `${top+=2}px`;

     var chech = window.checkCollision(rock);
     if(chech===true){
       window.endGame();

     }

     if(top<375){
       const winAniRock = window.requestAnimationFrame(moveRock);
     }

    if(top == GAME_HEIGHT-24){
    rock.remove();
    }
  }

  ROCKS.push(rock);

  return rock;
}

function endGame() {


  window.clearInterval(gameInterval);
 window.requestAnimationFrame={};
 for(var i = 0; i < ROCKS.length; i++){

   ROCKS[i].remove();
 }
window.removeEventListener('keydown',moveDodger);
  alert("GAME OVER!!");

}

function moveDodger(e) {


   if(e.which===LEFT_ARROW){
     e.preventDefault();
     e.stopPropagation();
      moveDodgerLeft();
   }
   if(e.which===RIGHT_ARROW){
     e.preventDefault();
     e.stopPropagation();
      moveDodgerRight();
   }

}

let left = 180;
let right = 220;
dodgerRightEdge=positionToInteger(DODGER.style.right);
dodgerLeftEdge=positionToInteger(DODGER.style.left);

function moveDodgerLeft() {

   if(dodgerLeftEdge>0){
     DODGER.style.left= `${left-=4}px`;
     DODGER.style.right= `${right+=4}px`;
 window.requestAnimationFrame(moveDodger(37));
   }
}

function moveDodgerRight() {

   if(dodgerRightEdge<400){
     DODGER.style.right=`${right-=4}px`
     DODGER.style.left=`${left+=4}px`;
   window.requestAnimationFrame(moveDodger(39));
   }
}


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
